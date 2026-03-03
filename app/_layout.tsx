import { interFont, montserratFont } from "@/constant/fonts";
import ThemeProvider from "@/context/theme-provider";
import useLayoutFonts from "@/hooks/use-fonts";
import { removeNotificationListeners, setupNotificationListeners } from "@/notification/listeners";
import { configureNotificationHandler, registerForPushNotifications } from "@/notification/register";
import { Stack } from "expo-router";
import { useEffect } from "react";


export default function RootLayout() {
  const { loaded, error } = useLayoutFonts({ ...interFont, ...montserratFont })

  useEffect(() => {
    configureNotificationHandler();
    setupNotificationListeners();
    registerForPushNotifications().catch(error => {
      console.error('Error registering for push notifications:', error);
    });

    return () => {
      removeNotificationListeners();
    };
  }, [])

  if (!loaded || error) return null;
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home/page" />
        <Stack.Screen name="(tabs)/index" />
      </Stack>
    </ThemeProvider>
  )
}
