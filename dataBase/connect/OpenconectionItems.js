import React from 'react'
import * as SQLite from 'expo-sqlite'

export default function OpenconectionItems() {
  function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }

    const db = SQLite.openDatabase("itms_arta.db");

    function writenn(){
      db.transaction((tx) => {
        tx.executeSql(
          "create table if not exists items (id integer primary key not null,item text,v_ant int,v_new int,fecha_ant text,fecha_new text, empresa text, done int);"
        );
      });
    }
    writenn()
    
    return db;

  }

  return openDatabase()
}
