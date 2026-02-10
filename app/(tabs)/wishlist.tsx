import { FlatList, Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ProductCard } from '@/components/ui/product-card';
import { useWishlist } from '@/app/context/wishlist-context';

export default function WishlistScreen() {
  const { items } = useWishlist();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Wishlist
      </ThemedText>
      <ThemedText style={styles.subtitle}>{items.length} items saved</ThemedText>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyIcon}>💔</ThemedText>
          <ThemedText type="subtitle">Your wishlist is empty</ThemedText>
          <ThemedText style={styles.emptyText}>
            Save items you love to your wishlist
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={items}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ProductCard product={item} />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 70 : 52,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 16,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.6,
  },
});
