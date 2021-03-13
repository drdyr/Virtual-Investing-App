import React, {useState} from "react";
import {Dimensions, ScrollView, Text, TouchableOpacity} from "react-native";
import {styles} from "../Styles";
import {MaterialIcons} from "@expo/vector-icons";
import {LineChart} from "react-native-chart-kit";

const Stock = ({ route, navigation }) => {
    const [buyCount, setCount] = useState(0);

    const { stockName } = route.params;
    const { stockAbbrev } = route.params;
    const { stockPrice } = route.params;
    const { priceChange } = route.params;
    const { minutely } = route.params;
    const { historical } = route.params;

    function decreaseCount () {
        if (buyCount !== 0) {
            setCount(buyCount - 1)
        }
    }

    function minutesToHours(mins) {
        if (mins === 0) {
            return "8:00"
        }
        let tmins = mins/60
        if (Number.isInteger(tmins)) {
            return (tmins+8) + ":00"
        } else {
            return (Math.floor(tmins)+8) + ":30"
        }

    }


    navigation.setOptions({headerTitle: stockName})
    return(
        <ScrollView style={styles.containerDark}>

            <Text style={styles.stockAbbrev}>{ stockAbbrev }</Text>
            <Text style={styles.stockName}>{ stockName }</Text>
            <Text style={styles.stockName}>{ stockPrice }</Text>
            <Text style={styles.stockName}>{ priceChange }</Text>

            <TouchableOpacity style={styles.stockButton} onPress={() => {setCount(buyCount + 1)}}>
                <MaterialIcons name="add" size={100} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stockButton} onPress={() => {decreaseCount()}}>
                <MaterialIcons name="remove" size={100} color='white'/>
            </TouchableOpacity>
            <Text style={styles.stockName}> {buyCount} </Text>
            <Text>Stock Minutely Value Today</Text>
            {/*<LineChart
                data={{
                    labels: Array.from(Array(17), (_, i) => i*30),
                    datasets: [
                        {
                            data: minutely,
                            strokeWidth: 2,
                        },
                    ],
                }}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
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
                withOuterLines= {false}
                withInnerLines= {false}
                withDots= {false}
                formatXLabel = {minutesToHours}
                yAxisLabel = "£"
            />*/}
            <Text>Stock Daily Value Last 365 Days</Text>
            {/*<LineChart
                data={{
                    labels: Array.from(Array(73), (_, i) => i*5),
                    datasets: [
                        {
                            data: historical,
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
            />*/}
        </ScrollView>
    );
}
export default Stock;
