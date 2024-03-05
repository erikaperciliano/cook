import React from 'react' 
import { Pressable, Text, Image } from 'react-native'
import { styles } from './styles'

export const Ingredient = () =>  {
  return (
    <Pressable style={styles.container}>
        <Image source={require('@/assets/apple.png')} style={styles.image}/>

        <Text style={styles.title}>
            Apple
        </Text>
    </Pressable>
  )
}

export default Ingredient