import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from './redux/store' 
import Login from './screens/Login';
import News from './screens/News';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import AppContainer from './components/AppContainer';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
