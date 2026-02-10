import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

interface RatingStarsProps {
  rating: number;
  reviews?: number;
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
}

export function RatingStars({
  rating,
  reviews,
  size = 'medium',
  showValue = false,
}: RatingStarsProps) {
  const starSize = size === 'small' ? 12 : size === 'large' ? 20 : 16;
  const fontSize = size === 'small' ? 10 : size === 'large' ? 16 : 12;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <ThemedText key={`full-${i}`} style={[styles.star, { fontSize: starSize }]}>
            ⭐
          </ThemedText>
        ))}
        {hasHalfStar && (
          <ThemedText style={[styles.star, { fontSize: starSize }]}>⭐</ThemedText>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <ThemedText
            key={`empty-${i}`}
            style={[styles.star, { fontSize: starSize, opacity: 0.3 }]}>
            ⭐
          </ThemedText>
        ))}
      </View>
      {showValue && (
        <ThemedText style={[styles.ratingText, { fontSize }]}>{rating.toFixed(1)}</ThemedText>
      )}
      {reviews !== undefined && (
        <ThemedText style={[styles.reviewsText, { fontSize }]}>({reviews})</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    lineHeight: 20,
  },
  ratingText: {
    fontWeight: '600',
  },
  reviewsText: {
    opacity: 0.6,
  },
});
