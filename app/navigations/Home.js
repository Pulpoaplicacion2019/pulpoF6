import React from 'react';
import {
   createAppContainer,
   createSwitchNavigator,
   NavigationTransitionProps,
   StackViewTransitionConfigs,
   TabScene,
   TransitionConfig,
} from 'react-navigation';
import { Platform } from 'react-native';
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

import CalendariosScreen from '../screens/Calendario';
import CrearFechaScreen from '../screens/CrearFecha';
import PartidosScreen from '../screens/PartidosV2';
import EditarPartidoScreen from '../screens/EditarPartido';
import CrearPartidoScreen from '../screens/CrearPartido';
import EquiposScreen from '../screens/Equipos/Equipos';
import PosicionesScreen from '../screens/Posiciones';
import ResultadosScreen from '../screens/Resultados';

import PerfilTorneoScreen from '../screens/Torneos/PerfilTorneo';
import InfoPerfilTorneoScreen from '../screens/Torneos/InfoPerfilTorneo';
import CargarImagenScreen from '../components/CargarImagen';
import CrearEquiposScreen from '../screens/Equipos/CrearEquipos';
import ItemEquiposScreen from '../components/ItemEquipos';
import InfoEquiposScreen from '../screens/Equipos/InfoEquipos';
import CrudJugadoresScreen from '../screens/Jugadores/CrudJugadores';
import CrearJugadoresScreen from '../screens/Jugadores/CrearJugadores';
import ItemJugadoresScreen from '../components/ItemJugadoresEquipo';
import ItemPerfilesScreen from '../components/ItemPerfiles';

import LoginScreen from '../screens/Login/Login';
import ResetScreen from '../screens/Login/ResetPassword';
import VocaliaJugadoresScreen from '../screens/JugadoresPartido';
import VocaliaScreen from '../screens/vocalia';
import RankingScreen from '../screens/Ranking';
import CanchasScreen from '../screens/crearCanchas';
import PerfilesUsuariosScreen from '../screens/Login/PerfilesUsuarios';
import ModificarPerfilScreen from '../screens/Login/ModificarPerfil';

import PartidosMejorJugadorScreen from '../screens/PartidoMejorJugador';

// importación del archivo de colores
import * as COLOR from '../constants/colors.js';

const TabTorneos = createBottomTabNavigator(
   {
      MisTorneos: { screen: MisTorneosScreen },
      EnCurso: { screen: EnCursoScreen },
      PorIniciar: { screen: PorIniciarScreen },
      Favoritos: { screen: FavoritosScreen },
   },
   {
      initialRouteName: 'MisTorneos',
      tabBarOptions: {
         inactiveTintColor: COLOR.COLOR_SECUNDARIO,
         activeTintColor: COLOR.COLOR_PRINCIPAL,
      },
   }
);

const TabEquipos = createBottomTabNavigator(
   {
      Calendario: { screen: CalendariosScreen },
      Equipos: { screen: EquiposScreen },
      Posiciones: { screen: PosicionesScreen },
      Resultados: { screen: ResultadosScreen },
   },
   {
      initialRouteName: 'Calendario',
      tabBarOptions: {
         inactiveTintColor: COLOR.COLOR_SECUNDARIO,
         activeTintColor: COLOR.COLOR_PRINCIPAL,
      },
   }
);

const TorneosRootStack = createStackNavigator(
   {
      TabTorneos: {
         screen: TabTorneos,
         navigationOptions: ({ navigation }) => ({
            title: 'TORNEOS',
            headerStyle: {
               backgroundColor: COLOR.COLOR_PRINCIPAL,
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
               backgroundColor: COLOR.COLOR_PRINCIPAL,
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
      ResetPassword: {
         screen: ResetScreen,
      },
      ItemEquipos: {
         screen: ItemEquiposScreen,
      },
      InfoEquipos: {
         screen: InfoEquiposScreen,
      },
      CrudJugadores: {
         screen: CrudJugadoresScreen,
      },
      CrearJugadores: {
         screen: CrearJugadoresScreen,
      },
      ItemJugadores: {
         screen: ItemJugadoresScreen,
      },
      CrearPartido: {
         screen: CrearPartidoScreen,
      },
      Vocalia: {
         screen: VocaliaScreen,
      },
      MejorJugador: {
         screen: PartidosMejorJugadorScreen,
      },
      Canchas: {
         screen: CanchasScreen,
      },
      ItemPerfiles: {
         screen: ItemPerfilesScreen,
      },
      ModificarPerfil: {
         screen: ModificarPerfilScreen,
      },
   },
   { initialRouteName: 'TabTorneos' }
);

const LoginStack = createStackNavigator({ LoginScreen });
const VocaliaJugadoresStack = createStackNavigator({ VocaliaJugadoresScreen });
const RankingStack = createStackNavigator({ RankingScreen });
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
      },
      VocaliaJugadoresScreen: {
         screen: VocaliaJugadoresScreen,
      },
      RankingScreen: {
         screen: RankingScreen,
      },
      PerfilesUsuariosScreen: {
         screen: PerfilesUsuariosScreen,
      },
   }),
});

const RootSwitch = createSwitchNavigator(
   { MainNavigator, TabEquipos },
   { initialRouteName: 'MainNavigator' }
);

export default createAppContainer(RootSwitch);
