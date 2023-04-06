import React from 'react'
import { StyleSheet } from 'react-native';
import { Text } from 'react-native'
import { View } from 'react-native'

export default function Home({ route, navigation }) {
  const {empresa} = route.params;
  console.log('data==>>>', empresa)
  return (
    <View style={styles.container}>
      <Text>HOME {empresa}</Text>
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
