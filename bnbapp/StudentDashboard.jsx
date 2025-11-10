import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

// --- MOCK DATA (Simulates properties from your database) ---
const MOCK_LISTINGS = [
    { id: 'a1', title: 'Studio Flat, 10 mins walk to Campus', price: 150000, beds: 1, agent: 'Trusted Homes', type: 'self-contain' },
    { id: 'b2', title: 'Shared Room in 4-Bed House', price: 80000, beds: 1, agent: 'Campus Connect', type: 'shared' },
    { id: 'c3', title: 'Executive 2-Bedroom Apartment', price: 300000, beds: 2, agent: 'Premium Rentals', type: 'apartment' },
    { id: 'd4', title: 'Single Room, 5 mins walk to Gate', price: 100000, beds: 1, agent: 'Fast Movers', type: 'single' },
    { id: 'e5', title: 'Large 3 Bedroom for Group of 3', price: 450000, beds: 3, agent: 'Group Housing', type: 'apartment' },
];
// --------------------------------------------------------

/**
 * @function StudentDashboard
 * @description The main screen for students to search, filter, and view property listings.
 */
const StudentDashboard = () => {
    const navigation = useNavigation();
    
    // State for Search and Filter values
    const [searchQuery, setSearchQuery] = useState('');
    const [listings] = useState(MOCK_LISTINGS);
    const [filteredListings, setFilteredListings] = useState(MOCK_LISTINGS);
    const [maxPrice, setMaxPrice] = useState('0'); 
    const [minBeds, setMinBeds] = useState('1'); 
    const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');

    // 1. Hook to set the Header Button
    useEffect(() => {
        navigation.setOptions({
            // Place the Profile icon in the top right of the navigation bar
            headerRight: () => (
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Profile')} // Navigates to ProfileScreen.js
                    style={{ marginRight: 15 }}
                >
                    {/* Assuming a light header background, using blue icon */}
                    <Ionicons name="person-circle-outline" size={26} color="#3498db" /> 
                </TouchableOpacity>
            ),
            headerTitle: 'Find Accommodation',
        });
    }, [navigation]);

    // 2. Filter Logic Hook (Runs whenever search/filters change)
    useEffect(() => {
        applyFilters();
    }, [searchQuery, maxPrice, minBeds, propertyTypeFilter, listings]); 

    /**
     * @function applyFilters
     * @description Filters the main listing array based on current search and filter states.
     */
    const applyFilters = () => {
        let results = listings; 

        // 1. Filter by Search Query (Title or Agent)
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            results = results.filter(item => 
                item.title.toLowerCase().includes(lowerCaseQuery) ||
                item.agent.toLowerCase().includes(lowerCaseQuery)
            );
        }

        // 2. Filter by Maximum Price
        const priceLimit = parseInt(maxPrice);
        if (priceLimit > 0) {
            results = results.filter(item => item.price <= priceLimit);
        }

        // 3. Filter by Minimum Bedrooms
        const requiredBeds = parseInt(minBeds);
        results = results.filter(item => item.beds >= requiredBeds);

        // 4. Filter by Property Type
        if (propertyTypeFilter !== 'all') {
            results = results.filter(item => item.type === propertyTypeFilter);
        }
        
        setFilteredListings(results);
    };

    const handleViewListing = (item) => {
        // Navigates to the detail screen, passing the property data
        navigation.navigate('PropertyDetail', { property: item });
    };

    // Component for rendering individual property items
    const renderListingItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.listingCard} 
            onPress={() => handleViewListing(item)}
        >
            <Ionicons name="home-outline" size={30} color="#3498db" style={styles.icon} />
            <View style={styles.detailsContainer}>
                <Text style={styles.listingTitle}>{item.title}</Text>
                <Text style={styles.listingPrice}>₦{item.price.toLocaleString()}</Text>
                <Text style={styles.listingInfo}>{item.beds} Bed | Type: {item.type} | Agent: {item.agent}</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="#7f8c8d" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Search Bar Area */}
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBox}>
                    <Ionicons name="search-outline" size={20} color="#7f8c8d" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by location or agent..."
                        value={searchQuery}
                        onChangeText={setSearchQuery} 
                        returnKeyType="search"
                    />
                </View>
            </View>
            
            {/* Filter Controls Row */}
            <View style={styles.filterRow}>
                <View style={styles.pickerWrapper}>
                    <Text style={styles.filterLabel}>Max Price</Text>
                    <Picker
                        selectedValue={maxPrice}
                        style={styles.picker}
                        onValueChange={(itemValue) => setMaxPrice(itemValue)}>
                        <Picker.Item label="Any Price" value="0" />
                        <Picker.Item label="₦100k" value="100000" />
                        <Picker.Item label="₦200k" value="200000" />
                        <Picker.Item label="₦300k+" value="300001" />
                    </Picker>
                </View>
                
                <View style={styles.pickerWrapper}>
                    <Text style={styles.filterLabel}>Min Beds</Text>
                    <Picker
                        selectedValue={minBeds}
                        style={styles.picker}
                        onValueChange={(itemValue) => setMinBeds(itemValue)}>
                        <Picker.Item label="1+" value="1" />
                        <Picker.Item label="2+" value="2" />
                        <Picker.Item label="3+" value="3" />
                    </Picker>
                </View>

                <View style={styles.pickerWrapper}>
                    <Text style={styles.filterLabel}>Type</Text>
                    <Picker
                        selectedValue={propertyTypeFilter}
                        style={styles.picker}
                        onValueChange={(itemValue) => setPropertyTypeFilter(itemValue)}>
                        <Picker.Item label="All" value="all" />
                        <Picker.Item label="Apartment" value="apartment" />
                        <Picker.Item label="Self-Cont." value="self-contain" />
                        <Picker.Item label="Shared" value="shared" />
                    </Picker>
                </View>
            </View>

            {/* Listings List */}
            <FlatList
                data={filteredListings} 
                renderItem={renderListingItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={() => (
                    <Text style={styles.resultsHeader}>Showing {filteredListings.length} Matching Listings</Text>
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>No properties found matching your filters. Try adjusting your search.</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    searchBarContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#bdc3c7',
        alignItems: 'center',
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f4f7f6',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 45,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
    },
    resultsHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2c3e50',
        padding: 15,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
    },
    pickerWrapper: {
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        backgroundColor: '#f4f7f6',
        borderRadius: 8,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#bdc3c7',
    },
    filterLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    picker: {
        height: 30,
        width: '100%',
        color: '#3498db',
    },
    listContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    listingCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    icon: {
        marginRight: 15,
    },
    detailsContainer: {
        flex: 1,
        marginRight: 10,
    },
    listingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 3,
    },
    listingPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2ecc71', 
        marginBottom: 3,
    },
    listingInfo: {
        fontSize: 12,
        color: '#7f8c8d',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#7f8c8d',
    }
});

export default StudentDashboard;