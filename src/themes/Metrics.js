import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
  width: width < height ? width : height,
  height: width < height ? height : width,
  paddingFromTop: (Platform.OS === 'ios') ? 24 : 14
};

export default metrics;

