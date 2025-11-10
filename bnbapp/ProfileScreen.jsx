import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

/**
 * @function ProfileScreen
 * @description A generic settings and profile management screen for both Agents and Students.
 */
const ProfileScreen = () => {
    const navigation = useNavigation();

    // Mock user data (In a real app, this would come from global state or context)
    const mockUser = {
        name: "Amara Nnadi",
        email: "amara.n@example.com",
        role: "student", // Could also be 'agent'
        memberSince: "Jan 2024",
    };

    const handleLogout = () => {
        // In a real app: Clear authentication tokens from device storage
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Logout", 
                    style: "destructive", 
                    onPress: () => navigation.replace('LoginScreen') 
                }
            ]
        );
    };

    const handleOptionPress = (option) => {
        Alert.alert(`${option}`, `This feature is coming soon!`);
        // Future code would navigate to specific forms (e.g., UpdatePasswordScreen)
    };

    return (
        <ScrollView style={styles.container}>
            {/* User Info Header */}
            <View style={styles.header}>
                <Ionicons name="person-circle-outline" size={80} color="#3498db" />
                <Text style={styles.name}>{mockUser.name}</Text>
                <Text style={styles.roleText}>Role: {mockUser.role === 'agent' ? 'Property Agent' : 'Student User'}</Text>
                <Text style={styles.memberText}>Member Since: {mockUser.memberSince}</Text>
            </View>

            {/* Settings Options */}
            <View style={styles.settingsGroup}>
                <Text style={styles.groupTitle}>Account Management</Text>
                
                <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress("Edit Profile")}>
                    <Ionicons name="create-outline" size={24} color="#2c3e50" />
                    <Text style={styles.optionText}>Edit Profile Information</Text>
                    <Ionicons name="chevron-forward-outline" size={20} color="#bdc3c7" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress("Change Password")}>
                    <Ionicons name="lock-closed-outline" size={24} color="#2c3e50" />
                    <Text style={styles.optionText}>Change Password</Text>
                    <Ionicons name="chevron-forward-outline" size={20} color="#bdc3c7" />
                </TouchableOpacity>

                {/* Agent-Specific Link (Optional) */}
                {mockUser.role === 'agent' && (
                    <TouchableOpacity style={styles.optionItem} onPress={() => handleOptionPress("Payout Settings")}>
                        <Ionicons name="wallet-outline" size={24} color="#2ecc71" />
                        <Text style={styles.optionText}>Payout & Commission Settings</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#bdc3c7" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Log Out Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="#fff" />
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7f6',
    },
    header: {
        backgroundColor: '#ffffff',
        padding: 30,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#2c3e50',
    },
    roleText: {
        fontSize: 16,
        color: '#3498db',
        marginTop: 5,
    },
    memberText: {
        fontSize: 14,
        color: '#7f8c8d',
        marginTop: 5,
    },
    settingsGroup: {
        backgroundColor: '#ffffff',
        marginHorizontal: 15,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ecf0f1',
    },
    groupTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7f8c8d',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 5,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
        backgroundColor: '#fff',
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 15,
        color: '#34495e',
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#e74c3c',
        padding: 15,
        borderRadius: 8,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default ProfileScreen;