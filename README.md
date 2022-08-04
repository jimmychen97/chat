<h1 align="center">Chat</h1>

# Project Description
A chat app for mobile devices with React Native. The app will provide user with a chat interface and options to share images, take photos and share their current location. 

# Build with
- React Native
- Expo/Expo Go
- Google Firebase
- Gifted Chat

# How to run the project

Install [Expo](https://expo.dev/): 
```
npm install expo-cli -g
```
- Install Expo Go app on mobile device
- Install all the dependencies: `npm install`
- start the app `expo start`
- Launch the app by scanning the QR code

# How to run the project
- Create Google Firebase account
- Sign into https://firebase.google.com/
- Create a project > Start in test mode > Create a collection (with AutoID)
- Install Firestore via Firebase with `npm i firebase`
- Link Firebase storage to project app in Project Settings
- Import Firebase into `Chat.js` and initialize app with `firebaseConfig`
