import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import t from '../theme/'
import { useNavigation } from '@react-navigation/core';

export default function GoBack() {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.goBack()} style={[t.flexRow, t.itemsCenter, t.mL4, t.mB4]}>
            <AntDesign name="left" size={24} color="black" />
        </Pressable>
    )
}
