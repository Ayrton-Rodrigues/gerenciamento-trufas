import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CadastroScreen from '../screens/GerenciarScreen'
import EstoqueScreen from '../screens/EstoqueScreen'
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/CadastroScreen";
import GerenciarScreen from "../screens/GerenciarScreen";


const Tab = createBottomTabNavigator();

export default function TabRoutes() {

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Gestão"
        component={GerenciarScreen}
        options={
          {
            tabBarIcon: ({color, size}) => <Feather name="grid" color={color} size={size} ></Feather>,
            header: () => false
          }
        }
      />

      <Tab.Screen
        name="incluir"
        component={CadastroScreen}
        options={
          {
            tabBarIcon: ({color, size}) => <Feather name="plus-square" color={color} size={size} ></Feather>,
            header: () => false 
          }
        }
      />

    </Tab.Navigator>
  )
}