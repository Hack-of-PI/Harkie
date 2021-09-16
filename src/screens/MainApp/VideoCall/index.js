import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InCallManager from 'react-native-incall-manager';
import { VIDEOCALLPLACEHOLDER } from '../../../../assets';

import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals,
} from 'react-native-webrtc';
import { connect } from 'react-redux';

function CallScreen({ navigation, user, ...props }) {
    let name;
    let connectedUser;
    const [userId, setUserId] = useState(user.auth.uid);
    const [socketActive, setSocketActive] = useState(false);
    const [calling, setCalling] = useState(false);
    // Video Scrs
    const [localStream, setLocalStream] = useState({ toURL: () => null });
    const [remoteStream, setRemoteStream] = useState({ toURL: () => null });
    const [conn, setConn] = useState(new WebSocket('ws://3.20.188.26:8080'));
    const [yourConn, setYourConn] = useState(
        //change the config as you need
        new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                }, {
                    urls: 'stun:stun1.l.google.com:19302',
                }, {
                    urls: 'stun:stun2.l.google.com:19302',
                }

            ],
        }),
    );

    const [offer, setOffer] = useState(null);

    const [callToUsername, setCallToUsername] = useState(null);

    // useFocusEffect(
    //     useCallback(() => {
    //         AsyncStorage.getItem('userId').then(id => {
    //             console.log(id);
    //             if (id) {
    //                 setUserId(id);
    //             } else {
    //                 setUserId('');
    //                 navigation.push('Login');
    //             }
    //         });
    //     }, [userId]),
    // );

    // useEffect(() => {
    //     navigation.setOptions({
    //         title: 'Your ID - ' + userId,
    //         headerRight: () => (
    //             <Button mode="text" onPress={onLogout} style={{ paddingRight: 10 }}>
    //                 Logout
    //             </Button>
    //         ),
    //     });
    // }, [userId]);

    /**
     * Calling Stuff
     */

    useEffect(() => {
        if (socketActive && userId.length > 0) {
            try {
                InCallManager.start({ media: 'audio' });
                InCallManager.setForceSpeakerphoneOn(true);
                InCallManager.setSpeakerphoneOn(true);
            } catch (err) {
                console.log('InApp Caller ---------------------->', err);
            }

            console.log(InCallManager);

            send({
                type: 'login',
                name: userId,
            });
        }
    }, [socketActive, userId]);

    const onLogin = () => { };

    useEffect(() => {
        /**
         *
         * Sockets Signalling
         */
        conn.onopen = () => {
            console.log('Connected to the signaling server');
            setSocketActive(true);
        };
        //when we got a message from a signaling server
        conn.onmessage = msg => {
            let data;
            if (msg.data === 'Hello world') {
                data = {};
            } else {
                data = JSON.parse(msg.data);
                console.log('Data --------------------->', data);
                switch (data.type) {
                    case 'login':
                        console.log('Login');
                        break;
                    //when somebody wants to call us
                    case 'offer':
                        handleOffer(data.offer, data.name);
                        console.log('Offer');
                        break;
                    case 'answer':
                        handleAnswer(data.answer);
                        console.log('Answer');
                        break;
                    //when a remote peer sends an ice candidate to us
                    case 'candidate':
                        handleCandidate(data.candidate);
                        console.log('Candidate');
                        break;
                    case 'leave':
                        handleLeave();
                        console.log('Leave');
                        break;
                    default:
                        break;
                }
            }
        };
        conn.onerror = function (err) {
            console.log('Got error', err);
        };
        /**
         * Socjket Signalling Ends
         */

        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (
                    sourceInfo.kind == 'videoinput' &&
                    sourceInfo.facing == (isFront ? 'front' : 'environment')
                ) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }
            mediaDevices
                .getUserMedia({
                    audio: true,
                    video: {
                        mandatory: {
                            minWidth: 500, // Provide your own width, height and frame rate here
                            minHeight: 300,
                            minFrameRate: 30,
                        },
                        facingMode: isFront ? 'user' : 'environment',
                        optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
                    },
                })
                .then(stream => {
                    // Got stream!
                    setLocalStream(stream);

                    // setup stream listening
                    yourConn.addStream(stream);
                })
                .catch(error => {
                    // Log error
                });
        });

        yourConn.onaddstream = event => {
            console.log('On Add Stream', event);
            setRemoteStream(event.stream);
        };

        // Setup ice handling
        yourConn.onicecandidate = event => {
            if (event.candidate) {
                send({
                    type: 'candidate',
                    candidate: event.candidate,
                });
            }
        };
    }, []);

    const send = message => {
        //attach the other peer username to our messages
        if (connectedUser) {
            message.name = connectedUser;
            console.log('Connected iser in end----------', message);
        }

        conn.send(JSON.stringify(message));
    };

    const onCall = () => {
        setCalling(true);

        connectedUser = callToUsername;
        console.log('Caling to', callToUsername);
        // create an offer

        yourConn.createOffer().then(offer => {
            yourConn.setLocalDescription(offer).then(() => {
                console.log('Sending Ofer');
                console.log(offer);
                send({
                    type: 'offer',
                    offer: offer,
                });
                // Send pc.localDescription to peer
            });
        });
    };

    //when somebody sends us an offer
    const handleOffer = async (offer, name) => {
        console.log(name + ' is calling you.');

        console.log('Accepting Call===========>', offer);
        connectedUser = name;

        try {
            await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

            const answer = await yourConn.createAnswer();

            await yourConn.setLocalDescription(answer);
            send({
                type: 'answer',
                answer: answer,
            });
        } catch (err) {
            console.log('Offerr Error', err);
        }
    };

    //when we got an answer from a remote user
    const handleAnswer = answer => {
        yourConn.setRemoteDescription(new RTCSessionDescription(answer));
    };

    //when we got an ice candidate from a remote user
    const handleCandidate = candidate => {
        setCalling(false);
        console.log('Candidate ----------------->', candidate);
        yourConn.addIceCandidate(new RTCIceCandidate(candidate));
    };

    //hang up
    const hangUp = () => {
        send({
            type: 'leave',
        });

        handleLeave();
    };

    const handleLeave = () => {
        connectedUser = null;
        setRemoteStream({ toURL: () => null });

        yourConn.close();
        // yourConn.onicecandidate = null;
        // yourConn.onaddstream = null;
    };

    const onLogout = () => {
        // hangUp();

        console.log('hello')
    };

    const acceptCall = async () => {
        console.log('Accepting Call===========>', offer);
        connectedUser = offer.name;

        try {
            await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

            const answer = await yourConn.createAnswer();

            await yourConn.setLocalDescription(answer);

            send({
                type: 'answer',
                answer: answer,
            });
        } catch (err) {
            console.log('Offerr Error', err);
        }
    };
    const rejectCall = async () => {
        send({
            type: 'leave',
        });
        ``;
        setOffer(null);

        handleLeave();
    };

    /**
     * Calling Stuff Ends
     */

    return (
        <View style={styles.root}>
            <View style={styles.videoContainer}>
                <View style={[styles.videos, styles.localVideos]}>
                    <Text style={{ textAlign: "center" }}>Your Video</Text>
                    <RTCView streamURL={localStream.toURL()} style={styles.localVideo} mirror={true} />
                </View>
                <View style={[styles.videos, styles.remoteVideos]}>
                    <Text style={{ textAlign: "center" }}>Counsellor's Video</Text>
                    <ImageBackground source={VIDEOCALLPLACEHOLDER} resizeMode="cover" style={styles.image}>
                    </ImageBackground>
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(CallScreen);

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
    },
    inputField: {
        marginBottom: 10,
        flexDirection: 'column',
    },
    videoContainer: {
        flex: 1,
        minHeight: 450,
    },
    videos: {
        width: '100%',
        flex: 1,
        position: 'relative',
        overflow: 'hidden',

        borderRadius: 6,
    },
    localVideos: {
        // height: 100,
        marginBottom: 10,
    },
    remoteVideos: {
        height: 400,
    },
    localVideo: {
        backgroundColor: '#f2f2f2',
        height: '100%',
        width: '100%',
    },
    remoteVideo: {
        backgroundColor: '#f2f2f2',
        height: '100%',
        width: '100%',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
});