import { FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useOrders, OrderStatus } from '@/app/context/orders-context';
import { PRIMARY, SUCCESS, ERROR, SECONDARY } from '@/constants/colors';

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: SECONDARY,
  PROCESSING: PRIMARY,
  SHIPPED: '#8B5CF6',
  DELIVERED: SUCCESS,
  CANCELLED: ERROR,
};

const STATUS_OPTIONS: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function AdminOrdersScreen() {
  const { orders, updateOrderStatus } = useOrders();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Orders</ThemedText>
        <ThemedText style={styles.orderCount}>{orders.length} total</ThemedText>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <ThemedText style={styles.emptyIcon}>📦</ThemedText>
          <ThemedText type="subtitle">No orders yet</ThemedText>
        </View>
      ) : (
        <FlatList
          data={orders}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <ThemedText type="defaultSemiBold">{item.id}</ThemedText>
                  <ThemedText style={styles.orderDate}>
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </ThemedText>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: STATUS_COLORS[item.status] + '30' },
                  ]}>
                  <ThemedText
                    style={[styles.statusText, { color: STATUS_COLORS[item.status] }]}>
                    {item.status}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.customerInfo}>
                <ThemedText style={styles.customerLabel}>Customer</ThemedText>
                <ThemedText>{item.customerName}</ThemedText>
                <ThemedText style={styles.customerEmail}>{item.customerEmail}</ThemedText>
              </View>

              <View style={styles.orderItems}>
                <ThemedText style={styles.itemsLabel}>Items ({item.items.length})</ThemedText>
                {item.items.slice(0, 3).map((orderItem, index) => (
                  <ThemedText key={index} style={styles.itemName}>
                    • {orderItem.product.name} × {orderItem.quantity}
                  </ThemedText>
                ))}
                {item.items.length > 3 && (
                  <ThemedText style={styles.moreItems}>
                    +{item.items.length - 3} more items
                  </ThemedText>
                )}
              </View>

              <View style={styles.orderFooter}>
                <View style={styles.addressSection}>
                  <ThemedText style={styles.addressLabel}>Shipping to:</ThemedText>
                  <ThemedText style={styles.address} numberOfLines={2}>
                    {item.shippingAddress}
                  </ThemedText>
                </View>
                <View style={styles.totalSection}>
                  <ThemedText style={styles.totalLabel}>Total</ThemedText>
                  <ThemedText type="defaultSemiBold" style={styles.totalAmount}>
                    ${item.total.toFixed(2)}
                  </ThemedText>
                </View>
              </View>

              {item.status !== 'DELIVERED' && item.status !== 'CANCELLED' && (
                <View style={styles.statusActions}>
                  {STATUS_OPTIONS.filter((s) => s !== 'CANCELLED' && s !== 'DELIVERED').map((status) => (
                    <Pressable
                      key={status}
                      style={[
                        styles.statusButton,
                        { backgroundColor: STATUS_COLORS[status] + '20' },
                      ]}
                      onPress={() => updateOrderStatus(item.id, status)}>
                      <ThemedText
                        style={[styles.statusButtonText, { color: STATUS_COLORS[status] }]}>
                        {status}
                      </ThemedText>
                    </Pressable>
                  ))}
                  <Pressable
                    style={[styles.statusButton, { backgroundColor: ERROR + '20' }]}
                    onPress={() => updateOrderStatus(item.id, 'CANCELLED')}>
                    <ThemedText style={[styles.statusButtonText, { color: ERROR }]}>
                      Cancel
                    </ThemedText>
                  </Pressable>
                </View>
              )}
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderCount: {
    opacity: 0.6,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
  orderCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  customerInfo: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  customerLabel: {
    fontSize: 11,
    opacity: 0.5,
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 12,
    opacity: 0.7,
  },
  orderItems: {
    marginBottom: 12,
  },
  itemsLabel: {
    fontSize: 11,
    opacity: 0.5,
    marginBottom: 4,
  },
  itemName: {
    fontSize: 12,
    opacity: 0.8,
  },
  moreItems: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  addressSection: {
    flex: 1,
    paddingRight: 12,
  },
  addressLabel: {
    fontSize: 11,
    opacity: 0.5,
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    opacity: 0.8,
  },
  totalSection: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 11,
    opacity: 0.5,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 18,
    color: SECONDARY,
  },
  statusActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusButtonText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
