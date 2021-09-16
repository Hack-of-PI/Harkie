import React, { useState } from "react";
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker'
import { ScrollView } from "react-native";
import colors from '../../../../config/colors'
import { Keyboard } from "react-native";
import firestore from '@react-native-firebase/firestore'

import { usersRef, postsRef } from '../../../../config/firebase'
import { connect } from "react-redux";


function Forms({ navigation, user }) {
    const [data, setData] = useState("")
    const [photo, setPhoto] = useState(null);

    const handleChoosePhoto = async () => {
        const options = {
            noData: true
        };
        await ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setPhoto(response)
            }
            console.log("response:", response);
        })
    }

    const handleSubmit = async () => {
        const post = await postsRef.add({
            desc: data,
            title: user.user.name,
            date: firestore.FieldValue.serverTimestamp(),
            avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC",
            picture: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
        })
        if (post.id) {
            usersRef.doc(user.auth.uid).update({
                posts: firestore.FieldValue.arrayUnion(post.id)
            }).then(() => navigation.goBack())
        }
    }
    return (
        <ScrollView style={styles.formtextinput} onPress={Keyboard.dismiss}>
            <View style={{ flex: 0.4 }}>
                <TextInput
                    label='Your Story...'
                    value={data}
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={text => setData(text)}
                />
            </View>
            <View style={styles.photo}>
                {photo && (
                    <Image
                        source={{ uri: photo.uri }}
                        style={{ height: 300, width: 320 }}
                    />
                )}
                <Button mode="outlined" onPress={handleChoosePhoto} style={{ marginVertical: 10 }}>
                    Choose Photo
                    </Button>
            </View>
            <View style={styles.secondary}>
                <Button title="SUBMIT" mode="outlined" onPress={handleSubmit}>
                    SUBMIT
                    </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    formtextinput: {
        flex: 1,
        margin: 20
    },
    submit: {
        flex: 0.2,
        justifyContent: "flex-end"
    },
    photo: {
        flex: 0.4,
        justifyContent: "flex-end",
        marginVertical: 20
    }
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Forms);