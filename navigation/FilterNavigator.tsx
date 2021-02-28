import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import FiltersScreen from "../screens/FiltersScreen";
import { RootStackParamList } from "./MealsNavigator";

interface FilterNavigatorProps {}

const Stack = createStackNavigator();

const FilterNavigator = (props: FilterNavigatorProps) => {
	return (
		<Stack.Navigator
			screenOptions={({ navigation }) => ({
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
			<Stack.Screen name="Filters" component={FiltersScreen} />
		</Stack.Navigator>
	);
};

export default FilterNavigator;

const styles = StyleSheet.create({
	container: {},
});
