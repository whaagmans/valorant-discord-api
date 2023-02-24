import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	NotImplementedException,
} from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { User } from './DTO/User.dto';

@Injectable()
export class FirestoreService {
	// Firebase configuration
	private readonly firebaseConfig = {
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.FIREBASE_APP_ID,
	};

	private firebaseApp = initializeApp(this.firebaseConfig);

	private db = getFirestore(this.firebaseApp);

	async getUser(user: User) {
		throw new NotImplementedException();
	}

	async getUserById(id: string) {
		const docRef = doc(this.db, 'users', id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log(docSnap.data());
			return docSnap.data() as User;
		} else {
			throw new NotFoundException();
		}
	}

	async addUser(user: User) {
		try {
			await setDoc(doc(this.db, 'users', user.discord_id), user);
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	}

	async updateUser(user: User) {
		throw new NotImplementedException();
	}

	async deleteUser(user: User) {
		throw new NotImplementedException();
	}

	async deleteUserById(id: string) {
		throw new NotImplementedException();
	}
}
