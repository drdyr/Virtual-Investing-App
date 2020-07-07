import React, { useState } from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {SearchBar} from "react-native-elements";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";


const Stack = createStackNavigator();

class StockListing extends React.Component {

    determineStockValueStyle () {
        if (this.props.change < 0) {
            return styles.stockValueRed
        } else {
            return styles.stockValueGreen
        }
    }

    determineStockChangeStyle () {
        if (this.props.change < 0) {
            return styles.stockChangeRed
        } else {
            return styles.stockChangeGreen
        }
    }
    determineArrow () {
        if (this.props.change < 0) {
            return '▼'
        } else {
            return '▲'
        }
    }
    render () {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    this.props.navigation.navigation.push('Stock', {
                        stockName: this.props.name,
                        stockAbbrev: this.props.abbrev,
                        stockPrice: this.props.value,
                        priceChange:this.props.change,
                    });
                }}
            >
                <View style={styles.rowContainer}>
                    <View style={styles.stockNameContainer}>
                        <Text style={styles.stockAbbrev}>{this.props.abbrev}</Text>
                        <Text style={styles.stockName}>{this.props.name}</Text>
                    </View>
                    <View style={styles.stockNameContainer}>
                        <Text style={this.determineStockValueStyle()}>{this.props.value}</Text>
                        <Text style={this.determineStockChangeStyle()}>{this.determineArrow()} {this.props.change}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class FetchStocks extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true, searchTerm: ""}
        setInterval(this.fetchStockListings, 60000);
    }
    componentDidMount(){
        this.fetchStockListings()
    }

    fetchStockListings = () => {
        fetch('http://localhost:5000/stocks/getall')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){
                });
                this.filterArray(this.state.searchTerm)
            })
            .catch((error) =>{
                console.error(error);
            });
    };

    filterArray = (text) => {
        const search = text
        const searchedStocks = [];
        for (const key in this.state.dataSource) {
            if (this.state.dataSource.hasOwnProperty(key)) {
                if (this.state.dataSource[key].name.toLowerCase().includes(search.toLowerCase())) {
                    searchedStocks.push(this.state.dataSource[key])
                }
            }
        }
        this.setState({searchedStocks: searchedStocks})
    }

    updateSearchTerm = (text) => {
        this.setState({
            searchTerm: text,
        })
        this.filterArray(text)
    };

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, marginTop: 10}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <View style={{flex: 1}}>
                <SearchBar
                    round={true}

                    searchIcon={null}
                    placeholder="Search"
                    onChangeText={text => this.updateSearchTerm(text)}
                    value={this.state.searchTerm}
                />
                <FlatList
                    data={this.state.searchedStocks}
                    renderItem={({item}) => <StockListing abbrev={item.abbrev} name={item.name} value={item.value} change={item.change} navigation={this.props.navigation}/>}
                    keyExtractor={({postID}) => postID}
                />
            </View>
        );
    }
}

function Stock({ route, navigation }) {
    const [buyCount, setCount] = useState(0);

    const { stockName } = route.params;
    const { stockAbbrev } = route.params;
    const { stockPrice } = route.params;
    const { priceChange } = route.params;

    function decreaseCount () {
        if (buyCount !== 0) {
            setCount(buyCount - 1)
        }
    }
    function increaseCount () {
        setCount(buyCount + 1)
    }
    navigation.setOptions({headerTitle: stockName})
    console.log(route.params)
    return(
        <View style={styles.containerDark}>

            <Text style={styles.stockAbbrev}>{ stockAbbrev }</Text>
            <Text style={styles.stockName}>{ stockName }</Text>
            <Text style={styles.stockName}>{ stockPrice }</Text>
            <Text style={styles.stockName}>{ priceChange }</Text>

            <TouchableOpacity style={styles.stockButton} onPress={() => {increaseCount()}}>
                <MaterialIcons name="add" size={100} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stockButton} onPress={() => {decreaseCount()}}>
                <MaterialIcons name="remove" size={100} color='white'/>
            </TouchableOpacity>
            <Text style={styles.stockName}> {buyCount} </Text>

        </View>
    );
}

function GetStocks (navigation) {
    return (
        <FetchStocks navigation={navigation}/>
    )
}

export function Stocks() { //Stocks tab
    return (

        <Stack.Navigator>
            <Stack.Screen name="Home" component={GetStocks} options={{ //Home stack shows the stocks list
                headerShown: false,
            }} />
            <Stack.Screen name="Stock" component={Stock} options={{ //Each stock has a page that goes on top of the stack
                headerTitle: '',
                headerStyle: {
                    backgroundColor: '#393e42',
                },
                headerTintColor: 'white',
            }} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    stockValueRed:{
        textAlign: 'right',
        fontSize: 48,
        paddingRight: 10,
        color: 'red',
    },
    stockValueGreen:{
        textAlign: 'right',
        fontSize: 48,
        paddingRight: 10,
        color: 'green',
    },
    stockChangeRed:{
        textAlign: 'right',
        fontSize: 16,
        paddingRight: 10,
        color: 'red',
    },
    stockChangeGreen:{
        textAlign: 'right',
        fontSize: 16,
        paddingRight: 10,
        color: 'green',
    },
    stockButton: {
        backgroundColor: '#393e42',
        height: 100,
        width: 100,
    },
    stockNameContainer:{
        flex: 3,
        margin: 10,
        flexDirection: 'column',
    },
    stockValueContainer:{
        flex: 1,
        margin: 10,
        textAlignVertical: 'center',
        flexDirection: 'column',
    },
    stockAbbrev: {
        color: 'white',
        fontSize: 48,
        paddingLeft: 10,
    },
    stockName:{
        color: "white",
        fontSize: 14,
        paddingLeft: 10,
    },
    stocksContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    rowContainer:{
        flex: 1,
        flexDirection: 'row',
    },
    containerDark: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        backgroundColor: '#004d43',
    },
    button:{
        alignSelf: "stretch",
        height: 100,
        justifyContent: "center",
        backgroundColor: '#004d43',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#018c7a",
    },
})