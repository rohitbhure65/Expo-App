import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1E1E1E',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Admin Dashboard',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="products"
        options={{
          title: 'Products',
        }}
      />
      <Stack.Screen
        name="orders"
        options={{
          title: 'Orders',
        }}
      />
    </Stack>
  );
}
