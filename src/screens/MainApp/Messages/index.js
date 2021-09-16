import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, Send, InputToolbar, Composer } from 'react-native-gifted-chat'
import { Alert, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import axios from 'axios';

import colors from '../../../config/colors';
import * as userActions from '../../../config/store/actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Chat({ navigation, route, user, userActions }) {
    const [messages, setMessages] = useState([
        {
            _id: 1,
            text: "Can you book me an slot with Dr. Zean Ronen??",
            createdAt: new Date(),
            user: {
                _id: 1,
            }
        }, {
            _id: 2,
            text: 'Hello,How can I help you?',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Watson Assistant',
                avatar: 'data:image/jpeg;base64,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',
            },
        }]);
    const [sessionId, setSessionId] = useState("")

    useEffect(() => {
        (async () => {
            const sessionID = await axios.get('https://harkie-ibm-watson.herokuapp.com/api/session')
                .then(res => {
                    return res.data.sessionId.session_id;
                }).catch(err => {
                    Alert.alert("Error occured!", "Try later, some error occured.");
                })
            await userActions.setSessionId(sessionID);
            console.log(sessionID)
            await recieveMessage("Can you book me a time slot with Dr. Zean Ronen?", sessionID)
        })();
    }, [])

    const onSend = useCallback(async (messages = []) => {
        console.log(messages)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        console.log("\n", user, "\n")
        await recieveMessage(messages[0].text, user.sessionId);
    }, [])

    const recieveMessage = async (message, sess) => {
        console.log("session id", sess)
        try {
            const recievedMessage = await axios.post('https://harkie-ibm-watson.herokuapp.com/api/message', {
                message: message,
                sessionId: sess
            }, {
                headers: {
                    "Content-type": "application/json"
                }
            });
            console.log(recievedMessage.data.message.output.generic[0].text)
            let totalmessages = recievedMessage.data.message.output.generic
            let toSet = []
            totalmessages.forEach(msg => {
                toSet.push({
                    _id: Math.round(Math.random() * 1000000).toString(),
                    text: msg.text,
                    createdAt: new Date(),
                    user: {
                        _id: '2',
                        name: 'Watson Assistant',
                        avatar: 'data:image/jpeg;base64,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',
                    },
                })
            })
            toSet.reverse();
            setMessages(previousMessages => GiftedChat.append(previousMessages, toSet))
        } catch (error) {
            Alert.alert(error)
        }

    }

    function renderBubble(props) {
        return (
            // Step 3: return the component
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        // Here is the color change
                        backgroundColor: colors.secondary
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    }
                }}
            />
        );
    }

    function scrollToBottomComponent() {
        return (
            <View style={styles.bottomComponentContainer}>
                <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
            </View>
        );
    }

    function renderSend(props) {
        return (
            <Send {...props}>
                <View style={styles.sendingContainer}>
                    <IconButton icon='send-circle' size={32} color='#00B1D2FF' />
                </View>
            </Send>
        );
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            renderBubble={renderBubble}
            renderInputToolbar={props => (
                <InputToolbar {...props}
                    containerStyle={{ backgroundColor: "#fff", }}
                    renderComposer={props1 => (
                        <Composer {...props1}
                            textInputStyle={{ color: "black" }}
                        />
                    )}
                />
            )
            }
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottomComponent={scrollToBottomComponent}
        />
    )
}

const styles = StyleSheet.create({
    // rest remains same
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    sendingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);