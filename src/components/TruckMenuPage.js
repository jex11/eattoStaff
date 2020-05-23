import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { Input, Button } from 'react-native-elements';
import TruckMenuListItem from './TruckMenuListItem';
import { truckMenuFetch } from '../actions';
import { Spinner } from './common';
import { sharedStyles } from '../GlobalVariables';

class TruckMenuPage extends Component {
    constructor(props) {
        super(props);        
        console.log(this.props);
        this.props.truckMenuFetch();
    }    

    onButtonPress() {
        console.log('Added');
        console.log(this.props.suppliers);
        Actions.add_suppliers();
    }
    
    _renderItem = ({ item }) => (               
        // <MenuListItem item={item} />
        <TruckMenuListItem item={item} supplier={this.props.suppliers[item.supplier_id]} />
      );

    render() {
        if (this.props.loading) {
            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size='large' /></View>;
        }
        return (
            <View style={sharedStyles.mainPageStyle}>
                <FlatList 
                    style={{ flex: 1 }}
                    data={this.props.items}
                    renderItem={this._renderItem}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Button containerStyle={{ minWidth: 200 }} titleStyle={sharedStyles.basicButtonTitleStyle} buttonStyle={sharedStyles.basicButtonStyle} onPress={this.onButtonPress.bind(this)} title="Link" />
                </View>                
            </View>
        );
    }
}

const mapStateToProps = state => {
    console.log('Truck Menu Page state');    
    const loggedInUser = state.auth.user;
    console.log('test mapstateto props in truck menu');
    console.log(state.truck.suppliers);
    if (state.truck.suppliers) {
        let allItems = {};
        let allSuppliers = {};
        let res = [];
        const lstSupplier = _.map(state.truck.suppliers, (val, uid) => {
            let supplierItems = _.map(val.supplier_items, (val1, key1) => {
                return { ...val1, uid: key1 };
            });
            console.log('yoyo mtfk', supplierItems);
            res.push({ items: supplierItems, supplier_id: uid });
            return { ...val, uid };
        });                     
        console.log('This is TruckSupplier', state.truck.suppliers);             
        return { user: loggedInUser, loading: state.truck.loading, items: res, suppliers: state.truck.suppliers };
    }        
    return { user: loggedInUser, loading: state.truck.loading };
};


export default connect(mapStateToProps, { truckMenuFetch })(TruckMenuPage);