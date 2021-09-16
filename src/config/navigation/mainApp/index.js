import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/Feather'
import { IconButton } from 'react-native-paper'

import Home from './Stack/Feed';
import colors from '../../colors'
import CustomSideDrawer from './SideDrawer'
import Video from './Stack/Video'
import Sessions from './Stack/Sessions'
import Messages from './Stack/Messages'
import Notifications from '../../../screens/MainApp/Notifications';
import Profile from '../../../screens/MainApp/Profile'
import { createStackNavigator } from '@react-navigation/stack';

const Tabs = AnimatedTabBarNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default SideDrawer = ({ navigation, route }) => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomSideDrawer {...props} />}>
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Notifications" component={NotificationStack} />
            <Drawer.Screen name="Profile" component={ProfileStack} />
        </Drawer.Navigator>
    )
}

const NotificationStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator screenOptions={{ animationEnabled: false }}>
            <Stack.Screen name="Notifications" component={Notifications} options={{
                title: "Notifications",
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleAlign: "center",
                headerTintColor: colors.secondary,
                headerTitleStyle: {
                    fontWeight: "300"
                },
                headerLeft: () => (
                    <IconButton
                        icon="arrow-left"
                        color={colors.secondary}
                        size={24}
                        onPress={() => navigation.goBack()}
                    />
                ),
            }} />
        </Stack.Navigator>
    )
}

const ProfileStack = ({ navigation, route }) => {
    return (
        <Stack.Navigator screenOptions={{ animationEnabled: false }}>
            <Stack.Screen name="Profile" component={Profile} options={{
                title: "Profile",
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTitleAlign: "center",
                headerTintColor: colors.secondary,
                headerTitleStyle: {
                    fontWeight: "300"
                },
                headerLeft: () => (
                    <IconButton
                        icon="arrow-left"
                        color={colors.secondary}
                        size={24}
                        onPress={() => navigation.goBack()}
                    />
                ),
            }} />
        </Stack.Navigator>
    )
}


const TabBarIcon = props => {
    return (
        <Icon
            name={props.name}
            size={props.size ? props.size : 24}
            color={props.tintColor}
        />
    )
};

function TabNavigator({ navigation, route }) {
    return (
        <Tabs.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: "#fff",
                inactiveTintColor: "#222222",
                activeBackgroundColor: "#195190FF"
            }}
        >
            <Tabs.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabBarIcon
                            focused={focused}
                            tintColor={color}
                            name="home"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Videos"
                component={Video}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <TabBarIcon
                            focused={focused}
                            tintColor={color}
                            name="video"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Sessions"
                component={Sessions}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabBarIcon
                            focused={focused}
                            tintColor={color}
                            name="users"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="Messages"
                component={Messages}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabBarIcon
                            focused={focused}
                            tintColor={color}
                            name="message-square"
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    )
}