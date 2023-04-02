const firebase = require('firebase/compat/app');
require('firebase/compat/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDemtJN14v73EW__Nd696Rp--z5IGSmPw0",
    authDomain: "grpc-node-firebase-express.firebaseapp.com",
    projectId: "grpc-node-firebase-express",
    storageBucket: "grpc-node-firebase-express.appspot.com",
    messagingSenderId: "115925109591",
    appId: "1:115925109591:web:9d33971b551f1b2c468c12",
    measurementId: "G-ZMG040B16M"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

  module.exports = { firebaseApp, db };