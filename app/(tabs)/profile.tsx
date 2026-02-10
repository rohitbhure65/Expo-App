import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
          }}
          style={styles.avatar}
          contentFit="cover"
        />
        <View style={styles.headerText}>
          <ThemedText type="title">Hi, Shopper</ThemedText>
          <ThemedText>Welcome back to your account.</ThemedText>
        </View>
      </View>

      <ThemedView style={styles.stats}>
        <View style={styles.statCard}>
          <ThemedText type="defaultSemiBold">12</ThemedText>
          <ThemedText>Orders</ThemedText>
        </View>
        <View style={styles.statCard}>
          <ThemedText type="defaultSemiBold">4</ThemedText>
          <ThemedText>Wishlisted</ThemedText>
        </View>
        <View style={styles.statCard}>
          <ThemedText type="defaultSemiBold">Gold</ThemedText>
          <ThemedText>Tier</ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 70 : 52,
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  headerText: {
    gap: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 4,
  },
});

