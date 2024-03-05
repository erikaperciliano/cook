import React from 'react'

import { Slot } from 'expo-router'

import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_500Medium } from '@expo-google-fonts/poppins'

const Layout = () => {
  const [fontLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_700Bold, 
    Poppins_500Medium
  })

  if (!fontLoaded){
    return
  }

  return fontLoaded ? <Slot/> : null
}

export default Layout