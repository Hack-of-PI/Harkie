import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { SUNSET } from '../../../../../assets'
import colors from '../../../colors'
import * as userActions from '../../../store/actions/user'

const arrMenu = [
    { 'id': 0, name: 'Home', 'icon': 'home', 'navScreen': 'Home' },
    { 'id': 1, name: 'Videos', 'icon': 'video', 'navScreen': 'Videos' },
    { 'id': 2, name: 'Sessions', 'icon': 'users', 'navScreen': 'Sessions' },
    { 'id': 3, name: 'Messages', 'icon': 'message', 'navScreen': 'Messages' },
    { 'id': 4, name: 'Profile', 'icon': 'user', 'navScreen': 'Profile' },
    { 'id': 5, name: 'LogOut', 'icon': 'log-out', 'navScreen': 'HelpScreen' },
]

function CustomSidebarMenu({ navigation, userActions }) {

    function renderFlatList() {
        return (
            <FlatList
                data={arrMenu}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleClick(item.name, item.navScreen)}>
                        <View style={{ height: 55, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            < Icon name={item.icon} size={30} style={{ color: colors.secondary, margin: 10 }} />
                            <Text style={styles.menuText}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    }

    const handleClick = (name, screen) => {
        if (name === 'LogOut') {
            userActions.logout();
        } else {
            navigation.navigate(screen)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image resizeMode="cover" source={SUNSET} style={styles.image} />
            <View>
                {renderFlatList()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    image: {
        width: "100%",
    },
    menuText: {
        fontSize: 20,
        fontFamily: "NunitoSans",
        color: colors.secondary,
        textAlign: 'center',
        marginLeft: 20,
        fontWeight: "600"
    },
    item: {
        // borderColor: colors.medium_light2,
        borderTopWidth: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    head: {
        paddingTop: 10,
        padding: 5,
        margin: 5,
        marginBottom: 0,
        paddingBottom: 0,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    iconBox: {
        width: 40,
        height: 40,
        // backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        margin: 4,
    },
    icon: {
        color: "white",
    },
    content: {
        margin: 2,
        paddingLeft: "5%",
    },
    header: {
        fontSize: 16,
        fontWeight: "bold",
    },
    header1: {
        fontSize: 18,
    },
    header2: {
        // color: colors.medium,
        fontSize: 12,
        width: "60%",
    },
});

const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(CustomSidebarMenu);