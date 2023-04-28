const { initializeApp } = require("firebase/app");

//all this data is provided by firebase when a new project is create
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "messageSenderID",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = { app }