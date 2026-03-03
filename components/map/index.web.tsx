import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const PROVIDER_GOOGLE = 'google';

export const Marker = ({ title, description }: any) => (
    <View style={styles.markerPlaceholder}>
        <Text style={styles.markerText}>{title || 'Marker'}</Text>
        {description && <Text style={styles.markerDescription}>{description}</Text>}
    </View>
);

const MapView = ({ children, style }: any) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.text}>Xəritə Veb-də hələlik əlçatmazdır (Map is currently unavailable on web)</Text>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    text: {
        color: '#666',
        fontSize: 16,
        textAlign: 'center',
        padding: 20,
    },
    content: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    markerPlaceholder: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#999',
        marginBottom: 5,
    },
    markerText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    markerDescription: {
        fontSize: 10,
    }
});

export default MapView;
