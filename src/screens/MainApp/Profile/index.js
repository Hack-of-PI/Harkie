import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import NOTIFICATIONS from '../../../data/notifications';
import * as ImagePicker from 'react-native-image-picker';
import { StatusBar } from 'react-native';
import { Card } from 'react-native-paper'
import colors from '../../../config/colors';

export default class UserProfileView extends Component {
    constructor(props) {
        super(props)

        this.state = {

            imageSource: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR9qDoSJLOwRa02yAPE4aN6SVpRaTC0cDoAw&usqp=CA',

        }
    }

    changeIndex = () => {
        const options = {
            quality: 0.7, allowsEditing: true, mediaType: 'photo', noData: true,
            storageOptions: {
                skipBackup: true, waitUntilSaved: true, path: 'images', cameraRoll: true
            }
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.error) {
                console.log(error);
            }
            else if (!response.didCancel) {
                this.setState({
                    imageSource: { uri: response.uri }
                })
            }
        });
    }

    render() {
        return (
            <>
                <StatusBar backgroundColor={colors.secondary} />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <TouchableOpacity onPress={this.changeIndex}>
                                <Image style={styles.avatar}
                                    source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                            </TouchableOpacity>
                            <Text style={styles.name}>Brave Satoshi </Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.item}>
                            <View style={styles.iconContent}>
                                <Text style={styles.numbertext}>125</Text>
                                <Text style={styles.text}>POSTS</Text>
                            </View>
                            <View style={styles.verticleLine}></View>
                            <View style={styles.iconContent}>
                                <Text style={styles.numbertext}>150</Text>
                                <Text style={styles.text}>PUBLIC SESSIONS ATTENDED</Text>
                            </View>
                            <View style={styles.verticleLine}></View>
                            <View style={styles.iconContent}>
                                <Text style={styles.numbertext}>321</Text>
                                <Text style={styles.text}>PRIVATE SESSIONS ATTENDED</Text>
                            </View>
                        </View>
                    </View>
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
                                    <Card elevation={4} style={styles.main}>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                            <View style={{ flex: 0.2 }}>
                                                <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC' }} style={styles.icon} />
                                            </View>
                                            <View style={{ flex: 0.8 }}>
                                                <View><Text style={styles.description}>YOU</Text></View>
                                                <View><Text style={styles.date}>{item.date}</Text></View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                                            <View style={{ flex: 0.8, marginVertical: 3 }}>
                                                <Text style={{ color: "white", fontSize: 13 }}>{item.description}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                                            <View style={{ flex: 0.8 }}>
                                                <Image source={{ uri: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80' }} style={styles.picture} />
                                            </View>
                                        </View>
                                    </Card>
                                )
                            }} />
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        borderBottomLeftRadius: 40,
        flex: 1,
        margin: 10,
        padding: 10,
        backgroundColor: colors.purple
    },
    container: {
        backgroundColor: '#FFFFFF',
        flex:1,
        marginHorizontal:5
    },
    notificationList: {
        borderBottomLeftRadius: 40,
    },
    notificationBox: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        borderWidth: 0.9,
        borderColor: '#E7E4E9',
        borderBottomLeftRadius: 40,
        margin: 5,
        elevation: 5
    },
    picture: {
        marginVertical: 5,
        height: 105,
        width: "100%",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 40,
    },
    icon: {
        width: 45,
        height: 45,
        borderRadius: 100,
    },
    description: {
        fontSize: 18,
        color: "#FFFFFF",
        // marginLeft: 10,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 18,
        color: "#998FA2",
        // marginLeft: 10,
    },
    header: {
        backgroundColor: "#FFFFFF",
        // borderBottomLeftRadius: 40,
        borderWidth: 1,
        borderColor: '#E7E4E9'

    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
        // borderBottomLeftRadius:40,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        color: "#241332",
        fontWeight: 'bold',
    },
    body: {
        backgroundColor: "#8A56AC",
        height: 70,
        display: 'flex',
        justifyContent: 'space-around',
        borderBottomLeftRadius: 40,
    },
    item: {
        flexDirection: 'row',
        borderBottomLeftRadius: 40,
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
    },
    iconContent: {
        flex: 1,
        alignItems: 'center',
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: "#FFFFFF",
    },
    text: {
        color: '#FFFFFF',
        fontSize: 10,
        textAlign: "center"
    },
    numbertext: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: '#000000',
        opacity: 0.09
    }
});