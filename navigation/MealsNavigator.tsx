import {
	createStackNavigator,
	StackNavigationProp,
} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome5";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import { Platform } from "react-native";
import * as React from "react";
import { COLORS } from "../constants/Colors";
import Category from "../models/category";
import Meal from "../models/meal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite, ToggleFavouriteAction } from "../store/actions/meals";
import { RootState } from "../App";

export type RootStackParamList = {
	Categories: undefined;
	CategoryMeal: Category;
	MealDetail: { mealId: string; mealTitle: string };
};

type navigationProp = DrawerNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
const defaultBg = Platform.OS === "ios" ? "white" : COLORS.primaryDefault;
const defaultTint = Platform.OS === "ios" ? COLORS.primaryDefault : "white";
const defaultHeaderStyle = {
	headerStyle: {
		backgroundColor: defaultBg,
	},
	headerTintColor: defaultTint,
};

const MealsNavigator = () => {
	const navigation = useNavigation<navigationProp>();
	return (
		<Stack.Navigator initialRouteName="Categories">
			<Stack.Screen
				options={{
					...defaultHeaderStyle,
					title: "Meal Categories",
					headerLeft: () => (
						<TouchableOpacity
							style={{ marginLeft: 15 }}
							onPress={() => navigation.toggleDrawer()}
						>
							<Icon name="bars" size={24} />
						</TouchableOpacity>
					),
				}}
				name="Categories"
				component={CategoriesScreen}
			/>
			<Stack.Screen
				name="CategoryMeal"
				component={CategoryMealsScreen}
				options={({ route }) => ({
					...defaultHeaderStyle,
					title: route.params.title,
					headerLeft: () => (
						<TouchableOpacity
							style={{ marginLeft: 15 }}
							onPress={() => navigation.navigate("Categories")}
						>
							<Icon
								name="chevron-left"
								size={20}
								color={COLORS.primaryDefault}
							/>
						</TouchableOpacity>
					),
				})}
			/>
			<Stack.Screen
				name="MealDetail"
				component={MealDetailScreen}
				options={({ route }) => ({
					...defaultHeaderStyle,
					title: route.params.mealTitle,
				})}
			/>
		</Stack.Navigator>
	);
};

export default MealsNavigator;
