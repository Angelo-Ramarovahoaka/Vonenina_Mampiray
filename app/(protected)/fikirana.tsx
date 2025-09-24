import CustomButton from "@/components/CustomButton";
import { AuthContext } from "@/utils/AuthContext";
import { useContext } from "react";
import { Text, View } from "react-native";

export default function Fikirana() {
  const authstate = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>fikirana</Text>
      <CustomButton title="Logout" onPress={authstate.logout} />
    </View>
  );
}
