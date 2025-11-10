import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native'; // Hook to access passed data

/**
 * @function PropertyDetailScreen
 * @description Displays full details of a single property listing for students.
 */
const PropertyDetailScreen = () => {
    // Access the data passed from the previous screen (StudentDashboard)
    const route = useRoute();
    const { property } = route.params;

    // --- Action Handlers ---
    
    // In a real app, this would come from the database
    const agentDetails = {
        name: property.agent,
        phone: '08012345678', // Mock phone number
        email: 'agent@bnb.com', // Mock email
    };

    const handleCall = () => {
        // Use the Linking API to open the phone dialer
        Linking.openURL(`tel:${agentDetails.phone}`).catch(err => {
            Alert.alert('Error', 'Could not open dialer. Please check the number.');
            console.error('Failed to open dialer:', err);
        });
    };

    const handleEmail = () => {
        // Use the Linking API to open the email client
        Linking.openURL(`mailto:${agentDetails.email}?subject=Inquiry about ${property.title}`).catch(err => {
            Alert.alert('Error', 'Could not open email app.');
            console.error('Failed to open email:', err);
        });
    };
    
    // --- Mock Image Source ---
    // Since we don't have a real image server, use a placeholder image for display
    const mockImage = 'https://picsum.photos/800/600?random=' + property.id.charAt(1);

    return (
        <ScrollView style={styles.container}>
            {/* 1. Main Image */}
            <Image 
                source={{ uri: mockImage }} 
                style={styles.mainImage} 
                resizeMode="cover"
            />
            
            <View style={styles.content}>
                {/* 2. Price and Title */}
                <Text style={styles.price}>₦{property.price.toLocaleString()}</Text>
                <Text style={styles.title}>{property.title}</Text>

                {/* 3. Key Details */}
                <View style={styles.detailRow}>
                    <Ionicons name="bed-outline" size={20} color="#3498db" />
                    <Text style={styles.detailText}>{property.beds} Bedroom{property.beds > 1 ? 's' : ''}</Text>
                    <Ionicons name="location-outline" size={20} color="#3498db" style={{marginLeft: 20}}/>
                    <Text style={styles.detailText}>Location Near Campus</Text>
                </View>
                
                <View style={styles.detailRow}>
                    <Ionicons name="home-outline" size={20} color="#3498db" />
                    <Text style={styles.detailText}>Type: {property.type}</Text>
                </View>

                {/* 4. Description */}
                <Text style={styles.sectionHeader}>Description</Text>
                <Text style={styles.descriptionText}>
                    This is a mock description for the property. It is available immediately and features modern amenities, reliable power supply, and is located in a highly secure area, perfect for serious students. All payments are handled directly with the agent.
                </Text>
                
                {/* 5. Agent Contact */}
                <Text style={styles.sectionHeader}>Contact Agent: {agentDetails.name}</Text>
                <View style={styles.contactRow}>
                    <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
                        <Ionicons name="call-outline" size={20} color="#fff" />
                        <Text style={styles.contactButtonText}>Call {agentDetails.phone}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.contactButton, {backgroundColor: '#f39c12'}]} onPress={handleEmail}>
                        <Ionicons name="mail-outline" size={20} color="#fff" />
                        <Text style={styles.contactButtonText}>Email</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7f6',
    },
    mainImage: {
        width: '100%',
        height: 250,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
    },
    price: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2ecc71',
        marginBottom: 10,
    },
    // Details
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 16,
        color: '#34495e',
        marginLeft: 8,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
        paddingBottom: 5,
    },
    descriptionText: {
        fontSize: 15,
        color: '#7f8c8d',
        lineHeight: 22,
    },
    // Contact Buttons
    contactRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 30,
    },
    contactButton: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#3498db',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    contactButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    }
});

export default PropertyDetailScreen;