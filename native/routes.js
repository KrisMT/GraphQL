import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import AboutScreen from './components/AboutScreen';
import SignInScreen from './components/SignInScreen';
import AuthLoadingScreen from './components/AuthLoadingScreen';
import CheckStoreScreen from './components/CheckStoreScreen';
import SignOutScreen from './components/SignOutScreen';

const AppRoute = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    CheckStore: {
      screen: CheckStoreScreen,
    },
    About: {
      screen: AboutScreen,
    },
    SignOut: {
      screen: SignOutScreen,
    },
  },
);

const AuthRoute = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
    },
  },
);

const RootRoute = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppRoute,
    Auth: AuthRoute,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default RootRoute;
