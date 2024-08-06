import { AntDesign, FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions, SafeAreaView } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const InfoScreen: React.FC = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <AntDesign name='arrowleft' size={22}/>
      </TouchableOpacity>
      <Text style={{fontSize: 18, fontFamily: "Semibold", left: 50, top: 25}}>Product Details</Text>
      </View>
      <ScrollView>
      <View style={styles.progressContainer}>
        <View style={styles.progressItem}>
          <View style={ styles.activeProgressBar} />
          <Text style={styles.progressLabel}>Info</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={ styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Variations</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={ styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Offers</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={ styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Gallery</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={ styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Description</Text>
        </View>
        <View style={styles.progressItem}>
          <View style={ styles.inactiveProgressBar} />
          <Text style={styles.progressLabel}>Keywords</Text>
        </View>
      </View>

      <View style={{left: 16, marginBottom: 15}}>
        <Text style={{fontFamily: "Semibold", fontSize: 18}}>
          Product Details
        </Text>
        <Text style={{fontFamily: "Regular", fontSize: 14, color: "#666"}}>Provide essential details to list your 
          product Accurate information helps 
          customers find and purchase your items
        </Text>
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Product category</Text>

        <TouchableOpacity>
          <View style={{
            flexDirection: "row", 
            alignItems: "center", 
            borderWidth: 2, 
            borderColor: "#ddd", 
            padding: 10, 
            width: '91%', 
            alignSelf: "center",
            borderRadius: 7,
            justifyContent: "space-between"
            }}>
            <Text style={{fontFamily: "Regular", color: "#666", fontSize: 15}}>Select category</Text>
            <MaterialIcons name='keyboard-arrow-down' color={'#666'} size={30}/>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Product sub-category</Text>

        <TouchableOpacity>
          <View style={{
            flexDirection: "row", 
            alignItems: "center", 
            borderWidth: 2, 
            borderColor: "#ddd", 
            padding: 10, 
            width: '91%', 
            alignSelf: "center",
            borderRadius: 7,
            justifyContent: "space-between"
            }}>
            <Text style={{fontFamily: "Regular", color: "#666", fontSize: 15}}>Select sub-category</Text>
            <MaterialIcons name='keyboard-arrow-down' color={'#666'} size={30}/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 16
        }}>Closure type</Text>

        <TouchableOpacity>
          <View style={{
            flexDirection: "row", 
            alignItems: "center", 
            borderWidth: 2, 
            borderColor: "#ddd", 
            padding: 10, 
            width: '90%', 
            alignSelf: "center",
            borderRadius: 7,
            justifyContent: "space-between"
            }}>
            <Text style={{fontFamily: "Regular", color: "#666", fontSize: 15}}>Select closure type</Text>
            <MaterialIcons name='keyboard-arrow-down' color={'#666'} size={30}/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Product ID</Text>

       <View style={{flexDirection: "row", justifyContent: "space-around", alignSelf: "center", left: 17, marginBottom: 10}}>
       <TextInput
        style={{
          borderWidth: 2,
          width: '50%',
          alignSelf: "center",
          padding: 10,
          borderRadius: 7,
          borderColor: '#ddd',
          left: 13
        }}
        placeholder='Enter product ID'
        keyboardType='default'
        />

        <TouchableOpacity>
          <View style={{
            flexDirection: "row", 
            alignItems: "center", 
            borderWidth: 2, 
            borderColor: "#ddd", 
            padding: 9, 
            width: '60%', 
            alignSelf: "center",
            borderRadius: 7,
            justifyContent: "space-between"
            }}>
            <Text style={{fontFamily: "Regular", color: "#666", fontSize: 15}}>Select</Text>
            <MaterialIcons name='keyboard-arrow-down' color={'#666'} size={30}/>
          </View>
        </TouchableOpacity>
       </View>
       <View style={{flexDirection: "row", alignItems: "center", left: 15}}>
        <Ionicons name='alert-circle-outline' color={'#666'} size={25} style={{marginRight: 5}}/>
        <Text style={{fontFamily: "Regular", color: "#666"}}>This product doesn't have a brand name</Text>
       </View>
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Product name</Text>

        <TextInput
        style={{
          borderWidth: 2,
          width: '90%',
          alignSelf: "center",
          padding: 10,
          borderRadius: 7,
          borderColor: '#ddd',
          left: -4
        }}
        placeholder='Enter product name'
        keyboardType='default'
        />
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Brand name</Text>

        <TextInput
        style={{
          borderWidth: 2,
          width: '90%',
          alignSelf: "center",
          padding: 10,
          borderRadius: 7,
          borderColor: '#ddd',
          left: -4
        }}
        placeholder='Enter brand name'
        keyboardType='default'
        />
      </View>
      <View style={{flexDirection: "row", alignItems: "center", left: 15}}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleRememberMe}>
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && <AntDesign name="check" size={16} color="#fff" />}
          </View>
          <Text style={styles.rememberMe}>This product doesn't have a brand name</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Model number</Text>

        <TextInput
        style={{
          borderWidth: 2,
          width: '90%',
          alignSelf: "center",
          padding: 10,
          borderRadius: 7,
          borderColor: '#ddd',
          left: -4
        }}
        placeholder='Enter model number'
        keyboardType='numeric'
        />
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Outer material type</Text>

        <TouchableOpacity>
          <View style={{
            flexDirection: "row", 
            alignItems: "center", 
            borderWidth: 2, 
            borderColor: "#ddd", 
            padding: 10, 
            width: '91%', 
            alignSelf: "center",
            borderRadius: 7,
            justifyContent: "space-between"
            }}>
            <Text style={{fontFamily: "Regular", color: "#666", fontSize: 15}}>Select outer material type</Text>
            <MaterialIcons name='keyboard-arrow-down' color={'#666'} size={30}/>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Style</Text>

        <TouchableOpacity>
          <View style={{
            flexDirection: "row", 
            alignItems: "center", 
            borderWidth: 2, 
            borderColor: "#ddd", 
            padding: 10, 
            width: '91%', 
            alignSelf: "center",
            borderRadius: 7,
            justifyContent: "space-between"
            }}>
            <Text style={{fontFamily: "Regular", color: "#666", fontSize: 15}}>Select style</Text>
            <MaterialIcons name='keyboard-arrow-down' color={'#666'} size={30}/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 16
        }}>Gender</Text>

        <TouchableOpacity>
          <View style={{
            flexDirection: "row", 
            alignItems: "center", 
            borderWidth: 2, 
            borderColor: "#ddd", 
            padding: 10, 
            width: '90%', 
            alignSelf: "center",
            borderRadius: 7,
            justifyContent: "space-between"
            }}>
            <Text style={{fontFamily: "Regular", color: "#666", fontSize: 15}}>Select gender</Text>
            <MaterialIcons name='keyboard-arrow-down' color={'#666'} size={30}/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Number of items</Text>

        <TextInput
        style={{
          borderWidth: 2,
          width: '90%',
          alignSelf: "center",
          padding: 10,
          borderRadius: 7,
          borderColor: '#ddd',
          left: -4
        }}
        placeholder='Enter number of items'
        keyboardType='numeric'
        />
      </View>
      
      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Strap type</Text>

        <TouchableOpacity>
          <View style={{
            flexDirection: "row", 
            alignItems: "center", 
            borderWidth: 2, 
            borderColor: "#ddd", 
            padding: 10, 
            width: '91%', 
            alignSelf: "center",
            borderRadius: 7,
            justifyContent: "space-between"
            }}>
            <Text style={{fontFamily: "Regular", color: "#666", fontSize: 15}}>Select strap type</Text>
            <MaterialIcons name='keyboard-arrow-down' color={'#666'} size={30}/>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: 20}}>
        <Text style={{
          fontSize: 16,
          fontFamily: "Medium",
          left: 15
        }}>Item booking dat</Text>

        <TouchableOpacity>
          <View style={{
            flexDirection: "row", 
            alignItems: "center", 
            borderWidth: 2, 
            borderColor: "#ddd", 
            padding: 10, 
            width: '91%', 
            alignSelf: "center",
            borderRadius: 7,
            justifyContent: "space-between"
            }}>
            <Text style={{fontFamily: "Regular", color: "#666", fontSize: 15}}>Select item booking date</Text>
            <AntDesign name='calendar' color={'#666'} size={30}/>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
    marginBottom: 40
  },
  progressItem: {
    alignItems: 'center',
  },
  activeProgressBar: {
    width: 50,
    height: 7,
    backgroundColor: '#00D1A3',
    borderRadius: 10

  },
  inactiveProgressBar: {
    width: 50,
    height: 7,
    backgroundColor: '#ccc',
    borderRadius: 10
  },
  progressLabel: {
    marginTop: 5,
    fontSize: 10,
    color: '#555',
  },
  backButton: {
    marginBottom: 10,
    marginTop: 60,
    backgroundColor: "#ddd",
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
    left: 10
  },
  backButtonText: {
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  checkboxChecked: {
    backgroundColor: '#FF8C00',
  },
  rememberMe: {
    fontSize: 14,
    fontFamily: "Regular",
    color: "#666"
  },
});

export default InfoScreen;