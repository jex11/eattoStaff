import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';

class EditMenuItemPage extends Component {
    constructor(props) {
        super(props);        
        console.log(this.props);
    }    

    onButtonPress() {
        console.log('Updated');
    }

    render() {        
        const selectedItem = this.props.selecteditem;
        console.log(selectedItem);
        return (
            <View>
                <Input placeholder='Name' value={selectedItem.name} />
                <Input placeholder='Description' value={selectedItem.desc} />
                <Input placeholder='Price' value={selectedItem.price.toString()} />
                <Button onPress={this.onButtonPress.bind(this)} title="Update" />
                {/* <CardSection>
                    <Input label="Name" hint="Garlic Fried Rice" value={selectedItem.name} />
                </CardSection>
                <CardSection>
                    <Input label="Description" hint="Garlic with some spice" value={selectedItem.desc} />
                </CardSection>
                <CardSection>
                    <Input label="Price" hint="3.20" value={selectedItem.price.toString()} />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>Update</Button>                                        
                </CardSection>        */}
            </View>
        );
    }
}

export default EditMenuItemPage;