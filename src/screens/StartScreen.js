import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import MainScreen from './User/MainScreen';
import AccountScreen from './LoginNew/AccountScreen';

class StartScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.appState.user ? <MainScreen /> : <AccountScreen />}
            </View>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        appState: state.appState
    };
};
export default connect(mapStateToProps)(StartScreen);
