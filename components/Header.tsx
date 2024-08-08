import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

const Header = () => {
  return (
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: -40, gap: 70 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Products</Text>
      </View>
  )
}

export default Header

const styles = StyleSheet.create({
    backButton: {
        marginBottom: 10,
        marginTop: 60,
        backgroundColor: "#eee",
        padding: 16,
        width: 55,
        alignItems: "center",
        borderRadius: 100,
      },
})