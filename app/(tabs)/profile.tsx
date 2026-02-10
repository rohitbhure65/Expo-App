import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useOrders } from '@/app/context/orders-context';
import { useCart } from '@/app/context/cart-context';
import { useWishlist } from '@/app/context/wishlist-context';
import { PRIMARY, SECONDARY, SUCCESS } from '@/constants/colors';

export default function ProfileScreen() {
  const { orders } = useOrders();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  const userStats = [
    { label: 'Orders', value: orders.length, icon: '📦' },
    { label: 'Wishlist', value: wishlistItems.length, icon: '❤️' },
    { label: 'Cart Items', value: totalItems, icon: '🛒' },
  ];

  const recentOrders = orders.slice(0, 3);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
          }}
          style={styles.avatar}
        />
        <View style={styles.headerText}>
          <ThemedText type="title">Hi, Shopper</ThemedText>
          <ThemedText style={styles.subtitle}>Welcome back to your account.</ThemedText>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {userStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <ThemedText style={styles.statIcon}>{stat.icon}</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              {stat.value}
            </ThemedText>
            <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Quick Actions
          </ThemedText>
        </View>
        <View style={styles.actionsGrid}>
          <Pressable style={styles.actionCard}>
            <ThemedText style={styles.actionIcon}>📦</ThemedText>
            <ThemedText style={styles.actionLabel}>My Orders</ThemedText>
          </Pressable>
          <Pressable style={styles.actionCard}>
            <ThemedText style={styles.actionIcon}>❤️</ThemedText>
            <ThemedText style={styles.actionLabel}>Wishlist</ThemedText>
          </Pressable>
          <Pressable style={styles.actionCard}>
            <ThemedText style={styles.actionIcon}>🛒</ThemedText>
            <ThemedText style={styles.actionLabel}>Cart</ThemedText>
          </Pressable>
          <Pressable style={styles.actionCard}>
            <ThemedText style={styles.actionIcon}>⚙️</ThemedText>
            <ThemedText style={styles.actionLabel}>Settings</ThemedText>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Recent Orders
          </ThemedText>
          <Pressable>
            <ThemedText style={styles.viewAll}>View All →</ThemedText>
          </Pressable>
        </View>

        {recentOrders.length > 0 ? (
          recentOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <ThemedText type="defaultSemiBold">{order.id}</ThemedText>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        order.status === 'DELIVERED'
                          ? SUCCESS + '30'
                          : order.status === 'CANCELLED'
                          ? '#EF4444' + '30'
                          : SECONDARY + '30',
                    },
                  ]}>
                  <ThemedText
                    style={[
                      styles.statusText,
                      {
                        color:
                          order.status === 'DELIVERED'
                            ? SUCCESS
                            : order.status === 'CANCELLED'
                            ? '#EF4444'
                            : SECONDARY,
                      },
                    ]}>
                    {order.status}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.orderDate}>
                {new Date(order.createdAt).toLocaleDateString()}
              </ThemedText>
              <View style={styles.orderFooter}>
                <ThemedText>{order.items.length} items</ThemedText>
                <ThemedText type="defaultSemiBold">${order.total.toFixed(2)}</ThemedText>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyOrders}>
            <ThemedText style={styles.emptyIcon}>📦</ThemedText>
            <ThemedText>No orders yet</ThemedText>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Account
          </ThemedText>
        </View>
        <View style={styles.accountList}>
          <Pressable style={styles.accountItem}>
            <ThemedText style={styles.accountIcon}>📧</ThemedText>
            <ThemedText style={styles.accountLabel}>Email</ThemedText>
            <ThemedText style={styles.accountValue}>user@example.com</ThemedText>
          </Pressable>
          <Pressable style={styles.accountItem}>
            <ThemedText style={styles.accountIcon}>📱</ThemedText>
            <ThemedText style={styles.accountLabel}>Phone</ThemedText>
            <ThemedText style={styles.accountValue}>+1 (555) 123-4567</ThemedText>
          </Pressable>
          <Pressable style={styles.accountItem}>
            <ThemedText style={styles.accountIcon}>📍</ThemedText>
            <ThemedText style={styles.accountLabel}>Addresses</ThemedText>
            <ThemedText style={styles.accountValue}>Manage →</ThemedText>
          </Pressable>
          <Pressable style={styles.accountItem}>
            <ThemedText style={styles.accountIcon}>🔔</ThemedText>
            <ThemedText style={styles.accountLabel}>Notifications</ThemedText>
            <ThemedText style={styles.accountValue}>Manage →</ThemedText>
          </Pressable>
        </View>
      </View>

      <View style={{ height: 100 }} />
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
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerText: {
    gap: 4,
  },
  subtitle: {
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.6,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    color: PRIMARY,
    fontSize: 13,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: 13,
  },
  orderCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  orderDate: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  emptyOrders: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  accountList: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  accountIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  accountLabel: {
    flex: 1,
  },
  accountValue: {
    opacity: 0.6,
    fontSize: 13,
  },
});
