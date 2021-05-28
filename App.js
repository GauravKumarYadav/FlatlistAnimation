import React, { useRef } from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import faker from 'faker'


faker.seed(10);
const DATA = [...Array(32).keys()].map((_, i) => {
	return {
		key: faker.datatype.uuid(),
		image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(60)}.jpg`,
		name: faker.name.findName(),
		jobTitle: faker.name.jobTitle(),
		email: faker.internet.email(),
	};
});

const BG_IMAGE = 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'

const ITEM_SIZE = wp('14%') + wp('5%') * 3;

export default () => {
	const scrollY = useRef(new Animated.Value(0)).current;
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<StatusBar hidden />
			<Image
				style={StyleSheet.absoluteFillObject}
				source={{ uri: BG_IMAGE }}
				blurRadius={80}
			/>
			<Animated.FlatList
				data={DATA}
				keyExtractor={item => item.key}
				contentContainerStyle={{ padding: wp('5%'), paddingTop: StatusBar.currentHeight || 50 }}
				onScroll={
					Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: true }
					)
				}
				renderItem={({ item, index }) => {

					const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
					const opacityRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + .5)];
					const scale = scrollY.interpolate({
						inputRange: inputRange,
						outputRange: [1, 1, 1, 0]
					});
					const opacity = scrollY.interpolate({
						inputRange: opacityRange,
						outputRange: [1, 1, 1, 0]
					});


					return (
						<Animated.View
							style={[styles.itemCard, { transform: [{ scale }], opacity: opacity, }]}
						>
							<Image
								source={{ uri: item.image }}
								style={{ width: wp('14%'), height: wp('14'), borderRadius: wp('14%'), marginRight: wp('5%') / 2 }}
							/>
							<View style={{}} >
								<Text style={{ fontSize: 22, fontWeight: '700' }}>{item.name}</Text>
								<Text style={{ fontSize: 16, opacity: .7 }} >{item.jobTitle}</Text>
								<Text style={{ fontSize: 14, color: '#0099cc', opacity: .8 }} >{item.email}</Text>
							</View>
						</Animated.View>
					);
				}}
			/>

		</View>
	);
}

const styles = StyleSheet.create({
	itemCard: { flexDirection: 'row', padding: wp('5%'), marginBottom: wp('5%'), backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: wp('5%'), }
})