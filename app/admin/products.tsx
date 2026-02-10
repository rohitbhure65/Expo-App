import { useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAdmin } from '@/app/context/admin-context';
import { PRIMARY, ERROR, WHITE } from '@/constants/colors';

export default function AdminProductsScreen() {
  const { products, deleteProduct } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#A0A0A0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.header}>
        <ThemedText type="title">Products</ThemedText>
        <ThemedText style={styles.productCount}>{filteredProducts.length} items</ThemedText>
      </View>

      <FlatList
        data={filteredProducts}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.productInfo}>
              <ThemedText type="defaultSemiBold" numberOfLines={1}>
                {item.name}
              </ThemedText>
              <ThemedText style={styles.productSku}>{item.sku}</ThemedText>
              <View style={styles.productMeta}>
                <ThemedText style={styles.productCategory}>{item.category}</ThemedText>
                <ThemedText
                  style={[
                    styles.stockText,
                    item.stock < 20 ? styles.lowStock : styles.inStock,
                  ]}>
                  Stock: {item.stock}
                </ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.productPrice}>
                ${item.price.toFixed(2)}
              </ThemedText>
            </View>
            <View style={styles.productActions}>
              <Pressable
                style={styles.editButton}
                onPress={() => {
                  /* Edit functionality */
                }}>
                <ThemedText style={styles.editIcon}>✏️</ThemedText>
              </Pressable>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteProduct(item.id)}>
                <ThemedText style={styles.deleteIcon}>🗑️</ThemedText>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

      <Pressable style={styles.addButton}>
        <ThemedText style={styles.addButtonText}>+ Add Product</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 70 : 52,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 14,
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productCount: {
    opacity: 0.6,
  },
  listContent: {
    paddingBottom: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
  },
  productSku: {
    fontSize: 11,
    opacity: 0.5,
    marginBottom: 6,
  },
  productMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 6,
  },
  productCategory: {
    fontSize: 12,
    opacity: 0.6,
  },
  stockText: {
    fontSize: 12,
  },
  lowStock: {
    color: ERROR,
  },
  inStock: {
    color: '#10B981',
  },
  productPrice: {
    fontSize: 16,
    marginTop: 6,
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 8,
  },
  deleteIcon: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    backgroundColor: PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '600',
  },
});
