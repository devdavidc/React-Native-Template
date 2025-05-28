import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: 'rgba(107, 91, 75, 0.35)',
        },
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen
        name="login"
        options={{ title: 'Iniciar sesión' }}
      />
      <Stack.Screen
        name="register"
        options={{ title: 'Registro' }}
      />
    </Stack>
  );
}