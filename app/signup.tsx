import CustomButton from "@/components/CustomButton";
import CustomTextInput from "@/components/CustomTextInput";
import { Colors } from "@/constants/theme";
import { AuthContext } from "@/utils/AuthContext";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useContext, useState } from "react";

import {
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const { width, height } = Dimensions.get('window');

export default function Signup() {
  const authstate = useContext(AuthContext);
  const [step, setStep] = useState(1); // Step 1 or 2
  
  // Step 1 form data
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  
  // Step 2 form data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const [errors, setErrors] = useState<any>({});

  // Success conditions
  const isEmailValid = email.includes('@') && email.length > 5;
  const isPhoneValid = phone.length >= 10;
  const isCompanyValid = company.length > 2;
  const isRoleValid = role.length > 2;
  const isUsernameValid = username.length > 3;
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = confirmPassword === password && confirmPassword.length > 0;

  const validateStep1 = () => {
    const newErrors: any = {};
    
    if (!email) {
      newErrors.email = "Mailaka ilaina";
    } else if (!email.includes('@')) {
      newErrors.email = "Mailaka tsy mety";
    }
    
    if (!phone) {
      newErrors.phone = "Lahara-taroha ilaina";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "Lahara-taroha tsy mety";
    }
    
    if (!company) {
      newErrors.company = "Sampana ilaina";
    }
    
    if (!role) {
      newErrors.role = "Andraikitra ilaina";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: any = {};
    
    if (!username) {
      newErrors.username = "Anaran'ny kaoty ilaina";
    }
    
    if (!password) {
      newErrors.password = "Teny miafina ilaina";
    } else if (password.length < 6) {
      newErrors.password = "Teny miafina fohy loatra";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Hanamaty ny teny miafina ilaina";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Teny miafina tsy mitovy";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleSignUp = () => {
    if (validateStep2()) {
      // Create user with all data
      const mockUser = {
        id: Date.now().toString(),
        email_or_phone: email,
        name: username,
        phone: phone,
        company: company,
        role: role,
      };
      console.log("User registered:", mockUser);
      authstate.login(mockUser);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleProfileImagePick = async () => {
    try {
      // Demander la permission d'accès à la galerie
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission d\'accès à la galerie requise!');
        return;
      }

      // Ouvrir la galerie d'images
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Image carrée
        quality: 0.7,
      });

      // Si l'utilisateur a sélectionné une image
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
        console.log(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erreur lors de la sélection d\'image:', error);
      alert('Erreur lors de la sélection de l\'image');
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
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => step === 1 ? router.back() : setStep(1)}
          >
            <Ionicons name="chevron-back-sharp" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hisoratra</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              
              {step === 1 ? (
                // Step 1: Basic Information
                <>
                  <View style={styles.inputContainer}>
                    <CustomTextInput
                      label="Mailaka"
                      instructionPlaceholder="mailaka@gmail.com"
                      value={email}
                      onChangeText={setEmail}
                      error={errors.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      asButton={true}
                      showSuccess={isEmailValid}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <CustomTextInput
                      label="Lahara-taroha"
                      instructionPlaceholder="03xxxxxxxx"
                      value={phone}
                      onChangeText={setPhone}
                      error={errors.phone}
                      keyboardType="phone-pad"
                      asButton={true}
                      showSuccess={isPhoneValid}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <CustomTextInput
                      label="Sampana"
                      instructionPlaceholder="Entrez votre département"
                      value={company}
                      onChangeText={setCompany}
                      error={errors.company}
                      asButton={true}
                      showSuccess={isCompanyValid}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <CustomTextInput
                      label="Andraikitra"
                      instructionPlaceholder="Entrez votre fonction"
                      value={role}
                      onChangeText={setRole}
                      error={errors.role}
                      asButton={true}
                      showSuccess={isRoleValid}
                    />
                  </View>

                  <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>MANARAKA</Text>
                    <Feather name="arrow-right" size={24} color={Colors.garnet.secondary} />
                  </TouchableOpacity>
                </>
              ) : (
                // Step 2: Account Creation
                <>
                  <TouchableOpacity 
                    style={styles.profileImageContainer}
                    onPress={handleProfileImagePick}
                  >
                    {profileImage ? (
                      <View style={styles.selectedImageContainer}>
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        <View style={styles.changeImageOverlay}>
                          <Ionicons name="camera" size={20} color="white" />
                        </View>
                      </View>
                    ) : (
                      <View style={styles.profileImagePlaceholder}>
                        <Ionicons name="camera" size={24} color={Colors.red} />
                        <Text style={styles.profileImageText}>Sary ny kaoty</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <View style={styles.inputContainer}>
                    <CustomTextInput
                      label="Anaran'ny kaoty"
                      instructionPlaceholder="Entrez votre nom d'utilisateur"
                      value={username}
                      onChangeText={setUsername}
                      error={errors.username}
                      asButton={true}
                      showSuccess={isUsernameValid}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <CustomTextInput
                      label="Teny miafina"
                      instructionPlaceholder="Entrez votre mot de passe"
                      value={password}
                      onChangeText={setPassword}
                      error={errors.password}
                      secureTextEntry
                      asButton={true}
                      showSuccess={isPasswordValid}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <CustomTextInput
                      label="Hanamaty ny teny miafina"
                      instructionPlaceholder="Confirmez votre mot de passe"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      error={errors.confirmPassword}
                      secureTextEntry
                      asButton={true}
                      showSuccess={isConfirmPasswordValid}
                    />
                  </View>

                  <CustomButton
                    title="HISORATRA"
                    onPress={handleSignUp}
                    style={styles.signupButton}
                  />
                </>
              )}
              
              {/* Login Link */}
              <TouchableOpacity onPress={handleLogin} style={styles.loginLinkContainer}>
                <Text style={styles.loginLink}>Hiditra</Text>
              </TouchableOpacity>
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
    paddingTop: (StatusBar.currentHeight || 50) + 20,
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
  profileImageContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.garnet.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.red,
    borderStyle: 'dashed',
  },
  profileImageText: {
    fontSize: 12,
    color: Colors.red,
    marginTop: 4,
    textAlign: 'center',
  },
  selectedImageContainer: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.garnet.tertiary,
  },
  changeImageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  nextButton: {
    marginTop: 20,
    gap: 20,
    paddingEnd: 20,
    flexDirection: 'row',
    alignSelf: "flex-end"
  },
  signupButton: {
    marginTop: 20,
  },
  loginLinkContainer: {
    marginTop: 30,
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: 20,
  },
  loginLink: {
    color: Colors.garnet.secondary ,
    fontSize: 16,
    fontWeight: '500',
  },
  nextButtonText: {
    color: Colors.garnet.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
});