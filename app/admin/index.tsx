import { useRouter } from 'expo-router';
import { FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAdmin } from '@/app/context/admin-context';
import { useOrders } from '@/app/context/orders-context';
import { PRIMARY, SECONDARY, SUCCESS, ERROR } from '@/constants/colors';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  onPress?: () => void;
}

function StatCard({ title, value, icon, color, onPress }: StatCardProps) {
  return (
    <Pressable style={[styles.statCard, { borderLeftColor: color }]} onPress={onPress}>
      <View style={[styles.statIcon, { backgroundColor: color + '30' }]}>
        <ThemedText style={styles.statIconText}>{icon}</ThemedText>
      </View>
      <ThemedText style={styles.statValue}>{value}</ThemedText>
      <ThemedText style={styles.statTitle}>{title}</ThemedText>
    </Pressable>
  );
}

interface MenuCardProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  onPress: () => void;
}

function MenuCard({ title, subtitle, icon, color, onPress }: MenuCardProps) {
  return (
    <Pressable style={[styles.menuCard, { borderLeftColor: color }]} onPress={onPress}>
      <View style={styles.menuContent}>
        <ThemedText type="defaultSemiBold" style={styles.menuTitle}>
          {title}
        </ThemedText>
        <ThemedText style={styles.menuSubtitle}>{subtitle}</ThemedText>
      </View>
      <View style={[styles.menuIcon, { backgroundColor: color + '30' }]}>
        <ThemedText style={styles.menuIconText}>{icon}</ThemedText>
      </View>
    </Pressable>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const { products, getTotalRevenue, getTotalOrders, getLowStockCount, getTopSellingProducts } = useAdmin();
  const { orders } = useOrders();

  const recentOrders = orders.slice(0, 5);
  const topProducts = getTopSellingProducts();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.headerTitle}>
        Admin Dashboard
      </ThemedText>

      <View style={styles.statsGrid}>
        <StatCard
          title="Total Revenue"
          value={`$${getTotalRevenue().toFixed(2)}`}
          icon="💰"
          color={SUCCESS}
        />
        <StatCard
          title="Total Orders"
          value={getTotalOrders()}
          icon="📦"
          color={PRIMARY}
        />
        <StatCard
          title="Total Products"
          value={products.length}
          icon="🏷️"
          color={SECONDARY}
        />
        <StatCard
          title="Low Stock"
          value={getLowStockCount()}
          icon="⚠️"
          color={ERROR}
          onPress={() => router.push('/admin/products?filter=low-stock')}
        />
      </View>

      <ThemedText type="title" style={styles.sectionTitle}>
        Quick Actions
      </ThemedText>

      <View style={styles.menuGrid}>
        <MenuCard
          title="Manage Products"
          subtitle="Add, edit, or delete products"
          icon="📝"
          color={PRIMARY}
          onPress={() => router.push('/admin/products')}
        />
        <MenuCard
          title="View Orders"
          subtitle={`${orders.length} total orders`}
          icon="📋"
          color={SECONDARY}
          onPress={() => router.push('/admin/orders')}
        />
      </View>

      <ThemedText type="title" style={styles.sectionTitle}>
        Top Selling Products
      </ThemedText>

      {topProducts.length > 0 ? (
        <FlatList
          data={topProducts}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topProductsList}
          renderItem={({ item }) => (
            <View style={styles.topProductCard}>
              <ThemedText style={styles.topProductRank}>#{topProducts.indexOf(item) + 1}</ThemedText>
              <ThemedText numberOfLines={1} type="defaultSemiBold">
                {item.product.name}
              </ThemedText>
              <ThemedText style={styles.topProductSold}>{item.totalSold} sold</ThemedText>
            </View>
          )}
          keyExtractor={(item) => item.product.id}
        />
      ) : (
        <View style={styles.emptyCard}>
          <ThemedText style={styles.emptyIcon}>📊</ThemedText>
          <ThemedText>No sales data yet</ThemedText>
        </View>
      )}

      <ThemedText type="title" style={styles.sectionTitle}>
        Recent Orders
      </ThemedText>

      {recentOrders.length > 0 ? (
        <FlatList
          data={recentOrders}
          contentContainerStyle={styles.ordersList}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <ThemedText type="defaultSemiBold">{item.id}</ThemedText>
                <View
                  style={[
                    styles.orderStatus,
                    {
                      backgroundColor:
                        item.status === 'DELIVERED'
                          ? SUCCESS + '30'
                          : item.status === 'CANCELLED'
                          ? ERROR + '30'
                          : SECONDARY + '30',
                    },
                  ]}>
                  <ThemedText
                    style={{
                      color:
                        item.status === 'DELIVERED'
                          ? SUCCESS
                          : item.status === 'CANCELLED'
                          ? ERROR
                          : SECONDARY,
                    }}>
                    {item.status}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.orderDate}>
                {new Date(item.createdAt).toLocaleDateString()}
              </ThemedText>
              <View style={styles.orderFooter}>
                <ThemedText>{item.items.length} items</ThemedText>
                <ThemedText type="defaultSemiBold">${item.total.toFixed(2)}</ThemedText>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.emptyCard}>
          <ThemedText style={styles.emptyIcon}>📦</ThemedText>
          <ThemedText>No orders yet</ThemedText>
        </View>
      )}

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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statIconText: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  menuGrid: {
    gap: 12,
    marginBottom: 24,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconText: {
    fontSize: 22,
  },
  topProductsList: {
    marginBottom: 24,
  },
  topProductCard: {
    width: 140,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  topProductRank: {
    fontSize: 20,
    fontWeight: '700',
    color: SECONDARY,
    marginBottom: 8,
  },
  topProductSold: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  ordersList: {
    gap: 12,
    marginBottom: 24,
  },
  orderCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 14,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  orderDate: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
});
