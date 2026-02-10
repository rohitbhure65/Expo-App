import { useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { useCart } from '@/app/context/cart-context';
import { PRIMARY, SECONDARY, WHITE, ERROR, GRAY_600, SUCCESS } from '@/constants/colors';

const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping', price: 4.99, days: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 9.99, days: '2-3 business days' },
  { id: 'overnight', name: 'Overnight', price: 19.99, days: '1 business day' },
];

export default function CartScreen() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart, promoCode, setPromoCode, discount } = useCart();
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [showPromoInput, setShowPromoInput] = useState(false);

  const shipping = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping)?.price || 0;
  const finalTotal = totalPrice - discount + shipping;

  const hasItems = items.length > 0;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Shopping Cart</ThemedText>
        {hasItems && (
          <Pressable onPress={clearCart}>
            <ThemedText style={styles.clearText}>Clear All</ThemedText>
          </Pressable>
        )}
      </View>

      {!hasItems ? (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyIcon}>🛒</ThemedText>
          <ThemedText type="subtitle">Your cart is empty</ThemedText>
          <ThemedText style={styles.emptyText}>
            Add items you love to your cart
          </ThemedText>
        </View>
      ) : (
        <>
          <View style={styles.itemCount}>
            <ThemedText>{totalItems} item{totalItems === 1 ? '' : 's'}</ThemedText>
          </View>

          <FlatList
            data={items}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image
                  source={{ uri: item.product.image }}
                  style={styles.itemImage}
                  contentFit="cover"
                />
                <View style={styles.itemDetails}>
                  <ThemedText type="defaultSemiBold" numberOfLines={1}>
                    {item.product.name}
                  </ThemedText>
                  {item.selectedSize && (
                    <ThemedText style={styles.itemOption}>Size: {item.selectedSize}</ThemedText>
                  )}
                  {item.selectedColor && (
                    <ThemedText style={styles.itemOption}>Color: {item.selectedColor}</ThemedText>
                  )}
                  <ThemedText style={styles.itemPrice}>
                    ${item.product.price.toFixed(2)}
                  </ThemedText>
                  <QuantitySelector
                    quantity={item.quantity}
                    onQuantityChange={(q) => updateQuantity(item.product.id, q)}
                    size="small"
                  />
                </View>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.product.id)}>
                  <ThemedText style={styles.removeIcon}>✕</ThemedText>
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => `${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
          />

          <View style={styles.promoSection}>
            <Pressable
              style={styles.promoToggle}
              onPress={() => setShowPromoInput(!showPromoInput)}>
              <ThemedText style={styles.promoToggleText}>
                Have a promo code? {showPromoInput ? 'Hide' : 'Apply'}
              </ThemedText>
            </Pressable>
            {showPromoInput && (
              <View style={styles.promoInputContainer}>
                <TextInput
                  style={styles.promoInput}
                  placeholder="Enter promo code"
                  placeholderTextColor="#A0A0A0"
                  value={promoCode}
                  onChangeText={setPromoCode}
                />
                <ThemedText style={styles.promoHint}>Try: SAVE10, SAVE20, FIRST50</ThemedText>
              </View>
            )}
          </View>

          <View style={styles.shippingSection}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Shipping Method
            </ThemedText>
            {SHIPPING_OPTIONS.map((option) => (
              <Pressable
                key={option.id}
                style={[
                  styles.shippingOption,
                  selectedShipping === option.id && styles.shippingOptionSelected,
                ]}
                onPress={() => setSelectedShipping(option.id)}>
                <View style={styles.shippingInfo}>
                  <ThemedText style={styles.shippingName}>{option.name}</ThemedText>
                  <ThemedText style={styles.shippingDays}>{option.days}</ThemedText>
                </View>
                <ThemedText style={styles.shippingPrice}>
                  ${option.price.toFixed(2)}
                </ThemedText>
                <View
                  style={[
                    styles.radioCircle,
                    selectedShipping === option.id && styles.radioCircleSelected,
                  ]}
                />
              </Pressable>
            ))}
          </View>

          <View style={styles.summarySection}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Order Summary
            </ThemedText>
            <View style={styles.summaryRow}>
              <ThemedText>Subtotal</ThemedText>
              <ThemedText>${totalPrice.toFixed(2)}</ThemedText>
            </View>
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <ThemedText style={styles.discountText}>Discount</ThemedText>
                <ThemedText style={styles.discountText}>-${discount.toFixed(2)}</ThemedText>
              </View>
            )}
            <View style={styles.summaryRow}>
              <ThemedText>Shipping</ThemedText>
              <ThemedText>${shipping.toFixed(2)}</ThemedText>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <ThemedText type="defaultSemiBold" style={styles.totalLabel}>
                Total
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.totalAmount}>
                ${finalTotal.toFixed(2)}
              </ThemedText>
            </View>
          </View>

          <Pressable style={styles.checkoutButton}>
            <ThemedText style={styles.checkoutText}>Proceed to Checkout</ThemedText>
            <ThemedText style={styles.checkoutArrow}>→</ThemedText>
          </Pressable>
        </>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  clearText: {
    color: ERROR,
    fontSize: 13,
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
  itemCount: {
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  itemOption: {
    fontSize: 12,
    opacity: 0.6,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  removeIcon: {
    fontSize: 16,
    opacity: 0.5,
  },
  promoSection: {
    marginVertical: 12,
  },
  promoToggle: {
    paddingVertical: 8,
  },
  promoToggleText: {
    color: PRIMARY,
    fontSize: 13,
  },
  promoInputContainer: {
    marginTop: 8,
  },
  promoInput: {
    backgroundColor: '#1E1E1E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 14,
    color: '#FFFFFF',
  },
  promoHint: {
    fontSize: 11,
    opacity: 0.5,
    marginTop: 4,
  },
  shippingSection: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: 12,
  },
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  shippingOptionSelected: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY + '20',
  },
  shippingInfo: {
    flex: 1,
  },
  shippingName: {
    fontSize: 13,
  },
  shippingDays: {
    fontSize: 11,
    opacity: 0.6,
  },
  shippingPrice: {
    fontSize: 13,
    marginRight: 12,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: GRAY_600,
  },
  radioCircleSelected: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY,
  },
  summarySection: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  discountText: {
    color: SUCCESS,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#3A3A3A',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 18,
    color: SECONDARY,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  checkoutText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  checkoutArrow: {
    color: WHITE,
    fontSize: 18,
  },
});
