import * as React from 'react';
import { useState, useEffect } from 'react';

import { onAuthStateChanged } from "firebase/auth";
import { useAuth, useFirestore } from 'reactfire';
import { Route, Routes } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Home from './Home';
import SignInScreen from './SignInScreen';
import SettingsPage from './SettingsPage';
import BibleAppBar from './components/app_bar';

import AppContext from './app_components/app_context';
import SettingsService from './services/settings_service';
import JourneyService from './services/journey_service';
import SummaryService from './services/summary_service';

const App = () => {
  const auth = useAuth();
  const firestore = useFirestore();

  const [appContext, setAppContext] = useState(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);
        const appContext = new AppContext(
          user.uid,
          new SettingsService(firestore),
          new JourneyService(firestore),
          new SummaryService(firestore)
        );
        setAppContext(appContext);
      } else {
        setSignedIn(false);
      }
    });
  }, [setAppContext, setSignedIn, firestore, auth]);

  if (!signedIn) {
    return <SignInScreen />;
  }

  if (!appContext) {
    return <span>loading...</span>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <BibleAppBar/>

      <Box component="main" sx={{ width: '100%' }}>
        <Toolbar />

        <Routes>
          <Route
            path="/settings"
            element={
              <SettingsPage appContext={appContext}/>
            }/>
          <Route
            path="/"
            element={
              <Home appContext={appContext}/>
            }/>
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
