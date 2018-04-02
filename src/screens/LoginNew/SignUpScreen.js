import React, { Component } from 'react';
import { View, ImageBackground, Alert, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Metrics } from '../../themes';
import * as registerActions from '../../redux/actions/RegisterAction';
import * as appActions from '../../redux/actions/AppActions';
import { AnimatedInput, AnimatedLoadingButton } from '../../components/animation/index';
import accountBack from '../../images/accountBack.jpg';

const TEXT_COLOR = 'white',
    UNDERLINE_COLOR = '#ddd',
    PLACEHOLDER_COLOR = '#aaa',
    UNDERLINE_ANIMATED_COLOR = '#888',
    INPUT_CONTAINER_HEIGHT = 70,
    AUTH_BUTTON_WIDTH = 250,
    TOP_MARGIN = 10,
    ICON_SIZE = 110,
    FORM_CONTAINER_HEIGHT = INPUT_CONTAINER_HEIGHT * 4,
    SIGNUP_BUTTON_POSITION_Y = FORM_CONTAINER_HEIGHT + TOP_MARGIN + ICON_SIZE + 30,
    SIGNUP_BUTTON_POSITION_X = (Metrics.width - AUTH_BUTTON_WIDTH) / 2
    ;

class SignUpScreen extends Component {
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
    onRegisterChangeName(text) {
        this.props.registerActions.nameChanged(text);
    }
    onRegisterChangeLoginId(text) {
        this.props.registerActions.emailChanged(text);
    }
    onRegisterChangePassword(text) {
        this.props.registerActions.passwordChanged(text);
    }
    onRegisterChangeConfirmPass(text) {
        this.props.registerActions.confirmPasswordChanged(text);
    }
    doSignUp() {
        if (this.props.register.isConformPasswordValid && this.props.register.isNameValid
            && this.props.register.isLoginIdValid && this.props.register.isPasswordValid) {
            this.props.registerActions.doRegister(
                this.props.register.R_name,
                this.props.register.R_loginId,
                this.props.register.R_password,
            );
        } else {
            Alert.alert(
                'Error',
                'Please validate all fields',
                [
                    { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false }
            );
        }
    }
    signUpDone() {
        this.props.appActions.userLoggedIn(this.props.register.user);
    }
    render() {
        return (
            <ImageBackground source={accountBack} style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#a83a4a', '#301015']}
                    style={{ flex: 1, width: Metrics.width, flexDirection: 'column', alignItems: 'center', paddingTop: TOP_MARGIN, opacity: 0.94 }}
                >
                    {this.state.showIcon ? <Icon name="apple" size={ICON_SIZE} color='#ddd' /> : null}
                    <View style={{ width: null, height: FORM_CONTAINER_HEIGHT }}>
                        <AnimatedInput
                            placeholder={'name'}
                            onChangeText={(text) => { this.onRegisterChangeName(text); }}
                            value={this.props.register.R_name}
                            textColor={TEXT_COLOR}
                            underlineColor={UNDERLINE_COLOR}
                            placeholderColor={PLACEHOLDER_COLOR}
                            underlineAnimatedColor={UNDERLINE_ANIMATED_COLOR}
                            CONTAINER_WIDTH={Metrics.width * 0.7}
                            CONTAINER_HEIGHT={INPUT_CONTAINER_HEIGHT}
                            isValid={this.props.register.isNameValid}
                        />
                        <AnimatedInput
                            placeholder={'e-mail/phone'}
                            onChangeText={(text) => { this.onRegisterChangeLoginId(text); }}
                            value={this.props.register.R_loginId}
                            textColor={TEXT_COLOR}
                            underlineColor={UNDERLINE_COLOR}
                            placeholderColor={PLACEHOLDER_COLOR}
                            underlineAnimatedColor={UNDERLINE_ANIMATED_COLOR}
                            CONTAINER_WIDTH={Metrics.width * 0.7}
                            CONTAINER_HEIGHT={INPUT_CONTAINER_HEIGHT}
                            isValid={this.props.register.isLoginIdValid}
                        />
                        <AnimatedInput
                            placeholder={'password'}
                            onChangeText={(text) => { this.onRegisterChangePassword(text); }}
                            value={this.props.register.R_password}
                            secureTextEntry={true}
                            textColor={TEXT_COLOR}
                            underlineColor={UNDERLINE_COLOR}
                            placeholderColor={PLACEHOLDER_COLOR}
                            underlineAnimatedColor={UNDERLINE_ANIMATED_COLOR}
                            CONTAINER_WIDTH={Metrics.width * 0.7}
                            CONTAINER_HEIGHT={INPUT_CONTAINER_HEIGHT}
                            isValid={this.props.register.isPasswordValid}
                        />
                        <AnimatedInput
                            placeholder={'confirm password'}
                            onChangeText={(text) => { this.onRegisterChangeConfirmPass(text); }}
                            value={this.props.register.R_confirmPassword}
                            secureTextEntry={true}
                            textColor={TEXT_COLOR}
                            underlineColor={UNDERLINE_COLOR}
                            placeholderColor={PLACEHOLDER_COLOR}
                            underlineAnimatedColor={UNDERLINE_ANIMATED_COLOR}
                            CONTAINER_WIDTH={Metrics.width * 0.7}
                            CONTAINER_HEIGHT={INPUT_CONTAINER_HEIGHT}
                            isValid={this.props.register.isConformPasswordValid}

                        />
                    </View>
                    <AnimatedLoadingButton
                        onPress={this.doSignUp.bind(this)}
                        BUTTON_WIDTH={AUTH_BUTTON_WIDTH}
                        BUTTON_HEIGHT={53}
                        BUTTON_COLOR="#a83a4a"
                        BUTTON_COLOR_COMPLETION="#ddd"
                        OPACITY={0.97}
                        style={{ marginTop: SIGNUP_BUTTON_POSITION_Y, marginLeft: SIGNUP_BUTTON_POSITION_X }}
                        index={10}
                        title="Sign Up"
                        status={this.props.register.status}
                        done={this.signUpDone.bind(this)}
                    />
                </LinearGradient>
            </ImageBackground>
        );
    }
};

export default connect((state) => ({
    appState: state.appState,
    register: state.register
}), (dispatch) => ({
    registerActions: bindActionCreators(registerActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
}))(SignUpScreen);
