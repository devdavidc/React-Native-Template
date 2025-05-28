import { Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  return (
    <SafeAreaView className='flex-1 bg-[#FFFDF9] items-center justify-center'>
      <Text className='text-5xl font-bold'>MY PROFILE</Text>
    </SafeAreaView>
  )
}

