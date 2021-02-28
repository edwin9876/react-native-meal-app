import * as React from "react";
import { FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Category from "../models/category";

interface GridItemProps {
	onSelect: () => void;
	item: Category;
}

const GridItem: FC<GridItemProps> = ({ onSelect, item }) => {
	return (
		<TouchableOpacity style={styles.gridItem} onPress={onSelect}>
			<View
				style={{
					backgroundColor: item.color,
					flex: 1,
					borderRadius: 8,
					padding: 10,
					justifyContent: "flex-end",
					alignItems: "flex-end",
				}}
			>
				<Text
					style={{ color: "white", fontFamily: "OpenSansBold", fontSize: 24 }}
				>
					{item.title}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default GridItem;

const styles = StyleSheet.create({
	gridItem: {
		height: 150,
		flex: 1,
		margin: 15,
	},
});
