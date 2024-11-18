import * as React from 'react';
// import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Profil from './App';
import Createdata from './Createdata';
import DataMahasiswa from './Listdata';
import Editdata from './Editdata';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faGraduationCap, faPenToSquare, faGithub} from '@fortawesome/free-solid-svg-icons';
import {WebView} from 'react-native-webview';

function HomeScreen() {
  return <Createdata />;
}

function DataMahasiswaScreen() {
  return <DataMahasiswa />;
}

function EditDataMahasiswaScreen() {
  return <Editdata />;
}

function WebScreen() {
  return <WebView source={{uri: 'https://github.com/mifffth'}} />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Form"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faUser} color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="Data Mahasiswa"
          component={DataMahasiswaScreen}
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faGraduationCap} color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="Edit data"
          component={EditDataMahasiswaScreen}
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faPenToSquare} color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="GitHub"
          component={WebScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
              <FontAwesomeIcon icon={faGithub} color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
