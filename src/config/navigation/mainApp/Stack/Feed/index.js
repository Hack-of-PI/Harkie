import React from 'react'
import { View, Text } from 'react-native'
import { IconButton } from 'react-native-paper'
import { createStackNavigator } from '@react-navigation/stack';

import Feed from '../../../../../screens/MainApp/Feed'
import AddPost from '../../../../../screens/MainApp/Feed/Forms'
import colors from '../../../../colors'


export default function index({ navigation, route }) {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Feed} options={{
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
            <Stack.Screen name="AddPost" component={AddPost} options={{
                title: "Add Post",
                headerStyle: {
                    backgroundColor: colors.secondary,
                },
                headerTitleAlign: "center",
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: "300"
                }
            }} />
        </Stack.Navigator>
    )
}
