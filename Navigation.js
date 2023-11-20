import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//screens
import FavoriteScreen from "./screens/FavoriteScreen";
import AboutScreen from "./screens/AboutScreen";
import SearchScreen from "./screens/SearchScreen";
import ViewScreen from "./screens/ViewScreen";
import PoularScreen from "./screens/PoularScreen";
import DetailScreen from "./screens/DetailScreen";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="Favoritos"
        >
            <HomeStackNavigator.Screen
                name="Favoritos"
                component={FavoriteScreen}
            />
           
            <HomeStackNavigator.Screen
                name="Buscar"
                component={SearchScreen}
                options={{
                    headerBackTitleVisible: false,
                }}
            />
            <HomeStackNavigator.Screen
                name="Ver"
                component={ViewScreen}
                options={{
                    headerBackTitleVisible: false,
                }}
            />
            
        </HomeStackNavigator.Navigator>
    )
}   


function MyStack2() {
    return (
        <HomeStackNavigator.Navigator
            initialRouteName="Favoritos"
        >
           
            <HomeStackNavigator.Screen
                name="Popular"
                component={PoularScreen}
                
            />
            <HomeStackNavigator.Screen
                name="Detalles"
                component={DetailScreen}
                options={{
                    hheaderBackTitleVisible: false,
                    headerBackTitle: 'Back',
                }}
            />
        </HomeStackNavigator.Navigator>
    )
}   


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions= {{
            tabBarActiveTintColor: '#ED2B2A',
        }}
      >
        <Tab.Screen 
            name="Poular" 
            component={MyStack2}
            options={{
                tabBarLabel: 'Popular',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="fire" color={color} size={30} />
                ),
                headerShown: false,
            }}
        />
        <Tab.Screen 
            name="Home" 
            component={MyStack} 
            options={{
                tabBarLabel: 'Favoritos',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="favorite" color={color} size={30} />
                ),
                //tabBarBadge: 0,//notificacion
                headerShown: false,
            }}
        />
         
        <Tab.Screen 
            name="Acerca de" 
            component={AboutScreen}
            options={{
                tabBarLabel: 'Acerca de',
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="info-with-circle" color={color} size={30} />
                ),
            }}
        />
    </Tab.Navigator>
    );
}


export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}