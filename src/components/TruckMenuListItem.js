import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableOpacity, TouchableWithoutFeedback, View, TouchableHighlight } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AsyncImage } from './common';

class TruckMenuListItem extends Component {
    constructor(props) {
        super(props);        
        console.log('TruckMenuListItem');
        //this.state = { showModal: this.props.openModal };
    }   

    onRowPress(item) {
        console.log('row pressed');
        console.log(item);
        Actions.view_menu_items({ selecteditem: item });
        //Actions.employeeEdit({ employee: this.props.employee });
    }

    render() {        
        const supplier = this.props.item;
        const supplierInfo = this.props.supplier;
        console.log('TruckMenuListItem render');
        console.log(supplier);
        return (            
            <TouchableOpacity style={styles.button} onPress={() => this.onRowPress(supplier.items)}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    {/* <AsyncImage style={{ height: 100, width: 100 }} source={{ uri: 'https://s3-eu-west-1.amazonaws.com/tpd/logos/564c51cd0000ff000585a9d5/0x0.png' }} placeholderColor='red' /> */}
                    <View style={{ justifyContent: 'center' }}>
                        <Avatar size='medium' rounded source={{ uri: 'https://s3-eu-west-1.amazonaws.com/tpd/logos/564c51cd0000ff000585a9d5/0x0.png' }} />
                    </View>
                    <View style={{ marginLeft: 10, flexDirection: 'column', flex: 1 }}>
                        <Text style={styles.titleStyle}>
                            {supplierInfo.supplier_name}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon type='entypo' name='location' />
                            <Text>
                                AutoCity, Juru
                            </Text>
                        </View>                        
                        {/* <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={styles.priceTextStyle}>
                                {`RM ${item.price}`}
                            </Text>
                        </View> */}
                    </View>
                </View>
            </TouchableOpacity>          
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
    },
    button: {
        padding: 5,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 10, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 2, // Android
        // height: 50,
        // width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5
    },
};

// const mapStateToProps = state => {    
//     const menu = _.map(state.order, (val, uid) => {        
//         return { ...val, uid };
//     });

//     return { menu };
// };

export default connect(null, {})(TruckMenuListItem);