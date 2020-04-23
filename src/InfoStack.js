import React from 'react';
import {Image, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import TodayTaskListScreen from './TodayTaskListScreen';
import InfoScreen from './InfoScreen';

import {
  Button,
  Avatar,
  Input,
  ThemeProvider,
  Icon,
} from 'react-native-elements';

const Stack = createStackNavigator();

export default function InfoStack(props) {

  return (
    <Stack.Navigator
      initialRouteName="TodayTaskListScreen"
      headerMode="screen"
      screenOptions={{
        headerStyle: {backgroundColor: '#F9F4F1'},
      }}>
      <Stack.Screen
        initialParams={props.profile}
        name="InfoScreen"
        component={InfoScreen}
        options={{
          title: 'A.S.O 足健師任務管理',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Icon
              containerStyle={{paddingEnd: 24}}
              name="account"
              type="material-community"
              color="#964F19"
              onPress={() => console.log('hello')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="TodayTaskListScreen"
        component={TodayTaskListScreen}
        options={({navigation}) => ({
          title: 'A.S.O 足健師任務管理',
          headerTitleAlign: 'center',
          headerRight: () => (
            <Icon
              containerStyle={{paddingEnd: 24}}
              name="account"
              type="material-community"
              color="#555555"
              onPress={() => navigation.navigate('InfoScreen')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
