// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAeRCknCH_bAHjgtog4D-JRhnxS8wtWGrU",
    authDomain: "grahas-vr---visualizer.firebaseapp.com",
    projectId: "grahas-vr---visualizer",
    storageBucket: "grahas-vr---visualizer.firebasestorage.app",
    messagingSenderId: "414271656193",
    appId: "1:414271656193:web:3d2200d22ca84940be0b00"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL, app };