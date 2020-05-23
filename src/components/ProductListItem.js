import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableWithoutFeedback, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AsyncImage } from './common';

class ProductListItem extends Component {
    constructor(props) {
        super(props);        
        console.log('ProductListItem');
        console.log(props);
        //this.state = { showModal: this.props.openModal };
    }   

    render() {        
        const item = this.props.item;
        console.log('ProductListItem render');
        console.log(item);
        return (            
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <AsyncImage style={{ height: 100, width: 100 }} source={{ uri: item.img }} placeholderColor='red' />
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <Text style={styles.titleStyle}>
                        {item.name}
                    </Text>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={styles.priceTextStyle}>
                            {`RM ${item.price}`}
                        </Text>
                    </View>
                </View>
            </View>       
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18, 
        flex: 1,
        margin: 5,
        fontWeight: 'bold'
    },
    priceTextStyle: {
        fontSize: 18,
        flex: 1,
        margin: 5
    }
};

// const mapStateToProps = state => {    
//     const menu = _.map(state.order, (val, uid) => {        
//         return { ...val, uid };
//     });

//     return { menu };
// };

export default connect(null, {})(ProductListItem);