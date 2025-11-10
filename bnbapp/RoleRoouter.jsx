import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

/**
 * @function RoleRouter
 * @description Checks the user's role upon navigation and redirects to the appropriate dashboard.
 */
const RoleRouter = () => {
    const navigation = useNavigation();
    // useRoute hook accesses the parameters passed to this screen (the user object)
    const route = useRoute();
    const { user } = route.params; // Expects an object like: { id: 1, name: 'Test User', role: 'student' }

    useEffect(() => {
        // We use setTimeout to slightly delay the navigation so the loading spinner shows briefly
        const redirectTimer = setTimeout(() => {
            if (user && user.role) {
                if (user.role === 'agent') {
                    // Navigate to the Agent Dashboard, passing the user data
                    navigation.replace('AgentDashboard', { user: user });
                } else if (user.role === 'student') {
                    // Navigate to the Student Dashboard, passing the user data
                    navigation.replace('StudentDashboard', { user: user });
                } else {
                    // Default to student if role is unknown or missing
                    navigation.replace('StudentDashboard', { user: user });
                }
            } else {
                // If no user data, send them back to login (or a default screen)
                navigation.replace('LoginScreen');
            }
        }, 1000); // 1-second delay for smoother transition

        // Cleanup function: clears the timer if the component unmounts early
        return () => clearTimeout(redirectTimer);
    }, [user, navigation]);

    // The component renders a simple loading screen while the redirection logic runs
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#3498db" />
            <Text style={styles.text}>Directing you to your dashboard...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f7f6',
    },
    text: {
        marginTop: 15,
        fontSize: 16,
        color: '#2c3e50',
    }
});

export default RoleRouter;