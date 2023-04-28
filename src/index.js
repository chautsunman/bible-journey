import React from 'react';
import ReactDOM from 'react-dom';

import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { FirebaseAppProvider, AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';
import { BrowserRouter } from "react-router-dom";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import './index.css';

import App from './App';

import theme from './theme';

import reportWebVitals from './reportWebVitals';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvBQ3bRtR9LmoBOTpjuP2YXpNhZ4lHCfc",
  authDomain: "bible-journey-my.firebaseapp.com",
  projectId: "bible-journey-my",
  storageBucket: "bible-journey-my.appspot.com",
  messagingSenderId: "783480979613",
  appId: "1:783480979613:web:16fb8402f728ebfb4ed474",
  measurementId: "G-3DJ3ET5MFH"
};

const RootApp = () => {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`
  const auth = getAuth(app);
  const firestoreInstance = getFirestore(app);

  // Check for dev/test mode however your app tracks that.
  // `process.env.NODE_ENV` is a common React pattern
  if (process.env.NODE_ENV !== 'production') {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(firestoreInstance, 'localhost', 8080);
  }

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestoreInstance}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <SnackbarProvider maxSnack={3}>
              <BrowserRouter>
                <App/>
              </BrowserRouter>
            </SnackbarProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <RootApp />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
