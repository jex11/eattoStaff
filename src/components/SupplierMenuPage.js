import React, { Component } from 'react';
import { FlatList, ListItem, ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { Input, Button } from 'react-native-elements';
import MenuListItem from './MenuListItem';
import { menuFetch } from '../actions';
import { Spinner } from './common';

class SupplierMenuPage extends Component {
    constructor(props) {
        super(props);
        this.props.menuFetch();
    }

    onButtonPress() {
        console.log('Added');
        Actions.add_menu_items();
    }
    
    _renderItem = ({ item }) => (
        <MenuListItem item={item} />
        //   id={item.uid}
        //   onPressItem={this._onPressItem}
        //   selected={!!this.state.selected.get(item.id)}
        //   title={item.title}
        
      );

    renderMenuList() {
        if (this.props.items.length > 0) {
            return (<FlatList 
                style={{ flex: 1 }}
                data={this.props.items}
                renderItem={this._renderItem}
            />);
        } else {
            return (<Text style={{ flex: 1 }}>You have no item yet. Please click "Add" button below to add new item.</Text>);
        }
    }

    render() {  
        if (this.props.loading) {
            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size='large' /></View>;
        }   
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                {this.renderMenuList()}
                <Button onPress={this.onButtonPress.bind(this)} title="Add" />
            </View>
        );
    }
}

const mapStateToProps = state => {
    console.log('Supplier Menu Page state');
    console.log(state);
    const loggedInUser = state.auth.user;
    console.log('test mapstateto props in supplier menu');
    const menuitems = _.map(state.supplier.items, (val, uid) => {
        return { ...val, uid };
    });
    return { user: loggedInUser, loading: state.supplier.loading, items: menuitems };
};

export default connect(mapStateToProps, { menuFetch })(SupplierMenuPage);