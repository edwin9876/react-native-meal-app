import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MealsFavNavigator from "./MealsFavNavigator";
import FiltersScreen from "../screens/FiltersScreen";
import FilterNavigator from "./FilterNavigator";
import { COLORS } from "../constants/Colors";

interface DrawerNavigatorProps {}

export type RootDrawerParamList = {
	MealsFavs: undefined;
	Filters: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator = (props: DrawerNavigatorProps) => {
	return (
		<Drawer.Navigator
			drawerContentOptions={{
				activeTintColor: COLORS.accentColor,
				activeBackgroundColor: "white",
				labelStyle: {
					fontFamily: "OpenSansBold",
				},
			}}
		>
			<Drawer.Screen
				name="MealsFavs"
				component={MealsFavNavigator}
				options={{ drawerLabel: "Meals" }}
			/>
			<Drawer.Screen name="Filters" component={FilterNavigator} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;

const styles = StyleSheet.create({
	container: {},
});
