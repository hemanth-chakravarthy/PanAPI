import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusinessDetailsScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Business Details</Text>
            {/* Add your business details form here */}
        </View>
    );
};

export default BusinessDetailsScreen;

const styles = StyleSheet.create({
    container: { padding: 20 },
    heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
}); 