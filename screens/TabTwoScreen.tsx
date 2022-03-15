import { StyleSheet } from 'react-native';
import { View } from 'react-native'
import Text from '../components/text/Text';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <Text preset='h1'>Tab Two</Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
