import React from 'react'
import { URL_SRV } from '../url/Url';

export default function GetMedidorsOnSRV({EMPRESA}) {
  return new Promise(async (resolve, reject) => {
    let query = await fetch(URL_SRV+'getlismedidores',{
      method: 'POST',
      headers: {
        'authorization': "paico2021",
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        EMPRESA
      })
    })
    let responsito = await query.json();

    if(responsito.data.success){
      resolve(responsito.data.body)
    }else{
      resolve(responsito.data)
    }
  })
}