import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Animated, Image, ViewToken, SafeAreaView } from 'react-native';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const welcomeData = [
  {
    id: '1',
    title: 'Welcome to the Bloomzon Seller App',
    subtitle: 'Manage products, track sales, maintain customer records, and more - all from your mobile device.',
    image: require('../assets/images/pic10.png'),
  },
  {
    id: '2',
    title: 'Get started',
    subtitle: 'Expand your reach and boost your sales with our powerful tools.',
    video: require('../assets/video/phone.mp4'),
  },
];

const Welcome: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNextPress = () => {
    if (currentIndex === welcomeData.length - 1) {
      router.push('/StoreCountries');
    } else {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={welcomeData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.screen}>
           <Text style={styles.title}>{item.title}</Text>
           <Text style={styles.subtitle}>{item.subtitle}</Text>
            {item.image ? (
              <Image source={item.image} style={styles.media} />
            ) : (
              <Video
                source={item.video}
                style={styles.media}
                useNativeControls={false}
                isLooping
                isMuted
                shouldPlay
              />
            )}
            {currentIndex === 1 && (
              <Text style={styles.subtitleText}>Ready to sign in or create an account?</Text>
            )}
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <TouchableOpacity style={styles.button} onPress={handleNextPress}>
        <Text style={styles.buttonText2}>{currentIndex === welcomeData.length - 1 ? 'Get Started' : 'Continue'}</Text>
      </TouchableOpacity>
      {currentIndex === 1 && (
        <>
          <Text style={styles.subtitleText1}>Not ready to sign up?</Text>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/AnotherScreen')}>
            <Text style={styles.buttonText}>Learn more about selling</Text>
          </TouchableOpacity>
        </>
      )}
      <View style={styles.pagination}>
        {welcomeData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { opacity: currentIndex === index ? 1 : 0.3, transform: [{ scale: currentIndex === index ? 1.2 : 1 }] },
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  screen: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Bold',
    marginBottom: 10,
    textAlign: 'left',
    marginTop: 80,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Regular',
    alignSelf: 'flex-start',

  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginBottom: -20,
    fontFamily: 'Regular',
    alignSelf: 'flex-start',
  },
  media: {
    width: '100%',
    height: '30%',
    marginBottom: 20,
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 220,
  },
  secondaryButton: {
    backgroundColor: '#fff6d5',
    paddingVertical: 13,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
  },
  buttonText: {
    color: '#FF8C00',
    fontSize: 16,
    fontFamily: 'Regular',
  },
  buttonText2: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Regular',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Bold',
    textAlign: 'center',
    marginTop: 20,
    position: 'absolute',
    bottom: 60,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#FF8C00',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  subtitleText1:{
    bottom: 150,
    fontFamily: "Regular",
    fontSize: 16,
    color: '#666',
    marginBottom: 14,
    alignSelf: 'flex-start',
    left: 20
  },
});

export default Welcome;
