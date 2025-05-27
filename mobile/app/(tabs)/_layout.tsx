import { Tabs } from 'expo-router';
import { Home, Settings, User } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTransparent: true,
        headerStyle: { backgroundColor: 'rgba(107, 91, 75, 0.75)' },
        headerTintColor: '#F7F5F2',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitle: 'BreadApp',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
            <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
