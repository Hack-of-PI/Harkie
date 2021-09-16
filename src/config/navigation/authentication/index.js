import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import AppIntroScreen from '../../../screens/Authentication/AppIntro';
import LoginScreen from '../../../screens/Authentication/Login';
import RegistrationScreen from '../../../screens/Authentication/Registartion'

const Stack = createStackNavigator();

export default Authentication = ({ navigation, route }) => {
    return (
        <Stack.Navigator initialRouteName="AppIntro" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AppIntro" component={AppIntroScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
    )
};