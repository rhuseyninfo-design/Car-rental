import Button from "@/components/ui/button";
import { layoutTheme } from "@/constant/theme";
import useTheme from "@/hooks/use-theme";
import { useAvatarStore } from "@/store/use-avatar.state";
import { ThemeType } from "@/types/theme.type";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { personalInformationSchema, PersonalInformationSchemaType } from "./personal-information.schema";


export default function PersonalInformationForm() {
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);
    const { avatar, setAvatar, loadAvatar } = useAvatarStore();

    const { control, setValue, handleSubmit, formState: { errors } } = useForm<PersonalInformationSchemaType>(
        {
            resolver: zodResolver(personalInformationSchema),
            defaultValues: {
                avatar: avatar || "",
                name: "",
                email: "",
                phone: "",
                address: "",
            },
        }
    );
    const onSubmit = async (data: PersonalInformationSchemaType) => {
        try {
            if (data.avatar) {
                await setAvatar(data.avatar);
            }

            await AsyncStorage.setItem("personalInformation", JSON.stringify(data));
            Alert.alert("Success", "Personal information updated successfully",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            router.push("/(tabs)/profile");
                        }
                    }
                ]
            );
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed to update personal information");
        }
    }

    const getPersonalInformationData = useCallback(async () => {
        await loadAvatar();

        const personalInformation = JSON.parse(await AsyncStorage.getItem("personalInformation") || "{}");
        if (personalInformation) {
            setValue("avatar", personalInformation.avatar || "");
            setValue("name", personalInformation.name || "");
            setValue("email", personalInformation.email || "");
            setValue("phone", personalInformation.phone || "");
            setValue("address", personalInformation.address || "");
        }
    }, [loadAvatar, setValue]);

    useEffect(() => {
        getPersonalInformationData();
    }, [getPersonalInformationData]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.formTitle}>Full Name</Text>
                <Controller name="name" control={control} render={({ field: { value, onChange, onBlur } }) => (
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.formInput}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onFocus={() => setValue("name", "")}
                            placeholder="Enter your full name" />
                        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                    </View>
                )} />

                <Text style={styles.formTitle}>Email</Text>
                <Controller name="email" control={control} render={({ field: { value, onChange, onBlur } }) => (
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.formInput}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onFocus={() => setValue("email", "")}
                            placeholder="Enter your email" />
                        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                    </View>
                )} />

                <Text style={styles.formTitle}>Phone</Text>
                <Controller name="phone" control={control} render={({ field: { value, onChange, onBlur } }) => (
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.formInput}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onFocus={() => setValue("phone", "")}
                            placeholder="Enter your phone number" />
                        {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
                    </View>
                )} />

                <Text style={styles.formTitle}>Address</Text>
                <Controller name="address" control={control} render={({ field: { value, onChange, onBlur } }) => (
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.formInput}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onFocus={() => setValue("address", "")}
                            placeholder="Enter your address" />
                        {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}
                    </View>
                )} />

                <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </Button>
            </View>
        </SafeAreaView>
    )
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: theme === "dark" ? layoutTheme.colors.primary : layoutTheme.colors.white,
    },
    form: {
        padding: 10,
        width: "100%",
        gap: 10,

    },
    formTitle: {
        color: theme === "dark" ? layoutTheme.colors.white : layoutTheme.colors.primary,
        fontSize: 16,
        fontFamily: layoutTheme.fonts.inter.regular,
    },
    inputWrapper: {
        width: "100%",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: layoutTheme.colors.gray,
        borderRadius: 10,
        padding: 16,
    },
    formInput: {
        fontSize: 14,
        color: layoutTheme.colors.text.secondary,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontFamily: layoutTheme.fonts.inter.bold,
    },
    button: {
        minWidth: "100%"
    },
})