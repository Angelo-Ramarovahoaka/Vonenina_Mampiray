import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

// Définir le type pour l'utilisateur (vous pouvez l'adapter selon vos besoins)
type User = {
  id: string;
  email_or_phone: string;
  name?: string; // Optional user name
  password?: string; // Optional, depending on your auth logic
};

type AuthContextType = {
  isLoggedIn: boolean;
  isReady: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  isLoggedIn: false,
  isReady: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  const storeAuthState = async (user: User | null) => {
    try {
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Error storing auth state', error);
    }
  };

  const login = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
    storeAuthState(user);
    router.replace("/(protected)/tantara");
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    storeAuthState(null);
    router.replace("/login");
  };

  useEffect( () => {
    const getAuthFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error loading auth state', error);
      } finally {
        // Set isReady to true after checking auth state (whether user exists or not)
        setIsReady(true);
      }
    };

    getAuthFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
