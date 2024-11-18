import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const EditDataMahasiswa = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [kelas, setKelas] = useState('');
  const [jeniskelamin, setJeniskelamin] = useState('');
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('');
  const [dataUser, setDataUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const selectItem = (item) => {
    setSelectedUser(item);
    setName(item.name);
    setNim(item.nim);
    setKelas(item.kelas);
    setJeniskelamin(item.jeniskelamin);
    setColor(item.color);
    setIcon(item.icon);
  };

  const submit = () => {
    const data = {
      name,
      nim,
      kelas,
      jeniskelamin,
      color,
      icon,
    };

    fetch(`http://10.0.2.2:3000/mahasiswa/${selectedUser.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        alert('Data tersimpan');
        setName('');
        setNim('');
        setKelas('');
        setJeniskelamin('');
        setColor('');
        setIcon('');
        refreshPage();
      });
  };

  const refreshPage = () => {
    setRefresh(true);
    // Fetch data logic here
    setRefresh(false);
  };

  return (
    <SafeAreaView>
      <View>
        {isLoading ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.cardtitle}>Loading...</Text>
          </View>
        ) : (
          <View>
            <ScrollView>
              <View>
                <Text style={styles.title}>Edit Data Mahasiswa</Text>
                <View style={styles.form}>
                  <TextInput
                    placeholder="Nama"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="NIM"
                    value={nim}
                    onChangeText={setNim}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Kelas"
                    value={kelas}
                    onChangeText={setKelas}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Jenis Kelamin"
                    value={jeniskelamin}
                    onChangeText={setJeniskelamin}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Warna (HEX)"
                    value={color}
                    onChangeText={setColor}
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Icon (Fontawesome 5)"
                    value={icon}
                    onChangeText={setIcon}
                    style={styles.input}
                  />
                  <Button title="Edit" style={styles.button} onPress={submit} />
                </View>
              </View>
              <FlatList
                style={{ marginBottom: 10 }}
                data={dataUser}
                onRefresh={refreshPage}
                refreshing={refresh}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => selectItem(item)}>
                    <View style={styles.card}>
                      <View style={styles.avatar}>
                        <FontAwesome5 name={item.icon} size={50} color={item.color} />
                      </View>
                      <View>
                        <Text style={styles.cardtitle}>{item.name}</Text>
                        <Text>{item.nim}</Text>
                        <Text>{item.kelas}</Text>
                        <Text>{item.jeniskelamin}</Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <FontAwesome5 name="edit" size={20} />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EditDataMahasiswa;

const styles = StyleSheet.create({
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    padding: 10,
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    marginRight: 10,
  },
  cardtitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
