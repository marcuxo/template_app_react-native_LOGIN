import React from 'react'
import OpenconectionItems from '../connect/OpenconectionItems';
const db = OpenconectionItems();

export default function DelDataItemsDB() {
  db.transaction(
    (tx) => {
      tx.executeSql(`DROP TABLE items`);
      tx.executeSql(
        "create table if not exists items (id integer primary key not null,item text,v_ant int,v_new int,fecha_ant text,fecha_new text, empresa text, done int);"
      );
    },
    null,
  )
}
