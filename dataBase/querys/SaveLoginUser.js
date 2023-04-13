import React from 'react'
import { Alert } from 'react-native';
import OpenconectionUser from '../connect/OpenconectionUser';

const db = OpenconectionUser();
const url = 'https://apimedidores.apidev.info'
const NAMEAPP = 'ANDROID_MEDICONTROL'

export default function SaveLoginUser({LoginData, setIsLoading, navigation}) {
  let setIsLogin = [];

  // modulo que modifica la hora a la hora local
  const fecha = new Date();
  // console.log('fecha=>>', fecha)
  let changUtc = fecha.setHours(fecha.getHours()-3)//esta linea modifica el utc(3) cambiar segun utc local
  let fecha_N = new Date(changUtc)
  let fecha_ = fecha_N.toISOString()
  let fecha_log = fecha_N.toISOString().split('T')[0]
  let fecha_e = fecha_N.setDate(fecha_N.getDate()+1)//esta linea agrega un dia a ala fecha para generar una fecha de vencimiento de login
  let fecha_exp = new Date(fecha_e).toISOString()
  // console.log(fecha_)
  // console.log(fecha_log)
  // console.log(fecha_exp)
  let name_ = LoginData.user+''
  let name = name_.split('@',1)[0]//saca el nombre del correo
  
  const FunctionOutSide = async (tx, res) => {
    // console.log('lengt=>>',res.rows._array.length)
    // console.log("FNC=>",LoginData.pass, res.rows._array)
    if(res.rows._array.length>0) {//logica para comprobar las credenciales guardadas en local
      // console.log('hay session iniciada', res.rows._array[0].id);
      if(res.rows._array[0].correo === LoginData.user.toLowerCase() && res.rows._array[0].password === LoginData.pass){
        db.transaction(
          (tx) => {
            tx.executeSql(`UPDATE user SET fecha = '${fecha_}', fecha_log = '${fecha_log}', fecha_exp = '${fecha_exp}', state = 1 WHERE id = ${res.rows._array[0].id};`);
          },
          null,
        )
        // console.log('uno')
        navigation.navigate('home',{empresa:res.rows._array[0].empresa});
        setIsLoading(false);
        return
      }else{
        Alert.alert( `⚠ Medidores ⚠`,`El usuario o la clave son incorrectos, verifiquelos.`);
        setIsLoading(false)
      }
      
    }else{//logica para comprobar credenciales en servidor una vez se debe ejecutar luego debe verificar en local
      // console.log('NO!! hay session iniciada');
    // add logica de fetch al server
      // console.log("not login=>",LoginData.user.toLowerCase(),LoginData.pass)
      const query = await fetch(url+'/signin',{
        method: 'POST',
        headers: {
          'authorization': NAMEAPP,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: LoginData.user.toLowerCase(),
          clave: LoginData.pass
        })
      })

      const reqkkst = await query.json();
      // console.log('recuestes=>>>>>>>',reqkkst.data.success)
      if(reqkkst.data.success){
        db.transaction(
          (tx) => {
            tx.executeSql("insert into user (correo,nombre,password,fecha,fecha_log,fecha_exp,empresa,state) values (?, ?, ?, ?, ?, ?, ?, 1)",
            [LoginData.user.toLowerCase(),reqkkst.data.nombre,LoginData.pass,fecha_,fecha_log,fecha_exp,reqkkst.data.empresa]);
          },
          null,
        );
        // console.log('dos')
        navigation.navigate('home',{empresa:reqkkst.data.empresa});
        setIsLoading(false);
      }else{
        setIsLoading(false)
        Alert.alert( `⚠ Medidores ⚠`,`El usuario o la clave son incorrectos, verifiquelos.`);
      }      
    }
    return 'retorno de funcion login'
  }

  const initLogin = async () => {
    db.transaction(async(tx) => {
      // tx.executeSql("select * from user", [], (tx, res){
      tx.executeSql("select * from user", [],function(tx, res){FunctionOutSide(tx, res)});
    });
  }
  initLogin()
  
}
