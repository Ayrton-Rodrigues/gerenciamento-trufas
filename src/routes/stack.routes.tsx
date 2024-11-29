import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabRoutes from './tab.routes'
import EditScreen from '../screens/EditScreen';

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
  return (
    <Stack.Navigator screenOptions={{ title: '',  headerShown: false }}>
      <Stack.Screen
        name='tabs'        
        component={TabRoutes}
      />
      <Stack.Screen
        name='editar'
        component={EditScreen}
      />
    </Stack.Navigator>
  )
}