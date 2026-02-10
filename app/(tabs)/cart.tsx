import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useCart } from './cart-context';

export default function CartScreen() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  const hasItems = items.length > 0;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Your bag</ThemedText>
        <ThemedText type="defaultSemiBold">
          {totalItems} item{totalItems === 1 ? '' : 's'}
        </ThemedText>
      </ThemedView>

      {!hasItems ? (
        <ThemedView style={styles.emptyState}>
          <ThemedText type="subtitle">Your cart is empty</ThemedText>
          <ThemedText>Add something you love from Home.</ThemedText>
        </ThemedView>
      ) : (
        <>
          <View style={styles.list}>
            {items.map((item) => (
              <ThemedView key={item.product.id} style={styles.row}>
                <Image
                  source={{ uri: item.product.image }}
                  style={styles.thumbnail}
                  contentFit="cover"
                />
                <View style={styles.rowText}>
                  <ThemedText type="defaultSemiBold" numberOfLines={1}>
                    {item.product.name}
                  </ThemedText>
                  <ThemedText numberOfLines={1}>
                    ${item.product.price.toFixed(2)} • Size M
                  </ThemedText>
                </View>
                <View style={styles.rowActions}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.product.id, item.quantity - 1)}>
                    <ThemedText>-</ThemedText>
                  </TouchableOpacity>
                  <ThemedText type="defaultSemiBold" style={styles.quantityText}>
                    {item.quantity}
                  </ThemedText>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    <ThemedText>+</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.product.id)}>
                    <ThemedText>Remove</ThemedText>
                  </TouchableOpacity>
                </View>
              </ThemedView>
            ))}
          </View>

          <ThemedView style={styles.footer}>
            <View style={styles.footerSummary}>
              <ThemedText>Total</ThemedText>
              <ThemedText type="defaultSemiBold">
                ${totalPrice.toFixed(2)}
              </ThemedText>
            </View>
            <View style={styles.footerActions}>
              <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
                <ThemedText type="defaultSemiBold">Clear</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.checkoutButton}>
                <ThemedText type="defaultSemiBold">Checkout</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
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
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  list: {
    flex: 1,
    gap: 8,
    marginBottom: 8,
  },
  row: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  thumbnail: {
    width: 60,
    height: 72,
    borderRadius: 8,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  quantityText: {
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  footerSummary: {
    gap: 2,
  },
  footerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  checkoutButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
  },
});

