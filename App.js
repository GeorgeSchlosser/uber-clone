import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import { Button } from 'react-native';
export default function App() {
 const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
 });

 useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
}, []);

const onRegionChange = region => {
  setPosition({
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta: region.latitudeDelta,
    longitudeDelta: region.longitudeDelta,
  })
}
  
return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={position}
        region={position}
        onRegionChangeComplete={onRegionChange}>
        <Marker 
            coordinate={{
              latitude: position.latitude, 
              longitude: position.longitude
            }} 
            tracksViewChanges={true}>
          </Marker>
      </MapView>
      <View style={styles.pickupButton}>
        <Button title="Request pickup"/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  pickupButton:{
    position: 'absolute',
    top: '90%', 
    alignSelf: 'center', 
    width: '80%'
  },
});