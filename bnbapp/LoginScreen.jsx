import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
    
    // --- Mock Login Logic for Testing ---
    const mockLogin = (role) => {
        // In a real app, this would be an API call, and the API response
        // would contain the user's role (agent or student).
        const mockUser = { id: 1, name: 'Test User', role: role };
        
        // Navigate to the RoleRouter, passing the mock user object
        navigation.replace('RoleRouter', { user: mockUser });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>BNB Accommodations</Text>
            <Text style={styles.subheader}>Login (Select Role to Test)</Text>
            
            <Button
                title="Login as Student"
                onPress={() => mockLogin('student')}
                color="#3498db"
            />
            
            <View style={{ height: 20 }} />

            <Button
                title="Login as Agent"
                onPress={() => mockLogin('agent')}
                color="#2ecc71"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f7f6',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    subheader: {
        fontSize: 16,
        marginBottom: 40,
        color: '#7f8c8d',
    },
});

export default LoginScreen;