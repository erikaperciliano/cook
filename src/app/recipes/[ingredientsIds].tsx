import { MaterialIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { Recipe } from '@/components/Recipe';
import { Ingredients } from '@/components/Ingredients';
import { Loading } from "@/components/Loading"
import { services } from '@/services';

const Recipes = () => {
    const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
    const [recipes, setRecipes] = useState<RecipeResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const params = useLocalSearchParams<{ ingredientsIds: string }>()
    const ingredientsIds = params.ingredientsIds.split(',')

    useEffect(() => {
        services.ingredientes
        .findByIds(ingredientsIds)
        .then(setIngredients)
        .finally(() => setIsLoading(false))
    },[])

    useEffect(() => {
        services.recipes
        .findByIngredientsIds(ingredientsIds)
        .then(setRecipes)
        .finally(() => setIsLoading(false))
    },[])

    if (isLoading) {
        return <Loading />
    }

  return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons 
                    name='arrow-back' 
                    size={32} 
                    onPress={() => router.back()}
                />

                <Text style={styles.title}>Ingredients</Text>
            </View>

            <Ingredients ingredients={ingredients}/>

            <FlatList 
                data={recipes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Recipe 
                        recipe={item} 
                        onPressOut={() => router.navigate('/recipe/' + item.id)}
                    />
                )}
                style={styles.recipes}
                contentContainerStyle={styles.recipesContent}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ gap: 16 }}
                numColumns={2}
            />
        </View>   
    )
}
export default Recipes;