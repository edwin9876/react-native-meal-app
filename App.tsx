import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import mealsReducer from "./store/reducers/meals";
import DrawerNavigator from "./navigation/DrawerNavigator";
import categoriesReducer from "./store/reducers/categories";

const rootReducer = combineReducers({
	meals: mealsReducer,
	categories: categoriesReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const fetchFonts = () => {
	return Font.loadAsync({
		OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
		OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
	});
};

export default function App() {
	const [AreFontsLoaded, setAreFontsLoaded] = useState<boolean>(false);

	if (!AreFontsLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setAreFontsLoaded(true)}
				onError={console.warn}
			/>
		);
	}
	return (
		<Provider store={store}>
			<NavigationContainer>
				<DrawerNavigator />
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
