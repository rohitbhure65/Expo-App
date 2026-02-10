import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { PRIMARY } from '@/constants/colors';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large';
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  size = 'medium',
}: QuantitySelectorProps) {
  const buttonSize = size === 'small' ? 28 : size === 'large' ? 44 : 36;
  const textSize = size === 'small' ? 14 : size === 'large' ? 22 : 18;

  return (
    <View style={[styles.container, { height: buttonSize }]}>
      <Pressable
        style={[styles.button, { width: buttonSize }]}
        onPress={() => onQuantityChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}>
        <ThemedText style={[styles.buttonText, { fontSize: textSize }]}>−</ThemedText>
      </Pressable>
      <ThemedText style={[styles.quantity, { fontSize: textSize }]}>{quantity}</ThemedText>
      <Pressable
        style={[styles.button, { width: buttonSize }]}
        onPress={() => onQuantityChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}>
        <ThemedText style={[styles.buttonText, { fontSize: textSize }]}>+</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
  },
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: PRIMARY,
    fontWeight: '600',
  },
  quantity: {
    minWidth: 40,
    textAlign: 'center',
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
