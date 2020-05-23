import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { sharedStyles } from '../GlobalVariables';

export default class TabIcon extends Component {    
    render() {      
        const iconColor = this.props.selected ? sharedStyles.primaryColor : sharedStyles.secondaryColor;
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                <Icon color={iconColor} name={this.props.iconName || 'circle'} type={this.props.iconType || ''} size={30} />
                <Text style={{ color: iconColor, fontSize: 12 }}>{this.props.title}</Text>
            </View>
        );
    }
  }