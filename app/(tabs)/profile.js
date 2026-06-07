import React from 'react';
import {
    View, Text, TextInput, Switch,
    TouchableOpacity, StyleSheet, Alert,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProfile } from
    '../../src/viewmodels/useProfile';

export default function ProfileScreen() {
    const {
        name, setName, email, setEmail,
        darkTheme, notifications,
        saveProfile, toggleTheme,
        toggleNotifications,
    } = useProfile();

    const handleSave = async () => {
        await saveProfile();
        Alert.alert('Guardado', 'Perfil actualizado');
    };

    return (
        <ScrollView style={styles.container}>
            {/* Avatar */}
            <View style={styles.avatarSection}>
                <View style={styles.avatar}>
                    <Ionicons name='person'
                        size={48} color='#FFF' />
                </View>
                <Text style={styles.greeting}>
                    {name || 'Usuario NaturApp'}
                </Text>
            </View>

            {/* Datos personales */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Datos Personales
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Tu nombre'
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='tu@email.com'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={handleSave}>
                    <Text style={styles.saveBtnText}>
                        Guardar Cambios
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Preferencias */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Preferencias
                </Text>
                <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                        <Ionicons name='moon'
                            size={20} color='#555' />
                        <Text style={styles.settingLabel}>
                            Tema Oscuro
                        </Text>
                    </View>
                    <Switch
                        value={darkTheme}
                        onValueChange={toggleTheme}
                        trackColor={{
                            false: '#DDD',
                            true: '#148F77'
                        }}
                    />
                </View>
                <View style={styles.settingRow}>
                    <View style={styles.settingInfo}>
                        <Ionicons name='notifications'
                            size={20} color='#555' />
                        <Text style={styles.settingLabel}>
                            Notificaciones
                        </Text>
                    </View>
                    <Switch
                        value={notifications}
                        onValueChange={toggleNotifications}
                        trackColor={{
                            false: '#DDD',
                            true: '#148F77'
                        }}
                    />
                </View>
            </View>

            {/* Info app */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Acerca de
                </Text>
                <Text style={styles.aboutText}>
                    NaturApp v1.0.0
                </Text>
                <Text style={styles.aboutDesc}>
                    Tu tienda de productos naturales 🌿
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#F5F5F5',
    },
    avatarSection: {
        alignItems: 'center',
        paddingVertical: 24,
        backgroundColor: '#1A5276',
    },
    avatar: {
        width: 80, height: 80,
        borderRadius: 40,
        backgroundColor: '#148F77',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    greeting: {
        fontSize: 18, fontWeight: 'bold',
        color: '#FFF',
    },
    section: {
        backgroundColor: '#FFF',
        marginHorizontal: 16, marginTop: 16,
        borderRadius: 12, padding: 16,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 16, fontWeight: 'bold',
        color: '#1A5276', marginBottom: 12,
    },
    input: {
        borderWidth: 1, borderColor: '#E0E0E0',
        borderRadius: 8, padding: 12,
        marginBottom: 10, fontSize: 15,
    },
    saveBtn: {
        backgroundColor: '#148F77',
        borderRadius: 10, padding: 14,
        alignItems: 'center', marginTop: 4,
    },
    saveBtnText: {
        color: '#FFF', fontSize: 15,
        fontWeight: 'bold',
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 15, color: '#333',
        marginLeft: 10,
    },
    aboutText: {
        fontSize: 15, color: '#333',
        fontWeight: '600',
    },
    aboutDesc: {
        fontSize: 14, color: '#888',
        marginTop: 4, marginBottom: 8,
    },
});
