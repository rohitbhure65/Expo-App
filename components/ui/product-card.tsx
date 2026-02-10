import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Product } from '@/app/data/products';
import { useCart } from '@/app/context/cart-context';
import { useWishlist } from '@/app/context/wishlist-context';
import { PRIMARY, ERROR, WHITE } from '@/constants/colors';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
}

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  if (variant === 'list') {
    return (
      <Pressable
        style={styles.listPressable}
        onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}>
        <View style={styles.listContainer}>
          <Image source={{ uri: product.image }} style={styles.listImage} contentFit="cover" />
          <View style={styles.listContent}>
            <ThemedText type="defaultSemiBold" numberOfLines={1}>
              {product.name}
            </ThemedText>
            <ThemedText numberOfLines={2} style={styles.description}>
              {product.description}
            </ThemedText>
            <View style={styles.ratingRow}>
              <ThemedText>⭐ {product.rating}</ThemedText>
              <ThemedText>({product.reviews})</ThemedText>
            </View>
            <View style={styles.priceRow}>
              <View style={styles.priceContainer}>
                <ThemedText type="defaultSemiBold" style={styles.price}>
                  ${product.price.toFixed(2)}
                </ThemedText>
                {product.originalPrice && (
                  <ThemedText style={styles.originalPrice}>
                    ${product.originalPrice.toFixed(2)}
                  </ThemedText>
                )}
              </View>
              <Pressable
                style={styles.addButton}
                onPress={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}>
                <ThemedText style={styles.addButtonText}>Add</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push({ pathname: '/product/[id]', params: { id: product.id } })}>
      {product.badge !== 'NONE' && (
        <View style={[styles.badge, product.badge === 'SALE' && styles.saleBadge]}>
          <ThemedText style={styles.badgeText}>
            {product.badge === 'BEST_SELLER' ? 'Best Seller' : product.badge}
          </ThemedText>
        </View>
      )}
      <Pressable
        style={styles.wishlistBtn}
        onPress={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}>
        <ThemedText style={isWishlisted ? styles.heartActive : styles.heart}>
          {isWishlisted ? '❤️' : '🤍'}
        </ThemedText>
      </Pressable>
      <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" />
      <View style={styles.body}>
        <ThemedText numberOfLines={1} type="defaultSemiBold">
          {product.name}
        </ThemedText>
        <ThemedText numberOfLines={2} style={styles.description}>
          {product.description}
        </ThemedText>
        <View style={styles.ratingRow}>
          <ThemedText>⭐ {product.rating}</ThemedText>
          <ThemedText style={styles.reviews}>({product.reviews})</ThemedText>
        </View>
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <ThemedText type="defaultSemiBold" style={styles.price}>
              ${product.price.toFixed(2)}
            </ThemedText>
            {product.originalPrice && (
              <ThemedText style={styles.originalPrice}>
                ${product.originalPrice.toFixed(2)}
              </ThemedText>
            )}
          </View>
          <Pressable
            style={styles.addBtn}
            onPress={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}>
            <ThemedText style={styles.addBtnText}>+</ThemedText>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
  },
  listPressable: {
    marginVertical: 6,
  },
  listContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 10,
  },
  listImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  listContent: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: PRIMARY,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  saleBadge: {
    backgroundColor: ERROR,
  },
  badgeText: {
    color: WHITE,
    fontSize: 10,
    fontWeight: '600',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    padding: 4,
  },
  heart: {
    fontSize: 18,
    opacity: 0.7,
  },
  heartActive: {
    fontSize: 18,
  },
  body: {
    padding: 10,
    gap: 4,
  },
  description: {
    fontSize: 11,
    opacity: 0.7,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviews: {
    fontSize: 11,
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 15,
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    color: WHITE,
    fontSize: 12,
    fontWeight: '600',
  },
});
