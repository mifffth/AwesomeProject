import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUserGraduate,
  faMars,
  faVenus,
} from '@fortawesome/free-solid-svg-icons';

const Listdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  // memuat data dari API
  useEffect(() => {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setDataUser(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  //function
  function refreshPage() {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setDataUser(json);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  function deleteData(id) {
    fetch(jsonUrl + '/' + id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        alert('Data terhapus');
        refreshPage();
      });
  }

  //ngatur tampilan
  return (
    <SafeAreaView>
      {isLoading ? (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.cardtitle}>Loading...</Text>
        </View>
      ) : (
        <View>
          <FlatList
            style={{marginBottom: 0}}
            data={dataUser}
            onRefresh={() => {
              refreshPage();
            }}
            refreshing={refresh}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'google.navigation:q=' +
                        item.latitude +
                        ',' +
                        item.longitude,
                    )
                  }>
                  <View style={styles.card}>
                    <View style={styles.avatar}>
                      <FontAwesomeIcon
                        icon={faUserGraduate}
                        size={50}
                        color={item.gender == 'Male' ? 'blue' : 'magenta'}
                      />
                    </View>
                    <View style={{flexShrink: 1}}>
                      <Text style={styles.cardtitle}>
                        {item.first_name} {item.last_name}
                      </Text>
                      <FontAwesomeIcon
                        icon={item.gender == 'Male' ? faMars : faVenus}
                        color={item.gender == 'Male' ? 'blue' : 'magenta'}
                        size={20}
                      />
                      <Text>{item.class}</Text>
                      <Text>{item.email}</Text>
                      <Text>
                        {item.latitude}, {item.longitude}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={styles.form}>
                  <Button
                    title="Hapus"
                    onPress={() =>
                      Alert.alert(
                        'Hapus data',
                        'Yakin akan menghapus data ini?',
                        [
                          {
                            text: 'Tidak',
                            onPress: () => console.log('button tidak'),
                          },
                          {text: 'Ya', onPress: () => deleteData(item.id)},
                        ],
                      )
                    }
                    color={'red'}
                  />
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Listdata;

const styles = StyleSheet.create({
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    borderRadius: 100,
    width: 80,
  },
  cardtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  card: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 7,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
  },
});
