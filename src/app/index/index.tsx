import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'

import { style } from './styles'
import Ingredient from '@/components/Ingredient'

const Index = () => {
  const [selected, setSelected] = useState<string[]>([])

  const handleToggleSelected = (value: string) => {
    if(selected.includes(value)){
      return setSelected((state) => state.filter((item) => item !== value))
    }

    setSelected((state) => [...state, value])
    console.log(selected)
  }

  return (
    <View style={style.container}>
        <Text style={style.title}>
            Choose {'\n'}
            <Text style={style.subtitle}>the products</Text>
        </Text>

        <Text style={style.message}>Discover recipes based on the products you chose</Text>

        <ScrollView  contentContainerStyle={style.ingredients} showsVerticalScrollIndicator={false}>
          {Array.from({ length: 100 }).map((item, index) => (
            <Ingredient key={index} name='apple' image='' selected={selected.includes(String(index))} onPress={() => handleToggleSelected(String(index))}/>
          ))}
          
        </ScrollView>
    </View>
  )
}

export default Index