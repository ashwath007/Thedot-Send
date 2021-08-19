
import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {useDispatch, connect} from 'react-redux'
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import { SET_USER,IS_AUTHENTICATED } from './action/action.types';


const Stack = createStackNavigator();

// Screens


import Login from './screen/Login';
import HomeNavigation from './screen/Navigation/HomeNavigation';


// ENV

import {FIREBASE_config} from "@env"


GoogleSignin.configure({
  webClientId: "316370450524-4bcjh5gqi79e0ibg1sjmt762f0ggp43o.apps.googleusercontent.com",
});

import Splash from './screen/support/Splash';

const App = ({authState}) => {

  const dispatch = useDispatch();



  const [isUserGLogin, setisUserGLogin] = useState(false);
  const [userGData, setuserGData] = useState('');
  const [user, setuser] = useState('');


  useEffect(() => { // Normal Auth
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken() //<---- Add this
      console.log('Authorization status:', authStatus);
    }
  }

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
     console.log(fcmToken);
     console.log("Your Firebase Token is: ****************************************************************", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }




 

 








  function onAuthStateChanged(user) {
    console.log("USER -> ",user)
    if(user){
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true
      })
      if(user){
        dispatch({
          type: SET_USER,
          payload: user,
        })
      }
    }else{
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false
      })
    }
    
  

  }



  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("Yes");
      setuser({userInfo})
      console.log({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      console.log(error);

      } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log(error);

        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log(error);

        // play services not available or outdated
      } else {
        // some other error happened
      console.log(error);

      }
    }
  };



  if(authState.loading){
    return <Splash/>
  }

  return (
    <>
    <NavigationContainer>
        <Stack.Navigator>
          {console.log(authState)}
          {authState.isAuthenticated  ? (
              <>

            <Stack.Screen
              name="home"
              options={{headerShown: false}}
              component={HomeNavigation}
            />
            </>

          ) : (
          <>
          <Stack.Screen
          options={{headerShown: false}}
            name="Login" component={Login}
          />
          </>
          )

          }
        </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};


const mapStateToProps = (state) => ({
  authState: state.auth
})


export default connect(mapStateToProps)(App);