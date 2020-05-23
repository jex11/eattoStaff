import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';
import { verifyOrder } from '../actions';
import { Spinner } from './common';

class QRScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    console.log('state lai');
    console.log(this.props);
    console.log(this.state);    
    // if (this.props.error) {
    //   this.refs.toast.show(`${this.props.error} ${this.props.qrCode}`, DURATION.LENGTH_SHORT);
    // }
  }

  componentDidUpdate() {
    console.log('pls show if gt error');
    console.log(this.props);        
    if (this.props.error) {       
      Toast.show(`${this.props.error} ${this.props.qrCode}`, {
        duration: 1000,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
        // onHidden: () => {
        //   this.scanner.reactivate();
        // }
      });
    }
    //setTimeout(() => this.scanner.reactivate(), 2000);
  }
  
  onSuccess(e) {    
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
    console.log(e.data);
    this.props.verifyOrder(e.data);
  }  

  renderBottomContent() {
      if (this.props.loading) {
        return <Spinner size='large' />; 
      }        
  }

  render() {
    console.log('render gogogo');
    console.log(this.props);     
    return (      
      <QRCodeScanner
        ref={(node) => { this.scanner = node; }}
        onRead={(e) => { this.onSuccess(e); }}
        reactivate
        reactivateTimeout={2000}
      // topContent={
      //   <Text style={styles.centerText}>
      //     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
      //   </Text>
      // }
      bottomContent={this.renderBottomContent()}
      />
    );
  }
}

const mapStateToProps = state => {
  console.log('QRScanner');
  console.log(state);
  return {
    user: state.auth.user,
    qrCode: state.verify.qrCode,
    error: state.verify.error, 
    loading: state.verify.loading
  };
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});


export default connect(mapStateToProps, { verifyOrder })(QRScanner);
