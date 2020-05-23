import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import ProductListItem from './ProductListItem';

class ViewTruckMenuItemPage extends Component {
    constructor(props) {
        super(props);
        console.log('long road to go');
        console.log(this.props);
    }    

    onButtonPress() {
        console.log('button pressed');        
        //Actions.view_menu_items({ selecteditem: item });
        //Actions.employeeEdit({ employee: this.props.employee });
    }

    _renderItem = ({ item }) => (
        <ProductListItem item={item} />
        //   id={item.uid}
        //   onPressItem={this._onPressItem}
        //   selected={!!this.state.selected.get(item.id)}
        //   title={item.title}
        
      );

    render() {
        console.log('render bird');
        console.log(this.props.selecteditem);
        return (
            <View style={{ flex: 1 }}>
                <FlatList 
                    style={{ flex: 1 }}
                    data={this.props.selecteditem}
                    renderItem={this._renderItem}
                />                
                {/* <Button onPress={this.onButtonPress.bind(this)} title="Add" /> */}
            </View>
        );
    }
}

export default ViewTruckMenuItemPage;