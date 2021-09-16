import React from 'react'
import { TouchableNativeFeedback } from 'react-native'
import { View, Text, StyleSheet } from 'react-native'
import { Card, Title, Chip, Button, Avatar } from 'react-native-paper'

import colors from '../../../../config/colors'

export default function index() {
    return (
        <Card elevation={5} style={styles.container}>
            <TouchableNativeFeedback onPress={() => { }}>
                <>
                    <View style={styles.top}>
                        <View>
                            <Avatar.Text size={60} label="ZR" />
                        </View>
                        <View style={styles.infoContainer}>
                            <View>
                                <Title>Zean Ronen</Title>
                            </View>
                            <View style={styles.info}>
                                <Text>MBBS,DOMS,MS - Opthalmology</Text>
                                <Text>Opthalmologist</Text>
                                <Text>6 years of experience</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Chip mode="outlined">Mental Health</Chip>
                        <Chip mode="outlined">Personal Dev.</Chip>
                        <Chip mode="outlined">+2 more</Chip>
                    </View>
                </>
            </TouchableNativeFeedback>
            <View style={styles.buttonContainer}>
                <Button color={colors.yellow} uppercase={false} mode="outlined" style={{ width: '45%', borderRadius: 30 }} onPress={() => { }}>Not Interested</Button>
                <Button color={colors.blue} uppercase={false} mode="outlined" style={{ width: '45%', borderRadius: 30 }} onPress={() => { }}>Interested</Button>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    chipContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    infoContainer: {
        padding: 3,
        justifyContent: "flex-start",
        flex: 0.9
    },
    info: {
        borderRadius: 5,
    },
    top: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5,
        alignContent: "center",
        alignItems: "center"
    },
    chip: {
        width: "33%"
    },
    buttonContainer: {
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "space-evenly"
    }
})
