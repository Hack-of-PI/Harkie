import React from 'react'
import { View, Text } from 'react-native'
import { IconButton } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack';

import Messages from '../../../../../screens/MainApp/Messages'
import colors from '../../../../colors'


export default function index({ navigation, route }) {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Messages" component={Messages} options={{
                headerStyle: {
                    backgroundColor: colors.secondary,
                },
                headerTitleAlign: "center",
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: "300"
                },
                headerLeft: () => (
                    <IconButton
                        icon="menu"
                        color="white"
                        size={24}
                        onPress={() => navigation.openDrawer()}
                    />
                ),
                headerRight: () => (
                    <IconButton
                        icon="bell-outline"
                        color="white"
                        size={24}
                        onPress={() => navigation.navigate("Notifications")}
                    />
                ),
            }} />
        </Stack.Navigator>
    )
}