
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Student } from "../types/navigation";

type LoginScreenProps = {
  onLogin: (student: Student) => void;
};

export default function LoginScreen({
  onLogin,
}: LoginScreenProps) {
  const [fullName, setFullName] = useState("");
  const [section, setSection] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const trimmedName = fullName.trim();

    if (trimmedName.length === 0) {
      setError("Please enter your full name.");
      return;
    }

    setError("");

    onLogin({
      fullName: trimmedName,
      section: section.trim(),
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>

            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>📚</Text>
              <Text style={styles.logoTitle}>StudySpot</Text>
              <Text style={styles.logoSubtitle}>
                Find your perfect study space.
              </Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.heading}>
                Welcome!
              </Text>

              <Text style={styles.description}>
                Sign in to explore campus study spaces.
              </Text>

              <Text style={styles.label}>
                Full Name
              </Text>

              <TextInput
                style={[
                  styles.input,
                  error !== "" && styles.inputError,
                ]}
                placeholder="Enter your full name"
                placeholderTextColor="#999999"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  if (error !== "") {
                    setError("");
                  }
                }}
                autoCapitalize="words"
                autoCorrect={false}
              />

              {error !== "" && (
                <Text style={styles.errorText}>
                  {error}
                </Text>
              )}

              <Text style={styles.label}>
                Section
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your section"
                placeholderTextColor="#999999"
                value={section}
                onChangeText={setSection}
                autoCapitalize="characters"
                autoCorrect={false}
              />

              <Pressable
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>
                  Sign In
                </Text>
              </Pressable>

              <Text style={styles.footerText}>
                Welcome to StudySpot!
              </Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  logoContainer: {
    backgroundColor: "#1A1751",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    marginBottom: 35,
  },
  logoIcon: {
    fontSize: 42,
    marginBottom: 8,
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  logoSubtitle: {
    color: "#D8D7EA",
    fontSize: 13,
    marginTop: 6,
  },
  formContainer: {
    width: "100%",
  },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#1A1751",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#DDDEE5",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#222222",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: -14,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "#1A1751",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#999999",
    marginTop: 25,
  },
  
});
