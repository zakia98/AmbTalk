import 'firebase/app'
import 'firebase/firestore'
import { getFirestore, collection, getDocs, where, query, setDoc, doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore'
import uniqid from 'uniqid'
import { app } from './firebaseConfig'

const genUniqid = uniqid
const db = getFirestore(app)

export async function readUserDatabase(app, uid) {
    //reads user data from the User Database
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
        chats:[],
        profilePicURL:currentUser.photoURL
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
    const chatQuery = query(chatRef, where('head.users.allusers', 'array-contains', uid))
    const chatSnapshot = await getDocs(chatQuery);
    
    const chats = []
    
    chatSnapshot.forEach(chat => {
        chats.push(chat.data())
    })
    return chats
}

export async function checkIfChatBetweenUsersExists(uid1, uid2) {
    //Structured in the following fashion as firebase doesn't support 
    //where multiple array-contains queries. 
    const chatRef = collection(db, 'Chats');
    const chatQuery1 = query(chatRef, where('head.users.user1', '==', uid1),
        where('head.users.user2', '==', uid2))
    const chatQuery2 = query(chatRef, where('head.users.user1', '==', uid2),
        where('head.users.user2', '==', uid1))

    const chatSnapshot1 = await getDocs(chatQuery1)
    const chatSnapshot2 = await getDocs(chatQuery2)
    
    if (!chatSnapshot1.empty) {
        console.log(chatSnapshot1.docs[0].data())
        return chatSnapshot1.docs[0].data()
    }
    if (!chatSnapshot2.empty) {
        return chatSnapshot2.docs[0].data()
    }
    return null
}


export async function listenForMessageUpdates(chatID, updateMessages) {
    onSnapshot(doc(db, 'Chats', chatID), (doc) => {
        updateMessages(doc.data())
    })

}

export async function listenForChatUpdates(UID, updateChats) {
    const chatRef = collection(db, 'Chats');
    const chatQuery = query(chatRef, where('head.users.allusers', 'array-contains', UID))
    onSnapshot(chatQuery, (querySnapshot) => {
        const chats = []
        querySnapshot.forEach((doc) => {
            chats.push(doc.data())
        })
        updateChats(chats)
    })
}

export async function pushUserMessage(chatID, message, uid) {
    const chatRef = doc(db, 'Chats', chatID);
    await updateDoc(chatRef, {
        messages:arrayUnion(
            {
                chatMessage:message,
                uid:uid, 
                time: new Date(),
                readBy:[]
            }
        )
    })
}

export async function searchByUsername(username) {
    const usersRef = collection(db, "Users")

    if (!username) { 
        return null 
    }
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

export async function createNewChat(currentUserUID, targetUID) {
    const uniqueid = genUniqid()
    await setDoc(doc(db, 'Chats', uniqueid), {
        head:{
            chatID:uniqueid,
            users: {
                allusers:[currentUserUID, targetUID],
                user1:currentUserUID,
                user2:targetUID
            }
        },
        messages:[
            
        ]
    })

    return uniqueid
}

