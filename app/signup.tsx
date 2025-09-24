import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/utils/AuthContext";
import { useContext } from "react";
import { StyleSheet, Text } from "react-native";

export default function Signup() {
    const authstate = useContext(AuthContext);
    
    return (
        <>
            <Text style={styles.signup}>Signup</Text>
            <CustomButton
                title="Sign Up"
                onPress={() => {
                    // Mock user data for demo purposes
                    const mockUser = {
                        id: "2",
                        email_or_phone: "newuser@example.com",
                        password: "password123"
                    };
                    authstate.login(mockUser);
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    signup: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 20,
        fontWeight: "bold",
    },
});