import React from 'react'
import { RefreshControl } from 'react-native'
import { StatusBar } from 'react-native'
import { View, Text, FlatList } from 'react-native'

import Card from '../../../components/Video'
import colors from '../../../config/colors'

export default function index() {

    const videos = [
        {
            "id": "l-gQLqv9f4o",
            "videoUrl": "https://firebasestorage.googleapis.com/v0/b/harkie-311c4.appspot.com/o/peptalkkid.mp4?alt=media&token=85096704-1a3f-477c-ac4d-9e099f29c9ba",
            "name": "A Pep Talk from Kid President to You",
            "publishDate": "25 Jan 2013"
        },
        {
            "id": "g-jwWYX7Jlo",
            "videoUrl": "https://firebasestorage.googleapis.com/v0/b/harkie-311c4.appspot.com/o/videoplayback%20(1).mp4?alt=media&token=0dbf4d60-eade-47ed-ba69-31b3f1a19b29",
            "name": "Dream - Motivational Video",
            "publishDate": "17 Jan 2007"
        },
        {
            "id": "Cpc-t-Uwv1I",
            "videoUrl": "https://firebasestorage.googleapis.com/v0/b/harkie-311c4.appspot.com/o/videoplayback%20(2).mp4?alt=media&token=3b21383b-360a-47eb-8562-163104893bfb",
            "name": "Why we do what we do | Tony Robbins",
            "publishDate": "17 Jan 2007"
        },
        {
            "id": "4q1dgn_C0AU",
            "publishDate": "27 Apr 2012",
            "videoUrl": "https://firebasestorage.googleapis.com/v0/b/harkie-311c4.appspot.com/o/videoplayback.mp4?alt=media&token=c0d9836b-75cd-46dd-8bbc-f26c9ad008fe",
            "name": "The surprising science of happiness | Dan Gilbert"
        }
    ]
    return (
        <View style={{ flex: 1, backgroundColor: colors.primary }}>
            <FlatList
                data={videos}
                keyExtractor={item => item.id.toString()}
                renderItem={(item) => <Card item={item.item} />}
            />
        </View>
    )
}
