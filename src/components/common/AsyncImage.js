import React, { Component } from 'react';
import { ListView, Text, View, Image } from 'react-native';
import { Spinner } from './Spinner';

export class AsyncImage extends Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
      }

      onLoad = () => {
        this.setState(() => ({ loaded: true }));
      }

      render() {
        const { placeholderColor, style, source } = this.props;
        return (
            <View style={style}>
                <Image
                    source={source}
                    resizeMode={'contain'}
                    style={[style, { position: 'absolute', resizeMode: 'contain' }]}
                    onLoad={this.onLoad}
                />
                  {!this.state.loaded &&
                    // <View style={[style, { backgroundColor: placeholderColor, position: 'absolute' }]} />
                    <Spinner size='small' />
                  }              
                </View>
        );
      }
}