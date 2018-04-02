import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Metrics } from '../../themes/index';
import * as authActions from '../../redux/actions/AuthActions';
import * as registerActions from '../../redux/actions/RegisterAction';
import * as appActions from '../../redux/actions/AppActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import keys from '../../config/keys';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

const OAUTH_CONTAINER_WIDTH = Metrics.width * 0.5,
    OAUTH_CONTAINER_HEIGHT = Metrics.height * 0.15,
    SIGN_UP_COLOR = '#90323f',
    LOGIN_COLOR = '#024879',
    LOGIN_SIGNUP_WIDTH_GOTTCHA = 30,
    LOGIN_SIGNUP_HALF_SIZE_HEIGHT = Metrics.height * 0.1,
    LOGIN_SIGNUP_HALF_SIZE_WIDTH = Metrics.width - OAUTH_CONTAINER_WIDTH + LOGIN_SIGNUP_WIDTH_GOTTCHA,
    BOTTOM_Y = Metrics.height - OAUTH_CONTAINER_HEIGHT
    ;

class AccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontZindex: 2,
            backZindex: 1,
            isShowLogin: true,
            isCallThroughButton: false,
            oAuthAnimation: new Animated.Value(0),
            loginAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
            signUpAnimation: new Animated.ValueXY({ x: OAUTH_CONTAINER_WIDTH, y: BOTTOM_Y }),
        };
    }
    componentDidMount() {
        // Add event listener to handle OAuthLogin:// URLs for OAuth
        Linking.addEventListener('url', this.handleOpenURL.bind(this));
    }
    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }
    async handleOpenURL({ url }) {
        const [, userString] = url.match(/user=([^#]+)/);
        console.log(userString);
    }
    componentDidUpdate() {
        if (this.state.isCallThroughButton) {
            if (!this.state.isShowLogin) {
                this.state.loginAnimation.setValue({ x: -OAUTH_CONTAINER_WIDTH, y: BOTTOM_Y });
                Animated.parallel([
                    this.compressLogin(),
                    this.rightOAuthAnimation()
                ]).start(() => this.setState({ isCallThroughButton: false }));
            } else {
                this.state.signUpAnimation.setValue({ x: 2 * OAUTH_CONTAINER_WIDTH, y: BOTTOM_Y });
                Animated.parallel([
                    this.compressSignUp(),
                    this.leftOAuthAnimation()
                ]).start(() => this.setState({ isCallThroughButton: false }));
            }
        }
    }
    // oAuth
    leftOAuthAnimation() {
        return Animated.spring(this.state.oAuthAnimation, {
            toValue: 0,
            friction: 5,
            // useNativeDriver: true
        });
    }
    rightOAuthAnimation() {
        return Animated.spring(this.state.oAuthAnimation, {
            toValue: 1,
            friction: 5,
            // useNativeDriver: true
        });
    }
    getOAuthStyle() {
        const translateX = this.state.oAuthAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Metrics.width / 2]
        });
        return {
            ...styles.oAuthStyle,
            zIndex: 3,
            elevation: 3,
            transform: [
                { translateX: translateX }
            ]
        };
    }
    doGooglePlusLogin() {
        Linking.openURL(`${keys.baseURL}/auth/google`)
            .catch(err => console.error('An error occurred', err));
    }
    doFacebookLogin() {
        Linking.openURL(`${keys.baseURL}/auth/facebook`)
            .catch(err => console.error('An error occurred', err));
    }
    doTwitterLogin() {
        Linking.openURL(`${keys.baseURL}/auth/twitter`)
            .catch(err => console.error('An error occurred', err));
    }
    renderOAuth() {
        const color = '#999';
        const size = 33;
        return (
            <Animated.View style={this.getOAuthStyle()}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', marginTop: -size / 2 - Metrics.width * 0.05 }}>
                        <Icon name="google-plus-square" size={size} color={color} onPress={this.doGooglePlusLogin} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', marginTop: -size / 2 - Metrics.width * 0.05 }}>
                        <Icon name="facebook-square" size={size} color={color} onPress={this.doFacebookLogin} />
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', marginTop: -size / 2 - Metrics.width * 0.05 }}>
                        <Icon name="twitter-square" size={size} color={color} onPress={this.doTwitterLogin} />
                    </View>
                </View>
            </Animated.View>
        );
    }
    // login
    getLoginStyle() {
        const width = this.state.loginAnimation.y.interpolate({
            inputRange: [0, BOTTOM_Y],
            outputRange: [Metrics.width, LOGIN_SIGNUP_HALF_SIZE_WIDTH]
        });
        const height = this.state.loginAnimation.y.interpolate({
            inputRange: [0, BOTTOM_Y],
            outputRange: [Metrics.height, LOGIN_SIGNUP_HALF_SIZE_HEIGHT]
        });
        const radius = this.state.loginAnimation.y.interpolate({
            inputRange: [0, BOTTOM_Y],
            outputRange: [0, OAUTH_CONTAINER_WIDTH / 2]
        });
        let zIndex;
        if (!this.state.isShowLogin) {
            zIndex = this.state.fontZindex;
        } else {
            zIndex = this.state.backZindex;
        }

        return {
            ...this.state.loginAnimation.getLayout(),
            position: 'absolute',
            alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: LOGIN_COLOR,
            width: width,
            height: height,
            borderBottomRightRadius: radius,
            borderTopRightRadius: radius,
            zIndex: zIndex,
            elevation: zIndex
        };
    }
    getLoginTextStyle() {
        const fontSize = this.state.loginAnimation.y.interpolate({
            inputRange: [0, BOTTOM_Y],
            outputRange: [49, 23]
        });
        return {
            fontSize: fontSize,
            color: '#ccc'
        };
    }
    expandLogin() {
        return Animated.timing(this.state.loginAnimation, {
            toValue: {
                x: 0,
                y: 0
            },
            duration: 250
        });
    }
    compressLogin() {
        return Animated.spring(this.state.loginAnimation, {
            toValue: {
                x: -LOGIN_SIGNUP_WIDTH_GOTTCHA,
                y: BOTTOM_Y
            },
            friction: 6
        });
    }
    onLoginPress() {
        if (!this.state.isShowLogin) {
            Animated.sequence([
                this.expandLogin(),
                Animated.delay(50)
            ]).start(() => {
                this.setState({ isShowLogin: true, isCallThroughButton: true });
            });
        }
    }

    renderLoginScreen() {
        if (this.props.register.status !== 'success') {
            return (
                <Animated.View style={this.getLoginStyle()} key={456}>
                    {this.state.isShowLogin ?
                        <LoginScreen /> :
                        (<TouchableOpacity
                            onPress={this.onLoginPress.bind(this)}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Animated.Text style={this.getLoginTextStyle()}>Login</Animated.Text>
                        </TouchableOpacity>)}
                </Animated.View>
            );
        }
    }
    //signUP
    getSignUpStyle() {
        const width = this.state.signUpAnimation.y.interpolate({
            inputRange: [0, BOTTOM_Y],
            outputRange: [Metrics.width, LOGIN_SIGNUP_HALF_SIZE_WIDTH]
        });
        const height = this.state.signUpAnimation.y.interpolate({
            inputRange: [0, BOTTOM_Y],
            outputRange: [Metrics.height, LOGIN_SIGNUP_HALF_SIZE_HEIGHT]
        });
        const radius = this.state.signUpAnimation.y.interpolate({
            inputRange: [0, BOTTOM_Y],
            outputRange: [0, OAUTH_CONTAINER_WIDTH / 2]
        });
        let zIndex;
        if (this.state.isShowLogin) {
            zIndex = this.state.fontZindex;
        } else {
            zIndex = this.state.backZindex;
        }
        return {
            ...this.state.signUpAnimation.getLayout(),
            position: 'absolute',
            alignItems: 'center',
            // justifyContent: 'center',
            backgroundColor: SIGN_UP_COLOR,
            width: width,
            height: height,
            borderBottomLeftRadius: radius,
            borderTopLeftRadius: radius,
            zIndex: zIndex,
            elevation: zIndex
        };
    }
    getSignUpTextStyle() {
        const fontSize = this.state.signUpAnimation.x.interpolate({
            inputRange: [0, OAUTH_CONTAINER_WIDTH],
            outputRange: [49, 23]
        });
        return {
            //    ...this.state.signUpTextAnimation.getLayout(),
            fontSize: fontSize,
            color: '#ccc'
        };
    }
    expandSignUp() {
        return Animated.timing(this.state.signUpAnimation, {
            toValue: {
                x: 0,
                y: 0
            },
            duration: 250
        });
    }
    compressSignUp() {
        return Animated.spring(this.state.signUpAnimation, {
            toValue: {
                x: OAUTH_CONTAINER_WIDTH,
                y: Metrics.height - OAUTH_CONTAINER_HEIGHT
            },
            friction: 6
        });
    }
    onSignupPress() {
        if (this.state.isShowLogin) {
            Animated.sequence([
                this.expandSignUp(),
                Animated.delay(50)
            ]).start(() => {
                this.setState({ isShowLogin: false, isCallThroughButton: true });
            });
        }
    }
    renderSignUpScreen() {
        if (this.props.auth.status !== 'success') {
            return (
                <Animated.View style={this.getSignUpStyle()} key={123}>
                    {!this.state.isShowLogin ? <SignUpScreen /> :
                        (<TouchableOpacity
                            onPress={this.onSignupPress.bind(this)}
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Animated.Text style={this.getSignUpTextStyle()}>SignUp</Animated.Text>
                        </TouchableOpacity>)}
                </Animated.View>
            );
        }
        return null;
    }
    renderZindexAdjustment() {
        if (this.state.isShowLogin) {
            return [this.renderLoginScreen(), this.renderSignUpScreen()];
        }
        return [this.renderSignUpScreen(), this.renderLoginScreen()];
    }
    render() {
        return (
            <View style={styles.container}>
                {this.renderZindexAdjustment()}
                {(this.props.register.status === 'success' || this.props.auth.status === 'success') ?
                    null : this.renderOAuth()}
            </View>
        );
    }
}
const styles = {
    container: {
        flex: 1,
        width: Metrics.width,
        height: Metrics.height,
        paddingTop: Metrics.paddingFromTop,
    },
    oAuthStyle: {
        width: OAUTH_CONTAINER_WIDTH,
        height: OAUTH_CONTAINER_HEIGHT,
        backgroundColor: 'transparent',
        position: 'absolute',
        marginTop: Metrics.height - OAUTH_CONTAINER_HEIGHT
    }
};

export default connect((state) => ({
    appState: state.appState,
    auth: state.auth,
    register: state.register
}), (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch),
    registerActions: bindActionCreators(registerActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
}))(AccountScreen);
