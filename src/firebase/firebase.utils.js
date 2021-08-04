import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyADBBnLr-VlJ1P2lCp2CPdFRp-IAGBrmFI',
	authDomain: 'crwn-db-6bb11.firebaseapp.com',
	projectId: 'crwn-db-6bb11',
	storageBucket: 'crwn-db-6bb11.appspot.com',
	messagingSenderId: '868516153159',
	appId: '1:868516153159:web:1b9bd8a1eceaa26cc3ae62',
	measurementId: 'G-69SPSS6X3W',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('Error creating user', error.message);
		}
	}

	return userRef;
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);
	const batch = firestore.batch();

	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		};
	});

	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

if (!firebase.apps.length) firebase.initializeApp(config);
else firebase.app();

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ promp: 'select account' });

export default firebase;
