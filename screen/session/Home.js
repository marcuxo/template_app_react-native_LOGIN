import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native'
import { ScrollView } from 'react-native';
import { View } from 'react-native'
import { Button, ProgressBar } from 'react-native-paper';
import GetMedidorsOnSRV from '../../api/GetMedidorsOnSRV';
import DelDataItemsDB from '../../dataBase/querys/DelDataItemsDB';
import GetDataStartUserDb from '../../dataBase/querys/GetDataStartUserDb';
import ObteainDataItemsFrom from '../../dataBase/querys/ObteainDataItemsFrom';

//timer to refresh app
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home({ route, navigation }) {
  const {empresa} = route.params;
  console.log('data==>>>', empresa)

  const [DataUserStart, setDataUserStart] = useState('');
  const [CountDone, setCountDone] = useState(50);
  const [refreshing, setRefreshing] = useState(false);

  // modulo que recarga pa pagina al haces swip down
  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const GetDataFromSrvMedidors = async () => {
    await ObteainDataItemsFrom({EMPRESA:empresa})
    // let medidores = await GetMedidorsOnSRV({EMPRESA:empresa})
    // console.log(medidores)
  }

  const dropDataBase = async () => {
    await DelDataItemsDB()
    Alert.alert("Meidores","Los datos Fueron Borrados")
  }

  useEffect(() => {
    GetDataStartUserDb({setDataUserStart})
    GetDataFromSrvMedidors()
  }, [])
  
  return (
    <View style={{flex:1,paddingTop:29}}>
      <ProgressBar progress={CountDone/100} color={'purple'} />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      <View style={styles.container}>
        <Text>HOME {empresa}</Text>
        <Text>Uer: {DataUserStart?.nombre}</Text>
        <View style={styles.valorumain}>
          <TouchableOpacity
            onPress={()=>dropDataBase()}
          >
            <Button
              mode='contained'
              icon='account-lock-open'
              buttonColor={'#181C7C'}
            >
              <Text style={{color: '#FFFFFF'}}>Clear DataBase </Text>
            </Button>
          </TouchableOpacity>
          
        </View>
      </View>
      </ScrollView>
    </View>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  titlemed: {
    fontSize: 30,
    fontWeight: '600',
  },
  carditem:{
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 5,
  },
  cartitle:{
    fontWeight: '800',
    color: '#fff'
  },
  cardvalues:{
    color: '#fff'
  },
  screen: {
    paddingVertical: 15,
    paddingHorizontal: 5
  },
  header: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BA2722',//dfdfdf
    height: 25,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  themeSucces: {backgroundColor:"#239B56", padding: 5, borderRadius:5},
  themeWrong: {backgroundColor:"#E74C3C", padding: 5, borderRadius:5}
})
