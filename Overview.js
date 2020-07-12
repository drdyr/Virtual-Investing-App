import React from 'react';
import {Header, SearchBar} from "react-native-elements";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    FlatList
} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {createStackNavigator} from "@react-navigation/stack";
import {
    LineChart,
    PieChart,
    ContributionGraph,
} from "react-native-chart-kit";


const Stack = createStackNavigator();



function Portfolio({ navigation }){
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

function TransactionHistory({ navigation }) {
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

export function Overview() { //Overview tab
    return (
        <Stack.Navigator>
            <Stack.Screen name="Overview" component={Portfolio} options = {{
                headerShown: false,
            }} />
            <Stack.Screen name="Transaction History" component={TransactionHistory} options = {{

            }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
    },
    buttonSmall:{
        alignSelf: "stretch",
        height: 50,
        justifyContent: "center",
        alignContent: 'center',
    },
    header:{
        height: 65,
        backgroundColor: '#393e42',
        flexDirection: 'row',
        alignItems: 'center',
    },
    touchableLabel:{
        textAlign: 'center',
        color: '#018c7a',
        fontSize: 18,
    },
    overviewContainer:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    portfolioValue: {
        fontSize: 18,
        color: 'white',
        textAlign:'center',
    },
    date: {
        fontSize: 18,
        color: 'white',
        textAlign:'left',
    },
    scrollView: {
        marginHorizontal: 20,
    },

})