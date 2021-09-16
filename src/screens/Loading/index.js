import React from 'react';
import { View, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';

import { LOADING } from '../../../assets'
import { StatusBar } from 'react-native';

export default class BasicExample extends React.Component {
    componentDidMount() {
        this.animation.play;
    }

    render() {
        return (
            <View
            >
                <StatusBar backgroundColor="transparent" translucent={false} />
                <LottieView
                    style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, alignSelf: "center", backgroundColor: "white", paddingTop: StatusBar.currentHeight }}
                    ref={animation => {
                        this.animation = animation;
                    }}
                    loop
                    autoPlay
                    autoSize
                    source={LOADING}
                />
            </View>
        );
    }
}