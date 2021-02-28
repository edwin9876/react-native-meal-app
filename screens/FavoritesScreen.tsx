import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { View, Text, StyleSheet, ListRenderItem, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../App";
import MealItem from "../components/MealItem";
import Meal from "../models/meal";
import { RootStackParamList } from "../navigation/MealsNavigator";

type CategoryMealScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"CategoryMeal"
>;

type Props = {
	navigation: CategoryMealScreenNavigationProp;
	route: RouteProp<RootStackParamList, "CategoryMeal">;
};

const FavoritesScreen: FC<Props> = ({ navigation }) => {
	const favMeals = useSelector((state: RootState) => state.meals.favoriteMeals);
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
				keyExtractor={(item) => `fav-meals-${item.title}`}
				data={favMeals}
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

export default FavoritesScreen;
