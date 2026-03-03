import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native"
import { ThemeType } from "@/types/theme.type"
import useTheme from "@/hooks/use-theme";
import { layoutTheme } from "@/constant/theme";

interface ButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function Button({ children, onPress, style }: ButtonProps) {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);

    return (
        <Pressable style={[styles.button, style]} onPress={onPress}>
            {children}
        </Pressable>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    button: {
        backgroundColor: layoutTheme.colors.background.secondary,
        maxWidth: 324,
        width: "100%",
        padding: 16,
        borderRadius: 12,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    }
})
