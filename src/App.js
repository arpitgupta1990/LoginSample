import React, { Component } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";

import { store } from "./redux/store/store";
import StartScreen from './screens/StartScreen';

// import Reactotron from 'reactotron-react-native';
// import "../ReactotronConfig";

class App extends Component {
  render() {
    // Reactotron.log('hello rendering world');
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StartScreen />
        </View>
      </Provider>
    );
  }
}

export default App;
