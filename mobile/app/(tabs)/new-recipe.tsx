import { Text, SafeAreaView } from 'react-native'
import React from 'react'

export default function newRecipe() {
  return (
    <SafeAreaView className='flex-1 bg-[#FFFDF9] items-center justify-center'>
      <Text className='text-5xl font-bold'>ADD A NEW RECIPE</Text>
    </SafeAreaView>
  )
}

