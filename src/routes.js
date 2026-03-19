import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useTheme } from './contexts/ThemeContext';

import Home from './pages/Home';
import Investments from './pages/Investments';
import Settings from './pages/Settings';

const Tab = createBottomTabNavigator();

export default function Routes() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size + 2} />
          )
        }}
      />
      <Tab.Screen 
        name="Investments" 
        component={Investments} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" color={color} size={size + 2} />
          )
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size + 2} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
