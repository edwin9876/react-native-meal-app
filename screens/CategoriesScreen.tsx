import React, { FC } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	ListRenderItem,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/MealsNavigator";
import { CATEGORIES } from "../data/dummy-data";
import Category from "../models/category";
import GridItem from "../components/GridItem";

type CategoriesScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Categories"
>;

type Props = {
	navigation: CategoriesScreenNavigationProp;
};

const CategoriesScreen: FC<Props> = ({ navigation }) => {
	const renderGridItem: ListRenderItem<Category> = ({ item }) => {
		return (
			<GridItem
				item={item}
				onSelect={() => navigation.navigate("CategoryMeal", { ...item })}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			<FlatList
				keyExtractor={(item) => item.id}
				data={CATEGORIES}
				renderItem={renderGridItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CategoriesScreen;
