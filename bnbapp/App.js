import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

// --- Import All Screens ---
// Note: You must have these files in your bnbapp folder:
import LoginScreen from './LoginScreen'; // Placeholder for your actual login screen
import RoleRouter from './RoleRouter'; 
import AgentDashboard from './AgentDashboard'; 
import StudentDashboard from './StudentDashboard'; 
import PropertyCreationScreen from './PropertyCreationScreen'; // The newest screen
import PropertyDetailScreen from './PropertyDetailScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

/**
 * @function App
 * @description The main component that defines the application's screen navigation flow.
 */
const App = () => {
    // Optional: Hide harmless warnings in development for a cleaner console
    LogBox.ignoreAllLogs(true); 

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="LoginScreen"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#3498db', // Blue header background
                    },
                    headerTintColor: '#fff', // White text/icons
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                {/* 1. ENTRY POINT (The first screen users see) */}
                <Stack.Screen 
                    name="LoginScreen" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} // Hides the top navigation bar here
                />
                
                {/* 2. THE ROUTER (The bouncer that checks roles) */}
                <Stack.Screen 
                    name="RoleRouter" 
                    component={RoleRouter} 
                    options={{ headerShown: false }}
                />
                
                {/* 3. AGENT WORKFLOW SCREENS */}
                <Stack.Screen 
                    name="AgentDashboard" 
                    component={AgentDashboard} 
                    options={{ title: 'Agent Portal' }}
                />
                <Stack.Screen 
                    name="PropertyCreation" 
                    component={PropertyCreationScreen} 
                    options={{ title: 'List New Property' }}
                />
                
                {/* 4. STUDENT WORKFLOW SCREENS */}
                <Stack.Screen 
                    name="StudentDashboard" 
                    component={StudentDashboard} 
                    options={{ title: 'Find Accommodation' }}
                />
                <Stack.Screen 
                    name="PropertyDetail" 
                    component={PropertyDetailScreen} 
                    options={{ title: 'Property Details' }} // The actual title will be overwritten by the property name
                />
                <Stack.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{ title: 'My Account' }}
                />

                import AgentListingsScreen from './AgentListingsScreen'; 

                <Stack.Screen 
                    name="AgentListings" 
                    component={AgentListingsScreen} 
                    options={{ title: 'Manage Listings' }}
/>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;