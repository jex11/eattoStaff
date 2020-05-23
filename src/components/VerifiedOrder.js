import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import _ from 'lodash';
import RedeemOrderListItem from './RedeemOrderListItem';
import { completeOrder } from '../actions';

class VerifiedOrder extends Component {
    constructor(props) {
        super(props);
        //this.state = { isLoaded: false };
        console.log('constructor');
        console.log(this.props);
        // if (!this.props.error && this.props.order !== null) {       
        //     this.createDataSource(this.props.order.doneOrder);
        // }        
    }  

    // componentWillReceiveProps(nextProps) {
    //     console.log('Order WillReceiveProps:');
    //     console.log(nextProps);
    //     if (!nextProps.error && nextProps.order !== null) {
    //         this.createDataSource(nextProps.order.doneOrder);
    //     }             
    // }    

    onRedeemPress() {
         console.log('Redeem lol');         
         console.log(this.props);
         this.props.completeOrder(this.props.order.orderID);
    }

    // createDataSource({ order }) {
    //     console.log(order);
    //     const ds = new ListView.DataSource({
    //         rowHasChanged: (r1, r2) => r1 !== r2
    //     });
        
    //     this.dataSource = ds.cloneWithRows(order);
    // }    
    
    _renderItem = ({ item, index }) => (
        <RedeemOrderListItem
            itemIndex={index}
            item={item}
        //   id={item.uid}
        //   onPressItem={this._onPressItem}
        //   selected={!!this.state.selected.get(item.id)}
        //   title={item.title}
        />
    );

    renderRedeemOrderList() {
        console.log('render Redeem Order List');
        console.log(this.props.order);
        if (this.props.order) {            
            return (
                <View>
                    <Text>{`Order ID: ${this.props.order.orderID}`}</Text>
                    <FlatList                         
                        data={_.map(this.props.order.doneOrder.items, (val, key) => { return { ...val, itemID: key }; })}
                        renderItem={this._renderItem}
                    />
                    <Button onPress={this.onRedeemPress.bind(this)} title="Verify" loading={this.props.loading} />
                </View>
            );
        }        
    }

    render() {
        if (this.props.error) {
            console.log(`QR: ${this.props.qrCode}`);
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );  
        }
        if (this.props.order === null) {
            return (<View />);
        }        
        return (
            <View>
                {this.renderRedeemOrderList()}                
            </View>
            // <Card>
            //     <CardSection>
            //         <Text>{`Order ID: ${this.props.order.orderID.split('/')[1]}`}</Text>
            //     </CardSection>
            //     <CardSection>
            //         <ListView
            //             enableEmptySections
            //             dataSource={this.dataSource}
            //             renderRow={this.renderRow}
            //         />
            //     </CardSection>
            //     <CardSection>
            //         <Button onPress={this.onRedeemPress.bind(this)}>Redeem</Button>
            //     </CardSection>
            // </Card>
        );      
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {
    console.log('state');
    console.log(state);
    const { order, loading, error } = state.verify;
    return { order, loading, error };
};

export default connect(mapStateToProps, { completeOrder })(VerifiedOrder);