import { router } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import CustomButton from '../components/CustomButton';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const handleLogin = () => {
    router.push('/(tabs)/tantara'); 
  };

  const handleSignUp = () => {
    router.push('/(tabs)/tantara');
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <View style={styles.container}>
        {/* Logo au centre */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')} // Utilisez votre logo
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Boutons en bas */}
        <View style={styles.buttonsContainer}>
          {/* Bouton de connexion */}
          <CustomButton
            title="HIDITRA"
            onPress={handleLogin}
            style={styles.loginButton}
          />

          {/* Bouton d'inscription */}
          <CustomButton
            title="HISORATRA"
            onPress={handleSignUp}
            style={styles.signUpButton}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight || 50,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 120,
  },
  loginButton: {
    marginBottom: 20,
  },
  signUpButton: {
   marginBottom: 20,
  },
});