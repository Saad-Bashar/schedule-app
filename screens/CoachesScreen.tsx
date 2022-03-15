import { StyleSheet, View, FlatList, Image} from 'react-native';
import { RootTabScreenProps } from '../types';
import Text from '../components/text/Text';
import t from '../theme';
import { Card } from '../components/card';
import {  DATA_TYPE } from '../data';
import { useSelector } from 'react-redux';
import { selectSchedules } from '../redux/scheduleSlice';
import { useMemo } from 'react';
import Button from '../components/button';

export default function CoachesScreen({ navigation }: RootTabScreenProps<'Coaches'>) {
  const scheduleData = useSelector(selectSchedules)
  const coachList = useMemo(() => {
    return [...new Map(scheduleData.map(item => [item['name'], item])).values()];
  }, []);

  const renderItem = ({item} : {item: DATA_TYPE}) => {
    const { name, image, skills } = item
    return (
      <Card customStyles={[t.pL4, t.pR4, t.pT5, t.pB5]}>
        <View style={[t.flexRow]}>
            <Image style={[t.h24, t.w24, t.roundedFull, t.resizeCover]} source={image} />
            <View style={[t.pL4, t.flex1]}>
              <Text preset='h3'>{name}</Text>
              <View style={[t.pT2]}>
                <Text>Non veniam labore anim in elit mollit ad laborum sit cupidatat proident ea tempor.</Text>
              </View>
              
              <View style={[t.pT2, t.flexRow, t.flexWrap,]}>
                {skills.map((skill, index) => (
                  <View style={[t.p2, t.bgSecondaryLight, t.mR2, t.mB1,  t.roundedFull]} key={index.toString()}>
                    <Text style={[t.textXs, t.textWhite, t.fontMonoBold]}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
        </View>
        <Button preset='secondary' title={`Book ${name}`} />
      </Card>
    )
  }

  return (
    <View style={[t.flex1]}>
      <View style={[t.p5]}>
        <Text preset='h2'>Coaches for you</Text>
      </View>

      <FlatList 
        data={coachList}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}

      />
      
    </View>
  );
}
