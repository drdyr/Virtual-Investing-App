import React, {useState, useEffect} from "react";
import {ActivityIndicator, FlatList, View} from "react-native";
import {SearchBar} from "react-native-elements";
import StockListing from "./StockListing";

const ListStocks = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedStocks, setSearchedStocks] = useState([]);
    const [dataSource, setDataSource] = useState("");

    // set timeout on fetchstockslisting

    useEffect(() => {
        // Update the document title using the browser API
        fetchStockListings()
    }, []);

    const fetchStockListings = () => {
        fetch('http://localhost:5000/stocks/getall')
            .then((response) => response.json())
            .then((responseJson) => {
                setIsLoading(false);
                setDataSource(responseJson);
                setSearchedStocks(responseJson);
            });
    };

    const filterArray = (text) => {
        const search = text
        const searchedStocksList = [];
        for (const key in dataSource) {
            if (dataSource.hasOwnProperty(key)) {
                if (dataSource[key].name.toLowerCase().includes(search.toLowerCase())) {
                    searchedStocksList.push(dataSource[key])
                }
            }
        }
        setSearchedStocks(searchedStocksList);
    }

    const updateSearchTerm = (text) => {
        setSearchTerm(text);
        filterArray(text)
    };

    if(isLoading){
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
                onChangeText={text => updateSearchTerm(text)}
                value={searchTerm}
            />
            <FlatList
                data={searchedStocks}
                renderItem={({item}) => <StockListing abbrev={item.abbrev} name={item.name} value={item.value} change={item.change} minutely={item.minutely} historical={item.historical} navigation={navigation}/>}
                keyExtractor={({postID}) => postID}
                showsHorizontalScrollIndicator={false}

            />
        </View>
        );
}
export default ListStocks
