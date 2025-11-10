import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

// --- MOCK DATA ---
// This simulates the data the Agent has submitted to the backend.
const MOCK_PROPERTIES = [
    {
        id: 'p1',
        title: 'Spacious 3-Bed Apartment',
        location: 'Near Gate A, Owerri Road',
        price: '₦300,000',
        status: 'Approved',
    },
    {
        id: 'p2',
        title: 'Single Self-Contained',
        location: 'Inside New Lodge',
        price: '₦120,000',
        status: 'Pending Review',
    },
    {
        id: 'p3',
        title: 'Shared Room (2 Occupants)',
        location: 'Main Hostel Block',
        price: '₦70,000',
        status: 'Rejected',
    },
];

/**
 * @function PropertyListItem
 * @description Renders a single property listing card for the agent.
 */
const PropertyListItem = ({ item, onView, onEdit, onDelete }) => {
    // Determine the color for the status pill
    let statusColor = '#3498db'; // Default to blue
    if (item.status === 'Approved') statusColor = '#2ecc71'; // Green
    if (item.status === 'Rejected') statusColor = '#e74c3c'; // Red
    
    return (
        <View style={styles.card}>
            <View style={styles.detailsContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLocation}>
                    <Ionicons name="location-outline" size={14} color="#7f8c8d" /> {item.location}
                </Text>
                <Text style={styles.cardPrice}>Price: {item.price}</Text>
            </View>
            
            <View style={styles.statusPillContainer}>
                <Text style={[styles.statusPill, { backgroundColor: statusColor }]}>
                    {item.status}
                </Text>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={() => onView(item.id)}>
                    <Ionicons name="eye-outline" size={20} color="#3498db" />
                    <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(item.id)}>
                    <Ionicons name="create-outline" size={20} color="#f39c12" />
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(item.id)}>
                    <Ionicons name="trash-outline" size={20} color="#e74c3c" />
                    <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


/**
 * @function AgentListingsScreen
 * @description Main screen to display and manage the agent's properties.
 */
const AgentListingsScreen = ({ navigation }) => {
    // In a real app, this state would be populated by an API call.
    const [properties, setProperties] = useState(MOCK_PROPERTIES);

    const handleView = (id) => {
        Alert.alert('View Property', `Navigating to detailed view for property ID: ${id}`);
        // TODO: Navigate to a detailed View screen
    };

    const handleEdit = (id) => {
        Alert.alert('Edit Property', `Navigating to edit form for property ID: ${id}`);
        // TODO: Navigate to PropertyCreationScreen, passing the property data to pre-fill the form
    };

    const handleDelete = (id) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this listing?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive", 
                    onPress: () => {
                        // In a real app: Call API to delete, then update state
                        setProperties(prev => prev.filter(p => p.id !== id));
                        Alert.alert("Deleted", `Property ID: ${id} has been removed.`);
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Active Listings ({properties.length})</Text>
            
            <FlatList
                data={properties}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <PropertyListItem 
                        item={item} 
                        onView={handleView} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete}
                    />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={<Text style={styles.emptyText}>You have no listings yet.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7f6',
    },
    listContent: {
        padding: 15,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailsContainer: {
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 5,
    },
    cardLocation: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 5,
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495e',
    },
    statusPillContainer: {
        alignItems: 'flex-start', // Align the pill to the left
        marginBottom: 15,
    },
    statusPill: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        overflow: 'hidden',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ecf0f1',
        paddingTop: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    actionText: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '600',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#7f8c8d',
    }
});

export default AgentListingsScreen;