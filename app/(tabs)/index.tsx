import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const brands = [
    { id: "audi", name: "Audi", logo: require("@/assets/brands/audi.png") },
    { id: "bmw", name: "BMW", logo: require("@/assets/brands/bmw.png") },
    { id: "ford", name: "Ford", logo: require("@/assets/brands/ford.png") },
    { id: "porsche", name: "Porsche", logo: require("@/assets/brands/porsche.png") },
];

const carModels = [
    {
        id: "audi-7-elite",
        brand: "Audi",
        model: "7 - Elite State",
        pricePerDay: 1200,
        rating: 4.8,
        reviews: 140,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
        color: "white"
    },
    {
        id: "tesla-model-3",
        brand: "Tesla",
        model: "Model 3",
        pricePerDay: 950,
        rating: 4.5,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
        color: "red"
    },
    {
        id: "bmw-3-series",
        brand: "BMW",
        model: "3 Series",
        pricePerDay: 800,
        rating: 4.6,
        reviews: 120,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        color: "blue"
    },
    {
        id: "mercedes-c-class",
        brand: "Mercedes",
        model: "C-Class",
        pricePerDay: 900,
        rating: 4.7,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
        color: "black"
    },
];

export default function Home() {
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const onRefresh = async () => {
        setRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setRefreshing(false);
    };

    const renderCarCard = ({ item, index }: { item: typeof carModels[0], index: number }) => (
        <View style={[styles.carCard, index % 2 === 0 ? { marginRight: 8 } : { marginLeft: 8 }]}>
            <View style={styles.carImageContainer}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.carImage}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.carContent}>
                <Text style={styles.carName} numberOfLines={1}>
                    {item.color} {item.brand} {item.model}
                </Text>
                <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color="#FFB800" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.reviewsText}>({item.reviews}+ Review)</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceText}>${item.pricePerDay.toLocaleString()}</Text>
                    <Text style={styles.perDayText}>/day</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <FlatList
                data={carModels}
                numColumns={2}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListHeaderComponent={
                    <>
                        <View style={styles.locationHeader}>
                            <View style={styles.locationLeft}>
                                <View style={styles.locationPin}>
                                    <Ionicons name="location" size={18} color="#FF6B35" />
                                </View>
                                <View style={styles.locationTextContainer}>
                                    <Text style={styles.locationLabel}>Your location</Text>
                                    <View style={styles.locationRow}>
                                        <Text style={styles.locationName}>Ngangphal,Selman</Text>
                                        <Ionicons name="chevron-down" size={14} color="#333" />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.profileContainer}>
                                <Image
                                    source={require("@/assets/brands/profile.png")}
                                    style={styles.profileImage}
                                />
                            </View>
                        </View>

                        <Text style={styles.mainTitle}>
                            Find your favourite{'\n'}vechicle.
                        </Text>

                        <View style={styles.searchContainer}>
                            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search vechicle"
                                placeholderTextColor="#999"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Top Brands</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.brandsContainer}>
                            {brands.map((brand) => (
                                <TouchableOpacity key={brand.id} style={styles.brandItem}>
                                    <View style={styles.brandLogoContainer}>
                                        <Image
                                            source={brand.logo}
                                            style={styles.brandLogo}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text style={styles.brandName}>{brand.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Available Near You</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
                renderItem={renderCarCard}
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    locationHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 24,
    },
    locationLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationPin: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#FFF5F0",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    locationTextContainer: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 11,
        color: "#888",
        fontFamily: "Inter-Regular",
        marginBottom: 2,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    locationName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#333",
        marginRight: 4,
        fontFamily: "Inter-SemiBold",
    },
    profileContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
    },
    profileImage: {
        width: "100%",
        height: "100%",
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: "700",
        color: "#1A1A1A",
        lineHeight: 34,
        marginBottom: 24,
        fontFamily: "Inter-Bold",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 48,
        marginBottom: 28,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: "#333",
        fontFamily: "Inter-Regular",
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1A1A1A",
        fontFamily: "Inter-SemiBold",
    },
    seeAllText: {
        fontSize: 13,
        color: "#FF6B35",
        fontWeight: "500",
        fontFamily: "Inter-Medium",
    },
    brandsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 28,
    },
    brandItem: {
        alignItems: "center",
    },
    brandLogoContainer: {
        width: 65,
        height: 65,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 6,
    },
    brandLogo: {
        width: 55,
        height: 55,
    },
    brandName: {
        fontSize: 11,
        color: "#666",
        fontFamily: "Inter-Regular",
    },
    columnWrapper: {
        justifyContent: "space-between",
        marginBottom: 16,
    },
    carCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    carImageContainer: {
        height: 120,
        backgroundColor: "#F8F8F8",
        overflow: "hidden",
    },
    carImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    carContent: {
        padding: 10,
    },
    carName: {
        fontSize: 12,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 4,
        fontFamily: "Inter-SemiBold",
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#1A1A1A",
        marginLeft: 3,
        fontFamily: "Inter-SemiBold",
    },
    reviewsText: {
        fontSize: 10,
        color: "#888",
        marginLeft: 3,
        fontFamily: "Inter-Regular",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    priceText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#1A1A1A",
        fontFamily: "Inter-Bold",
    },
    perDayText: {
        fontSize: 11,
        color: "#888",
        marginLeft: 2,
        fontFamily: "Inter-Regular",
    },
});