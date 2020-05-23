import React, { Component } from 'react';
import { View, Text } from 'react-native';

class FoodPage extends Component {
    
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            <View><Text>Food</Text></View>
        );
    }
}

export default FoodPage;