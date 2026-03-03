import useTheme from "@/hooks/use-theme";
import { ThemeType } from "@/types/theme.type";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Gradient({children}:{children:React.ReactNode}) {
    const {colorScheme} = useTheme();
    const styles = getStyles(colorScheme);
    return(
        <LinearGradient
            colors={["#f1f1f1", "#FFFFFF"]}
            style={styles.gradient}
        >
            {children}
        </LinearGradient>
    )
}

const getStyles = (theme:ThemeType)=>StyleSheet.create({
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        height: "100%",
        width: "100%",
    }
})