import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Category } from '@/app/data/categories';
import { WHITE } from '@/constants/colors';

interface CategoryCardProps {
  category: Category;
  variant?: 'grid' | 'horizontal' | 'large';
}

export function CategoryCard({ category, variant = 'grid' }: CategoryCardProps) {
  const router = useRouter();

  if (variant === 'horizontal') {
    return (
      <Pressable
        style={styles.horizontalCard}
        onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id } })}>
        <Image source={{ uri: category.image }} style={styles.horizontalImage} contentFit="cover" />
        <ThemedText type="defaultSemiBold" style={styles.horizontalTitle}>
          {category.name}
        </ThemedText>
        <ThemedText style={styles.horizontalSubtitle}>{category.productCount} items</ThemedText>
      </Pressable>
    );
  }

  if (variant === 'large') {
    return (
      <Pressable
        style={styles.largeCard}
        onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id } })}>
        <Image source={{ uri: category.image }} style={styles.largeImage} contentFit="cover" />
        <ThemedText type="title" style={styles.largeTitle}>
          {category.name}
        </ThemedText>
        <ThemedText style={styles.largeSubtitle}>{category.productCount} products</ThemedText>
      </Pressable>
    );
  }

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push({ pathname: '/category/[id]', params: { id: category.id } })}>
      <Image source={{ uri: category.image }} style={styles.image} contentFit="cover" />
      <ThemedText type="defaultSemiBold" style={styles.title}>
        {category.name}
      </ThemedText>
      <ThemedText style={styles.subtitle}>{category.productCount} items</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#1E1E1E',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    opacity: 0.6,
    textAlign: 'center',
  },
  horizontalCard: {
    width: 120,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
  },
  horizontalImage: {
    width: 120,
    height: 80,
  },
  horizontalTitle: {
    fontSize: 13,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  horizontalSubtitle: {
    fontSize: 11,
    opacity: 0.6,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  largeCard: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  largeTitle: {
    color: WHITE,
    fontSize: 28,
    marginBottom: 4,
  },
  largeSubtitle: {
    color: WHITE,
    fontSize: 14,
    opacity: 0.9,
  },
});
