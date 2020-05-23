import React, { Component } from 'react';
import { Platform, PixelRatio, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Input, Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { menuItemNameChanged, menuItemDescChanged, menuItemPriceChanged, addNewItem } from '../actions';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

class AddMenuItemPage extends Component {
    constructor(props) {
        super(props);          
        this.state = { avatarSource: null };
        console.log('AddMenuItemPage');
        console.log(this.props);
    }    

    onMenuItemNameChanged(text) {
        this.props.menuItemNameChanged(text);
    }

    onMenuItemDescChanged(text) {
        this.props.menuItemDescChanged(text);
    }

    onMenuItemPriceChanged(text) {
        this.props.menuItemPriceChanged(text);
    }

    onButtonPress() {
        console.log('Create Menu Items');
        const obj = { ...this.props.newItem, itemImgSoruce: this.state.avatarSource };
        this.props.addNewItem(obj);
        // const uploadImageURi = { uri: this.state.avatarSource.path };
        // this.uploadImage(this.state.avatarSource)
        // .then(url => { 
        //     console.log('Juggernaut finally uploaded'); 
        //     this.setState({ image_uri: url });            
        //     const obj = { ...this.props.newItem, itemImg: url };
        //     this.props.addNewItem(obj);
        //     console.log(this.state.image_uri);
        // })
        // .catch(error => console.log(error));
    }

    // uploadImage(uri, mime = 'application/octet-stream') {
    //     console.log(uri);
    //     return new Promise((resolve, reject) => {
    //       const uploadUri = Platform.OS === 'ios' ? uri.path.toString().replace('file://', '') : uri.path;
    //       let uploadBlob = null;
    
    //       const imageRef = firebase.storage().ref(`images/${uri.fileName}`);
    
    //       fs.readFile(uploadUri, 'base64')
    //         .then((data) => {
    //             console.log(data);
    //           return Blob.build(data, { type: `${mime};BASE64` });
    //         })
    //         .then((blob) => {
    //           uploadBlob = blob;
    //           return imageRef.put(blob, { contentType: mime });
    //         })
    //         .then(() => {
    //           uploadBlob.close();
    //           return imageRef.getDownloadURL();
    //         })
    //         .then((url) => {
    //           resolve(url);
    //         })
    //         .catch((error) => {
    //           reject(error);
    //       });
    //     });
    //   }

    uploadImgButtonPress() {
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: 'Select Image',
            maxWidth: 1000,
            maxHeight: 1000,
            //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {                
                skipBackup: true,
                path: 'images',
            },
        };        

        /**
       * The first arg is the options object for customization (it can also be null or omitted for default options),
       * The second arg is the callback which sends object: response (more info in the API Reference)
       */    
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {                
                const source = { uri: response.uri, path: response.path, fileName: response.fileName };
                //const source = { uri: '/storage/sdcard0/Download/1080x1920-samsung-htc-lg-mobile-hd-wallpapers-4906y4bfe.jpg' };
                
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    render() {
        console.log(this.state.avatarSource);
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1 }}>
                    <Input placeholder='Name' onChangeText={this.onMenuItemNameChanged.bind(this)} value={this.props.newItem.itemName} />
                    <Input placeholder='Description' onChangeText={this.onMenuItemDescChanged.bind(this)} value={this.props.newItem.itemDesc} />
                    <Input placeholder='Price' onChangeText={this.onMenuItemPriceChanged.bind(this)} value={this.props.newItem.itemPrice} />
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={this.uploadImgButtonPress.bind(this)}>
                        <View
                            style={[
                                styles.avatar,
                                styles.avatarContainer,
                                { margin: 20 },
                            ]}
                        >
                            {this.state.avatarSource === null ? (
                                <Text>Select a Photo</Text>
                            ) : (
                                    <Image style={styles.avatar} source={this.state.avatarSource} />
                                )}
                        </View>
                    </TouchableOpacity>
                    {/* <CardSection>
                    <Input label="Name" hint="Happy Truck" value={this.props.truckname} onChangeText={this.onMenuItemNameChanged.bind(this)} />
                </CardSection>
                <CardSection>
                    <Input label="Description" hint="Butterworth" value={this.props.trucklocation} onChangeText={this.onMenuItemDescChanged.bind(this)} />
                </CardSection>
                <CardSection>
                    <Input label="Price" hint="555-5555-555" value={this.props.truckphone} onChangeText={this.onMenuItemPriceChanged.bind(this)} />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>Create</Button>                                        
                </CardSection> */}
                </View>
                <View>
                    <Button loading={this.props.loading} onPress={this.onButtonPress.bind(this)} title="Create" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      //borderRadius: 75,
      width: 150,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center'
    },
  });

const mapStateToProps = state => {
    const newItem = { itemName: state.supplier.name, itemDesc: state.supplier.desc, itemPrice: state.supplier.price };
    return {
        loading: state.supplier.loading,
        user: state.auth.user,
        newItem
    };
};

export default connect(mapStateToProps, { 
    menuItemNameChanged, menuItemDescChanged, menuItemPriceChanged, addNewItem
})(AddMenuItemPage);