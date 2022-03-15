import React from "react";
import { StyleSheet } from "react-native";
import store from "./redux/store";
import { Provider } from "react-redux";
import RootNavigation from "./navigation";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useFonts } from "expo-font";

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
          <RootNavigation />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
