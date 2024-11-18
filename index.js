/**
 * @format */

import {AppRegistry} from 'react-native';
// default
// import App from './App';

// buat form mahasiswa
import App from './CrudMahasiswaNav.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
