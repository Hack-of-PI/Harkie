import React, { useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AppRoot from './src/Main'
import Loading from './src/screens/Loading'
import { persistor, store } from './src/config/store';

export default function App() {

  useEffect(() => {
    SplashScreen.hide()
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <AppRoot />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  )
}