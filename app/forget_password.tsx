import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get('window');

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string } = {};
    
    if (!email) {
      newErrors.email = "Mailaka ilaina";
    } else if (!email.includes('@') && !/^\d+$/.test(email)) {
      newErrors.email = "Mailaka tsy mety";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = () => {
    if (validateForm()) {
      // TODO: Implement password reset logic
      alert("Instructions de réinitialisation envoyées à votre email");
      router.back();
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Teny miafina adino?</Text>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
              <Text style={styles.description}>
                Ampidiro ny mailaka na lahara-tarohanao mba handefasana torolalana famerenana ny teny miafina.
              </Text>

              {/* Email/Phone Input */}
              <View style={styles.inputContainer}>
                <CustomTextInput
                  label="Mailaka na Lahara-taroha"
                  instructionPlaceholder="votreEmail@gmail.com ou 03xxxxxxxx"
                  value={email}
                  onChangeText={setEmail}
                  error={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Reset Button */}
              <CustomButton
                title="ALEFA NY TOROLALANA"
                onPress={handleResetPassword}
                style={styles.resetButton}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 50,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  resetButton: {
    marginTop: 20,
  },
});