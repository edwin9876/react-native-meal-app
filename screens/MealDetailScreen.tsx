import React, { FC, useLayoutEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/MealsNavigator";
import { RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App";
import { toggleFavourite } from "../store/actions/meals";
import Icon from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../constants/Colors";

type MealDetailScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"CategoryMeal"
>;

type Props = {
	navigation: MealDetailScreenNavigationProp;
	route: RouteProp<RootStackParamList, "MealDetail">;
};

const ListItem = (props: { key: string; children: string }) => {
	return (
		<View style={styles.listItem}>
			<Text>{props.children}</Text>
		</View>
	);
};

const MealDetailScreen: FC<Props> = ({ navigation, route }) => {
	const favMeals = useSelector((state: RootState) => state.meals.favoriteMeals);
	const meals = useSelector((state: RootState) => state.meals.meals);
	const meal =
		meals.find((meal) => meal.id === route.params.mealId) || meals[0];
	const [isFav, setIsFav] = React.useState(favMeals.includes(meal));

	useLayoutEffect(() => {
		setIsFav(
			favMeals.includes(
				meals.find((meal) => meal.id === route.params.mealId) || meals[0]
			)
		);
	}, [favMeals]);

	const selectedMeal = meals.find((meal) => meal.id === route.params.mealId);
	const dispatch = useDispatch();
	const toggleFav = (id: string) => {
		dispatch(toggleFavourite(id));
	};
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 10 }}
					onPress={() => {
						setIsFav(!isFav);
						toggleFav(route.params.mealId);
					}}
				>
					<Icon
						name={isFav ? "star" : "star-o"}
						size={24}
						color={COLORS.primaryDefault}
					/>
				</TouchableOpacity>
			),
		});
	}, [navigation, favMeals]);

	return (
		<ScrollView>
			<Image source={{ uri: selectedMeal!.imageUrl }} style={styles.image} />
			<View style={styles.details}>
				<Text>{selectedMeal!.duration}m</Text>
				<Text>{selectedMeal!.complexity.toUpperCase()}</Text>
				<Text>{selectedMeal!.affordability.toUpperCase()}</Text>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{selectedMeal!.ingredients.map((ingredient) => (
				<ListItem key={ingredient}>{ingredient}</ListItem>
			))}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal!.steps.map((step) => (
				<ListItem key={step}>{step}</ListItem>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: 200,
	},
	details: {
		flexDirection: "row",
		padding: 15,
		justifyContent: "space-around",
	},
	title: {
		fontFamily: "OpenSansBold",
		fontSize: 22,
		textAlign: "center",
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: "#ccc",
		borderWidth: 1,
		padding: 10,
	},
});

export default MealDetailScreen;
