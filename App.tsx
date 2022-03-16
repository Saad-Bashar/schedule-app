import React from "react";
import { LogBox, StyleSheet } from "react-native";
import store from "./redux/store";
import { Provider } from "react-redux";
import RootNavigation from "./navigation";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import t from "./theme";
import FlashMessage from "react-native-flash-message";

LogBox.ignoreLogs(["Remote debugger", "VirtualizedLists should never be nested inside plain "]);

const persistor = persistStore(store);

export default function App() {
  const [loaded] = useFonts({
    "Spartan-Bold": require("./assets/fonts/Spartan-Bold.ttf"),
    "Spartan-Medium": require("./assets/fonts/Spartan-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={[t.flex1]}>
            <RootNavigation />
            <FlashMessage position="top" floating statusBarHeight={48} />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}

