import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useCallback, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Switch,
	Platform,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { COLORS } from "../constants/Colors";
import { filterTypes } from "../data/dummy-data";
import { applyFilters } from "../store/actions/meals";

export type FilterRootStackParams = {
	filters: undefined;
};

type FilterScreenNavigationProp = StackNavigationProp<FilterRootStackParams>;

type Props = {
	navigation: FilterScreenNavigationProp;
};

const FiltersScreen: FC<Props> = ({ navigation }) => {
	const dispatch = useDispatch();
	const defaultArray = filterTypes.map((label) => ({
		[label]: false,
	}));

	const [switches, setSwitches] = useState<Array<{ [label: string]: boolean }>>(
		defaultArray
	);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 15 }}
					onPress={() => {
						dispatch(applyFilters(switches));
					}}
				>
					<Icon name="save" size={24} />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	const handleSwitches = (label: string, i: number) => {
		const sw = switches.map((s, ind) => {
			if (ind === i) {
				s[label] = !s[label];
				return s;
			}
			return s;
		});
		setSwitches(sw);
	};

	const renderSwitches = useCallback(
		() => (
			<>
				{switches.map((prop, i) => {
					const label = Object.keys(prop)[0];
					const value = Object.values(prop)[0];

					return (
						<View key={`switch-${label}`} style={styles.filterContainer}>
							<Text>{label}</Text>
							<Switch
								trackColor={{ true: COLORS.primaryDefault, false: "white" }}
								thumbColor={
									Platform.OS === "android" ? COLORS.primaryDefault : ""
								}
								value={value}
								onValueChange={() => handleSwitches(label, i)}
							/>
						</View>
					);
				})}
			</>
		),
		[switches]
	);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			{renderSwitches()}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
	},
	title: {
		fontFamily: "OpenSansBold",
		fontSize: 22,
		margin: 20,
		textAlign: "center",
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "80%",
		marginVertical: 15,
	},
});

export default FiltersScreen;
