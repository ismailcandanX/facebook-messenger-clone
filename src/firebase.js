import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';


const firebaseConfig  = {
  apiKey: 'AIzaSyAlkhZkkRHpbPj5G53o_V37-a5OlnIvlm8',
  authDomain: 'facebook-messenger-clone-3b60d.firebaseapp.com',
  projectId: 'facebook-messenger-clone-3b60d',
  storageBucket: 'facebook-messenger-clone-3b60d.appspot.com',
  messagingSenderId: '703095819771',
  appId: '1:703095819771:web:27bc6481764b7c17adcf5e',
  measurementId: 'G-XHP0E85L53',
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();



export default db