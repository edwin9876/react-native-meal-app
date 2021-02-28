import React, { FC } from "react";
import {
	View,
	Text,
	StyleSheet,
	ListRenderItem,
	Dimensions,
	ImageBackground,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/MealsNavigator";
import { RouteProp } from "@react-navigation/native";

import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Meal from "../models/meal";
import Category from "../models/category";
import MealItem from "../components/MealItem";
import { connect, DefaultRootState, RootStateOrAny } from "react-redux";
import { RootState } from "../App";
import { useSelector } from "react-redux";

type CategoryMealScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"CategoryMeal"
>;

type Props = {
	navigation: CategoryMealScreenNavigationProp;
	route: RouteProp<RootStackParamList, "CategoryMeal">;
};

const CategoryMealScreen: FC<Props> = ({ route, navigation }) => {
	const cId = route.params.id;
	const { meals, categories } = useSelector((state: RootState) => state);

	const selectedCategory = categories.categories.find((cat) => cat.id === cId);
	const categoryMeals: Meal[] = meals.filteredMeals.filter((meal) => {
		if (meal.categoryIds.includes(selectedCategory!.id)) return meal;
	});

	const renderItem: ListRenderItem<Meal> = ({ item }) => {
		return (
			<MealItem
				{...item}
				onSelectMeal={() =>
					navigation.navigate("MealDetail", {
						mealId: item.id,
						mealTitle: item.title,
					})
				}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			<FlatList
				keyExtractor={(item) => `category-meals-${item.title}`}
				data={categoryMeals}
				renderItem={renderItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CategoryMealScreen;
