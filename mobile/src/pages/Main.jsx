import React, { useEffect, useState } from "react"
import MapView, { Marker, Callout } from "react-native-maps"
import { StyleSheet, Image, View, Text } from "react-native"
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location"

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null)

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync()
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        })
        const { latitude, longitude } = coords
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      }
    }
    loadInitialPosition()
  }, [])

  if (!currentRegion) {
    return null
  }

  return (
    <MapView initialRegion={currentRegion} style={styles.map}>
      <Marker coordinate={{ latitude: -12.934351, longitude: -38.4149727 }}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://avatars3.githubusercontent.com/u/42522040?s=460&v=4"
          }}
        />
        <Callout
          onPress={() => {
            navigation.navigate("Profile", { githubUsername: "Snahier" })
          }}
        >
          <View style={styles.callout}>
            <Text style={styles.devName}>Hans Almeida</Text>
            <Text style={styles.bio}>CTO no desemprego, etc, etc, etc...</Text>
            <Text style={styles.devTechs}>ReactJS, React Native, Node.js</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff"
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: {
    color: "#666",
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  }
})
