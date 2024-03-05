import React from 'react'
import { View, Text, ScrollView } from 'react-native'

import { style } from './styles'
import Ingredient from '@/components/Ingredient'

const Index = () => {
  return (
    <View style={style.container}>
        <Text style={style.title}>
            Choose {'\n'}
            <Text style={style.subtitle}>the products</Text>
        </Text>

        <Text style={style.message}>Discover recipes based on the products you chose</Text>

        <ScrollView horizontal contentContainerStyle={style.ingredients}>
          <Ingredient/>
          <Ingredient/>
          <Ingredient/>
        </ScrollView>
    </View>
  )
}

export default Index