import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MealsNavigator from "./MealsNavigator";
import FavoritesScreen from "../screens/FavoritesScreen";
import { COLORS } from "../constants/Colors";
import MIcon from "react-native-vector-icons/MaterialIcons";
import FavoritesNavigator from "./FavoritesNavigator";

interface MealsFavNavigatorProps {}

export type RootTabParamList = {
	Favorites: undefined;
	Meals: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const MealsFavNavigator = (props: MealsFavNavigatorProps) => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconName;
					switch (route.name) {
						default:
						case "Meals":
							iconName = "set-meal";
							break;

						case "Favorites":
							iconName = "star";
					}
					return (
						<MIcon
							name={iconName}
							size={24}
							color={focused ? COLORS.accentColor : "gray"}
						/>
					);
				},
			})}
			tabBarOptions={{
				activeTintColor: COLORS.accentColor,
				inactiveTintColor: "gray",
			}}
		>
			<Tab.Screen
				name="Meals"
				component={MealsNavigator}
				options={{ tabBarLabel: "Meals:)" }}
			/>
			<Tab.Screen name="Favorites" component={FavoritesNavigator} />
		</Tab.Navigator>
	);
};

export default MealsFavNavigator;

const styles = StyleSheet.create({
	container: {},
});
