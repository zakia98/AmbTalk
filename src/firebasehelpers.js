import { getQueriesForElement } from '@testing-library/react'
import 'firebase/app'
import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getFirestore, collection, getDoc, getDocs, where, query, setDoc, doc, updateDoc, arrayUnion, get } from 'firebase/firestore'
import uniqid from 'uniqid'
import { app } from './firebaseConfig'

const db = getFirestore(app)

export async function readUserDatabase(app, uid) {
    const db = getFirestore(app)
    const usersRef = collection(db, "Users");
    
    if (uid) {
        const q = query(usersRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs[0]) {
            const docdata = querySnapshot.docs[0].data()
            return docdata
        } else {
            return null
        }
    }   
}

export async function addUserDataToDatabase(app, currentUser) {
    const db = getFirestore(app)
    const usersRef = collection(db, 'Users');

    await setDoc(doc(usersRef, currentUser.uid), {
        uid:currentUser.uid,
        name:currentUser.displayName,
        chats:[]
    })
}

export async function addUsersChosenUsernameToDatabase(app, currentUser, username) {
    const db = getFirestore(app);
    const userRef = doc(db, "Users", currentUser.uid)
    await updateDoc(userRef, {
        username:username
    })
}

export async function grabUserMessages(app, uid) {
    const db = getFirestore(app);
    const chatRef = collection(db, 'Chats');
    debugger
    const chatQuery = query(chatRef, where('head.users', 'array-contains', uid))
    
    const chatSnapshot = await getDocs(chatQuery)
    const chats = []
    chatSnapshot.forEach(chat => {
        chats.push(chat.data())
    })
    console.log(chats)
}

export async function pushUserMessage(app, chatID, message) {
    const db = getFirestore(app);
    const chatRef = doc(db, 'Chats', chatID);
    await updateDoc(chatRef, {
        messages:arrayUnion(message)
    })
}

export async function searchByUsername(username) {
    const usersRef = collection(db, "Users")

    if (!username) { return null }
    const usernameQuery = query(usersRef, where('username', '>=', username), where('username', '<=', username + '\uf8ff'))
    const usernameSnapshot = await getDocs(usernameQuery)
    if (usernameSnapshot.docs.length > 0) {
        const userList = []
        usernameSnapshot.docs.forEach(doc => {
            userList.push(doc.data())
        })
        return userList
    } else {
        return null
    }
}  
