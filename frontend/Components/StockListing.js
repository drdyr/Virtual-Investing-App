import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "../Styles"

const StockListing = ({name, abbrev, value, change, minutely, historical, navigation}) => {

    const determineStockValueStyle = () => {
        if (change < 0) {
            return styles.stockValueRed
        } else {
            return styles.stockValueGreen
        }
    }

    const determineStockChangeStyle = () => {
        if (change < 0) {
            return styles.stockChangeRed
        } else {
            return styles.stockChangeGreen
        }
    }
     const determineArrow = () => {
        if (change < 0) {
            return '▼'
        } else {
            return '▲'
        }
    }
        return (
            <TouchableOpacity
                style={styles.anotherButton}
                onPress={() => {
                    navigation.push('Stock', {
                        stockName: name,
                        stockAbbrev: abbrev,
                        stockPrice: value,
                        priceChange: change,
                        minutely: minutely,
                        historical: historical
                    });
                }}
            >
                <View style={styles.rowContainer}>
                    <View style={styles.stockNameContainer}>
                        <Text style={styles.stockAbbrev}>{abbrev}</Text>
                        <Text style={styles.stockName}>{name}</Text>
                    </View>
                    <View style={styles.stockNameContainer}>
                        <Text style={determineStockValueStyle()}>{value}</Text>
                        <Text style={determineStockChangeStyle()}>{determineArrow()} {change}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
}
export default StockListing;
