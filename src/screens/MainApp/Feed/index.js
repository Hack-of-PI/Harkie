import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, ScrollView,RefreshControl } from 'react-native';
import { Card } from 'react-native-paper';
import TextTruncate from 'react-native-text-truncate';
import USERS from '../../../data/users';
import { Text, FAB } from 'react-native-paper';
import colors from '../../../config/colors';

import { postsRef } from '../../../config/firebase';
import LoadingScreen from '../../../screens/Loading'
import { StatusBar } from 'react-native';

export default function Feed(props) {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    onRefresh = async () => {
        setIsLoading(true)
        let postArray = []
        const posts = await postsRef.get();
        if (!posts.empty) {
            posts.forEach(doc => {
                if (doc.exists) {
                    postArray.push(doc.data());
                }
            })
        }
        setData(postArray);
        setIsLoading(false)
    }

    useEffect(() => {
        (async () => await onRefresh())();

        const unsubscribe = props.navigation.addListener("focus", async () => {
            await onRefresh();
        });
        return () => {
            unsubscribe;
        };
    }, [props.navigation])

    const renderExpandor = () => {
        return (<Text>
            {'Read More'}
        </Text>);
    }
    const renderCollapsar = () => {
        return (<Text style={{ marginTop: 20 }}>
            {'Read Less'}
        </Text>);
    }

    const getDate = (timestamp) => {
        let months_arr = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        let date = new Date(timestamp.seconds * 1000);
        let year = date.getFullYear();
        let month = months_arr[date.getMonth()];
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let fulldate = day + " " + month + " " + year + " " + hours + ":" + minutes.substr(-2);
        return fulldate;
    };

    return (
        <>
        <StatusBar backgroundColor={colors.secondary}/>
        <View>
            {isLoading ? <LoadingScreen /> : <><ScrollView refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onRefresh}
                />
            }>
                {
                    data.map((item, i) => {
                        return (
                            <Card elevation={4} style={styles.main}>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <View style={{ flex: 0.2 }}>
                                        <Image source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC' }} style={styles.icon} />
                                    </View>
                                    <View style={{ flex: 0.8 }}>
                                        <View><Text style={styles.description}>{item.title}</Text></View>
                                        <View><Text style={styles.date}>{getDate(item.date)}</Text></View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginVertical: 5 }}>
                                    <TextTruncate
                                        style={{ paddingVertical: 5 }}
                                        numberOfLines={2}
                                        renderExpandor={renderExpandor}
                                        renderCollapsar={renderCollapsar}
                                    >
                                        <Text>
                                            {item.desc}
                                        </Text>
                                    </TextTruncate>
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                                    <View style={{ flex: 0.8 }}>
                                        <Image source={{ uri: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80' }} style={styles.picture} />
                                    </View>
                                </View>
                            </Card>
                        );
                    })
                }
            </ScrollView>
                <FAB
                    icon="plus"
                    style={styles.fab}
                    color={colors.primary}
                    onPress={() => props.navigation.navigate('AddPost')}
                /></>}
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'flex-start',
        height: 50,
        marginLeft: 0
    },
    main: {
        borderBottomLeftRadius: 40,
        flex: 1,
        margin: 10,
        padding: 10,
        // backgroundColor: colors.purple
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 200,
        marginLeft: 0,
        // marginTop:20,
    },
    textmain: {
        flexDirection: "column"
    },
    datemain: {
        display: "flex",
        justifyContent: 'flex-end',
    },
    cardmain: {
        height: 131,
        borderWidth: 1,
        borderRadius: 10
    },
    picture: {
        marginStart: 0,
        marginTop: 10,
        height: 104,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 40,
    },
    text: {
        fontSize: 13,
        color: "#817889",
        margin: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 0,
        display: 'flex',
        justifyContent: 'flex-start'
    },
    datetext: {
        "fontFamily": "Montserrat",
        "fontSize": 12,
        "color": "rgba(53, 38, 65, 255)",
        "marginTop": 14,
        "opacity": 0.56
    },
    cardtitle: {
        display: "flex",
        justifyContent: "flex-start"
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: colors.secondary
    },
});