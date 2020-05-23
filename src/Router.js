import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import LoginForm from './components/LoginForm';
import FoodPage from './components/FoodPage';
import SupplierListPage from './components/SupplierListPage';
import SupplierMenuPage from './components/SupplierMenuPage';
import AddMenuItemPage from './components/AddMenuItemPage';
import EditMenuItemPage from './components/EditMenuItemPage';
import OrderPage from './components/OrderPage';
import HomePage from './components/HomePage';
import TruckOrderPage from './components/TruckOrderPage';
import TruckMenuPage from './components/TruckMenuPage';
import QRScanner from './components/QRScanner';
import VerifiedOrder from './components/VerifiedOrder';
import SideMenu from './components/SideMenu';
import TabIcon from './components/TabIcon';
import { sharedStyles } from './GlobalVariables';
import ViewTruckMenuItemPage from './components/ViewTruckMenuItemPage';
import { store } from '../src/configureStore';

const RouterComponent = () => {
    const { user } = store.getState().auth;
    return (
        <Router backAndroidHandler={onBackPress}>
            <Scene key="root" hideNavBar>
                <Scene key="auth" hideNavBar>
                    <Scene key="login" component={LoginForm} title="Login" />
                </Scene>
                <Scene key="camera" hideNavBar>
                    <Scene key="qrscanner" component={QRScanner} />
                    <Scene key="verifiedOrder" component={VerifiedOrder} title="Order" />
                </Scene>
                <Scene 
                    drawer drawerIcon={<Icon name='list' color={sharedStyles.secondaryColor} />} drawerWidth={250} hideNavBar
                    drawerPosition='left' contentComponent={SideMenu} titleStyle={styles.headerTitleStyle}
                    navigationBarStyle={styles.navBarStyle}
                    key="trucker" initial={user ? user.user_role === 'TRUCKER' : false}
                >
                    <Scene                             
                        tabs rightTitle="Scan" onRight={() => Actions.camera({ orderCode: '12345' })}           
                        hideNavBar showLabel={false}
                        tabBarStyle={styles.tabBarStyle}                        
                        key="trucker_dashboard"
                        rightButtonTextStyle={styles.headerTitleStyle}                        
                    >
                        <Scene key="trucker_home" component={HomePage} titleStyle={sharedStyles.tabHeaderTitleStyle} title="Home" iconName='home' icon={TabIcon} />
                        <Scene key="trucker_menu" component={TruckMenuPage} titleStyle={sharedStyles.tabHeaderTitleStyle} title="Supplier" iconName='restaurant' iconType='material' icon={TabIcon} />
                        <Scene key="trucker_order" component={TruckOrderPage} titleStyle={sharedStyles.tabHeaderTitleStyle} title="Order" iconName='history' icon={TabIcon} />
                    </Scene>                    
                </Scene>
                <Scene 
                    drawer drawerIcon={<Icon name='list' color={sharedStyles.secondaryColor} />} drawerWidth={250} hideNavBar
                    drawerPosition='left' contentComponent={SideMenu} titleStyle={styles.headerTitleStyle}
                    navigationBarStyle={styles.navBarStyle}
                    key="supplier" initial={user ? user.user_role === 'SUPPLIER' : false}
                >
                    <Scene                             
                        tabs //rightTitle="Scan" onRight={() => Actions.camera({ orderCode: '12345' })}           
                        hideNavBar showLabel={false}
                        tabBarStyle={styles.tabBarStyle}
                        key="supplier_dashboard"
                        rightButtonTextStyle={styles.headerTitleStyle}
                        // contentComponent={SideMenu}
                        // drawerWidth={250}
                        // drawerPosition="left"
                    >
                        <Scene key="supplier_home" component={FoodPage} title="Dashboard" iconName='home' icon={TabIcon} />
                        <Scene key="supplier_menu" component={SupplierMenuPage} title="Food" iconName='food' iconType='material-community' icon={TabIcon} />
                        <Scene key="supplier_order" component={OrderPage} title="Order" iconName='history' icon={TabIcon} />
                    </Scene>                    
                </Scene>
                <Scene key="add_menu_items" component={AddMenuItemPage} />
                <Scene key="edit_menu_items" component={EditMenuItemPage} />
                <Scene key='view_menu_items' component={ViewTruckMenuItemPage} />
                <Scene key='add_suppliers' component={SupplierListPage} />
                {/* <Scene key="supplier" component={FoodPage} title="Food">
                    
                </Scene> */}
                {/* <Scene key="camera" hideNavBar>
                    <Scene key="qrscanner" component={QRScanner} />
                    <Scene key="verifiedOrder" component={VerifiedOrder} title="Order" />
                </Scene> */}
            </Scene>
        </Router>
    );
};

const styles = {    
    navBarStyle: {
        backgroundColor: sharedStyles.primaryColor                
    },
    tabBarStyle: {
        
        backgroundColor: sharedStyles.primaryColor        
    },
    headerTitleStyle: {
        color: sharedStyles.secondaryColor
    }
};

const onBackPress = () => {
    if (Actions.state.index === 0) {
        console.log('exit the app');
        return false;
    }
    Actions.pop();
    return true;
};

export default RouterComponent;