import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Profil from './App';
import Createdata from './Createdata';
import DataMahasiswa from './Listdata';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


function HomeScreen() {
  return (
  <Createdata/>
  );
}

function DataMahasiswaScreen() {
  return (
    <DataMahasiswa/>
  );
}

function WebScreen() {
  return (
    <WebView
    source={{ uri: 'https://github.com/mfffth' }}  />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => ( 
          <FontAwesomeIcon icon={faUser} color={color} size={20}/>)}}/>
        <Tab.Screen name="Data Mahasiswa" component={DataMahasiswaScreen}
        options={{
          tabBarIcon: ({ color }) => ( 
          <FontAwesomeIcon icon={faGraduationCap} color={color} size={20}/>)}}/>
        <Tab.Screen name="GitHub" component={WebScreen}
        options={{ headerShown: false,

          tabBarIcon: ({ color }) => ( 
          <FontAwesomeIcon icon={faGithub} color={color} size={20}/>)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}