import { Text, TouchableOpacity, ScrollView, Image, View, SafeAreaView } from 'react-native'
import React from 'react'
import Card from '@/components/card'
import { LogOut } from 'lucide-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token')
      router.replace('/(auth)/login')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-[#FFFDF9]'>
      <ScrollView
        className="flex-1 bg-white p-10"
        showsVerticalScrollIndicator={false}>

        <View className="flex-column items-center mt-4">
          <Card
            title='Tarjeta de prueba'
            description='Esta es una tarjeta de prueba donde mostraremos una receta.'
            footer={
              <Text className='text-sm text-gray-500'>Desarrollado por David Carreño</Text>
            }
            className='mb-6 w-full'
            onPress={() => console.log('Card pressed')}
          >
            <Image
              source={{ uri: 'https://picsum.photos/800/600' }}
              style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 10 }}
            />
          </Card>
          <Card
            title='Tarjeta de prueba 2'
            description='Esta es otra tarjeta de prueba donde mostraremos otra receta.'
            footer={
              <Text className='text-sm text-gray-500'>Desarrollado por David Carreño</Text>
            }
            className='mb-6 w-full'
            onPress={() => console.log('Card pressed')}
          >
            <Image
              source={{ uri: 'https://picsum.photos/800/600' }}
              style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 10 }}
            />
          </Card>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="ml-auto p-2 rounded-full bg-white shadow-md"
          activeOpacity={0.7}
        >
          <LogOut size={24} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}