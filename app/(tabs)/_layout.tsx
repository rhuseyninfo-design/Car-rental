import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import React from "react"

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false }} >
            <Tabs.Screen name="index" options={{
                title: "",
                tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
            }}
            />
            <Tabs.Screen name="favorite"
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />
                }}
            />
            <Tabs.Screen name="notifications"
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => <Ionicons name="notifications" color={color} size={size} />
                }}
            />
            <Tabs.Screen name="profile"
                options={{
                    title: "",
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />
                }}
            />

        </Tabs >
    )
}