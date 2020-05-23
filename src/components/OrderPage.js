import React, { Component } from 'react';
import { FlatList, ListItem, ListView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import moment from 'moment';
import ExpanableList from 'react-native-expandable-section-flatlist';
import DatePicker from 'react-native-datepicker';
import { orderFetch } from '../actions';
import RedeemOrderListItem from './RedeemOrderListItem';
import TruckOrderListItem from './TruckOrderListItem';
import { Spinner } from './common';

class OrderPage extends Component {
    constructor(props) {
        super(props);        
        console.log('OrderPage constructor');
        console.log(this.props);
        this.state = { combinedOrder: null, orderByTrucks: null, seleted_date: moment(new Date()).format('YYYY-MM-DD') };
        this.props.orderFetch(this.state.seleted_date.replace(/-/g, ''));    
    }    

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

      _renderRow = (rowItem, rowId, sectionId) => (
          <View style={{ backgroundColor: '#cacaff', flexDirection: 'row' }}>
              <Text style={{ flex: 1 }}>
                {rowItem.name}
              </Text>
              <Text style={{ paddingRight: 5, color: 'blue' }}>{rowItem.quantity}</Text>
          </View>               
      );     

      _renderSection = (section, sectionId) => <Text style={{ backgroundColor: '#B2B2FF' }}>{section.truckname}</Text>;

renderOrderListByDate= (date) => {
    console.log(date);
    let trucksList;
    let combinedOrder;
    let menuitems;
    this.setState({ seleted_date: date }); 
    this.props.orderFetch(date.replace(/-/g, ''));
    console.log(this.props.items);    
};

renderFlatList() {  
    if (this.props.items && this.props.items.length > 0) {    
        return (<FlatList
            style={{ flex: 1 }}
            data={this.props.items}
            renderItem={this._renderItem}
        />);
    } else {
        return (<Text style={{ flex: 1 }}>No Orders Found...</Text>);
    }
}

renderExpanableFlatList() {
    console.log('RENDER EXPANDABLEFLATLIST');
    console.log(this.props.itemsByTruck);    
    if (this.props.itemsByTruck && this.props.itemsByTruck.length > 0) {
        return (
            <View style={{ flex: 1 }}>
                <Text>Trucks</Text>
                <ExpanableList                    
                    dataSource={this.props.itemsByTruck}
                    headerKey="truckInfo"
                    memberKey="items"
                    renderRow={this._renderRow}
                    renderSectionHeaderX={this._renderSection}
                    openOptions={[0]}
                />
            </View>);
    } else {
        return (<View style={{ flex: 1 }}><Text>Trucks</Text><Text>No Orders Found...</Text></View>);
    }
}

    render() {       
        console.log('render');
        console.log(this.props);        
        const TestData = [
            {
                title: '这里是组16',
                member: [
                    {
                        content: '组16--row1',
                    },
                ]
            },
            {
                title: '这里是组17',
                member: [
                    {
                        content: '组17--row1',
                    },
                ]
            }  
        ];
        if (this.props.loading) {
            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Spinner size='large' /></View>;
        } else if (this.props.items) {
            return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                <DatePicker
                    style={{ margin: 5, width: undefined }}
                    date={this.state.seleted_date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate={moment(new Date(), 'YYYY-MM-DD').add(1, 'days')}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => this.renderOrderListByDate(date)}
                />
                    <Text>Order Menu List</Text>
                    {/* <FlatList
                        data={this.props.items}
                        renderItem={this._renderItem}
                    /> */}
                    {/* <ExpanableList
                        dataSource={this.props.itemsByTruck}
                        headerKey="truckid"
                        memberKey="items"
                        renderRow={this._renderRow}
                        renderSectionHeaderX={this._renderSection}
                        openOptions={[0]}
                    /> */}
                    {this.renderFlatList()}
                    {this.renderExpanableFlatList()}                
                </View>
            );
        } else {
            return (<View><Text>No Order Found.</Text></View>);
        }        
    }
}

const mapStateToProps = state => {    
    console.log('Supplier Order page state');  
    console.log(state.supplier.ordered_items);
    const loggedInUser = state.auth.user; 
    
    const today = moment(new Date()).format('YYYYMMDD');
    let trucksList;
    let combinedOrder;
    let menuitems;
    if (state.supplier.ordered_items) {
        combinedOrder = {};  
        trucksList = {};              
        _.map(state.supplier.ordered_items, (val, orderid) => {
            let order = val;            
            if (order.trucker in trucksList) {                
                _.map(order.items, (val1, itemID) => {
                    if (itemID in trucksList[order.trucker].items) {
                        trucksList[order.trucker].items[itemID].quantity += val1.quantity;
                    } else {
                        trucksList[order.trucker].items[itemID] = { ...val1 };
                    }
                });
            } else {                
                let orderItem = order.items;
                trucksList[order.trucker] = { items: orderItem };
            }
        });    
        
        trucksList = _.map(trucksList, (val, key) => {
            return { ...val, truckInfo: state.supplier.truck_list[key] };
        });
        console.log('econsave');
        console.log(trucksList);
        for (let truck of trucksList) {
            const truckItems = truck.items;                      
            _.map(truckItems, (val, key) => {             
                if (key in combinedOrder) {
                    combinedOrder[key].quantity += val.quantity;
                } else {
                    combinedOrder[key] = { ...val };
                }
            });
            truck.items = _.map(truck.items, (val, uid) => {
                return { ...val, uid };
            });
        }
        
        combinedOrder = _.map(combinedOrder, (val, uid) => {
            return { ...val, uid };
        });
        menuitems = _.map(combinedOrder, (val, uid) => {
            return { ...val, uid };
        });
    }
    
    console.log(trucksList);    
    console.log(combinedOrder);
    //return { user: loggedInUser, loading: state.supplier.loading, truck_list: state.supplier.truck_list, items: state.supplier.ordered_items };
    return { user: loggedInUser, loading: state.supplier.loading, items: combinedOrder, itemsByTruck: trucksList };    
};

export default connect(mapStateToProps, { orderFetch })(OrderPage);