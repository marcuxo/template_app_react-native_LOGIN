# new method to make app in ReactNative with expo


```cmd
npx create-expo-app
```

```cmd
eas build:configure
```

## settings to upload without reinstall
```cmd
eas update --channel preview --message "Fixes typo"
```

```cmd
eas update
```


```node
  //agregar en eas.json en el perfil preview lo siguiente
"preview": {
  "distribution": "internal",
  "android": {
    "buildType": "apk"
  }
},
```

```cmd
eas build -p android --profile preview //se le asigna el perfil
```

# SUMMARY ************************************************

```cmd
npx expo install expo-updates
```

```cmd
expo prebuild
```

```cmd
eas update:configure
```

```cmd
eas build:configure
```

```cmd
eas build --platform android --profile preview
```

```cmd
//genera cambios en ejecucion
eas update --branch preview --message "Updating the app"
```
```cmd
eas update
```

## last comand success fot build

```cmd
eas build --profile preview --platform android
```