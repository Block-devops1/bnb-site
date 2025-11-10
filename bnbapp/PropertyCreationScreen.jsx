import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, Picker, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Requires 'npm install expo-image-picker'
import { useNavigation } from '@react-navigation/native';

/**
 * @function PropertyCreationScreen
 * @description Allows Agents to submit new property listings with image upload capability.
 */
const PropertyCreationScreen = () => {
    const navigation = useNavigation();

    // 1. State to manage all form inputs
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [bedrooms, setBedrooms] = useState('1');
    const [propertyType, setPropertyType] = useState('apartment');
    const [imageUri, setImageUri] = useState(null); 

    // 2. Request Image Library Permissions on component load
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission denied', 'We need camera roll permissions to upload photos.');
                }
            }
        })();
    }, []);

    // 3. Image Upload Logic
    const handleImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, 
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri); 
        }
    };

    // 4. Form Validation and Submission
    const handleSubmit = () => {
        if (!title || !price || !description || !location || !imageUri) {
            Alert.alert('Missing Fields', 'Please fill in all required fields and upload at least one image.');
            return;
        }

        const newProperty = {
            title,
            price: parseFloat(price),
            description,
            location,
            bedrooms: parseInt(bedrooms),
            propertyType,
            imageUri,
        };

        console.log('New Property Data Submitted:', newProperty);
        Alert.alert('Success!', 'Your property listing has been submitted for review.');

        // Navigate back to Agent Dashboard
        navigation.goBack(); 
    };

    // --- Form UI Elements (Reusable Component) ---
    const InputField = ({ label, value, onChangeText, keyboardType = 'default', placeholder }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor="#999"
            />
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Create New Listing</Text>

            <InputField
                label="Property Title"
                value={title}
                onChangeText={setTitle}
                placeholder="Spacious 3-Bed Apartment near Campus"
            />
            
            <InputField
                label="Location (e.g., Street Name, Landmark)"
                value={location}
                onChangeText={setLocation}
                placeholder="Gate A, Owerri Road"
            />

            <InputField
                label="Price (₦) per Semester/Year"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder="250000"
            />
            
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Number of Bedrooms</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={bedrooms}
                        style={styles.picker}
                        onValueChange={(itemValue) => setBedrooms(itemValue)}>
                        <Picker.Item label="1 Bedroom" value="1" />
                        <Picker.Item label="2 Bedrooms" value="2" />
                        <Picker.Item label="3 Bedrooms" value="3" />
                        <Picker.Item label="4+ Bedrooms" value="4" />
                    </Picker>
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Detailed Description</Text>
                <TextInput
                    style={styles.textArea}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Describe amenities, proximity to school, rules, etc."
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={4}
                />
            </View>

            {/* Image Upload Button */}
            <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePick}>
                <Ionicons name="camera-outline" size={24} color="#fff" />
                <Text style={styles.imagePickerText}>{imageUri ? 'Photo Selected' : 'Upload Property Photo'}</Text>
            </TouchableOpacity>

            {/* Image Preview */}
            {imageUri && (
                <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                </View>
            )}

            {/* Submission Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Listing for Review</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f4f7f6',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 25,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#34495e',
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#bdc3c7',
        fontSize: 16,
    },
    textArea: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#bdc3c7',
        fontSize: 16,
        height: 100,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#bdc3c7',
        overflow: 'hidden', 
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#333',
    },
    imagePickerButton: {
        flexDirection: 'row',
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    imagePickerText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    imagePreviewContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    submitButton: {
        backgroundColor: '#2ecc71', 
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 40,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PropertyCreationScreen;