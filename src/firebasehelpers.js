import 'firebase/app'
import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { getFirestore, collection, getDoc, getDocs, where, query, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore'
import uniqid from 'uniqid'

export async function readUserDatabase(app, currentUser) {
    const db = getFirestore(app)
    const usersRef = collection(db, "Users");
    
    if (currentUser) {
        const q = query(usersRef, where('uid', '==', currentUser.uid));
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

export async function grabUserMessages(app, chatID) {
    const db = getFirestore(app);
    const chatRef = doc(db, 'Chats', chatID);
    const chatSnapshot = await getDoc(chatRef);
    const messages = chatSnapshot.data().messages
    console.log(messages)
}

export async function pushUserMessage(app, chatID, message) {
    const db = getFirestore(app);
    const chatRef = doc(db, 'Chats', chatID);
    await updateDoc(chatRef, {
        messages:arrayUnion(message)
    })
    console.log('updated messages')
}
