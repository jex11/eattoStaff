import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableWithoutFeedback, View, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AsyncImage } from './common';

class MenuListItem extends Component {
    constructor(props) {
        super(props);        
        console.log('MenuListItem');
        //this.state = { showModal: this.props.openModal };
    }   

    onRowPress(item) {
        console.log('row pressed');
        console.log(item);
        Actions.edit_menu_items({ selecteditem: item });
        //Actions.employeeEdit({ employee: this.props.employee });
    }

    render() {        
        const item = this.props.item;
        console.log('MenuListItem render');
        console.log(item);
        return (            
            <TouchableHighlight onPress={() => this.onRowPress(item)}>
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
            </TouchableHighlight>          
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

export default connect(null, {})(MenuListItem);