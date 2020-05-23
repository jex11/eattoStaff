import React, { Component } from 'react';
import { View, Text } from 'react-native';

class TruckPage extends Component {
    constructor(props) {
        super(props);        
        console.log(this.props);
    }    

    render() {        
        return (
            <View>
                <Text>Truck</Text>
            </View>
        );
    }
}

export default TruckPage;