import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');


const countries = [
  { id: '1', name: 'United States', region: 'Americas', flag: require('../assets/flags/usa.png') },
  { id: '2', name: 'Canada', region: 'Americas', flag: require('../assets/flags/canada.png') },
  { id: '3', name: 'Mexico', region: 'Americas', flag: require('../assets/flags/mexico.png') },
  { id: '4', name: 'Brazil', region: 'Americas', flag: require('../assets/flags/brazil.png') },
  { id: '5', name: 'United Kingdom', region: 'Europe', flag: require('../assets/flags/uk.png') },
  { id: '6', name: 'Germany', region: 'Europe', flag: require('../assets/flags/germany.png') },
  { id: '7', name: 'France', region: 'Europe', flag: require('../assets/flags/france.png') },
  { id: '8', name: 'Nigeria', region: 'Africa', flag: require('../assets/flags/nigeria.png') },
  { id: '9', name: 'Spain', region: 'Europe', flag: require('../assets/flags/spain.png') },
];

const StoreCountries: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const router = useRouter();

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredData = countries.filter((country) =>
      country.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountries(filteredData);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.item} onPress={() => router.push('/LoginScreen')}>
      <Image source={item.flag} style={styles.flag} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = (region: string) => (
    <Text style={styles.sectionHeader}>{region}</Text>
  );

  const groupedCountries = filteredCountries.reduce((acc: any, country) => {
    if (!acc[country.region]) acc[country.region] = [];
    acc[country.region].push(country);
    return acc;
  }, {});

  const sections = Object.keys(groupedCountries).map((region) => ({
    region,
    data: groupedCountries[region],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Store country</Text>
      <Text style={styles.subtitle}>Select the store you want to register and sell on</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search country name..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      
      <FlatList
        data={sections}
        keyExtractor={(item) => item.region}
        renderItem={({ item }) => (
          <View>
            {renderSectionHeader(item.region)}
            {item.data.map((country: any) => renderItem({ item: country }))}
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: SCREEN_WIDTH
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flag: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: "Medium"
  },
  sectionHeader: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Semibold',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontFamily: 'Bold',
    fontSize: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: -10,
  },
  subtitle: {
    fontFamily: 'Regular',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  flatListContent: {
    paddingBottom: 20,  // Add some padding at the bottom to ensure all items are visible
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
    padding: 20
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#eee',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16
  },
  filterIcon: {
    backgroundColor: '#F37300',
    padding: 13,
    borderRadius: 5,
    marginLeft: 10,
  },
  header:{
    marginTop: 40
  }
});

export default StoreCountries;
