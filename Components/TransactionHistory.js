import {Dimensions, Text, View} from "react-native";
import {ContributionGraph} from "react-native-chart-kit";
import React from "react";

const TransactionHistory = ({ navigation }) => {
    const tradeDates = [
        { date: "2020-06-01", count: 1 },
        { date: "2020-06-02", count: 2 },
        { date: "2020-06-05", count: 3 },
        { date: "2020-06-08", count: 4 },
        { date: "2020-06-09", count: 5 },
        { date: "2020-06-10", count: 2 },
        { date: "2020-06-15", count: 3 },
        { date: "2020-06-16", count: 2 },
        { date: "2020-06-23", count: 4 },
        { date: "2020-06-24", count: 2 },
        { date: "2020-06-26", count: 4 }
    ];
    return (
        <View>
            <Text>Trade activity last 100 Days</Text>
            <ContributionGraph
                values={tradeDates}
                endDate={new Date("2020-06-30")}
                numDays={100}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 100, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
            />
        </View>
    )
}
export default TransactionHistory;
