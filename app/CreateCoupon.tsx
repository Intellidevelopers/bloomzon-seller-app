import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { AntDesign, Feather, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from 'react-native-paper';


type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number; // Optional property
  sku: string;
  image: any;
};

const CreateCoupon = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const tabs = ["Products", "Details", "Review"];
  const [selectedValues, setSelectedValues] = useState({
    taxOnAmountToRefund: '',
    bookingDate: '',
    discount: ''

  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [modalData, setModalData] = useState<string[]>(['100', '500', '1000', '1500', '2000', 'All customers']);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const selectCustomer = (customer: string) => {
    setSelectedCustomer(customer);
    closeModal();
  };


  const products = [
    {
      id: '1',
      name: 'Essential Casual Orange Basic Short Sleeve Tee',
      price: 500,
      oldPrice: 560,
      sku: 'ORANGE-SHIRT-WOMEN',
      status: 'Active',
      image: require('../assets/products/img5.jpg'),
    },
    {
      id: '2',
      name: 'Trendy Black Print Casual Graphic T-Shirt',
      price: 570,
      oldPrice: 600,
      sku: 'BLACK-SHIRT-WOMEN',
      image: require('../assets/products/img8.jpg'),
      status: 'Inactive',
    },
  ];

  const data = [
    { id: '1', title: 'Save 10% on leather bags for office' },
    { id: '2', title: 'Save 15% on shaving machine' },
  ];

  interface ListItemProps {
    title: string;
  }
  
  const ListItem: React.FC<ListItemProps> = ({ title }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.dot} />
        <Text style={styles.itemText}>{title}</Text>
      </View>
    );
  };

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

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSubmit = () => {
    // Add any validation or submission logic here
    router.push('/DealsScreen');  // Navigate to DealsScreen
  };
    const [endDateValues, setEndDateValues] = useState({ endDate: '' });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const showEndDatePicker = () => {
      setEndDatePickerVisibility(true);
    };
  
    const hideEndDatePicker = () => {
      setEndDatePickerVisibility(false);
    };
  
    const handleConfirm = (date: Date) => {
      setSelectedValues(prevValues => ({ ...prevValues, bookingDate: date.toLocaleDateString() }));
      hideDatePicker();
    };
  
    const handleEndDate = (date: Date) => {
      setEndDateValues(prevValues => ({ ...prevValues, endDate: date.toLocaleDateString() }));
      hideEndDatePicker();
    };
    const [checked, setChecked] = useState('first');

    const toggleRememberMe = () => {
      setSelectedValues(prevValues => ({ ...prevValues, discount: prevValues.discount ? '' : 'No Discount' }));
    };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: -30, justifyContent: "space-around", gap: 10 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => setActiveTab((prev) => Math.max(prev - 1, 0))}>
          <AntDesign name='arrowleft' size={22} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "Semibold", top: 25 }}>Create Coupon</Text>
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
              <Text style={styles.sectionTitle}>Select your products</Text>
              <Text style={styles.sectionSubtitle}>Add products to your coupon here. You can add up to 100 products.</Text>
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Feather name='search' size={22} color='#777' style={styles.searchIcon} />
                  <TextInput style={styles.searchInput} placeholder="Search by coupon title..." />
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
                      <Text style={styles.status}>Status: <Text style={{ fontFamily: "Regular", color: "#888" }}>{item.status}</Text></Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
          {/* Details tab */}
          {activeTab === 1 && (
            <View>
              <ScrollView style={styles.container}>
              <Text style={styles.sectionTitle}>Set coupon title</Text>
              <Text style={styles.sectionSubtitle}>
                Choose a effective coupon title that accurately describes the products you added to your coupon.
              </Text>
              <FlatList
                data={data}
                renderItem={({ item }) => <ListItem title={item.title} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
              />
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Medium', }}>
                    Coupon title
                </Text>

                <TextInput
                    style={{
                    borderWidth: 2,
                    width: '100%',
                    alignSelf: 'flex-start',
                    padding: 10,
                    borderRadius: 7,
                    borderColor: '#eee',
                    fontSize: 15
                    }}
                    placeholder="Enter coupon title"
                    keyboardType="default"
                />
                </View>
                <View style={{ height: 10, backgroundColor: "#eee", width: '100%', marginBottom: 15 }}></View>
                <Text style={styles.sectionTitle}>Set schedule</Text>
                <Text style={styles.sectionSubtitle}>
                    Select a duration for your coupon between 1 to 60 days
                </Text>

                {/* Start date picker */}
                <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Medium',}}>
                    Start Date
                </Text>

                <TouchableOpacity onPress={showDatePicker}>
                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderColor: '#eee',
                        padding: 10,
                        width: '100%',
                        alignSelf: 'center',
                        borderRadius: 7,
                        justifyContent: 'space-between',
                    }}
                    >
                    <Text style={{ fontFamily: 'Regular', color: '#666', fontSize: 15 }}>
                        {selectedValues.bookingDate || 'Select start date'}
                    </Text>
                    <AntDesign name="calendar" color={'#666'} size={24} />
                    </View>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                </View>

                {/* End date picker */}
                <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Medium',}}>
                    End Date
                </Text>

                <TouchableOpacity onPress={showEndDatePicker}>
                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderColor: '#eee',
                        padding: 10,
                        width: '100%',
                        alignSelf: 'center',
                        borderRadius: 7,
                        justifyContent: 'space-between',
                    }}
                    >
                    <Text style={{ fontFamily: 'Regular', color: '#666', fontSize: 15 }}>
                        {endDateValues.endDate || 'Select end date'}
                    </Text>
                    <AntDesign name="calendar" color={'#666'} size={24} />
                    </View>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isEndDatePickerVisible}
                    mode="date"
                    onConfirm={handleEndDate}
                    onCancel={hideEndDatePicker}
                />
                </View>

                {/* Set discount */}
                <View style={{ height: 10, backgroundColor: "#eee", width: '100%', marginBottom: 15 }}></View>
                <Text style={styles.sectionTitle}>Set discount</Text>
                <Text style={styles.sectionSubtitle}>
                   Enter the discount amount you want to apply to the products you added to your coupon.
                </Text>
              <View style={{flexDirection: "row"}}>
                <View style={styles.radioContainer}>
                  <RadioButton
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('first')}
                    color='#ff8c00'
                  />
                  <Text style={styles.label}>Amount OFF</Text>
                </View>

                <View style={styles.radioContainer}>
                  <RadioButton
                    value="second"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                    color='#ff8c00'
                  />
                  <Text style={styles.label}>Percentage OFF</Text>
                </View>
              </View>
              
              <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontFamily: 'Medium',}}>
              Discount amount
            </Text>

            <View style={styles.inputContainers}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter discount amount"
                keyboardType="default"
              />
              <Feather size={24} name='dollar-sign'/>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleRememberMe}>
            <View style={[styles.checkbox, selectedValues.discount ? styles.checkboxChecked : null]}>
              {selectedValues.discount && <AntDesign name="check" size={16} color="#fff" />}
            </View>
            <Text style={styles.rememberMe}>Allow only one redemption per customer</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 10, backgroundColor: "#eee", width: '100%', marginBottom: 20 }}></View>
          <Text style={styles.sectionTitle}>Set budget</Text>
          <Text style={styles.sectionSubtitle}>
              Your budget will be allocated to cover the following tow costs:
          </Text>
          <View style={{marginBottom: 20}}>
            <View style={styles.itemContent}>
              <View style={styles.itemdot} />
              <Text style={styles.budgeText}>USD equivalent of the discount you are offering</Text>
            </View>
            <View style={styles.itemContent}>
              <View style={styles.itemdot} />
              <Text style={styles.budgeText}>Redemption fees ($0.40 for each redemption)</Text>
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontFamily: 'Medium',}}>
              Budget
            </Text>

            <View style={styles.inputContainers}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter budget"
                keyboardType="default"
              />
              <Feather size={24} name='dollar-sign'/>
            </View>
            <Text style={{color: "#666", marginBottom: 5}}>Minimum $100 to $100000</Text>
          </View>
          <View style={{ height: 10, backgroundColor: "#eee", width: '100%', marginBottom: 20 }}></View>

          <Text style={styles.sectionTitle}>Target Audience</Text>
          <Text style={styles.sectionSubtitle}>
              You can choose to restrict your coupon to one of the customer segments listed below.
          </Text>

          <View style={{ marginBottom: 60 }}>
                <Text style={{ fontSize: 16, fontFamily: 'Medium',}}>
                    Target customers
                </Text>

                <TouchableOpacity onPress={openModal}>
                    <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderColor: '#eee',
                        padding: 10,
                        width: '100%',
                        alignSelf: 'center',
                        borderRadius: 7,
                        justifyContent: 'space-between',
                    }}
                    >
                    <Text style={{ fontFamily: 'Regular', color: '#666', fontSize: 15 }}>
                    {selectedCustomer ? `${selectedCustomer}` : 'Select Target customers'}
                    </Text>
                    <AntDesign name="down" color={'#666'} size={20} />
                    </View>
                </TouchableOpacity>
                </View>
        </ScrollView>
            </View>
          )}
          
          {activeTab === 2 && (
            <View style={{marginBottom: 60}}>
             <ScrollView style={styles.container}>
     

      <View style={{borderWidth: 2, borderColor: "#ddd", borderRadius: 10}}>
      <TouchableOpacity style={styles.collapsibleHeader} onPress={() => setIsCollapsed(!isCollapsed)}>
        <View style={styles.collapsibleHeaderContent}>
          <Text style={styles.collapsibleHeaderText}>Save 10% on ORANGE-SHIRT-WOMEN</Text>
        </View>
        <MaterialIcons name={isCollapsed ? 'expand-more' : 'expand-less'} size={24} color="#000" />
      </TouchableOpacity>

        <View style={[styles.productDetails, styles.collapse]}>
          <Image source={require('../assets/products/img10.jpg')} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>Essential Casual Orange Basic Short Sleeve Tee</Text>
            <Text style={styles.productPrice}>$500</Text>
            <Text style={styles.productSKU}>SKU: <Text style={{color: "#666", fontWeight: "400"}}>ORANGE-SHIRT-WOMEN</Text></Text>
          </View>
        </View>
      <Collapsible collapsed={isCollapsed} style={styles.collapseContainer}>
      <View style={{backgroundColor: "#ddd", height: 1, marginBottom: 20,}} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Stock</Text>
          <Text style={styles.detailValue}>192</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Discount</Text>
          <Text style={styles.detailValue}>10%</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Budget</Text>
          <Text style={styles.detailValue}>$100</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Schedule</Text>
          <Text style={styles.detailValue}>20/07/2024 - 24/07/2024</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Target customers</Text>
          <Text style={styles.detailValue}>All cutomers</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>One redemption per customer</Text>
          <Text style={styles.detailValue}>Yes</Text>
        </View>
        
        
      <View style={{backgroundColor: "#ddd", height: 1, marginBottom: 20, marginTop: 10}} />

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          // Set activeTab to 0 to navigate back to the first tab
          setActiveTab(0);
        }}
      >
        <SimpleLineIcons name="pencil" size={20} color="#000" />
        <Text style={styles.editDealButtonText}> Edit</Text>
      </TouchableOpacity>

      </Collapsible>
      </View>
    </ScrollView>
            </View>
          )}
        </View>

        <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
                if (activeTab === tabs.length - 1) {
                // All tabs are completed, submit and navigate to DealsScreen
                // Add your submit logic here
                router.push('/Coupons');
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
      </ScrollView>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Target customers</Text>
                <FlatList
                  data={modalData}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.modalItem} onPress={() => selectCustomer(item)}>
                      <Text style={styles.modalItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    width: 100,
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
  rememberMe: {
    fontSize: 14,
    fontFamily: 'Regular',
    color: '#666',
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
    borderColor: '#ddd',
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
    left: '5%',
    marginTop: 300
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
  selectButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 16,
  },
  closeButtonText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'blue',
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
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
  textInput: {
    fontSize: 15,
    fontFamily: 'Regular',
    color: '#666',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    fontFamily: 'Medium',
    color: "#666"
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
    fontSize: 15,
    fontWeight: 'bold',
    left: -5
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
    color: '#000',
    fontWeight: "700"
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  detailLabel: {
    fontSize: 15,
    color: "#666",
    fontFamily: "Regular"
  },
  detailValue: {
    fontSize: 15,
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
  status:{
    fontWeight: "500",
  },
  listItem: {
    fontSize: 14,
    color: '#00D1A3',
    marginBottom: 8,
  },
  listContainer: {
    marginBottom: 15
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#00D1A3', // Custom color for the dot
    marginRight: 12,
  },
  itemText: {
    fontSize: 15,
    color: '#00D1A3',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
  inputContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#eee',
    padding: 10,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 7,
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 10
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemdot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#444', // Custom color for the dot
    marginRight: 12,
  },
  budgeText: {
    fontSize: 13,
    color: '#666',
    fontFamily: "Regular"
  },
});

export default CreateCoupon;
