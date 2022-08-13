import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Login from '../screens/Login';
import News from '../screens/News';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)  
    return (
        <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                {isLoggedIn ? <Stack.Screen name='News' component={ News }/> : <Stack.Screen name='Login' component={ Login }/>}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer