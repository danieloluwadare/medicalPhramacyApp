import { createStackNavigator, createDrawerNavigator} from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import LoginScreen from '../screens/LoginScreen';

import DrugsScreen from '../screens/DrugsScreen';
import DrugsDetailScreen from '../screens/DrugsDetailScreen';

import PendingDrugScreen from '../screens/PendingDrugScreen';
import DispensedDrugScreen from '../screens/DispensedDrugScreen'


import PatientsDetailScreen from '../screens/PatientsDetailScreen'

const Drawer = createDrawerNavigator(
  {
    Drugs : { screen: DrugsScreen },
    PendingDrug:{screen:PendingDrugScreen},
    DispensedDrug:{screen:DispensedDrugScreen}, 
  },
  {
    // contentComponent: Home,
    drawerWidth: 300
  }
);

// const Router = createStackNavigator(
  // {
  //   main: {
  //     screen: Drawer
  //   }
//   },
//   {
//     initialRouteName: 'main',
//     headerMode: 'none',
//     mode: 'card'
//   }
// );

const Router = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    DrugDetails:{screen:DrugsDetailScreen},
    PatientsDetail:{screen:PatientsDetailScreen},
    main:{screen:Drawer}
  },

  {
    initialRouteName: 'Login',
    headerMode: 'none', 
    mode: 'card'
  }
);


export default Router;
