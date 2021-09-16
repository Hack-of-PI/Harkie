import React, { useState } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet,Alert, Image, TouchableWithoutFeedback, Keyboard, Text, TouchableNativeFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from '@react-native-firebase/auth';

import colors from '../../../config/colors';
import { POLYGON, SUNSET } from '../../../../assets'
import * as userActions from '../../../config/store/actions/user'


function index({ navigation, route, userActions }) {

    const [email, setEmail] = useState("");
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

        if (!validateEmail(email)) {
            Alert.alert("Please enter a valid email");
            return;
        }
        if(password.length<5){
            Alert.alert("Password too short");
            return;
        };
        
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('User account created & signed in! ', result.user);
                userActions.setAuthDetails(result.user);
                userActions.setUserDetails({ email });
                userActions.setLoggedIn(true)
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('That email address is invalid!');
                }
                if (error.code === 'auth/user-not-found') {
                    Alert.alert('That user is not registered.Please register!');
                }
                if (error.code === 'auth/wrong-password') {
                    Alert.alert('Incorrect Password');
                }
                console.error(error);
            });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View>
                    <View style={styles.imageConatiner}>
                        <Image source={SUNSET} style={styles.image} />
                    </View>
                    <View>
                        <Image source={POLYGON} />
                    </View>
                </View>
                <KeyboardAwareScrollView>
                    <View>
                        <View style={styles.loginHeader}>
                            <Text style={styles.loginText}>Login</Text>
                        </View>
                        <View style={styles.loginDescriptionBox}>
                            <Text style={styles.loginDescription}>Feel The Peace In And Around You</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.inputContainer}>
                            <View style={{ flex: 0.1 }}>
                                <Icon name="user" size={24} color={colors.secondary} />
                            </View>
                            <View style={{ flex: 0.9 }}>
                                <TextInput
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
                        <View style={styles.forgotPassword}>
                            <Text style={{ color: colors.gray }}>Forgot Password?</Text>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableNativeFeedback onPress={() => navigation.navigate('Registration')}>
                        <View style={styles.signUp}>
                            <Text style={{ fontSize: 12, color: colors.gray }}>Don't have an account?</Text>
                            <Text style={{ fontSize: 24, fontWeight: "500", color: colors.secondary }}>SIGN UP</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={handleSubmit}>
                        <View style={styles.signIn}>
                            <Text style={{ fontSize: 24, color: colors.white }}>SIGN IN</Text>
                            <MaterialCommunityIcons name="arrow-right" color={colors.white} size={24} />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "space-between"
    },
    image: {
        width: "100%",
    },
    loginHeader: {
        padding: 20,
    },
    loginText: {
        fontSize: 40,
        fontFamily: "NunitoSans",
        fontWeight: "bold",
        color: colors.secondary
    },
    loginDescriptionBox: {
        paddingLeft: 20
    },
    loginDescription: {
        fontSize: 20,
        color: colors.secondary,
        paddingBottom: 10
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        width: '100%',
        borderWidth: 1,
        borderTopColor: colors.secondary,
        flexDirection: "row"
    },
    signUp: {
        flex: 0.5,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    forgotPassword: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    signIn: {
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: colors.signIn,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        paddingTop: 15
    },
    inputContainer: {
        paddingHorizontal: 20,
        width: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
})

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(index)