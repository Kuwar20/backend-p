import Constants from "expo-constants";
import { Text, StyleSheet, View } from "react-native";

const Main = () => {
    return (
        <View style={styles.container}>
            <Text>Rate Repository Application</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
    },
});
export default Main;
