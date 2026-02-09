import { interFont } from "@/constant/inter-font";
import { montserratFont } from "@/constant/montserrat-font";
import useLayoutFonts from "@/hooks/use-fonts";
import { Stack } from "expo-router";
import React from "react";

import ThemeProvider from "@/context/theme-provider";

export default function RootLayout() {
  const { loaded, error } = useLayoutFonts({ ...interFont, ...montserratFont })


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
