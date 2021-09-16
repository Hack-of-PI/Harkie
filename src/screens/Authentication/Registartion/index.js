import React from 'react'
import { View, StyleSheet, Image, Text, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import colors from '../../../config/colors';
import RegisterAsUser from './RegiterAsUser';
import RegisterAsTherapist from './RegisterAsTherapist';

import { QUARANTINE, SUNSET } from '../../../../assets'

export default function index({ navigation, route }) {
    const Tab = createMaterialTopTabNavigator();
    return (
        <>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <View>
                <Image source={QUARANTINE} style={styles.image} />
            </View>
            <Tab.Navigator tabBarOptions={{
                labelStyle: styles.Label,
                activeTintColor: "#195190FF",
                inactiveTintColor: "#222222",
                activeBackgroundColor: "#195190FF",
                indicatorStyle: styles.Tab,
                style: { backgroundColor: colors.primary }
            }}>
                <Tab.Screen options={{ headerShown: false }} name="Register as User" component={RegisterAsUser} />
                <Tab.Screen options={{ headerShown: false }} name="Register as Therapist" component={RegisterAsTherapist} />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    image: {
        width: "100%",
    },
    Label: {
        fontSize: 14,
        fontWeight: "700",
        fontFamily: "NunitoSans",
    },
    Tab: {
        backgroundColor: colors.secondary
    }
})