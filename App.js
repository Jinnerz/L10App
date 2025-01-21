import React,{useState, useEffect} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';

let originalData = [];

const styles = StyleSheet.create({
    CatBox: {
        borderWidth: 1,
        marginBottom: 10
    },
    CatName: {
        backgroundColor: 'black',
        padding: 10
    },
    CatDetails: {
        backgroundColor: 'papayawhip',
        padding: 10
    },
    CatDetails2: {
        backgroundColor: 'peachpuff',
        padding: 10
    }
})
const App = () => {
  const [mydata, setMyData] = useState([]);

  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=catbreeds&format=json&case=default")
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          if (originalData.length < 1) {
            setMyData(myJson);
            originalData = myJson;
          }
        })
  }, []);

  //for search bar
  const FilterData = (text) => {
    if (text != '') {
      let myFilteredData = originalData.filter((item) =>
          item.BreedName.includes(text));
      setMyData(myFilteredData);
    }
    else {
      setMyData(originalData);
    }
  }

  // BreedName, Origin, OriginLocation, CoatType, ID
  const renderItem = ({item, index}) => {
    return (
        <View style={styles.CatBox}>
            <View style={styles.CatName}>
                <Text style={{fontWeight: 'bold', color: 'white', textAlign: 'center'}}>{item.BreedName}</Text>
            </View>

            <View style={styles.CatDetails}>
                <Text>Origin: {item.Origin}</Text>
            </View>

            <View style={styles.CatDetails2}>
                <Text>Origin Location: {item.OriginLocation}</Text>
            </View>

            <View style={styles.CatDetails}>
                <Text>Coat Type: {item.CoatType}</Text>
            </View>

        </View>
    );
  };

  return (
      <View style={{padding: 10}}>
          <StatusBar/>

          <View style={{backgroundColor: 'black', padding: 10}}>
              <Text style={{textAlign: 'center', color: 'orange'}}>The Cat Wikipedia</Text>
          </View>

          <View style={{marginBottom: 10, marginTop: 10}}>
              <TextInput style={{borderWidth:1}} placeholder="Search by name..." onChangeText={(text) =>{FilterData(text)}}/>
          </View>

          <FlatList data={mydata} renderItem={renderItem} />
      </View>
  );
}

export default App;

