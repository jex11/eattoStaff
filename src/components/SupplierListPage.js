import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

class SupplierListPage extends Component {          
    constructor(props) {
        super(props);        
        console.log(this.props);        
    }

    state = {
        search: '',
      };

      updateSearch = search => {
        this.setState({ search });
      };

    render() {      
        const { search } = this.state;

        return (
            <View>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}                    
                    round
                    
                />
                <Text>Supplier List Page</Text>
            </View>
        );
    }
}

export default SupplierListPage;