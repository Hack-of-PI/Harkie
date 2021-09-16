import React from 'react'
import { View, Text } from 'react-native'

import Card from '../../../../components/Sessions/PrivateSession'

export default function index({ navigation }) {
    return (
        <Card navigation={navigation} />
    )
}
