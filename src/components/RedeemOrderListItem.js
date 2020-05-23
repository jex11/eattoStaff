import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View } from 'react-native';

class RedeemOrderListItem extends Component {
    render() {
        console.log('Pls la pls...');     
        console.log(this.props);     
        const item = this.props.item;    
        const index = this.props.itemIndex;
        
        return (
            <View style={{ backgroundColor: index % 2 === 0 ? '#B2B2FF' : '', flexDirection: 'row' }}>
                <Text style={styles.titleStyle}>
                    {item.name}
                </Text>
                <Text style={{ paddingRight: 5, color: 'blue' }}>{item.quantity}</Text>
            </View>                                                                         
        );
    }
}

const styles = {
    titleStyle: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 5
    }
};

// const mapStateToProps = state => {        
//     return { order: state.verifyOrder.order };
// };

export default RedeemOrderListItem;