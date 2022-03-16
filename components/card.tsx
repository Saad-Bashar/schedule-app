import { PropsWithChildren } from 'react'
import { ViewProps, StyleSheet, View, ViewStyle, Pressable } from 'react-native'
import t from '../theme'


export const Card = ({ customStyles, children, onPress, ...props }: {customStyles?: ViewStyle[], onPress?: () => void; children: JSX.Element[] }) => (
  <Pressable style={[t.m4, t.p2, t.rounded, styles.card, t.bgWhite, customStyles]}>
    {children}
  </Pressable>
)
const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 2,
        elevation: 2
    }
})  