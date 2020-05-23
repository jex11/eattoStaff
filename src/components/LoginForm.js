import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { emailChanged, passwordChanged, loginUser, signUpUser } from '../actions';
import { Spinner } from './common';

class LoginForm extends Component {
    onEmailChange(text) {
        this.props.emailChanged(text);
    }
    
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress(loginType) {
        const { email, password } = this.props;

        if (loginType === 2) {
            //GoogleSignin.configure();
        }
        this.props.loginUser({ email, password }, loginType);
    }

    onSingUpPress = () => {
        const { email, password } = this.props;
        this.props.signUpUser({ email, password });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    }

    renderButton() {
        // if (this.props.loading) {
        //     return <Spinner size='large' />;
        // }

        return (
            <View>
                <Button
                    type='outline'
                    titleStyle={{ color: 'white' }}
                    buttonStyle={{ borderColor: 'white' }}
                    containerStyle={{ margin: 5, marginTop: 50 }}
                    title="Login"
                    onPress={() => this.onButtonPress(0)}
                    loading={this.props.loading}
                />                
            </View>
        );
    }

    render() {
        return (
            <ImageBackground blurRadius={0.5} imageStyle={{ opacity: 0.8 }} source={{ uri: 'https://weeattogether.com/wp-content/uploads/2018/02/6-Amazing-Food-Photography-Tricks-You-Need-To-Know-Gobo-Pasta.jpg' }} style={{ width: '100%', height: '100%' }}>
                <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: 200, height: 200 }} source={require('../images/eattologo.png')} />
                </View>
                <View style={{ flex: 1 }}>
                    <View>
                        <Input containerStyle={{ margin: 5 }} inputContainerStyle={{ }} placeholder='Email' placeholderTextColor='white' inputStyle={{ color: 'white' }} onChangeText={this.onEmailChange.bind(this)} value={this.props.email} />
                    </View>
                    <View>
                        <Input containerStyle={{ margin: 5 }} inputContainerStyle={{ }} placeholderTextColor='white' inputStyle={{ color: 'white' }} secureTextEntry placeholder='Password' onChangeText={this.onPasswordChange.bind(this)} value={this.props.password} />
                    </View>
                    {this.renderError()}
                    <View>{this.renderButton()}</View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({   
    overlay: {
        backgroundColor: 'rgba(255,0,0,0.5)',
        flex: 1
    },
    // avatarStyle: {
    //     width: 100,
    //     height: 100,
    //     marginTop: 10,
    //     borderRadius: 50,
    //     alignSelf: 'center',
    // },
    // textStyle: {
    //     marginTop: 10,
    //     fontSize: 18,
    //     color: '#FFFFFF',
    //     fontWeight: 'bold',
    //     alignSelf: 'center',
    // },
    // balanceContainer: {
    //     padding: 10,
    // },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading
    };
};

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser, signUpUser
})(LoginForm);