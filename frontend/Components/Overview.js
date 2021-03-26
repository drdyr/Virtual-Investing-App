import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Portfolio from "./Portfolio"

import TransactionHistory from "./TransactionHistory"


const Stack = createStackNavigator();

export const Overview = () => {
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
export default Overview;

