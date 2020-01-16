import React from 'react';
import {
   createAppContainer,
   createSwitchNavigator,
   NavigationTransitionProps,
   StackViewTransitionConfigs,
   TabScene,
   TransitionConfig,
} from 'react-navigation';
import {
   Platform,
   Text,
   StyleSheet,
   TouchableOpacity,
   View,
} from 'react-native';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import MenuHeader from '../components/Header';
import HeaderEdit from '../components/HeaderEdit';
// Importacion de las Screen creadas para la navegacion
import FavoritosScreen from '../screens/Torneos/Favoritos';
import EnCursoScreen from '../screens/Torneos/EnCurso';
import PorIniciarScreen from '../screens/Torneos/PorIniciar';
import MisTorneosScreen from '../screens/Torneos/MisTorneos';

import CalendariosScreen from '../screens/Calendarios';
import CrearFechaScreen from '../screens/CrearFecha';
//import PartidosScreen from '../screens/Partidos';
import PartidosScreen from '../screens/PartidosV2';
import EditarPartidoScreen from '../screens/EditarPartido';

import EquiposScreen from '../screens/Equipos/Equipos';
import PosicionesScreen from '../screens/Posiciones';
import ResultadosScreen from '../screens/Resultados';

import PerfilTorneoScreen from '../screens/Torneos/PerfilTorneo';
import InfoPerfilTorneoScreen from '../screens/Torneos/InfoPerfilTorneo';
import CargarImagenScreen from '../components/CargarImagen';
import CrearEquiposScreen from '../screens/Equipos/CrearEquipos';

import LoginScreen from '../screens/Login';
import VocaliaScreen from '../screens/vocalia';

const TabTorneos = createBottomTabNavigator(
   {
      MisTorneos: { screen: MisTorneosScreen },
      EnCurso: { screen: EnCursoScreen },
      PorIniciar: { screen: PorIniciarScreen },
      Favoritos: { screen: FavoritosScreen },
   },
   { initialRouteName: 'MisTorneos' }
);

const TabEquipos = createBottomTabNavigator(
   {
      Calendario: { screen: CalendariosScreen },
      Equipos: { screen: EquiposScreen },
      Posiciones: { screen: PosicionesScreen },
      Resultados: { screen: ResultadosScreen },
   },
   { initialRouteName: 'Calendario' }
);

const TorneosRootStack = createStackNavigator(
   {
      TabTorneos: {
         screen: TabTorneos,
         navigationOptions: ({ navigation }) => ({
            title: 'TORNEOS',
            headerStyle: {
               backgroundColor: '#f4511e',
            },
            headerTitle: () => <MenuHeader nav={navigation} />,
            drawerLabel: 'Torneos',
            drawerIcon: ({ tintColor }) => (
               <Icon name="md-basketball" type="ionicon" color={tintColor} />
            ),
         }),
      },
      TabEquipos: {
         screen: TabEquipos,
         navigationOptions: ({ navigation }) => ({
            headerTitle: () => <HeaderEdit nav={navigation} />,
            headerStyle: {
               backgroundColor: '#f4511e',
            },
         }),
      },
      PerfilTorneo: {
         screen: PerfilTorneoScreen,
      },
      InfoPerfilTorneo: {
         screen: InfoPerfilTorneoScreen,
      },
      CrearFecha: {
         screen: CrearFechaScreen,
      },
      Partidos: {
         screen: PartidosScreen,
      },
      EditarPartido: {
         screen: EditarPartidoScreen,
      },
      CargarImagen: {
         screen: CargarImagenScreen,
      },
      CrearEquipos: {
         screen: CrearEquiposScreen,
      },
   },
   { initialRouteName: 'TabTorneos' }
);

const LoginStack = createStackNavigator({ LoginScreen });
const VocaliaStack = createStackNavigator({ VocaliaScreen });
const MainNavigator = Platform.select({
   //ios: createBottomTabNavigator({LoginStack }),
   android: createDrawerNavigator({
      TorneosRootStack: {
         screen: TorneosRootStack,
         navigationOptions: {
            drawerLabel: 'Torneos',
            drawerIcon: ({ tintColor }) => (
               <Icon name="md-basketball" type="ionicon" color={tintColor} />
            ),
         },
      },
      LoginScreen: {
         screen: LoginScreen,
         navigationOptions: {
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
               <Icon name="md-cog" type="ionicon" color={tintColor} />
            ),
         },
      },
      VocaliaScreen: {
         screen: VocaliaScreen,
         navigationOptions: {
            drawerLabel: 'Vocalia',
            drawerIcon: ({ tintColor }) => (
               <Icon name="md-cog" type="ionicon" color={tintColor} />
            ),
         },
      },
   }),
});

const RootSwitch = createSwitchNavigator(
   { MainNavigator, TabEquipos },
   { initialRouteName: 'MainNavigator' }
);

export default createAppContainer(RootSwitch);
