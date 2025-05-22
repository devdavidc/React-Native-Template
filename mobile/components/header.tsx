import { BlurView } from 'expo-blur';
import { Text, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function CustomHeader() {
  return (
    <BlurView
      intensity={50}
      tint="light"
      className={`absolute top-0 left-0 right-0 py-4 px-6 flex-row items-center justify-center ${
        Platform.OS === 'ios' ? 'pt-12' : 'pt-8'
      }`}
    >
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Text className="text-xl font-bold text-neutral-800">Bread App</Text>
    </BlurView>
  );
}
