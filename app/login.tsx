import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { Colors } from "@/constants/theme";
import { AuthContext } from "@/utils/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useState } from "react";
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

const { width, height } = Dimensions.get('window');

export default function Login() {
  const authstate = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = "Mailaka na Lahara-taroha ilaina";
    } else if (!email.includes('@') && !/^\d+$/.test(email)) {
      newErrors.email = "Mailaka na Lahara-taroha tsy mety";
    }
    
    if (!password) {
      newErrors.password = "Teny miafina ilaina";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // Mock user data for demo purposes
      const mockUser = {
        id: "1",
        email_or_phone: email,
        password: password,
      };
      authstate.login(mockUser);
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };
  const handleForgotPassword = () => {
    router.push("/forget_password");
  }

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
        <View style={styles.headerContainer}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Ionicons name="chevron-back-sharp" size={24} color="black" />
            </TouchableOpacity>
        </View>
        
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Hiditra</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>

            {/* Form Container */}
            <View style={styles.formContainer}>
              {/* Email/Phone Input */}
              <View style={styles.inputContainer}>
                <CustomTextInput
                  label="Mailaka na Lahara-taroha"
                  instructionPlaceholder="mailaka@gmail.com ou 03xxxxxxxx"
                  value={email}
                  onChangeText={setEmail}
                  error={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <CustomTextInput
                  label="Teny Miafina"
                  instructionPlaceholder="mila feno litera 8 ny teny miafina"
                  value={password}
                  onChangeText={setPassword}
                  error={errors.password}
                  secureTextEntry
                />
              </View>

              {/* Sign up prompt */}
              <View style={styles.signupPrompt}>
                <View style={styles.signupText}>
                    <TouchableOpacity onPress={handleForgotPassword}>
                      <Text style={styles.forget_password_Link}>Teny miafina adino?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignUp}>
                      <Text style={styles.signupLink}>Hisoratra</Text>
                    </TouchableOpacity>
                </View>
              </View>

              {/* Login Button */}
              <CustomButton
                title="HIDITRA"
                onPress={handleLogin}
                style={styles.loginButton}
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
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupPrompt: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    gap: 10,
    display: 'flex',
    flexDirection: 'row',

  },
  forget_password_Link: {
    color: Colors.black,
    fontWeight: 'bold',
  },
 signupLink: {
    color: Colors.garnet.primary,
    fontWeight: 'bold',
    },
  loginButton: {
    marginTop: 20,
  },
});