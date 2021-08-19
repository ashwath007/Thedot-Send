import React from 'react';
import {StyleSheet, View,Text} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { googleSignin } from '../action/auth';
import propTypes from 'prop-types';
import { connect } from 'react-redux';


const Login = ({googleSignin,authState}) => {
    return(
        <View>
            <Text>
                LoginScreen
            </Text>


            <GoogleSigninButton
                onPress={() => googleSignin()}
            />
        </View>
        )
}


Login.propTypes = {
    googleSignin: propTypes.func.isRequired,
    authState: propTypes.object.isRequired,
}

const mapDispatchToProps = {
    googleSignin
}

const mapStateToProps = (state) => ({
    authState: state.auth
  })

const styles = StyleSheet.create({

})


export default connect(mapStateToProps,mapDispatchToProps)(Login)
