import {
  Pressable,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Text from "../components/text/Text";
import t from "../theme";
import { useDispatch, useSelector } from "react-redux";
import { selectSchedules, updateTimeSlots } from "../redux/scheduleSlice";
import GoBack from "../components/go-back";
import dayjs from "dayjs";
import Button from "../components/button";
import { showMessage } from "react-native-flash-message";
import { TIME_SLOT } from "../data";
import { addBooking } from "../redux/bookingSlice";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export default function CoachDetailsScreen({route, navigation}: {route: { params: { name: string } }, navigation: any}) {
  const { name } = route.params;
  const dispatch = useDispatch();
  const scheduleData = useSelector(selectSchedules);
  const coachData = scheduleData.filter((item) => item.name === name);
  const availableDays = coachData.map((item) => item.day_of_week);
  const [selectedDay, setSelectedDay] = useState(availableDays[0]);
  const [selectedSlot, setSelectedSlot] = useState<TIME_SLOT>();
  const coachDataAccordingToDay = coachData.filter((item) => item.day_of_week === selectedDay)[0];

  return (
    <View style={[t.flex1]}>
      <GoBack />
      <ScrollView>
        <View style={[t.p5]}>
          <Text preset="h2">{name}</Text>
        </View>

        <View style={[t.pY5]}>
          <ScrollView contentContainerStyle={[t.pX4]} horizontal showsHorizontalScrollIndicator={false}>
            {availableDays.map((day, index) => {
              const isActive = day === selectedDay;
              return (
                <Pressable
                  onPress={() => {
                    setSelectedDay(day)
                    setSelectedSlot(undefined)
                  }}
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

        <View style={[t.p5, t.flexRow]}>
            <View style={[t.flexRow, t.itemsCenter]}>
              <View style={[t.h5, t.w5, t.bgGray600]} />
              <View style={[t.mL1]}>
                <Text preset='body2'>Booked</Text>
              </View>
            </View>
            <View style={[t.flexRow, t.itemsCenter, t.mL5]}>
              <View style={[t.h5, t.w5, t.bgWhite, t.border]} />
              <View style={[t.mL1]}>
                <Text preset='body2'>Available</Text>
              </View>
            </View>
        </View>

        <FlatList
          contentContainerStyle={[t.p5]}
          numColumns={3}
          data={coachDataAccordingToDay?.timeSlots}
          renderItem={({ item }) => {
            const { slots, booked, id } = item;
            const isActive = selectedSlot?.id === id;
            return (
              <Pressable
                disabled={booked}
                onPress={() => {
                  setSelectedSlot(item);
                }}
                style={[t.pX2,t.m1,t.pY3,t.bgWhite,t.borderBlack,t.border,t.mB1,t.roundedFull,isActive && t.bgBlack,booked && [t.bgGray600, t.borderGray600, t.border]]}
              >
                <Text
                  style={[
                    t.textXs,
                    t.fontSansBold,
                    t.textBlack,
                    isActive ? t.textWhite : t.textBlack,
                    booked ? t.textBlack : t.textXs,
                  ]}
                >
                  {slots.join("-")}
                </Text>
              </Pressable>
            );
          }}
        />
        <View style={[t.p5]}>
          {selectedSlot && (
            <Text>{`You are booking on ${selectedDay}, ${selectedSlot?.slots?.join('-')}`}</Text>
          )}
          <Button
            onPress={() => {
              if (selectedSlot) {
                dispatch(updateTimeSlots({ name, selectedSlot: selectedSlot?.id, selectedDay }));
                dispatch(addBooking({coachName: name, day: selectedDay, timeSlot: selectedSlot?.slots?.join('-')}));
                navigation.navigate('UpcomingBooking');
                showMessage({
                  message: "Booking Successfull",
                  type: "success",
                })
              } else {
                showMessage({
                  message: "Please select a slot",
                  type: "danger",
                })
              }
              
            }}
            title="Confirm"
            preset="secondary"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  slot: {},
});
