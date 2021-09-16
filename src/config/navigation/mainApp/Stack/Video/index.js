import React from 'react'
import { IconButton } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack';

import VideoScreen from '../../../../../screens/MainApp/Video';
import colors from '../../../../colors'

export default function index({ navigation, route }) {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Video" component={VideoScreen} options={{
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
