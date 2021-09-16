import React, { useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from '@react-native-firebase/auth';
import { nanoid } from 'nanoid';


import colors from '../../../../config/colors';
import { usersRef } from '../../../../config/firebase';
import * as userActions from '../../../../config/store/actions/user'

function index({ navigation, userActions }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function validateEmail(emailAdress) {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailAdress.match(regexEmail)) {
            return true;
        } else {
            return false;
        }
    }

    const handleSubmit = () => {
        const name = "user" + (nanoid()).toString();

        if (!validateEmail(email)) {
            Alert.alert("Please enter a valid email");
            return;
        }
        if (password.length < 5) {
            Alert.alert("Password too short");
            return;
        };

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('User account created & signed in! ', result);
                usersRef.doc(result.user.uid).set({ email, isTherapist: false, name }, { merge: true }).then(() => {
                    userActions.setAuthDetails(result.user);
                    userActions.setUserDetails({ email, isTherapist: false, name });
                    userActions.setLoggedIn(true)
                })
                    .catch(err => console.log(err))
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                }
                console.error(error);
            });
    }
    return (
        <KeyboardAwareScrollView style={styles.container}>
            <View style={{ flex: 0.5 }}>
                <View style={styles.inputContainer}>
                    <View style={{ flex: 0.1 }}>
                        <Icon name="user" size={24} color={colors.secondary} />
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <TextInput
                            // label="Email"
                            placeholder="Enter email"
                            underlineColor={colors.secondary}
                            selectionColor={colors.secondary}
                            value={email}
                            onChangeText={email => setEmail(email)}
                            style={{ borderColor: colors.secondary, backgroundColor: colors.primary }}
                            theme={{ colors: { primary: colors.secondary } }}
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View style={{ flex: 0.1 }}>
                        <Icon name="key" size={24} color={colors.secondary} />
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <TextInput
                            // label="Password"
                            value={password}
                            placeholder="Enter Password"
                            secureTextEntry={true}
                            underlineColor={colors.secondary}
                            selectionColor={colors.secondary}
                            onChangeText={password => setPassword(password)}
                            style={{ borderColor: colors.secondary, backgroundColor: colors.primary }}
                            theme={{ colors: { primary: colors.secondary } }}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flex: 0.5, justifyContent: "center", marginTop: 100 }}>
                <Button icon="arrow-right" mode="text" labelStyle={{ fontSize: 18, fontWeight: "700" }} color={colors.secondary} onPress={handleSubmit}>
                    Register
            </Button>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: '5%'
    },
    inputContainer: {
        marginVertical: 5,
        width: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
        // flex: 1,
    },
})

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(index);