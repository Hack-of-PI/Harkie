import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import colors from '../../../config/colors';
import NOTIFICATIONS from '../../../data/notifications';

export default class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '#D47FA6'
        };
    }

    colorChange = () => {
        this.setState({
            backgroundColor: '#FFFFFF'
        })
    }

    render() {
        return (
            <>
            <StatusBar backgroundColor={colors.secondary}/>
            <View style={styles.container}>
                <FlatList
                    style={styles.notificationList}
                    enableEmptySections={true}
                    data={NOTIFICATIONS}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity>
                                <View style={[styles.notificationBox,
                                { "backgroundColor": (item.status) === 'read' ? '#FFFFFF' : this.state.backgroundColor },]}>
                                    <Image style={styles.icon}
                                        source={{ uri: item.address }} />
                                    <View>
                                        <Text style={styles.description}>{item.description}</Text>
                                        <Text style={[styles.date,
                                        { "color": (item.status) === 'read' ? '#998FA2' : '#fff' }]}>
                                            {item.date}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF'
    },
    notificationList: {
        borderBottomLeftRadius: 40,
    },
    notificationBox: {
        padding: 20,
        margin:5,
        elevation:5,
        flexDirection: 'row',
        borderWidth: 0.9,
        borderColor: '#E7E4E9',
        borderBottomLeftRadius: 40,
    },
    icon: {
        width: 45,
        height: 45,
        borderRadius: 100,
    },
    description: {
        fontSize: 18,
        color: "#241332",
        marginLeft: 10,
    },
    date: {
        fontSize: 18,
        color: "#998FA2",
        marginLeft: 10,
    },
});