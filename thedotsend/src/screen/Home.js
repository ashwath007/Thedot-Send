import React from 'react';
import {StyleSheet, View,Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import prototype from 'prop-types';
import { connect } from 'react-redux';
import { googleSignout } from '../action/auth';

const Home = ({googleSignout,authState}) => {
    return(
        <View>
            <Text>
                HomeScreen
            </Text>
            <TouchableOpacity
            style={{backgroudColor:'black'}}
            onPress={() =>googleSignout() }
            >
                <Text>
                    Signout
                </Text>
            </TouchableOpacity>
        </View>
        )
}



const styles = StyleSheet.create({

})

const mapDispatchToProps = {
    googleSignout
}

const mapStateToProps = state => ({
    authState: state.auth
})

Home.prototype = {
    googleSignout: prototype.func.isRequired
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);