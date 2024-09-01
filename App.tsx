import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Home from "./app/Authentication";
import { supabase } from "./utils/supabase";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import Authentication from "./app/Authentication";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      {session && session.user ? (
        <View
          style={{
            height: "100%",
            display: "flex",
            backgroundColor: "#222",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFF",
            }}
          >
            Hey, {session.user.email}
          </Text>
          <Pressable
            onPress={() => {
              supabase.auth.signOut();
            }}
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              width: 200,
              backgroundColor: "#FFF",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "#333",
              }}
            >
              Sign Out
            </Text>
          </Pressable>
        </View>
      ) : (
        <Authentication />
      )}
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
