import firebase from 'firebase/app';
import 'firebase/firestore';

function init() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyA0K1jKtEXwJb0Tx3oS8pthYCmww8e37GY',
      authDomain: 'boiling-torch-9448.firebaseapp.com',
      databaseURL: 'https://boiling-torch-9448.firebaseio.com',
      projectId: 'boiling-torch-9448',
      storageBucket: 'boiling-torch-9448.appspot.com',
      messagingSenderId: '220381474454',
      appId: '1:220381474454:web:2edcf5bd41700796b0dcb7',
    });
  }
  return firebase.firestore();
}
export default init();

const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
