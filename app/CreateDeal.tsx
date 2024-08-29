import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Feather, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number; // Optional property
  sku: string;
  image: any;
};

const CreateDeal = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [expandedProductId2, setExpandedProductId2] = useState<string | null>(null);
  const navigation = useNavigation();
  const tabs = ["Products", "Schedule", "Configure", "Review"];

  const products = [
    {
      id: '1',
      name: 'Essential Casual Orange Basic Short Sleeve Tee',
      price: 500,
      oldPrice: 560,
      sku: 'ORANGE-SHIRT-WOMEN',
      image: require('../assets/products/img5.jpg'),
    },
    {
      id: '2',
      name: 'Trendy Black Print Casual Graphic T-Shirt',
      price: 570,
      oldPrice: 600,
      sku: 'BLACK-SHIRT-WOMEN',
      image: require('../assets/products/img8.jpg'),
    },
    {
      id: '3',
      name: 'Essential Casual Orange Basic Short Sleeve Tee',
      price: 500,
      oldPrice: 560,
      sku: 'ORANGE-SHIRT-WOMEN',
      image: require('../assets/products/img5.jpg'),
    },
    {
      id: '4',
      name: 'Trendy Black Print Casual Graphic T-Shirt',
      price: 570,
      oldPrice: 600,
      sku: 'BLACK-SHIRT-WOMEN',
      image: require('../assets/products/img8.jpg'),
    },
  ];

  const toggleSelectProduct = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const [selectedWeek, setSelectedWeek] = useState(0);

  const weeks = [
    { id: 0, dateRange: '22/07/2024 - 28/07/2024', fee: '$100' },
    { id: 1, dateRange: '29/07/2024 - 04/08/2024', fee: '$100' },
    { id: 2, dateRange: '05/08/2024 - 11/08/2024', fee: '$100' },
    { id: 3, dateRange: '12/08/2024 - 18/08/2024', fee: '$100' },
    { id: 4, dateRange: '19/08/2024 - 25/08/2024', fee: '$100' },
  ];
  
  const [dealPrice, setDealPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [dealQuantity, setDealQuantity] = useState('');

  const product = {
    id: '1',
    name: 'Essential Casual Orange Basic Short Sleeve Tee',
    price: 500,
    sku: 'ORANGE-SHIRT-WOMEN',
    image: require('../assets/products/img26.jpg'),
  };
  
  const handleExpandProduct = (productId: string) => {
    setExpandedProductId((prevId) => (prevId === productId ? null : productId));
  };

    const handleExpandProduct2 = (productId: string) => {
    setExpandedProductId2((prevId) => (prevId === productId ? null : productId));
  };
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSubmit = () => {
    // Add any validation or submission logic here
    router.push('/DealsScreen');  // Navigate to DealsScreen
  };
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: -30, justifyContent: "space-around", gap: 10 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => setActiveTab((prev) => Math.max(prev - 1, 0))}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Create new deal</Text>
        <Text style={styles.backButton2}></Text>
      </View>
      <View style={styles.progressContainer}>
        {tabs.map((tab, index) => (
          <View key={index} style={styles.tabContainer}>
            <View
              style={[
                styles.tab,
                activeTab > index ? styles.completedTab : activeTab === index ? styles.activeTab : null,
              ]}
            />
            <Text style={styles.tabText}>{tab}</Text>
          </View>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.contentContainer}>
          {activeTab === 0 && (
            <View style={styles.productListContainer}>
              <Text style={styles.sectionTitle}>Select eligible products</Text>
              <Text style={styles.sectionSubtitle}>Select an eligible product for the deal.</Text>
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Feather name='search' size={22} color='#777' style={styles.searchIcon} />
                  <TextInput style={styles.searchInput} placeholder="Search..." />
                </View>
              </View>
              <FlatList
                data={products}
                renderItem={({ item }) => (
                  <View style={styles.productItem}>
                    <TouchableOpacity
                      style={styles.checkboxContainer}
                      onPress={() => toggleSelectProduct(item.id)}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          selectedProducts.includes(item.id) && styles.checkboxChecked
                        ]}
                      >
                        {selectedProducts.includes(item.id) && <AntDesign name="check" size={16} color="#fff" />}
                      </View>
                    </TouchableOpacity>
                    <Image source={item.image} style={styles.productImage} />
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.productPrice}>${item.price} <Text style={styles.oldPrice}>${item.oldPrice}</Text></Text>
                      <Text style={styles.productSku}>SKU: <Text style={{ fontFamily: "Regular", color: "#888" }}>{item.sku}</Text></Text>
                      <Text style={styles.flashDeal}>⚡ Flash Deal</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
          {activeTab === 1 && (
            <View>
              <ScrollView style={styles.container}>
              <Text style={styles.sectionTitle}>When do you want to run this deal</Text>
              <Text style={styles.sectionSubtitle}>
                This flash deal will run for one day within the chosen week. If approved, the scheduled date and time will appear in the deals dashboard one week in advance.
              </Text>
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#ddd", paddingBottom: 10, marginBottom: 10}}>
                <Text style={{fontFamily: "Semibold", fontSize: 16, left: 35}}>Week</Text>
                <Text style={{fontFamily: "Semibold", fontSize: 16}}>Deal Fee</Text>
              </View>
              {weeks.map((week) => (
                <TouchableOpacity key={week.id} style={styles.weekContainer} onPress={() => setSelectedWeek(week.id)}>
                  <View style={styles.radioContainer}>
                    <View style={[styles.radioCircle, selectedWeek === week.id && styles.radioCircleSelected]}>
                      {selectedWeek === week.id && <View style={styles.radioDot} />}
                    </View>
                  </View>
                  <Text style={styles.weekText}>{week.dateRange}</Text>
                  <Text style={styles.weekFee}>{week.fee}</Text>
                </TouchableOpacity>
              ))}
             
            </ScrollView>
            </View>
          )}
          {activeTab === 2 && (
            <View>
              <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>Configure products</Text>
                <Text style={styles.sectionSubtitle}>
                  Include as many product variants as possible to avoid deal rejection.
                </Text>
                <View style={styles.productCard}>
                  <View style={styles.productCardHeader}>
                    <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleExpandProduct(product.id)}>
                      <View style={styles.checkbox}>
                        {expandedProductId === product.id && <AntDesign name="check" size={16} color="#fff" />}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleExpandProduct(product.id)}>
                      <AntDesign name={expandedProductId === product.id ? "up" : "down"} size={22} color="#777" />
                    </TouchableOpacity>
                  </View>

                  <View style={{flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#fff", paddingBottom: 15, padding: 10}}>
                    <Image source={product.image} style={styles.productImage} />
                    <View style={{width: '70%'}}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productPrice}>${product.price}</Text>
                      <Text style={styles.productSku}>SKU: <Text style={{color: "#777", fontFamily: "Regular"}}>{product.sku}</Text></Text>
                    </View>
                  </View>
                  {expandedProductId === product.id && (
                    <View style={styles.productCardDetails}>

                      <View style={{backgroundColor: "#ddd", height: 1, marginBottom: 20,}} />
                      <Text style={styles.inputLabel}>Deal price</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="450"
                          keyboardType="numeric"
                          value={dealPrice}
                          onChangeText={setDealPrice}
                        />
                        <MaterialIcons name='attach-money' size={22} color='#777' style={styles.inputIcon} />
                      </View>
                      <Text style={styles.info}>Maximum deal price should be $450</Text>
                      <Text style={styles.inputLabel}>Discount per unit</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="10"
                          keyboardType="numeric"
                          value={discount}
                          onChangeText={setDiscount}
                        />
                        <MaterialIcons name='percent' size={22} color='#777' style={styles.inputIcon} />
                      </View>
                      <Text style={styles.info}>Minimum discount should be 10%</Text>

                      <Text style={styles.inputLabel}>Deal quantity</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="100"
                          keyboardType="numeric"
                          value={dealQuantity}
                          onChangeText={setDealQuantity}
                        />
                      </View>
                      <Text style={styles.info2}>Minimum quantity should be 50</Text>
                     
                    </View> 
                    
                  )}
                </View>
                <View style={styles.productCard}>
                  <View style={styles.productCardHeader}>
                    <TouchableOpacity style={styles.checkboxContainer} onPress={() => handleExpandProduct2(product.id)}>
                      <View style={styles.checkbox}>
                        {expandedProductId2 === product.id && <AntDesign name="check" size={16} color="#fff" />}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleExpandProduct2(product.id)}>
                      <AntDesign name={expandedProductId2 === product.id ? "up" : "down"} size={22} color="#777" />
                    </TouchableOpacity>
                  </View>
                      <View style={{flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#fff", paddingBottom: 15, padding: 10}}>
                        <Image source={product.image} style={styles.productImage} />
                        <View style={{width: '70%'}}>
                          <Text style={styles.productName}>{product.name}</Text>
                          <Text style={styles.productPrice}>${product.price}</Text>
                          <Text style={styles.productSku}>SKU: <Text style={{color: "#777", fontFamily: "Regular"}}>{product.sku}</Text></Text>
                        </View>
                      </View>
                  {expandedProductId2 === product.id && (
                    <View style={styles.productCardDetails}>
                      
                      <View style={{backgroundColor: "#ddd", height: 1, marginBottom: 20,}} />
                      <Text style={styles.inputLabel}>Deal price</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="450"
                          keyboardType="numeric"
                          value={dealPrice}
                          onChangeText={setDealPrice}
                        />
                        <MaterialIcons name='attach-money' size={22} color='#777' style={styles.inputIcon} />
                      </View>
                      <Text style={styles.info}>Maximum deal price should be $450</Text>


                      <Text style={styles.inputLabel}>Discount per unit</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="10"
                          keyboardType="numeric"
                          value={discount}
                          onChangeText={setDiscount}
                        />
                        <MaterialIcons name='percent' size={22} color='#777' style={styles.inputIcon} />
                      </View>
                      <Text style={styles.info}>Minimum discount should be 10%</Text>

                      <Text style={styles.inputLabel}>Deal quantity</Text>
                      <View style={styles.inputContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="100"
                          keyboardType="numeric"
                          value={dealQuantity}
                          onChangeText={setDealQuantity}
                        />
                      </View>
                      <Text style={styles.info2}>Minimum quantity should be 50</Text>
                     
                    </View> 
                    
                  )}
                </View>
              </ScrollView>
            </View>
          )}
          {activeTab === 3 && (
            <View style={{marginBottom: 60}}>
             <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Review details</Text>
      <Text style={styles.sectionDescription}>
        Please review the details of your deal carefully before submitting. Ensure all information is accurate to avoid any issues with approval. Once satisfied, submit your deal for final review.
      </Text>

      <View style={styles.infoBox}>
        <AntDesign name="infocirlceo" size={24} color="#000" />
        <Text style={styles.infoText}>
          By submitting this deal, you agree to pay the listed fee if it runs on the Bloomzon Deals page. Please note that Bloomzon does not guarantee sales from this deal and does not provide fee refunds.
        </Text>
      </View>

      <View style={{borderWidth: 2, borderColor: "#ddd", borderRadius: 10}}>
      <TouchableOpacity style={styles.collapsibleHeader} onPress={() => setIsCollapsed(!isCollapsed)}>
        <View style={styles.collapsibleHeaderContent}>
          <MaterialIcons name="bolt" size={24} color="#FFD700" />
          <Text style={styles.collapsibleHeaderText}>Flash Deal</Text>
        </View>
        <MaterialIcons name={isCollapsed ? 'expand-more' : 'expand-less'} size={24} color="#000" />
      </TouchableOpacity>

        <View style={[styles.productDetails, styles.collapse]}>
          <Image source={require('../assets/products/img18.jpg')} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>Essential Casual Orange Basic Short Sleeve Tee</Text>
            <Text style={styles.productPrice}>$500</Text>
            <Text style={styles.productSKU}>SKU: ORANGE-SHIRT-WOMEN</Text>
          </View>
        </View>
      <Collapsible collapsed={isCollapsed} style={styles.collapseContainer}>
      <View style={{backgroundColor: "#ddd", height: 1, marginBottom: 20,}} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>20/07/2024 - 24/07/2024</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Deal price</Text>
          <Text style={styles.detailValue}>$450</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Discount per unit</Text>
          <Text style={styles.detailValue}>$50</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Deal quantity</Text>
          <Text style={styles.detailValue}>100</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Stock</Text>
          <Text style={styles.detailValue}>192</Text>
        </View>
      <View style={{backgroundColor: "#ddd", height: 1, marginBottom: 20, marginTop: 10}} />

      <TouchableOpacity style={styles.editButton}>
          <SimpleLineIcons name="pencil" size={20} color="#000" />
          <Text style={styles.editDealButtonText}> Edit</Text>
      </TouchableOpacity>
      </Collapsible>
      </View>
    </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
  style={styles.continueButton}
  onPress={() => {
    if (activeTab === tabs.length - 1) {
      // All tabs are completed, submit and navigate to DealsScreen
      // Add your submit logic here
      router.push('DealsScreen');
    } else {
      // Move to the next tab
      setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
    }
  }}
>
  <Text style={styles.continueButtonText}>
    {activeTab === tabs.length - 1 ? 'Submit' : 'Continue'}
  </Text>
</TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    padding: 10,
    marginBottom: 20
  },
  tabContainer: {
    alignItems: 'center',
  },
  tab: {
    width: 70,
    height: 8,
    borderRadius: 12,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#afecd6',
  },
  completedTab: {
    backgroundColor: '#00D1A3',
  },
  tabText: {
    marginTop: 4,
    fontSize: 12,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  productListContainer: {
    marginBottom: 60, // To prevent content from being hidden behind the fixed button
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Semibold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    fontFamily: "Regular"
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    alignSelf: "center",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderColor: '#eee',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginRight: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  productImage: {
    width: 80,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontFamily: 'Semibold',
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Bold',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontFamily: 'Medium',
  },
  productSku: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Bold',
  },
  flashDeal: {
    fontSize: 14,
    color: '#666',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 23,
    height: 23,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  checkboxChecked: {
    backgroundColor: '#FF8C00',
  },
  continueButton: {
    backgroundColor: 'orange',
    padding: 15,
    alignItems: 'center',
    width: '90%',
    alignSelf: "center",
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
    left: '5%',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Regular',
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
  backButton2: {
    marginBottom: 10,
    marginTop: 60,
    padding: 16,
    width: 55,
    alignItems: "center",
    borderRadius: 100,
  },
  searchInput: {
    flex: 1,
  },

  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioContainer: {
    marginRight: 10,
  },
  radioCircle: {
    width: 25,
    height: 25,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: 'orange',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'orange',
  },
  weekText: {
    fontSize: 16,
    flex: 1,
    fontWeight: "500"
  },
  weekFee: {
    fontSize: 16,
    color: '#000',
    fontFamily: "Medium"
  },

  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Semibold"
  },

  productCardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCardDetails: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',         // Align items horizontally
    alignItems: 'center',         // Center items vertically
    borderWidth: 1,               // Add border
    borderColor: '#ddd',          // Set border color
    borderRadius: 8,              // Rounded corners
    paddingHorizontal: 10,        // Add horizontal padding
    marginBottom: 20,             // Space below each input
    backgroundColor: '#fff',      // Set background color
  },
  input: {
    flex: 1,                       // Take up remaining space
    height: 50,                    // Set height
    fontSize: 16,                  // Set font size
    borderWidth: 0,                // Remove border
  },
  inputIcon: {
    marginLeft: 10,                // Space between input text and icon
  },
  productCard: {
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  productCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f4f4f4',
    justifyContent: "space-between",
    marginBottom: 10
  },
  info:{
    marginTop: -15,
    marginBottom: 20,
    color: "#666"
  },
  info2:{
    marginTop: -10,
    marginBottom: 10,
    color: "#666"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  step: {
    flex: 1,
    height: 5,
    backgroundColor: '#00CED1',
    marginHorizontal: 2,
    borderRadius: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#e4ffff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#000',
    flex: 1,
  },
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  collapsibleHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collapsibleHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productSKU: {
    fontSize: 14,
    color: '#666',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Regular"
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: "700"
  },
  collapse:{
    flexDirection: "row",
    padding: 10,
  },
  collapseContainer:{
    padding: 10,
  },
  editButton:{
    borderWidth: 1,
    paddingHorizontal: 48,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "center",
    marginBottom: 10
  },
  editDealButtonText: {
    fontSize: 14,
    fontFamily: 'Regular',
    color: '#000',
  },
});

export default CreateDeal;
