import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Metrics } from '../../themes/index';

class AnimatedLoadingButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0)
        };
    }
    componentWillMount() {
        this.BUTTON_WIDTH = this.props.BUTTON_WIDTH || 300;
        this.BUTTON_HEIGHT = this.props.BUTTON_HEIGHT || 50;
        this.BUTTON_WIDTH_STAGE1 = this.props.LOADING_BUTTON_SIZE || 80;
        this.BUTTON_HEIGHT_STAGE1 = this.props.LOADING_BUTTON_SIZE || 80;
        this.BUTTON_COLOR = this.props.BUTTON_COLOR || 'orange';
        this.BUTTON_COLOR_COMPLETION = this.props.BUTTON_COLOR_COMPLETION || 'lightblue';
        this.BALL_SIZE_STAGE2 = Metrics.height * 2;
        this.SPINNER_COLOR = this.props.SPINNER_COLOR || 'white';
        this.BORDER_RADIUS = this.props.BORDER_RADIUS || this.BUTTON_HEIGHT / 2;
        this.MARGIN_TOP = this.props.MARGIN_TOP || 0;
    }
    getButtonStyle() {
        const width = this.state.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [this.BUTTON_WIDTH, this.BUTTON_WIDTH_STAGE1, this.BALL_SIZE_STAGE2]
        });
        const height = this.state.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [this.BUTTON_HEIGHT, this.BUTTON_HEIGHT_STAGE1, this.BALL_SIZE_STAGE2]
        });
        const radius = this.state.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [this.BORDER_RADIUS, this.BUTTON_WIDTH_STAGE1 / 2, this.BALL_SIZE_STAGE2 / 2]
        });
        const translateX = this.state.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, (this.BUTTON_WIDTH / 2) - (this.BUTTON_WIDTH_STAGE1 / 2),
                -((this.BALL_SIZE_STAGE2 / 2) - (this.BUTTON_WIDTH_STAGE1 / 2))]
        });
        const translateY = this.state.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 0, -((this.BALL_SIZE_STAGE2 / 2) - (this.BUTTON_WIDTH_STAGE1 / 2))]
        });
        const color = this.state.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [this.BUTTON_COLOR, this.BUTTON_COLOR, this.BUTTON_COLOR_COMPLETION]
        });
        return {
            ...this.props.style,
            alignSelf: 'stretch',
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: radius,
            borderTopRightRadius: radius,
            borderBottomLeftRadius: radius,
            borderBottomRightRadius: radius,
            position: 'absolute',
            width: width,
            height: height,
            elevation: this.props.index,
            zIndex: this.props.index,
            opacity: this.props.OPACITY,
            transform: [
                { perspective: 1000 },
                { translateX: translateX },
                { translateY: translateY }
            ]
        };
    }
    componentDidUpdate() {
        switch (this.props.status || 'initial') {
            case 'loading': {
                this.state.animation.setValue(0);
                Animated.timing(this.state.animation, {
                    toValue: 1,
                    duration: 400
                }).start();
                break;
            }
            case 'success': {
                this.state.animation.setValue(1);
                Animated.sequence([
                    Animated.timing(this.state.animation, {
                        toValue: 2,
                        duration: 500
                    }),
                ]).start(this.props.done);
                break;
            }
            default: {
                this.state.animation.setValue(0);
            }
        }
    }
    renderSpinner() {
        return (
            <View style={styles.spinnerStyle}>
                <ActivityIndicator size={'large'} color={this.SPINNER_COLOR} />
            </View>
        );
    }
    renderButtonContent() {
        if (this.props.status === 'loading') {
            return this.renderSpinner();
        } else if (this.props.status === 'success') {
            return;
        }
        return <Text style={styles.textStyle}>{this.props.title}</Text>;
    }
    buttonOnPress() {
        if (this.props.status !== 'loading' && this.props.status !== 'success') {
            this.props.onPress();
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={this.buttonOnPress.bind(this)}>
                <Animated.View style={this.getButtonStyle()}>
                    {this.renderButtonContent()}
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}
const styles = {
    textStyle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    }
};

export default AnimatedLoadingButton;

//-----------------details----------------------------------------------------
//  componentWillMount
// onPress function
// done  function call at the end
