import {Dimensions, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Header} from "react-native-elements";
import {MaterialIcons} from "@expo/vector-icons";
import {LineChart, PieChart} from "react-native-chart-kit";
import React from "react";
import {styles} from "../Styles"

export const Portfolio = ({ navigation }) => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + '.' + dd + '.' + yyyy;
    return (
        <View>
            <Header containerStyle={styles.header}>
                <View style={styles.overviewContainer} >
                    <Text style={styles.date} >{today}</Text>
                </View>
                <View style={styles.overviewContainer}>
                    <Text style={styles.portfolioValue} >£100000.00</Text>
                </View>
                <View style={styles.overviewContainer} >
                    <TouchableOpacity style={styles.buttonSmall} onPress={() => navigation.push('Transaction History')}>
                        <MaterialIcons name="history" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </Header>
            <ScrollView style={styles.scrollView}>
                <Text>Portfolio</Text>
                <PieChart
                    data={[
                        {
                            name: 'Stock1',
                            value: 9400,
                            color: 'rgba(131, 167, 234, 1)',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Stock2',
                            value: 800,
                            color: '#F00',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Stock3',
                            value: 4300,
                            color: '#ffffff',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Stock4',
                            value: 2000,
                            color: 'rgb(0, 0, 255)',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                    ]}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    accessor="value"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />

                <Text>Portfolio Value</Text>

                <LineChart
                    data={{
                        labels: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                        ],
                        datasets: [
                            {
                                data: [Math.floor((Math.random() * 15000) + 5000), Math.floor((Math.random() * 15000) + 5000), Math.floor((Math.random() * 15000) + 5000), Math.floor((Math.random() * 15000) + 5000), Math.floor((Math.random() * 15000) + 5000), Math.floor((Math.random() * 15000) + 5000)],
                                strokeWidth: 2,
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </ScrollView>
        </View>
    )
}
export default Portfolio;
