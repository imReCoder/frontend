

const initializeFirebase = () => {
    firebase.initializeApp(getFirebaseConfig());
    console.log('Firebase initialized!');
}


const setDataToFirestore = async (payload, collection = "entries") => {
    const db = firebase.firestore();
    const ref = await db.collection(collection).add(payload);
    console.log('Added document with ID: ');
    return ref.id;
}


initializeFirebase();