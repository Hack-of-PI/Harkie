import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { NavigationContainer } from '@react-navigation/native';

import { usersRef } from '../config/firebase';
import LoadingScreen from '../screens/Loading'
import * as userActions from '../config/store/actions/user';
import Authentication from '../config/navigation/authentication';
import MainApp from '../config/navigation/mainApp';
import VideoCallScreen from '../screens/MainApp/VideoCall'

function Main({ userActions, user }) {

    const [load, setLoad] = useState(false);
    const [stackToShow, setStackToShow] = useState(null);

    useEffect(() => {
        (async () => {
            let userDoc;
            if (user.isLoggedIn) {
                setLoad(true)
                userDoc = await usersRef.doc(user.auth.uid).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    console.log(userData)
                    await userActions.setUserDetails(userData);
                    if (userData.hasOwnProperty('isOnboarded')) {
                        await userActions.setIsOnboarded(userData.isOnboarded);
                    }
                }
            }
            setStackToShow(user.isLoggedIn ?
                <MainApp />
                // <VideoCallScreen />
                :
                <Authentication />)
            setLoad(false)
        })();
    }, [user.isLoggedIn, userActions.logout])

    return (
        <>
            <NavigationContainer>
                <SafeAreaView style={{ flex: 1 }}>
                    {load ? <LoadingScreen /> : stackToShow}
                </SafeAreaView>
            </NavigationContainer>
        </>
    )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);