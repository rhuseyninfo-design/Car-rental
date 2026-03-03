import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";
export default function AddCard() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Add Card</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})