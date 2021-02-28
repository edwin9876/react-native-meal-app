import * as React from "react";
import { FC } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	Dimensions,
} from "react-native";
import Meal from "../models/meal";

const MealItem: FC<Meal & { onSelectMeal?: () => void }> = ({
	imageUrl,
	title,
	duration,
	affordability,
	complexity,
	onSelectMeal,
}) => {
	return (
		<TouchableOpacity
			style={{
				backgroundColor: "white",
				height: 180,
				width: Dimensions.get("window").width * 0.9,
				marginTop: 15,
				alignItems: "center",
				justifyContent: "space-between",
				paddingTop: 10,
				paddingBottom: 20,
				paddingHorizontal: 10,
				borderRadius: 10,
			}}
			onPress={onSelectMeal}
		>
			<ImageBackground
				source={{ uri: imageUrl }}
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "flex-end",
					}}
				>
					<Text
						style={{
							fontFamily: "OpenSansBold",
							fontSize: 16,
							color: "white",
							backgroundColor: "rgba(0,0,0,0.7)",
							paddingHorizontal: 12,
							paddingVertical: 5,
							textAlign: "center",
						}}
					>
						{title}
					</Text>
				</View>
			</ImageBackground>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<Text>{`${duration}mins`.toUpperCase()}</Text>
				<Text>{complexity.toUpperCase()}</Text>
				<Text>{affordability.toUpperCase()}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default MealItem;

const styles = StyleSheet.create({
	container: {},
});
