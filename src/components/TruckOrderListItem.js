import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';
import { CardSection } from './common';

class TruckOrderListItem extends Component {
    render() {
        console.log('Truck Order List Item');     
        console.log(this.props);     
        const item = this.props.item;    
        
        return (
            <View>
                <CardSection>
                    <Text style={styles.titleStyle}>
                        {item.truckid}
                    </Text>
                    {/* <Text style={{ color: 'blue' }}>{item.quantity}</Text> */}
                </CardSection>
            </View>                                                  
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

// const mapStateToProps = state => {        
//     return { order: state.verifyOrder.order };
// };

export default TruckOrderListItem;