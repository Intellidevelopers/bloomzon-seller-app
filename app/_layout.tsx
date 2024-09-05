import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import axios from "axios";
import { ProductsContext } from "@/constants/ProductsData";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "Welcome", // Make sure this matches the route name in Stack.Screen
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const profile = async () => {
      try {
        const res = await axios.get(
          "https://bloomzon-backend-1-q2ud.onrender.com/api/profile"
        );
        router.push("/(tabs)");
      } catch (err) {}
    };

    profile();
  }, []);

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Bold: require("../assets/fonts/Poppins-Bold.ttf"),
    Regular: require("../assets/fonts/Poppins-Regular.ttf"),
    Medium: require("../assets/fonts/Poppins-Medium.ttf"),
    Thin: require("../assets/fonts/Poppins-Thin.ttf"),
    Semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    Extrabold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    Extralight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    Light: require("../assets/fonts/Poppins-Light.ttf"),
    Black: require("../assets/fonts/Poppins-Black.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      router.replace("Welcome"); // Navigate to the main content after the splash screen
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [prodData, setProdData] = useState<any>({});
  const [images, setImages] = useState<any>("");
  const colorScheme = useColorScheme();

  return (
    <ProductsContext.Provider
      value={{ prodData, setProdData, setImages, images }}
    >
      <ThemeProvider value={DefaultTheme}>
        <Stack initialRouteName="Welcome">
          <Stack.Screen name="Welcome" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Home" options={{ headerShown: false }} />
          <Stack.Screen
            name="StoreCountries"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
          <Stack.Screen name="Register" options={{ headerShown: false }} />
          <Stack.Screen
            name="ForgotPassword"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="OTP" options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" options={{ headerShown: false }} />
          <Stack.Screen name="Success" options={{ headerShown: false }} />
          <Stack.Screen name="AddProduct" options={{ headerShown: false }} />
          <Stack.Screen
            name="VariationsScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Variations" options={{ headerShown: false }} />
          <Stack.Screen name="Offers" options={{ headerShown: false }} />
          <Stack.Screen name="Gallery" options={{ headerShown: false }} />
          <Stack.Screen name="Reorder" options={{ headerShown: false }} />
          <Stack.Screen
            name="ProductDescription"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Keywords" options={{ headerShown: false }} />
          <Stack.Screen name="UploadSuccess" options={{ headerShown: false }} />
          <Stack.Screen name="Orders" options={{ headerShown: false }} />
          <Stack.Screen name="Inventory" options={{ headerShown: false }} />
          <Stack.Screen name="Filter" options={{ headerShown: false }} />
          <Stack.Screen name="Returns" options={{ headerShown: false }} />
          <Stack.Screen name="ReturnDetails" options={{ headerShown: false }} />
          <Stack.Screen
            name="RefundInformation"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="RefundSummary" options={{ headerShown: false }} />
          <Stack.Screen name="refundSuccess" options={{ headerShown: false }} />
          <Stack.Screen name="ContactBuyer" options={{ headerShown: false }} />
          <Stack.Screen name="Advertisement" options={{ headerShown: false }} />
          <Stack.Screen name="AccountHealth" options={{ headerShown: false }} />
          <Stack.Screen
            name="Communications"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AllMessages" options={{ headerShown: false }} />
          <Stack.Screen name="Update" options={{ headerShown: false }} />
          <Stack.Screen name="ChatScreen" options={{ headerShown: false }} />
          <Stack.Screen name="Request" options={{ headerShown: false }} />
          <Stack.Screen name="Summary" options={{ headerShown: false }} />
          <Stack.Screen
            name="SuccessComponent"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SettingScreen" options={{ headerShown: false }} />
          <Stack.Screen name="DealsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="DealsDetails" options={{ headerShown: false }} />
          <Stack.Screen name="CreateDeal" options={{ headerShown: false }} />
          <Stack.Screen name="Coupon" options={{ headerShown: false }} />
          <Stack.Screen name="CreateCoupon" options={{ headerShown: false }} />
          <Stack.Screen name="Coupons" options={{ headerShown: false }} />
          <Stack.Screen name="CouponDetails" options={{ headerShown: false }} />
          <Stack.Screen
            name="GrowthOpportunity"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterAsBloomzon"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="BloomzonShip" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ProductsContext.Provider>
  );
}
