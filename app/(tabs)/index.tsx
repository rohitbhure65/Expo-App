import { useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ProductCard } from '@/components/ui/product-card';
import { CategoryCard } from '@/components/ui/category-card';
import { CATEGORIES, Category } from '@/app/data/categories';
import {
  getFeaturedProducts,
  getTrendingProducts,
  getSaleProducts,
} from '@/app/data/products';
import { useCart } from '@/app/context/cart-context';
import { PRIMARY, SECONDARY, WHITE } from '@/constants/colors';

const BANNERS = [
  {
    id: '1',
    title: 'Winter Sale',
    subtitle: 'Up to 50% off',
    gradient: ['#6366F1', '#8B5CF6'],
  },
  {
    id: '2',
    title: 'New Arrivals',
    subtitle: 'Discover fresh styles',
    gradient: ['#F59E0B', '#EF4444'],
  },
  {
    id: '3',
    title: 'Free Shipping',
    subtitle: 'On orders over $50',
    gradient: ['#10B981', '#059669'],
  },
];

export default function HomeScreen() {
  const { totalItems } = useCart();
  const [activeBanner, setActiveBanner] = useState(0);

  const featuredProducts = getFeaturedProducts();
  const trendingProducts = getTrendingProducts();
  const saleProducts = getSaleProducts();

  const renderBannerItem = ({ item }: { item: typeof BANNERS[0] }) => (
    <View style={[styles.banner, { backgroundColor: item.gradient[0] }]}>
      <ThemedText type="title" style={styles.bannerTitle}>
        {item.title}
      </ThemedText>
      <ThemedText style={styles.bannerSubtitle}>{item.subtitle}</ThemedText>
    </View>
  );

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryWrapper}>
      <CategoryCard category={item} variant="horizontal" />
    </View>
  );

  const renderSectionHeader = (title: string, showViewAll = false) => (
    <View style={styles.sectionHeader}>
      <ThemedText type="title">{title}</ThemedText>
      {showViewAll && (
        <Pressable>
          <ThemedText style={styles.viewAll}>View All →</ThemedText>
        </Pressable>
      )}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View>
          <ThemedText type="title" style={styles.greeting}>
            Discover
          </ThemedText>
          <ThemedText style={styles.subtitle}>Premium essentials, curated for you.</ThemedText>
        </View>
        <Pressable style={styles.cartButton}>
          <ThemedText style={styles.cartIcon}>🛒</ThemedText>
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <ThemedText style={styles.cartBadgeText}>{totalItems}</ThemedText>
            </View>
          )}
        </Pressable>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#A0A0A0"
        />
        <ThemedText style={styles.searchIcon}>🔍</ThemedText>
      </View>

      <FlatList
        data={BANNERS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderBannerItem}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / (styles.banner.width as number));
          setActiveBanner(newIndex);
        }}
        contentContainerStyle={styles.bannerList}
      />

      <View style={styles.pagination}>
        {BANNERS.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, index === activeBanner && styles.paginationDotActive]}
          />
        ))}
      </View>

      <FlatList
        horizontal
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />

      <FlatList
        data={featuredProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.productWrapper}>
            <ProductCard product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        ListHeaderComponent={renderSectionHeader('Featured', true)}
      />

      <FlatList
        data={trendingProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.productWrapper}>
            <ProductCard product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        ListHeaderComponent={renderSectionHeader('Trending Now', true)}
      />

      <FlatList
        data={saleProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.productWrapper}>
            <ProductCard product={item} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        ListHeaderComponent={renderSectionHeader('On Sale', true)}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 70 : 52,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartIcon: {
    fontSize: 24,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: SECONDARY,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: '700',
  },
  searchContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  searchInput: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 44,
    borderRadius: 12,
    fontSize: 14,
    color: '#FFFFFF',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: [{ translateY: -10 }],
    fontSize: 16,
  },
  bannerList: {
    marginBottom: 8,
  },
  banner: {
    width: 320,
    height: 140,
    borderRadius: 16,
    justifyContent: 'center',
    padding: 20,
    marginRight: 12,
  },
  bannerTitle: {
    fontSize: 24,
    color: WHITE,
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: WHITE,
    opacity: 0.9,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 6,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3A3A3A',
  },
  paginationDotActive: {
    backgroundColor: PRIMARY,
    width: 18,
  },
  categoryList: {
    marginBottom: 16,
  },
  categoryWrapper: {
    marginRight: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: 16,
  },
  viewAll: {
    color: PRIMARY,
    fontSize: 13,
  },
  productList: {
    marginBottom: 16,
  },
  productWrapper: {
    width: 170,
    marginRight: 8,
  },
});
