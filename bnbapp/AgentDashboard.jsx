import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

/**
 * @function AgentDashboard
 * @description The main landing screen for verified property agents.
 */
const AgentDashboard = ({ user = { name: "Agent John Doe" } }) => {
    const navigation = useNavigation();

    // Function to navigate to the "Add Property" screen (PropertyCreationScreen.js)
    const handleAddProperty = () => {
        // 'PropertyCreation' is the name defined in App.js
        navigation.navigate('PropertyCreation'); 
    };

    // Function to navigate to the "Manage Listings" screen (AgentListingsScreen.js)
    const handleManageListings = () => {
        // 'AgentListings' is the name defined in App.js
        navigation.navigate('AgentListings'); 
    };

    return (
        <View style={styles.container}>
            {/* Header Area */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Welcome Back, {user.name}!</Text>
                <Text style={styles.headerSubtitle}>Your Management Hub</Text>
            </View>

            {/* CTA Button 1: Add New Property (Primary Action) */}
            <TouchableOpacity 
                style={styles.ctaButton} 
                onPress={handleAddProperty}
            >
                <Ionicons name="add-circle-outline" size={24} color="#fff" />
                <Text style={styles.ctaButtonText}>List New Property</Text>
            </TouchableOpacity>

            {/* CTA Button 2: Manage Existing Listings (Secondary Action) */}
            <TouchableOpacity 
                style={styles.secondaryCtaButton} 
                onPress={handleManageListings}
            >
                <Ionicons name="list-outline" size={20} color="#34495e" />
                <Text style={styles.secondaryCtaButtonText}>View/Manage My Listings</Text>
            </TouchableOpacity>


            {/* Summary Box (Mock Data) */}
            <Text style={styles.listTitle}>Summary of Your Listings</Text>
            
            <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>Total Listings: 3</Text>
                <Text style={styles.summaryText}>Approved: 1</Text>
                <Text style={styles.summaryText}>Pending Review: 2</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7f6', // Light background
    },
    header: {
        padding: 20,
        backgroundColor: '#2c3e50', // Dark Header background
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#bdc3c7',
        marginTop: 5,
    },
    // Primary CTA Button
    ctaButton: {
        flexDirection: 'row',
        backgroundColor: '#2ecc71', // Green for positive action
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    ctaButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    // Secondary CTA Button
    secondaryCtaButton: {
        flexDirection: 'row',
        backgroundColor: '#ffffff', // White background
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#bdc3c7',
    },
    secondaryCtaButtonText: {
        color: '#34495e',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    // Summary Box
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#34495e',
        marginHorizontal: 20,
        marginBottom: 10,
    },
    summaryBox: {
        backgroundColor: '#ffffff',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#3498db',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    summaryText: {
        fontSize: 16,
        color: '#34495e',
        marginBottom: 5,
    },
});

export default AgentDashboard;