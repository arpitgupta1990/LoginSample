import React, { Component } from 'react';
import { ImageBackground, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Metrics } from '../../themes';
import * as authActions from '../../redux/actions/AuthActions';
import * as appActions from '../../redux/actions/AppActions';
import { AnimatedInput, AnimatedLoadingButton } from '../../components/animation/index';
import accountBack from '../../images/accountBack.jpg';

const TEXT_COLOR = 'white',
    UNDERLINE_COLOR = '#ddd',
    PLACEHOLDER_COLOR = '#ddd',
    UNDERLINE_ANIMATED_COLOR = '#888',
    AUTH_BUTTON_WIDTH = 250,
    FORM_CONTAINER_HEIGHT = Metrics.height * 0.55,
    LOGIN_BUTTON_POSITION_Y = FORM_CONTAINER_HEIGHT + 40,
    LOGIN_BUTTON_POSITION_X = (Metrics.width - AUTH_BUTTON_WIDTH) / 2
    ;

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showIcon: true
        };
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }
    keyboardDidShow() {
        this.setState({ showIcon: false });
    }
    keyboardDidHide() {
        this.setState({ showIcon: true });
    }
    onChangeLoginId(text) {
        this.props.authActions.emailChanged(text);
    }
    onChangePasswordChange(text) {
        this.props.authActions.passwordChanged(text);
    }
    doLogin() {
        this.props.authActions.doLogin(this.props.auth.loginId, this.props.auth.password, this.props.appState.pushToken);
    }
    loginDone() {
        this.props.appActions.userLoggedIn(this.props.auth.user);
    }
    render() {
        return (
            <ImageBackground source={accountBack} style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#02548d', '#001828']}
                    style={{ flex: 1, width: Metrics.width, flexDirection: 'column', alignItems: 'center', paddingTop: 60, opacity: 0.92 }}
                >
                    {this.state.showIcon ? <Icon name="apple" size={120} color='#ddd' /> : null}
                    <AnimatedInput
                        placeholder={'e-mail'}
                        onChangeText={(text) => { this.onChangeLoginId(text); }}
                        value={this.props.auth.loginId}
                        textColor={TEXT_COLOR}
                        underlineColor={UNDERLINE_COLOR}
                        placeholderColor={PLACEHOLDER_COLOR}
                        underlineAnimatedColor={UNDERLINE_ANIMATED_COLOR}
                        CONTAINER_WIDTH={Metrics.width * 0.7}
                    />
                    <AnimatedInput
                        placeholder={'password'}
                        onChangeText={(text) => { this.onChangePasswordChange(text); }}
                        value={this.props.auth.password}
                        secureTextEntry={true}
                        textColor={TEXT_COLOR}
                        underlineColor={UNDERLINE_COLOR}
                        placeholderColor={PLACEHOLDER_COLOR}
                        underlineAnimatedColor={UNDERLINE_ANIMATED_COLOR}
                        CONTAINER_WIDTH={Metrics.width * 0.7}
                    />
                    <AnimatedLoadingButton
                        onPress={this.doLogin.bind(this)}
                        BUTTON_WIDTH={AUTH_BUTTON_WIDTH}
                        BUTTON_HEIGHT={53}
                        BUTTON_COLOR="#02548d"
                        BUTTON_COLOR_COMPLETION="#ddd"
                        OPACITY={0.97}
                        style={{ marginTop: LOGIN_BUTTON_POSITION_Y, marginLeft: LOGIN_BUTTON_POSITION_X }}
                        index={10}
                        title="Login"
                        status={this.props.auth.status}
                        done={this.loginDone.bind(this)}
                    />
                </LinearGradient>
            </ImageBackground>
        );
    }
}

export default connect((state) => ({
    auth: state.auth,
    appState: state.appState
}), (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
}))(LoginScreen);
