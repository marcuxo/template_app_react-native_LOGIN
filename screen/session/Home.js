import React, { useCallback, useEffect, useState } from 'react'
import {  RefreshControl } from 'react-native';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native'
import { ScrollView } from 'react-native';
import { View } from 'react-native'
import { Button, ProgressBar } from 'react-native-paper';
import GetMedidorsOnSRV from '../../api/GetMedidorsOnSRV';
import DelDataItemsDB from '../../dataBase/querys/DelDataItemsDB';
import GetDataStartUserDb from '../../dataBase/querys/GetDataStartUserDb';
import ObteainDataItemsFrom from '../../dataBase/querys/ObteainDataItemsFrom';
import NetInfo from '@react-native-community/netinfo';
import SaveNewValueMed from '../../components/SaveNewValueMed';
// icons
import { Foundation } from '@expo/vector-icons';

//timer to refresh app
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function Home({ route, navigation }) {
  const {empresa} = route.params;

  const [DataUserStart, setDataUserStart] = useState('');
  const [CountDone, setCountDone] = useState(50);
  const [refreshing, setRefreshing] = useState(false);
  const [DataMedidor, setDataMedidor] = useState([]);
  const [DatdaMedDateNow, setDatdaMedDateNow] = useState('0000-00-00');
  const [IsConnet, setIsConnet] = useState(false);
  const [ModifiData, setModifiData] = useState(0);


  // modulo que recarga pa pagina al haces swip down
  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    // console.log('data==>>>', empresa)
    GetDataFromSrvMedidors();
    
    wait(2000).then(() => setRefreshing(false));
  }, []);

  setInterval(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnet(state.isConnected);
      // console.log(state.type,state.isConnected)
    })
    unsubscribe()
  }, 10000);

  const GetDataFromSrvMedidors = async () => {
    let data = await ObteainDataItemsFrom({EMPRESA:empresa})
    console.log('data==||>>>',data.length)
    if(data.length == 0){
      Alert.alert('Medidores','No se encontraron medidores vuelva a recargar 🙄')
    }else{
      setDataMedidor(data)
    }
    // let medidores = await GetMedidorsOnSRV({EMPRESA:empresa})
    // console.log(medidores)
  }

  const dropDataBase = async () => {
    await DelDataItemsDB()
    Alert.alert("Meidores","Los datos Fueron Borrados")
  }

  useEffect(() => {
    GetDataStartUserDb({setDataUserStart});
    GetDataFromSrvMedidors();
  }, [])

  useEffect(() => {
    GetDataFromSrvMedidors();
    console.log('se modifico el dato del dato con el numero')
  }, [ModifiData])

  useEffect(() => {
    let fecha = new Date()
    let a = fecha.toISOString()
    setDatdaMedDateNow(a.split('T')[0])
  }, [])
  
  
  return (
    <View style={{flex:1,paddingTop:29}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      <View style={styles.container_user}>
        <Text>User: {DataUserStart?.nombre}</Text>
        <Text>Empresa: {empresa}</Text>
        
      </View>
      <View style={styles.container_body_med}>
        {
          DataMedidor.map(itm=>

            <SaveNewValueMed
              key={itm.id}
              itm={itm}
              DatdaMedDateNow={DatdaMedDateNow}
              empresa={empresa}
              ModifiData={ModifiData}
              setModifiData={setModifiData}
            />
          
          )
        }
      </View>
        <View style={styles.container_body}>
          <TouchableOpacity
            onPress={()=>dropDataBase()}
          >
            <Button
              mode='contained'
              icon='account-lock-open'
              buttonColor={'#181C7C'}
            >
              <Text style={{color: '#FFFFFF'}}>Borrar BaseDeDatos!! </Text>
            </Button>
          </TouchableOpacity>
          <Text>
            <Foundation name="mobile-signal" size={24} color={IsConnet?'green':'red'} />
          </Text>
        </View>
        <View style={styles.container_body}>
          <Text>
            <Foundation name="mobile-signal" size={24} color={IsConnet?'green':'red'} />
          </Text>
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
  container_user: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10
  },
  container_card: {
    // flex: 1,
    // alignItems: 'center',
    // paddingVertical: 10
    borderWidth: 2,
    marginBottom: 3,
    borderRadius: 5,
    paddingHorizontal:5,
    backgroundColor: '#E5E5E5',
    borderColor: '#CACACA'
  },
  container_body: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10
  },
  container_body_med: {
    flex: 1,
    // alignItems: 'center',
    paddingVertical: 10
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
