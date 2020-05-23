import React, { Component } from 'react';
import { Alert, BackHandler, View, Text, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { truckNameChanged, truckLocationChanged, truckPhoneChanged, truckCreate } from '../actions';
import { sharedStyles } from '../GlobalVariables';

class HomePage extends Component {
    onTruckNameChanged(text) {
        this.props.truckNameChanged(text);
    }

    onTruckLocationChanged(text) {
        this.props.truckLocationChanged(text);
    }

    onTruckPhoneChanged(text) {
        this.props.truckPhoneChanged(text);
    }

    onButtonPress() {
        const { truckname, trucklocation, truckphone } = this.props;

        this.props.truckCreate({ truckname, trucklocation, truckphone });
    }

    render() {    
        console.log('this is truck dashboard la.');
        return (
            <View style={sharedStyles.mainPageStyle}>
                <Text>Truck board</Text>                
                {/* <CardSection>
                    <Input label="Name" hint="Happy Truck" value={this.props.truckname} onChangeText={this.onTruckNameChanged.bind(this)} />
                </CardSection>
                <CardSection>
                    <Input label="Location" hint="Butterworth" value={this.props.trucklocation} onChangeText={this.onTruckLocationChanged.bind(this)} />
                </CardSection>
                <CardSection>
                    <Input label="Phone" hint="555-5555-555" value={this.props.truckphone} onChangeText={this.onTruckPhoneChanged.bind(this)} />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>Create</Button>                                        
                </CardSection>                */}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        truckname: state.truck.truckname,
        trucklocation: state.truck.trucklocation,
        truckphone: state.truck.truckphone
        //user: state.auth.user
    };
};

export default connect(mapStateToProps, { 
    truckNameChanged, truckLocationChanged, truckPhoneChanged, truckCreate
})(HomePage);