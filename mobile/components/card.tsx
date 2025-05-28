import { ReactNode, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { cn } from '../lib/utils';

interface CardProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  onPress?: () => void;
}

export default function Card({ title, description, footer, children, className, onPress }: CardProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      className={cn("bg-[#FFFDF9] rounded-2xl p-5 my-3 shadow-lg", className)}
      onPress={onPress}
      disabled={!onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        opacity: pressed ? 0.95 : 1,
        transform: [{ scale: pressed ? 0.95 : 1 }],
      }}
    >
      {title && <Text className="text-xl font-semibold text-[#3C2A21] mb-2">{title}</Text>}
      {description && <Text className="text-base text-[#5E503F] mb-3">{description}</Text>}
      {children}
      {footer && <View className="mt-4">{footer}</View>}
    </Pressable>
  );
}
