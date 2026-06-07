import React, { useEffect, useState } from 'react';
import {
    View, Text, Image, ScrollView,
    TouchableOpacity, StyleSheet,
    ActivityIndicator, Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ApiService from '../../src/services/apiService';
import { useCart } from '../../src/viewmodels/useCart';
import { Product } from '../../src/models/Product';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            const data = await ApiService.getProductById(id);
            setProduct(Product.fromJSON(data));
        } catch (err) {
            Alert.alert('Error',
                'No se pudo cargar el producto');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        try {
            await addItem(product);
            Alert.alert('Agregado',
                `${product.name} agregado al carrito`);
        } catch (e) {
            Alert.alert('Error', e.message);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large'
                    color='#148F77' />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>
                    Producto no encontrado
                </Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: product.image }}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.category}>
                    {product.category}
                </Text>
                <Text style={styles.name}>
                    {product.name}
                </Text>
                <Text style={styles.price}>
                    {product.getFormattedPrice()}
                </Text>

                {/* Rating */}
                <View style={styles.ratingRow}>
                    <Text style={styles.rating}>
                        ⭐ {product.rating.toFixed(1)}
                    </Text>
                    <Text style={styles.stock}>
                        {product.isAvailable()
                            ? `✅ ${product.stock} en stock`
                            : '❌ Sin stock'}
                    </Text>
                </View>

                {/* Descripción */}
                <Text style={styles.sectionTitle}>
                    Descripción
                </Text>
                <Text style={styles.description}>
                    {product.description}
                </Text>

                {/* Beneficios */}
                {product.benefits.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>
                            Beneficios
                        </Text>
                        {product.benefits.map((b, i) => (
                            <Text key={i}
                                style={styles.benefit}>
                                🌿 {b}
                            </Text>
                        ))}
                    </>
                )}

                {/* Botón agregar */}
                <TouchableOpacity
                    style={[styles.addBtn,
                        !product.isAvailable() &&
                        styles.disabledBtn]}
                    onPress={handleAddToCart}
                    disabled={!product.isAvailable()}>
                    <Text style={styles.addBtnText}>
                        {product.isAvailable()
                            ? 'Agregar al Carrito'
                            : 'Sin Disponibilidad'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#FFF',
    },
    center: {
        flex: 1, alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%', height: 300,
    },
    content: {
        padding: 20,
    },
    category: {
        fontSize: 13, color: '#888',
        textTransform: 'capitalize',
    },
    name: {
        fontSize: 24, fontWeight: 'bold',
        color: '#1A5276', marginTop: 4,
    },
    price: {
        fontSize: 26, fontWeight: 'bold',
        color: '#148F77', marginTop: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12, paddingVertical: 10,
        borderTopWidth: 1, borderBottomWidth: 1,
        borderColor: '#EEE',
    },
    rating: {
        fontSize: 15, color: '#333',
    },
    stock: {
        fontSize: 14, color: '#666',
    },
    sectionTitle: {
        fontSize: 18, fontWeight: 'bold',
        color: '#1A5276', marginTop: 20,
        marginBottom: 8,
    },
    description: {
        fontSize: 15, color: '#555',
        lineHeight: 22,
    },
    benefit: {
        fontSize: 14, color: '#444',
        paddingVertical: 4,
    },
    addBtn: {
        backgroundColor: '#148F77',
        borderRadius: 12, padding: 16,
        alignItems: 'center', marginTop: 24,
        marginBottom: 30,
    },
    disabledBtn: {
        backgroundColor: '#CCC',
    },
    addBtnText: {
        color: '#FFF', fontSize: 17,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 16, color: '#E74C3C',
    },
});
