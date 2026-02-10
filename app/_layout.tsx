import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AdminProvider } from './context/admin-context';
import { CartProvider } from './context/cart-context';
import { OrdersProvider } from './context/orders-context';
import { WishlistProvider } from './context/wishlist-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <OrdersProvider>
        <AdminProvider>
          <WishlistProvider>
            <CartProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                <Stack.Screen name="admin" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="auto" />
            </CartProvider>
          </WishlistProvider>
        </AdminProvider>
      </OrdersProvider>
    </ThemeProvider>
  );
}
