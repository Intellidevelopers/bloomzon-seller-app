import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'

const Coupon = () => {
  return (
    <View style={styles.container}>
     <View style={{ flexDirection: "row", alignItems: "center", marginTop: -30, justifyContent: "space-between"}}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Coupons</Text>
        <TouchableOpacity style={styles.backButton2}>
        </TouchableOpacity>
      </View>

     <View style={styles.mainContent}>
        <Image source={require('../assets/images/coupon.png')} style={styles.image} />
        <Text style={styles.title}>Create Coupon</Text>
        <Text style={styles.description}>
            Enhance your sales strategy by offering exclusive coupons to your customers. 
            Create custom discounts and promotions to encourage purchases and reward loyal shoppers.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/CreateCoupon')}>
            <AntDesign name='plus' size={20} color={'#fff'} />
            <Text style={styles.buttonText}>Create a New Coupon</Text>
        </TouchableOpacity>
     </View>
    </View>
  )

}

export default Coupon

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
 },
  mainContent:{
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200

 },
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
 },
  backButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#eee",
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
 },
   title:{
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10
 },
   description:{
    color: "#666",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
    fontFamily: "Regular"
 },
   button:{
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#ff8c00",
    padding: 15,
    width: '100%',
    justifyContent: "center",
    gap: 10,
    borderRadius: 10
 },
 buttonText:{
    color: "#fff",
    fontSize: 16
 },
 image:{
    marginBottom: 20
 }

})