import { layoutTheme } from "@/constant/theme";
import { carModels } from "@/data/car-models";
import useTheme from "@/hooks/use-theme";
import { useAddBookingStore } from "@/store/use-add-booking";
import { useCarState } from "@/store/use-car.state";
import { ThemeType } from "@/types/theme.type";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CarModelPage() {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const { colorScheme } = useTheme();
    const styles = getStyles(colorScheme);
    const flatListRef = useRef<FlatList>(null);

    const { id } = useLocalSearchParams();
    const { setCarId } = useAddBookingStore();
    const { setSelectedCar } = useCarState();

    const car = carModels.find((car) => car.id === id);
    if (!car) {
        return <View style={styles.container}><Text>Car not found</Text></View>;
    }

    const handleBooking = () => {
        setCarId(id as string);
        setSelectedCar(car);
        router.push(`/booking`);
    }

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / SCREEN_WIDTH);
        setCurrentImage(index);
    };

    const renderImageItem = ({ item }: { item: any }) => (
        <View style={styles.imageContainer}>
            <Image
                source={typeof item === 'string' ? { uri: item } : item}
                style={styles.image}
            />
        </View>
    );

    const renderDots = () => (
        <View style={styles.dotsContainer}>
            {(car.images || [car.image]).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        index === currentImage && styles.activeDot
                    ]}
                />
            ))}
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: colorScheme === "dark" ? layoutTheme.colors.background.primary : "#fff" }}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>

                {/* Slider and Dots */}
                <View style={styles.sliderWrapper}>
                    <FlatList
                        ref={flatListRef}
                        data={car.images || [car.image]}
                        renderItem={renderImageItem}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    />
                    {renderDots()}
                </View>

                <View style={styles.content}>
                    {/* Title and Rating */}
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.carTitle}>{car.brand} {car.model} - {car.type}</Text>
                            <View style={styles.ratingBox}>
                                <Ionicons name="star" size={16} color="#FFD700" />
                                <Text style={styles.ratingText}>4.8 </Text>
                                <Text style={styles.reviewText}>[140+ Review]</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.favoriteButton}>
                            <Ionicons name="heart-outline" size={24} color="#888" />
                        </TouchableOpacity>
                    </View>

                    {/* Renter Section */}
                    <View style={styles.renterCard}>
                        <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.renterAvatar} />
                        <View style={styles.renterInfo}>
                            <Text style={styles.renterName}>John Downson</Text>
                            <Text style={styles.renterLabel}>Renter</Text>
                        </View>
                        <View style={styles.renterActions}>
                            <TouchableOpacity style={styles.renterBtn}>
                                <Ionicons name="chatbox-ellipses-outline" size={20} color={layoutTheme.colors.secondary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.renterBtn}>
                                <Ionicons name="call-outline" size={20} color={layoutTheme.colors.secondary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Car Info Section */}
                    <Text style={styles.sectionTitle}>Car Info</Text>
                    <View style={styles.infoList}>
                        <View style={styles.infoItem}>
                            <Ionicons name="person" size={20} color={layoutTheme.colors.secondary} />
                            <Text style={styles.infoText}>4 Passangers</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <MaterialCommunityIcons name="car-door" size={20} color={layoutTheme.colors.secondary} />
                            <Text style={styles.infoText}>4 Doors</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Ionicons name="snow" size={20} color={layoutTheme.colors.secondary} />
                            <Text style={styles.infoText}>Air conditioning</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Ionicons name="color-fill" size={20} color={layoutTheme.colors.secondary} />
                            <Text style={styles.infoText}>Fuel info: Full to Full</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <MaterialCommunityIcons name="car-cog" size={20} color={layoutTheme.colors.secondary} />
                            <Text style={styles.infoText}>{car.transmission}</Text>
                        </View>
                    </View>

                    {/* Car Specs Section */}
                    <Text style={styles.sectionTitle}>Car Specs</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.specsList}>
                        <View style={styles.specCard}>
                            <Text style={styles.specLabel}>Max Power</Text>
                            <Text style={styles.specValue}>720</Text>
                        </View>
                        <View style={styles.specCard}>
                            <Text style={styles.specLabel}>0-60 mph</Text>
                            <Text style={styles.specValue}>5.4</Text>
                        </View>
                        <View style={styles.specCard}>
                            <Text style={styles.specLabel}>Top Speed</Text>
                            <Text style={styles.specValue}>180</Text>
                        </View>
                    </ScrollView>

                    {/* Add some space for floating button */}
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* Floating Booking Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.bookingBtn} onPress={handleBooking}>
                    <Text style={styles.bookingBtnText}>Booking Now</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.footerPrice}>${car.pricePerDay}</Text>
                        <Text style={styles.footerDay}> /day</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: theme === "dark" ? layoutTheme.colors.background.primary : "#fff",
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    sliderWrapper: {
        width: SCREEN_WIDTH,
        height: 350,
        backgroundColor: "#F5F5F5",
    },
    imageContainer: {
        width: SCREEN_WIDTH,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: '80%',
        resizeMode: 'contain',
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(232, 123, 53, 0.3)',
    },
    activeDot: {
        backgroundColor: '#E87B35',
        width: 25,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    carTitle: {
        fontSize: 22,
        fontFamily: layoutTheme.fonts.inter.bold,
        color: theme === "dark" ? "#fff" : "#000",
    },
    ratingBox: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    ratingText: {
        fontSize: 14,
        fontFamily: layoutTheme.fonts.inter.bold,
        color: "#000",
        marginLeft: 5,
    },
    reviewText: {
        fontSize: 14,
        fontFamily: layoutTheme.fonts.inter.regular,
        color: "#888",
    },
    favoriteButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    renterCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    renterAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    renterInfo: {
        flex: 1,
        marginLeft: 15,
    },
    renterName: {
        fontSize: 16,
        fontFamily: layoutTheme.fonts.inter.semiBold,
        color: "#000",
    },
    renterLabel: {
        fontSize: 14,
        fontFamily: layoutTheme.fonts.inter.regular,
        color: "#888",
    },
    renterActions: {
        flexDirection: "row",
        gap: 10,
    },
    renterBtn: {
        width: 40,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: layoutTheme.fonts.inter.bold,
        color: "#000",
        marginTop: 25,
        marginBottom: 15,
    },
    infoList: {
        gap: 12,
    },
    infoItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    infoText: {
        fontSize: 16,
        fontFamily: layoutTheme.fonts.inter.medium,
        color: "#333",
    },
    specsList: {
        gap: 15,
        paddingBottom: 10,
    },
    specCard: {
        width: 120,
        padding: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#f0f0f0",
        backgroundColor: "#fff",
    },
    specLabel: {
        fontSize: 12,
        fontFamily: layoutTheme.fonts.inter.regular,
        color: "#888",
        marginBottom: 5,
    },
    specValue: {
        fontSize: 20,
        fontFamily: layoutTheme.fonts.inter.bold,
        color: "#000",
    },
    footer: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 100,
    },
    bookingBtn: {
        flexDirection: "row",
        backgroundColor: layoutTheme.colors.secondary,
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 20,
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: layoutTheme.colors.secondary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    bookingBtnText: {
        fontSize: 18,
        fontFamily: layoutTheme.fonts.inter.bold,
        color: "#fff",
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    footerPrice: {
        fontSize: 20,
        fontFamily: layoutTheme.fonts.inter.bold,
        color: "#fff",
    },
    footerDay: {
        fontSize: 14,
        fontFamily: layoutTheme.fonts.inter.regular,
        color: "rgba(255,255,255,0.8)",
    }
});