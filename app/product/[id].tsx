import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { RatingStars } from '@/components/ui/rating-stars';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { getProductById } from '@/app/data/products';
import { useCart } from '@/app/context/cart-context';
import { useWishlist } from '@/app/context/wishlist-context';
import { PRIMARY, WHITE, ERROR, SUCCESS } from '@/constants/colors';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProductById(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Product not found</ThemedText>
      </ThemedView>
    );
  }

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item }}
            style={styles.mainImage}
            contentFit="cover"
          />
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / (styles.mainImage.width as number),
          );
          setSelectedImage(newIndex);
        }}
        contentContainerStyle={styles.imageList}
      />

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === selectedImage && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.wishlistButton}
          onPress={() => toggleWishlist(product)}>
          <ThemedText style={styles.wishlistIcon}>
            {isWishlisted ? '❤️' : '🤍'}
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.badgeRow}>
          {product.badge !== 'NONE' && (
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>
                {product.badge === 'BEST_SELLER' ? 'Best Seller' : product.badge}
              </ThemedText>
            </View>
          )}
          <View style={styles.stockBadge}>
            <ThemedText
              style={[
                styles.stockText,
                product.stock < 20 ? styles.lowStock : styles.inStock,
              ]}>
              {product.stock < 20 ? `Only ${product.stock} left` : 'In Stock'}
            </ThemedText>
          </View>
        </View>

        <ThemedText type="title" style={styles.name}>
          {product.name}
        </ThemedText>

        <RatingStars rating={product.rating} reviews={product.reviews} showValue />

        <View style={styles.priceRow}>
          <ThemedText type="title" style={styles.price}>
            ${product.price.toFixed(2)}
          </ThemedText>
          {product.originalPrice && (
            <ThemedText style={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </ThemedText>
          )}
          {product.originalPrice && (
            <View style={styles.discountBadge}>
              <ThemedText style={styles.discountText}>
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </ThemedText>
            </View>
          )}
        </View>

        <ThemedText style={styles.description}>{product.description}</ThemedText>

        {product.colors && product.colors.length > 0 && (
          <View style={styles.optionSection}>
            <ThemedText type="defaultSemiBold" style={styles.optionTitle}>
              Color
            </ThemedText>
            <View style={styles.colorOptions}>
              {product.colors.map((color) => (
                <Pressable
                  key={color}
                  style={[
                    styles.colorOption,
                    selectedColor === color && styles.colorOptionSelected,
                  ]}
                  onPress={() => setSelectedColor(color)}>
                  <ThemedText style={styles.colorText}>{color}</ThemedText>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <View style={styles.optionSection}>
            <ThemedText type="defaultSemiBold" style={styles.optionTitle}>
              Size
            </ThemedText>
            <View style={styles.sizeOptions}>
              {product.sizes.map((size) => (
                <Pressable
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.sizeOptionSelected,
                  ]}
                  onPress={() => setSelectedSize(size)}>
                  <ThemedText
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextSelected,
                    ]}>
                    {size}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        <View style={styles.optionSection}>
          <ThemedText type="defaultSemiBold" style={styles.optionTitle}>
            Quantity
          </ThemedText>
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
            max={product.stock}
          />
        </View>

        {product.features && product.features.length > 0 && (
          <View style={styles.optionSection}>
            <ThemedText type="defaultSemiBold" style={styles.optionTitle}>
              Features
            </ThemedText>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <ThemedText style={styles.featureIcon}>✓</ThemedText>
                <ThemedText style={styles.featureText}>{feature}</ThemedText>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
            <ThemedText style={styles.addToCartText}>Add to Cart</ThemedText>
            <ThemedText style={styles.addToCartPrice}>
              ${(product.price * quantity).toFixed(2)}
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 70 : 52,
  },
  imageList: {
    paddingTop: 8,
  },
  mainImage: {
    width: 400,
    height: 350,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
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
  actions: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 1,
  },
  wishlistButton: {
    backgroundColor: '#2A2A2A',
    padding: 10,
    borderRadius: 20,
  },
  wishlistIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '600',
  },
  stockBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#2A2A2A',
  },
  stockText: {
    fontSize: 11,
  },
  lowStock: {
    color: ERROR,
  },
  inStock: {
    color: SUCCESS,
  },
  name: {
    fontSize: 24,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
  },
  price: {
    fontSize: 26,
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  discountBadge: {
    backgroundColor: ERROR,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 20,
  },
  optionSection: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: PRIMARY,
  },
  colorText: {
    fontSize: 12,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeOption: {
    minWidth: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sizeOptionSelected: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY + '30',
  },
  sizeText: {
    fontSize: 13,
    paddingHorizontal: 8,
  },
  sizeTextSelected: {
    fontWeight: '600',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  featureIcon: {
    color: SUCCESS,
    fontSize: 14,
  },
  featureText: {
    fontSize: 13,
    opacity: 0.8,
  },
  footer: {
    paddingVertical: 16,
    paddingBottom: 32,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 12,
  },
  addToCartText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  addToCartPrice: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});
