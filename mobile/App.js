import React from "react"
import { StyleSheet, Text, View } from "react-native"

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ハンス</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  }
})
