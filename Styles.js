import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 'auto',
        width: '50%',
    },

    inputContainer: {
        margin: 5,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    textInput:{
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
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
        backgroundColor: '#004d43',
    },
    anotherButton:{
        alignSelf: "stretch",
        height: 100,
        justifyContent: "center",
        backgroundColor: '#004d43',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#018c7a",
    },
});
