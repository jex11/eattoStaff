import React, { Component } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ExpanableList from 'react-native-expandable-section-flatlist';
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons';
import DatePicker from 'react-native-datepicker';
import _ from 'lodash';
import moment from 'moment';
import { truckOrderFetch } from '../actions';
import { sharedStyles } from '../GlobalVariables';

class TruckOrderPage extends Component {
    constructor(props) {
        super(props);        
        console.log('OrderPage constructor');
        console.log(this.props);        
        this.state = { selectedOption: 'Supplier', seleted_date: moment(new Date()).format('YYYY-MM-DD') };
        this.props.truckOrderFetch(this.state.seleted_date.replace(/-/g, ''));    
    }    

    _renderRow = (rowItem, rowId, sectionId) => (
        <View style={{ backgroundColor: '#E3EAFF' }}>
            <Text>{rowItem.name}</Text>
            <Text style={{ color: 'blue' }}>{rowItem.quantity}</Text>
        </View>            
    );

    _renderCustomerSection = (section, sectionId) => 
    <View style={{ backgroundColor: section.status === 'COMPLETED' ? '#6CFF98' : '#D1DBFB', flexDirection: 'column', borderTopColor: '#dedede', borderTopWidth: 1 }}>
        <Text>{section.orderID}</Text>
        <Text>{section.pickup_datetime}</Text>
        <Text>{section.status}</Text>
    </View>;
    
    _renderTruckSection = (section, sectionId) => <View style={{ padding: 5, borderBottomColor: '#cdcdcd', borderBottomWidth: 1 }}><Text>{section.supplier_name}</Text></View>;
    
    renderOrderListByDate= (date) => {
        console.log(date);
        let trucksList;
        let combinedOrder;
        let menuitems;
        this.setState({ seleted_date: date }); 
        this.props.truckOrderFetch(date.replace(/-/g, ''));
        console.log(this.props.items);    
    };

    renderExpanableFlatList() {
        console.log('RENDER EXPANDABLEFLATLIST');
        console.log(this.props.supplierList);    
        if (this.props.supplierList) {
            return (<ExpanableList 
                style={{ borderTopWidth: 1, borderTopColor: '#cdcdcd' }}
                dataSource={this.props.supplierList}
                headerKey="supplier"
                memberKey="items"
                renderRow={this._renderRow}
                renderSectionHeaderX={this._renderTruckSection}
                openOptions={[0]}                
            />);
        } else {
            return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No Order Found...</Text></View>);
        }
    }    

    renderExpanableOrderFlatList() {
        console.log('RENDER EXPANDABLECUSTOMERFLATLIST');
        console.log(this.props.orderList);    
        if (this.props.orderList) {
            return (<ExpanableList    
                style={{ marginBottom: 50 }}      
                dataSource={this.props.orderList}
                headerKey="orderSection"
                memberKey="items"
                renderRow={this._renderRow}
                renderSectionHeaderX={this._renderCustomerSection}
                openOptions={[0]}
            />);
        } else {
            return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>No Order Found...</Text></View>);
        }
    }    

    renderOrderLayout() {
        if (this.state.selectedOption === 'Supplier') {
            return (<View style={{ flex: 1, padding: 5 }}>                
                <Text style={sharedStyles.headerTitleStyle}>Truck Order</Text>
                {this.renderExpanableFlatList()}                
            </View>);
        } else {
            return (<View style={{ flex: 1, padding: 5 }}>      
                <Text style={sharedStyles.headerTitleStyle}>Customer Order</Text>
                {this.renderExpanableOrderFlatList()} 
            </View>);
        }            
    }
    
    render() {        
        const options = [
            'Supplier',
            'Customer'
          ];

          function setSelectedOption(selectedOption) {
            this.setState({
              selectedOption
            });
          }
         
          function renderOption(option, selected, onSelect, index) {
            const style = selected ? { fontWeight: 'bold' } : {};
         
            return (
              <TouchableWithoutFeedback onPress={onSelect} key={index}>
                <Text style={style}>{option}</Text>
              </TouchableWithoutFeedback>
            );
          }
         
          function renderContainer(optionNodes) {
              console.log(optionNodes);
            return <View>Hello {optionNodes}</View>;
          }

        return (
            <View style={[sharedStyles.mainPageStyle, { padding: 5 }]}>
                <DatePicker
                    style={{ width: '100%', marginBottom: 10 }}
                    date={this.state.seleted_date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate={moment(new Date()).add(1, 'days').format('YYYY-MM-DD')}
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
                <SegmentedControls
                    options={options}
                    onSelection={setSelectedOption.bind(this)}
                    selectedOption={this.state.selectedOption}
                    renderContainer={renderContainer}
                    tint={sharedStyles.primaryColor}
                    selectedTint={sharedStyles.secondaryColor}
                    backTint={sharedStyles.secondaryColor}                    
                />
                {this.renderOrderLayout()}
                
            </View>      
        );
    }
}

const mapStateToProps = state => {
    console.log('Truck Order page state');  
    console.log(state.truck.orders);
    const loggedInUser = state.auth.user; 
    const orders = state.truck.orders;
    //const ordersByDate = state.truck.ordersByDate;
    
    let supplierItems;
    let supplierExpandableList;
    let orderExpandableList;
    //const todayOrder = ordersByDate[moment(new Date()).format('YYYYMMDD')];
    
    if (orders) {
        const currentOrders = _.map(orders, (val, key) => { return { ...val, orderID: key }; });
        supplierItems = {};
        supplierExpandableList = [];
        orderExpandableList = [];        
        orderExpandableList = _.map(orders, (val, key) => {
            console.log(key);
            console.log(val);
            //loop for each customer in specific order
            return { ...val, orderID: key, orderSection: { customer: val.customer, orderID: key, pickup_datetime: val.pickup_datetime, purchase_datetime: val.purchase_datetime, status: val.status, total: val.total, trucker: val.trucker } };
        });

        console.log('Legion Comandare', currentOrders);
        currentOrders.forEach((order) => {
            _.map(order.items, (orderItem, itemID) => {
                console.log('okggg', orderItem);
                if (orderItem.supplier in supplierItems) {
                    console.log('add in existing supplier');
                    if (itemID in supplierItems[orderItem.supplier].items) {
                        supplierItems[orderItem.supplier].items[itemID].quantity += orderItem.quantity;
                    } else {
                        supplierItems[orderItem.supplier].items[itemID] = orderItem;
                    }
                } else {
                    console.log('create new supplier');
                    supplierItems[orderItem.supplier] = { items: {} };
                    supplierItems[orderItem.supplier].items[itemID] = orderItem;
                    console.log(supplierItems);
                }
            });  
        });
        //console.log(orders.items);
         

        ////loop for each orders        
        // _.map(orders, (val, key) => {
        //     const orderItems = _.cloneDeep(val.items);
        //     const today = moment(new Date()).format('YYYYMMDD'); 
        //     const x = _.pickBy(orderItems, _.includes(today));
        //     //loop for each product in specific order
        //     _.map(x, (orderItem, itemID) => {
        //         if (orderItem.supplier in supplierItems) {
        //             //supplierItems[orderItem.supplier].items.push(orderItem);
        //             if (itemID in supplierItems[orderItem.supplier].items) {
        //                 supplierItems[orderItem.supplier].items[itemID].quantity += orderItem.quantity;
        //             } else {
        //                 supplierItems[orderItem.supplier].items[itemID] = orderItem;
        //             }
        //         } else {                    
        //             supplierItems[orderItem.supplier] = { items: {} };
        //             supplierItems[orderItem.supplier].items[itemID] = orderItem;
        //             //supplierItems[orderItem.supplier].items.push(orderItem);
        //         }
        //     });             
        // });
                
        supplierItems = _.map(supplierItems, (val, key) => {
            const items = _.map(val.items, (val1, key1) => {
                return { ...val1, uid: key1 };
            });
            console.log('test test 123');
            console.log(supplierItems);
            return { items, supplier: { ...state.truck.suppliers[key], supplierID: key } };
        });
        
        for (let order of orderExpandableList) {
            order.items = _.map(order.items, (val, key) => {
                return { ...val, uid: key };
            });            
        }
        orderExpandableList = _.orderBy(orderExpandableList, 'pickup_datetime', 'desc');
        console.log('end game');
        console.log(orderExpandableList);
    }   
    return { user: loggedInUser, loading: state.truck.loading, suppliers: state.truck.suppliers, supplierList: supplierItems, orderList: orderExpandableList };
};

export default connect(mapStateToProps, { truckOrderFetch })(TruckOrderPage);