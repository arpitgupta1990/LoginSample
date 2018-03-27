import React, { Component } from "react";
import {
  TextInput,
  View,
  Animated,
  TouchableWithoutFeedback
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

class AnimatedInput extends Component {
  constructor(props) {
    super(props);
    const lineAnimation = new Animated.Value(0);
    const placeholderAnimationArray = [];
    this.placeholder = [];
    this.placeholder = this.props.placeholder.split("");
    this.placeholder.forEach(char => {
      placeholderAnimationArray.push(new Animated.ValueXY());
    });
    const placeholderContainerAnimation = new Animated.Value(0);
    this.state = {
      lineAnimation,
      placeholderAnimationArray,
      placeholderContainerAnimation
    };
  }
  componentWillMount() {
    this.CONTAINER_WIDTH = this.props.CONTAINER_WIDTH || 250;
    this.CONTAINER_HEIGHT = this.props.CONTAINER_HEIGHT || 70;
    this.ANIMATED_LINE_COLOR_INITIAL = this.props.ANIMATED_LINE_COLOR_INITIAL || "#bbb";
    this.ANIMATED_LINE_COLOR_ONFOCUS = this.props.ANIMATED_LINE_COLOR_ONFOCUS || "blue";
    this.PLACEHOLDER_COLOR = this.props.placeholderColor || "#ccc";
    this.TEXT_COLOR = this.props.textColor || "#eee";
    this.ANIMATED_LINE_HEIGHT = 2;
    this.FONT_SIZE = this.CONTAINER_HEIGHT / 4;
    this.PLACEHOLDER_SIZE = this.FONT_SIZE - 2;
    this.PADDING_LEFT = 5;
    this.PLACEHOLDER_FINAL_POSITION = -this.CONTAINER_HEIGHT + (this.FONT_SIZE * (5 / 3));
  }
  componentDidMount() {
    if (this.props.value) {
      this.animatePlaceHolderCharector().start();
    }
  }
  getAnimatedLineStyle() {
    let { animatedLineStyle } = styles;
    if (this.props.underlineAnimatedColor) {
      animatedLineStyle = { ...animatedLineStyle, backgroundColor: this.props.underlineAnimatedColor };
    }
    const w = this.state.lineAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.CONTAINER_WIDTH]
    });
    return {
      ...animatedLineStyle,
      width: w
    };
  }
  animatePlaceHolderCharector() {
    const animations = [];
    for (let i = 0; i < this.placeholder.length; i++) {
      animations.push(
        Animated.spring(this.state.placeholderAnimationArray[i], {
          toValue: {
            y: this.PLACEHOLDER_FINAL_POSITION,
            x: 0
          },
          friction: 4,
        })
      );
    }
    animations.push(
      // for compressing the placeholdercontainer
      Animated.spring(this.state.placeholderContainerAnimation, {
        toValue: 1,
        friction: 4,
      })
    );
    return Animated.stagger(70, animations);
  }
  onFocusAnimate() {
    this.state.lineAnimation.setValue(0);

    Animated.parallel([
      Animated.timing(this.state.lineAnimation, {
        toValue: 1,
        duration: 400,
        // useNativeDriver: true
      }),
      this.animatePlaceHolderCharector()
    ]).start();
  }
  getPlaceHolderStyle(i) {
    let { placeholderStyle } = styles;
    if (this.props.placeholderColor) {
      placeholderStyle = { ...placeholderStyle, color: this.props.placeholderColor };
    }
    return {
      ...this.state.placeholderAnimationArray[i].getLayout(),
      ...placeholderStyle
    };
  }

  renderPlaceHolder() {
    const jsx = [];
    for (let i = 0; i < this.placeholder.length; i++) {
      jsx.push(
        <TouchableWithoutFeedback onPress={this.onFocusAnimate.bind(this)} key={i}>
          <Animated.Text style={this.getPlaceHolderStyle(i)}>
            {this.placeholder[i]}
          </Animated.Text>
        </TouchableWithoutFeedback>
      );
    }
    return jsx;
  }
  render() {
    const { value, onChangeText, secureTextEntry, textColor, underlineColor } = this.props;
    let {
      inputStyle,
      containerStyle,
      lineStyle,
      placeHolderContainerStyle
    } = styles;
    const t = textColor || 'black';
    inputStyle = { ...inputStyle, color: t, fontSize: this.FONT_SIZE, lineHeight: this.FONT_SIZE };
    const uc = underlineColor || 'grey';
    lineStyle = { ...lineStyle, backgroundColor: uc };
    containerStyle = { ...styles.containerStyle, width: this.CONTAINER_WIDTH, height: this.CONTAINER_HEIGHT };
    placeHolderContainerStyle = { ...styles.placeHolderContainerStyle, paddingLeft: this.PADDING_LEFT, height: this.CONTAINER_HEIGHT };

    return (
      <View style={{ width: null }}>
        <View style={containerStyle}>
          <View style={placeHolderContainerStyle}>
            <View style={{ flexDirection: "row" }}>
              {this.renderPlaceHolder()}
            </View>
          </View>
          <TextInput
            style={inputStyle}
            secureTextEntry={secureTextEntry}
            //   placeholder={placeholder}
            autoCorrect={false}
            autoCapitalize={'none'}
            value={value}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
            onFocus={() => {
              this.onFocusAnimate();
            }}
          />
          <View style={lineStyle}>
            <Animated.View style={this.getAnimatedLineStyle()} />
          </View>
        </View>
        <View style={{ position: 'absolute', marginLeft: this.CONTAINER_WIDTH - 20, marginTop: this.CONTAINER_HEIGHT / 2 }}>
          {this.props.isValid ? <Icon name="check" size={20} color={'green'} /> : null}
        </View>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    paddingRight: 5,
    width: null,
    zIndex: 2
  },
  containerStyle: {
    flexDirection: "column",
    justifyContent: "flex-end",
    // borderWidth: 1
  },
  lineStyle: {
    width: null,
    height: 2,
    backgroundColor: "#bbb"
  },
  animatedLineStyle: {
    height: 2,
    width: null,
    backgroundColor: 'blue',
    position: "absolute",
    zIndex: 1
  },
  placeHolderContainerStyle: {
    flexDirection: "column",
    justifyContent: "flex-end",
    height: null,
    backgroundColor: "transparent",
    zIndex: 1,
    position: "absolute",
    overflow: "hidden",
    // borderWidth: 1
  },
  placeholderStyle: {
    color: '#ddd',
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    paddingBottom: 7
  }
};

export default AnimatedInput;
