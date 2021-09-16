import firestore from '@react-native-firebase/firestore';

export const usersRef = firestore().collection('users');
export const postsRef = firestore().collection('posts');