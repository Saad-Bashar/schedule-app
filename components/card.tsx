import { PropsWithChildren } from 'react'
import { ViewProps, StyleSheet, View, ViewStyle } from 'react-native'
import t from '../theme'


export const Card = ({ customStyles, children, ...props }: {customStyles?: ViewStyle[], children: JSX.Element[] }) => (
  <View style={[t.m4, t.p2, t.rounded, styles.card, t.bgWhite, customStyles]}>
    {children}
  </View>
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