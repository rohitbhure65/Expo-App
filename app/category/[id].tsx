import { useLocalSearchParams } from 'expo-router';
import { FlatList, Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ProductCard } from '@/components/ui/product-card';
import { CategoryCard } from '@/components/ui/category-card';
import { CATEGORIES } from '@/app/data/categories';
import { getProductsByCategory } from '@/app/data/products';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = CATEGORIES.find((c) => c.id === id);
  const products = category ? getProductsByCategory(id) : [];

  if (!category) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Category not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <CategoryCard category={category} variant="large" />

      <ThemedText type="title" style={styles.sectionTitle}>
        {products.length} Products
      </ThemedText>

      {products.length === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText type="subtitle">No products in this category</ThemedText>
        </View>
      ) : (
        <FlatList
          data={products}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
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
  },
});
