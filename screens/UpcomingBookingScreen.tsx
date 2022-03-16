import { View, FlatList } from 'react-native'
import React from 'react'
import t from '../theme';
import Text from '../components/text/Text';
import { useSelector } from 'react-redux';
import { selectBookings } from '../redux/bookingSlice';
import Button from '../components/button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Booking } from '../types';
import { Card } from '../components/card';

const InfoView = ({emoji, title, text}: {emoji: string, title: string, text: string}) => (
    <View style={[t.flexRow, t.itemsCenter, t.pB2]}>
        <Text preset="h1">{emoji}</Text>
        <View style={[t.pL2]}>
            <Text preset="h3">{`${title} - ${text}`}</Text>
        </View>
    </View>
)

export default function UpcomingBookingScreen({navigation}: {navigation: NativeStackNavigationProp<any>}) {
    const bookings = useSelector(selectBookings)

    if(bookings.length === 0) {
        return (
            <View style={[t.flex1, t.justifyCenter, t.itemsCenter, t.pX8]}>
                <Text preset="h2">No upcoming bookings</Text>
                <Button 
                    preset='secondary' 
                    title='Explore Coaches'
                    style={[t.wFull]}
                    onPress={() => {
                        navigation.navigate('Coaches')
                    }} />
            </View>
        )
    }

    const renderItem = ({item}: {item: Booking}) => {
        const {coachName, day, timeSlot} = item
        return (
            <Card customStyles={[t.p5]}>
                <InfoView emoji="🏃" title="Coach" text={coachName} />
                <InfoView emoji="📅" title="Day" text={day} />
                <InfoView emoji="🕘" title="Time" text={timeSlot} />
            </Card>
        )
    }

    return (
        <View style={[t.flex1]}>
          <View style={[t.p5]}>
            <Text preset='h2'>My Bookings</Text>
          </View>
          <View style={[t.pT5]}>
            <FlatList 
                data={bookings}  
                renderItem={renderItem}
                keyExtractor={(item : Booking) => item.timeSlot}
            />
          </View>
        </View>
      );
}