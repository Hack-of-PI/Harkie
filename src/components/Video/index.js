import React, { Component } from "react";
import { Card, Title, Paragraph } from 'react-native-paper'
import { Text, View, StyleSheet } from "react-native";
import Video from 'react-native-video';
import colors from "../../config/colors";
export default class VideoClass extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Card style={styles.container} elevation={5}>
                <View style={{ height: 200, width: "100%" }}>
                    <Video source={{ uri: this.props.item.videoUrl }}   // Can be a URL or a local file.
                        ref={(ref) => {
                            this.player = ref
                        }}                                      // Store reference
                        onBuffer={this.onBuffer}
                        playInBackground={false}
                        paused={true}
                        controls={true}
                        resizeMode="cover"               // Callback when remote video is buffering
                        onError={this.videoError}               // Callback when video cannot be loaded
                        style={styles.backgroundVideo} />
                </View>
                <Card.Content>
                    <Title style={{ fontSize: 14 }}>{this.props.item.name}</Title>
                    <Paragraph>{this.props.item.publishDate}</Paragraph>
                </Card.Content>
            </Card>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        // padding: 20,
        backgroundColor: colors.white,
        overflow: "hidden",
        height: 270,
        margin: 20,
        borderRadius: 10
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
});