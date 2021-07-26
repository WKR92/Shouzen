import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyD3uS24x2wgXd0i0WFBY70wyELsU9sJfpc",
    authDomain: "shop-81f6a.firebaseapp.com",
    projectId: "shop-81f6a",
    storageBucket: "shop-81f6a.appspot.com",
    messagingSenderId: "77894157355",
    appId: "1:77894157355:web:48e75a371cca3c97db566e"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;