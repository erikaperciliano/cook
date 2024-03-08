import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { router } from 'expo-router'

import { services } from '@/services'

import { style } from './styles'

import Ingredient from '@/components/Ingredient'
import { Selected } from '@/components/Selected'
import { Loading } from '@/components/Loading'

const Index = () => {
  const [selected, setSelected] = useState<string[]>([])
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleToggleSelected = (value: string) => {
    if(selected.includes(value)){
      return setSelected((state) => state.filter((item) => item !== value))
    }

    setSelected((state) => [...state, value])
  }

  const handleClearSelected = () => {
    Alert.alert('Clear', 'Do you want to clear everything?',[
      { text: 'No', style: 'cancel'},
      { text: 'Yes', onPress: () => setSelected([])}
    ])
  }

  const hanldeSearch = () => {
    router.navigate('/recipes/' + selected)
  }

 useEffect(() => {
  services.ingredientes
  .findAll()
  .then(setIngredients)
  .finally(() => setIsLoading(false))
 }, [])

 if (isLoading) {
    return <Loading />
  }

  return (
    <View style={style.container}>
        <Text style={style.title}>
            Choose {'\n'}
            <Text style={style.subtitle}>the products</Text>
        </Text>

        <Text style={style.message}>Discover recipes based on the products you chose</Text>

        <ScrollView  contentContainerStyle={style.ingredients} showsVerticalScrollIndicator={false}>
          {ingredients.map((item) => (
            <Ingredient 
              key={item.id} 
              name={item.name}
              image={`${services.storage.imagePath}/${item.image}`}
              selected={selected.includes(item.id)} 
              onPress={() => handleToggleSelected(item.id)}
            />
          ))}
        </ScrollView>
        {selected.length > 0 && (
          <Selected 
            quantity={selected.length} 
            onClear={handleClearSelected} 
            onSearch={hanldeSearch}
          />
        )} 
    </View>
  )
}

export default Index