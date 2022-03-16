import { Pressable, ScrollView, ScrollViewBase, View, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import Text from '../components/text/Text'
import t from '../theme'
import { useSelector } from 'react-redux'
import { selectSchedules } from '../redux/scheduleSlice'
import GoBack from '../components/go-back'
import dayjs from 'dayjs'
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export default function CoachDetailsScreen({route}: {route: {params: {name: string}}}) {
  const { name } = route.params
  const scheduleData = useSelector(selectSchedules)
  const coachData = scheduleData.filter(item => item.name === name)
  const availableDays = coachData.map(item => item.day_of_week)
  const [selectedDay, setSelectedDay] = useState(availableDays[0])
  const coachDataAccordingToDay = coachData.filter(item => item.day_of_week === selectedDay)[0]
  console.log('lala', coachDataAccordingToDay?.timeSlots)
  return (
    <View style={[t.flex1]}>
      <GoBack />
      <View style={[t.p5]}>
        <Text preset='h2'>{name}</Text>
      </View>

      <View style={[t.p5]}>
        <ScrollView horizontal>
          {availableDays.map((day, index) => {
            const isActive = day === selectedDay
            return (
              <Pressable
                onPress={() => setSelectedDay(day)}
                style={[
                  t.h16,
                  t.w16,
                  t.roundedFull,
                  t.bgGray700,
                  t.mR4,
                  t.itemsCenter,
                  t.justifyCenter,
                  isActive && t.bgSecondary,
                ]}
                key={day}
              >
                <Text style={[t.textWhite, t.fontSansBold]}>
                  {day.substring(0, 3)}
                </Text>
              </Pressable>
            );
          })}     
        </ScrollView>
      </View> 
      <View style={[t.p5]}>
          <Text style={[t.leading6]}>
            {`👉 Coach ${name} is working on ${selectedDay} from ${coachDataAccordingToDay.available_at} to ${coachDataAccordingToDay.available_until}`}
          </Text>
      </View>
          
      <FlatList 
        contentContainerStyle={[t.p5]}
        numColumns={3}
        data={coachDataAccordingToDay.timeSlots}
        renderItem={({item}) => {
          const { slots, booked } = item
          return (
            <View style={[t.pX2, t.m1, t.pY3, t.bgWhite, t.borderBlack, t.border, t.mB1,  t.roundedFull, styles.slot]}>
              <Text style={[t.textXs, t.fontSansBold]}>{slots.join('-')}</Text>
            </View>
          )
        }} 
      />
    </View>
  )
   
}

const styles = StyleSheet.create({
  slot: {
    
  }
})