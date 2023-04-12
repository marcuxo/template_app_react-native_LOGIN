import React, { useEffect, useState } from 'react'
import { FormatNumeral } from './FormatNumbers'
import { View,Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native'
// icons
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper';
import UpdateNewValorMedidor from '../dataBase/querys/UpdateNewValorMedidor';

export default function SaveNewValueMed({itm,DatdaMedDateNow, empresa, ModifiData, setModifiData}) {
  // console.log('datos modificadisimos modal',ModifiData)

  const [modalVisible, setModalVisible] = useState(false);
  const [valorMedidor, setvalorMedidor] = useState(null);
  const [isEmptyInp, setIsEmptyInp] = useState(true);
  const [ModifiData_, setModifiData_] = useState(0);

  const SaveValorMedidor = async (iData) => {
    // setCountDone(CountDone + 1)
    // Alert.alert('Alerta Medidor!!',`Valor Guardado!!`)
    // setModifiData(ModifiData+1)
    await UpdateNewValorMedidor({iData, valorMedidor, empresa,DatdaMedDateNow, ModifiData_, setModifiData_, empresa});//crear metodo
    setModalVisible(false);
  }

  const HandleModalValue = async (text) => {
    let regIs = /^[0-9]+$/; //validacion regex de solo numeros
    if(regIs.test(text)){
      if(text.length>0)setIsEmptyInp(false)
      else setIsEmptyInp(true)
    }else setIsEmptyInp(true)
    
    setvalorMedidor(text)
  }

  useEffect(() => {
    setModifiData(ModifiData+1)
  }, [ModifiData_])
  

  return (
    <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
       <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("La Ventana se cerro!");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20 }}>{empresa}</Text>
          <SimpleLineIcons name="speedometer" size={45} color="black" />
            <Text style={{ fontSize: 20 }}>{itm.item}</Text>
            <Text style={{ fontSize: 15, color: 'gray' }}>{itm.fecha_ant} - {FormatNumeral(itm.v_ant)}</Text>
            <Text style={{ fontSize: 15, color: 'fuchsia' }}></Text>
            <View style={styles.inner}>
              <TextInput
                dense={true}
                left={<TextInput.Icon icon='speedometer' />}
                mode='outlined'
                label={"Valor Medidor"}
                style={styles.valorum}
                textContentType='none'
                keyboardType='phone-pad'
                value={valorMedidor}
                onChangeText={(text)=>HandleModalValue(text)}
              />
            </View>
            <Text></Text>
            <View style={styles.btninlie}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Button
                  style={styles.btnInner}
                  buttonColor='orange'
                  mode='contained'>
                  <Text>Cancelar</Text>
                </Button>
              </TouchableOpacity>
                <Button
                  onPress={() => SaveValorMedidor(itm)}
                  style={styles.btnInner}
                  disabled={isEmptyInp}
                  buttonColor='green'
                  mode='contained'
                >
                  <Text>Guardar</Text>
                </Button>
            </View>
        </View>
      </Modal>
      <View key={itm.id} style={itm.done===0?styles.container_card_nodata:styles.container_card_success}>
        <Text style={itm.done===0?styles.title_card_nodata:styles.title_card_success}>{itm.id}.- {itm.item} <AntDesign name="dashboard" color={itm.done===0?"#FFE405":"#505050"} /></Text>
        <Text style={itm.done===0?styles.paraf_card_nodata:styles.paraf_card_success}>
          {itm.fecha_ant}<MaterialIcons name="double-arrow" color={itm.done===0?"#FFE405":"#505050"} />{FormatNumeral(itm.v_ant)}
          <MaterialIcons name="space-bar" size={24} color={itm.done===0?"#FFE405":"#505050"} />
          {DatdaMedDateNow}<MaterialIcons name="double-arrow" color={itm.done===0?"#FFE405":"#505050"} />{itm.v_new===null?0:FormatNumeral(itm.v_new)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container_card_success: {
    marginBottom: 3,
    borderRadius: 5,
    padding:5,
    // backgroundColor: '#FB4038',//nodata
    backgroundColor: '#5FCF3A',//success
    borderColor: '#CACACA',
  },
  container_card_nodata: {
    marginBottom: 3,
    borderRadius: 5,
    padding:5,
    backgroundColor: '#FB4038',//nodata
    // backgroundColor: '#5FCF3A',//success
    borderColor: '#CACACA',
  },
  title_card_success: {
    fontWeight: '700',
  },
  paraf_card_success: {
    color: '#000'
  },
  title_card_nodata: {
    fontWeight: '700',
    color: '#FFE405'
  },
  paraf_card_nodata: {
    color: '#FFE405'
  },
  text_white: {
    color: '#ffffff'
  },
  btninlie: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnInner: {
    marginHorizontal: 15,
  },
  valorum: {
    width: '90%',
    marginVertical: 5
  },
  inner: {
    width: '100%',
    alignItems: 'center',
  }
})
