import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Text } from 'react-native'
import { View } from 'react-native'
import GetMedidorsOnSRV from '../../api/GetMedidorsOnSRV';
import GetDataStartUserDb from '../../dataBase/querys/GetDataStartUserDb';
import ObteainDataItemsFrom from '../../dataBase/querys/ObteainDataItemsFrom';

export default function Home({ route, navigation }) {
  const {empresa} = route.params;
  console.log('data==>>>', empresa)

  const [DataUserStart, setDataUserStart] = useState('')

  const GetDataFromSrvMedidors = async () => {
    await ObteainDataItemsFrom({EMPRESA:empresa})
    // let medidores = await GetMedidorsOnSRV({EMPRESA:empresa})
    // console.log(medidores)
  }

  useEffect(() => {
    GetDataStartUserDb({setDataUserStart})
    GetDataFromSrvMedidors()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text>HOME {empresa}</Text>
      <Text>Uer: {DataUserStart?.nombre}</Text>
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
