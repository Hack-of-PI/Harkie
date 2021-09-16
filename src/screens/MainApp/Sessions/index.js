import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import colors from '../../../config/colors';
import PublicSessions from './PublicSessions';
import PrivateSessions from './PrivateSessions'

const Sessions = ({ navigation }) => {

    const Tab = createMaterialTopTabNavigator();
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: styles.Label,
                indicatorStyle: styles.Tab,
                activeTintColor: "#195190FF",
                inactiveTintColor: "#222222",
                activeBackgroundColor: "#195190FF",
                style: { backgroundColor: colors.primary }
            }}>
            <Tab.Screen name="Public Session" component={PublicSessions} />
            <Tab.Screen name="Private Session" component={PrivateSessions} />
        </Tab.Navigator>
    );
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


export default Sessions;
