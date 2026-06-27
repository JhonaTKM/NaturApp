import React from 'react';
import {
    View, Text, FlatList,
    StyleSheet, ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useOrders } from '../../src/viewmodels/useOrders';

export default function OrdersScreen() {
    const { orders, loading, error, refresh } = useOrders();

    const renderOrder = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.orderId}>
                    Pedido #{item.id}
                </Text>
                <View style={[styles.badge,
                { backgroundColor: item.getStatusColor() }]}>
                    <Text style={styles.badgeText}>
                        {item.status}
                    </Text>
                </View>
            </View>
            <Text style={styles.date}>
                {item.getFormattedDate()}
            </Text>
            <Text style={styles.address}>
                📍 {item.address || 'Sin dirección'}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.itemCount}>
                    {item.items.length} producto(s)
                </Text>
                <Text style={styles.total}>
                    S/ {item.total.toFixed(2)}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Pedidos</Text>

            {loading ? (
                <ActivityIndicator size='large'
                    color='#148F77'
                    style={{ marginTop: 40 }} />
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderOrder}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={refresh}
                        />
                    }
                    ListEmptyComponent={
                        <Text style={styles.empty}>
                            No tienes pedidos aún
                        </Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#F5F5F5',
        padding: 16,
    },
    title: {
        fontSize: 22, fontWeight: 'bold',
        color: '#1A5276', marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12, padding: 16,
        marginBottom: 12, elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderId: {
        fontSize: 16, fontWeight: 'bold',
        color: '#333',
    },
    badge: {
        paddingHorizontal: 10, paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: '#FFF', fontSize: 12,
        fontWeight: '600', textTransform: 'capitalize',
    },
    date: {
        fontSize: 13, color: '#888', marginTop: 6,
    },
    address: {
        fontSize: 13, color: '#666', marginTop: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12, paddingTop: 10,
        borderTopWidth: 1, borderTopColor: '#EEE',
    },
    itemCount: {
        fontSize: 14, color: '#666',
    },
    total: {
        fontSize: 16, fontWeight: 'bold',
        color: '#148F77',
    },
    empty: {
        textAlign: 'center', marginTop: 60,
        fontSize: 16, color: '#999',
    },
    error: {
        color: '#E74C3C', textAlign: 'center',
        marginTop: 40, fontSize: 16,
    },
});
