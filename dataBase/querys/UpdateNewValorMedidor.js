import OpenconectionItems from "../connect/OpenconectionItems"

const db = OpenconectionItems()

export default function UpdateNewValorMedidor({iData, valorMedidor, empresa, DatdaMedDateNow, ModifiData_, setModifiData_}) {
  
    console.log(iData['id'], iData['v_ant'], valorMedidor, empresa, DatdaMedDateNow)

    db.transaction(
      (tx) => {
        tx.executeSql(`update items set done = 1, v_new = ?, fecha_new = ? where id = ?;`, [
          valorMedidor,DatdaMedDateNow,iData.id
        ]);
      }, null,setModifiData_(ModifiData_+1)
    )

    return
    
}

