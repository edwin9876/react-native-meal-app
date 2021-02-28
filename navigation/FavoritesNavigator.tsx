import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import FavoritesScreen from "../screens/FavoritesScreen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "./MealsNavigator";
import { useSelector } from "react-redux";
import { RootState } from "../App";

interface FavoritesNavigatorProps {}

type Props = {
	navigation: DrawerNavigationProp<RootStackParamList>;
};

const Stack = createStackNavigator();

const FavoritesNavigator = (props: FavoritesNavigatorProps) => {
	const favoriteMeals = useSelector<RootState>(
		(state) => state.meals.favoriteMeals
	);
	return (
		<Stack.Navigator
			screenOptions={({ navigation }: Props) => ({
				headerLeft: () => (
					<TouchableOpacity
						style={{ marginLeft: 15 }}
						onPress={() => navigation.toggleDrawer()}
					>
						<Icon name="bars" size={24} />
					</TouchableOpacity>
				),
			})}
		>
			<Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
		</Stack.Navigator>
	);
};

export default FavoritesNavigator;

const styles = StyleSheet.create({
	container: {},
});
