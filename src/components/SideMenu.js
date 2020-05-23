import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Avatar, Icon, Input, Button, List, ListItem } from 'react-native-elements';
import { persistor } from '../../src/configureStore';
import { logoutUser } from '../actions';
import { sharedStyles } from '../GlobalVariables';

const profilePhoto = require('../images/unknown.jpg');

class SideMenu extends Component {
    // constructor(props) {
    //     super(props);
    // }        

    onButtonPress() {
        //this.props.logoutUser(persistor);
        persistor.purge();
        Actions.reset('auth');
    }

    renderAvatar() {
        if (this.props.user.profile_pic) {
            return (
                <Avatar
                    size='medium'
                    rounded
                    source={{ uri: this.props.user.profile_pic }}
                    activeOpacity={0.7}
                />
            );
        }
        return (
            <Avatar
                size='medium'
                rounded
                source={profilePhoto}
                activeOpacity={0.7}
            />
        );
    }    

    renderRow({ item }) {
        return (
          <ListItem                 
            title={item.name}
            //subtitle={item.subtitle}
            leftIcon={{ name: item.icon, type: item.iconType }}        
            //leftAvatar={{ source: { uri: item.avatar_url } }}
            //leftAvatar={<Image source={require('../images/eattologo.png')} />}
          />
        );
      }

    render() {     
        const list = [
            {
              name: 'Account',
              avatar_url: 'https://s3-eu-west-1.amazonaws.com/tpd/logos/564c51cd0000ff000585a9d5/0x0.png',
              subtitle: 'Vice President',
              icon: 'account',
              iconType: 'material-community'
            },
            {
              name: 'History',
              avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              subtitle: 'Vice Chairman',
              icon: 'history',
              iconType: 'font-awesome'
            }
          ];
        
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }} >
                    {this.renderAvatar()}
                    <View style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
                        <Text>Hi, { this.props.user.user_name || this.props.user.email.split('@')[0]}</Text>
                    </View>                    
                </View>
                <View style={{ padding: 5, flex: 1 }}>               
                    <Text style={{ fontSize: 20, fontWeight: 'bold', borderBottomColor: 'lightgrey', borderBottomWidth: 1 }}>Profile</Text>
                    <FlatList
                        data={list}
                        renderItem={this.renderRow}
                        keyExtractor={item => item.name}
                    />
                </View> 
                <View><Text style={{ margin: 5, textAlign: 'center' }}>v 1.0</Text></View>
                <View>
                    <Button titleStyle={sharedStyles.basicButtonTitleStyle} buttonStyle={sharedStyles.basicButtonStyle} justifyContent='flex-end' onPress={this.onButtonPress.bind(this)} title='Logout' />
                </View>   
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        // backgroundColor: '#D8D7E9',
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 10,
    },

});

const mapStateToProps = state => {
    return {
        //username: state.auth.user.name,
        user: state.auth.user
    };
};

export default connect(mapStateToProps, { logoutUser })(SideMenu);