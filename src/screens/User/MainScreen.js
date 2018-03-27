import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../../redux/actions/AppActions';

class MainScreen extends Component {
    render() {
        return (
            <View>
                <Text> Main Screen</Text>
                <Button 
                    title="logout"
                    onPress={this.props.appActions.logout} 
                />
            </View>
        );
    }
}

export default connect((state) => ({
    appState: state.appState,
}), (dispatch) => ({
    appActions: bindActionCreators(appActions, dispatch),
}))(MainScreen);
