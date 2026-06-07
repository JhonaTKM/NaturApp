import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryChip({ label, active, onPress }) {
    return (
        <TouchableOpacity
            style={[styles.chip, active && styles.activeChip]}
            onPress={onPress}
        >
            <Text style={[styles.label, active && styles.activeLabel]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFF',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    activeChip: {
        backgroundColor: '#148F77',
        borderColor: '#148F77',
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#666',
        textTransform: 'capitalize',
    },
    activeLabel: {
        color: '#FFF',
    },
});
