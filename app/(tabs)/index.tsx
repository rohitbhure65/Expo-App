import { Image } from 'expo-image';
import { FlatList, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Product, useCart } from './cart-context';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic T‑Shirt',
    price: 19.99,
    image: 'https://images.pexels.com/photos/10026491/pexels-photo-10026491.jpeg',
    description: 'Soft cotton t‑shirt, perfect for everyday wear.',
  },
  {
    id: '2',
    name: 'Running Shoes',
    price: 59.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    description: 'Lightweight shoes designed for comfort and speed.',
  },
  {
    id: '3',
    name: 'Backpack',
    price: 39.99,
    image: 'https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg',
    description: 'Durable backpack with multiple compartments.',
  },
  {
    id: '4',
    name: 'Noise Cancelling Headphones',
    price: 129.99,
    image: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg',
    description: 'Immersive sound with all‑day comfort.',
  },
  {
    id: '5',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://images.pexels.com/photos/2774062/pexels-photo-2774062.jpeg',
    description: 'Track your health and stay connected.',
  },
];

export default function HomeScreen() {
  const { addToCart, totalItems } = useCart();

  function handleAdd(product: Product) {
    addToCart(product);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.topBar}>
        <View>
          <ThemedText type="title">Discover</ThemedText>
          <ThemedText>Premium essentials, curated for you.</ThemedText>
        </View>
        <ThemedView style={styles.cartBadge}>
          <ThemedText type="defaultSemiBold">{totalItems}</ThemedText>
          <ThemedText style={styles.cartBadgeLabel}>Cart</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          placeholderTextColor="#A0A0A0"
        />
      </ThemedView>

      <ThemedView style={styles.banner}>
        <ThemedText type="defaultSemiBold" style={styles.bannerTitle}>
          Winter Sale
        </ThemedText>
        <ThemedText style={styles.bannerSubtitle}>Up to 40% off selected items</ThemedText>
      </ThemedView>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ThemedView style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.productImage} contentFit="cover" />
            <View style={styles.cardBody}>
              <ThemedText numberOfLines={1} type="defaultSemiBold">
                {item.name}
              </ThemedText>
              <ThemedText numberOfLines={2} style={styles.description}>
                {item.description}
              </ThemedText>
              <View style={styles.priceRow}>
                <ThemedText type="defaultSemiBold">${item.price.toFixed(2)}</ThemedText>
                <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item)}>
                  <ThemedText type="defaultSemiBold" style={styles.addButtonText}>
                    +
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ThemedView>
        )}
        ListEmptyComponent={
          <ThemedView style={styles.emptyState}>
            <ThemedText>No products available.</ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 70 : 52,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cartBadge: {
    minWidth: 56,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    gap: 2,
  },
  cartBadgeLabel: {
    fontSize: 10,
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    fontSize: 14,
  },
  banner: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  bannerTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
  },
  listContent: {
    paddingBottom: 16,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    aspectRatio: 4 / 5,
  },
  cardBody: {
    padding: 8,
    gap: 4,
  },
  description: {
    fontSize: 12,
  },
  priceRow: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 18,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
});
