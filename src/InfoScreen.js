import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  DeviceEventEmitter,
  Alert,
  BackHandler,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DeviceInfo from 'react-native-device-info';
import {ActivityIndicator} from 'react-native-paper';
import {Button, Avatar, Input, ThemeProvider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {request, PERMISSIONS} from 'react-native-permissions';
import {City_counties, Counties} from './cities';

const InfoScreen = props => {
  console.log('CHECK INFO?', props?.route?.params);
  const [data, setdata] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [addrLevel, setaddrLevel] = useState(1);

  let testStr = props?.route?.params?.ServiceArea;
  testStr = testStr.split(',');
  console.log('TEST', testStr);
  console.log('TEST2', Object.keys(City_counties));

  async function fetchData() {}

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          marginTop: 20,
          paddingBottom: 0,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row', margin: 10}}>
          <Avatar
            containerStyle={{flex: 1}}
            size={96}
            rounded
            source={{
              uri:
                'https://vignette.wikia.nocookie.net/meme/images/e/ee/Imbad_001.jpg/revision/latest/zoom-crop/width/240/height/240?cb=20200129070247&path-prefix=zh-tw',
            }}
          />
          <View
            style={{
              flex: 2,
              flexDirection: 'column',
              paddingLeft: 16,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text>{props?.route?.params?.mRealName}</Text>
            <Text>{props?.route?.params?.mEmail}</Text>
            <Button
              title="變更密碼"
              type="clear"
              titleStyle={{fontSize: 12, color: '#964F19'}}
              buttonStyle={{padding: 0}}
            />
          </View>
        </View>
        <View style={{borderWidth: 0.5, borderColor: '#DDDDDD'}} />
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, color: '#999999'}}>連絡電話</Text>
            <Text style={{flex: 2, paddingLeft: 16}}>
              {props?.route?.params?.mTel}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, color: '#999999'}}>生日</Text>
            <Text style={{flex: 2, paddingLeft: 16}}>
              {props?.route?.params?.mBirthDay}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, color: '#999999'}}>通訊地址</Text>
            <Text style={{flex: 2, paddingLeft: 16}}>
              {props?.route?.params?.mTel}
            </Text>
          </View>
        </View>
        <View style={{borderWidth: 0.5, borderColor: '#DDDDDD'}} />
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, color: '#999999'}}>服務地區</Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {addrLevel===1 && Counties?.counties?.map((val, index) => {
              return (
                <Button
                  title={val}
                  containerStyle={{width: '25%'}}
                  titleStyle={{
                    fontSize: 14,
                    color: '#964F19',

                    padding: 0,
                    margin: 0,
                  }}
                  buttonStyle={{
                    alignSelf: 'center',
                    borderColor: '#964F19',
                    borderRadius: 50,
                    marginVertical: 5,
                  }}
                  type="outline"
                  onPress={() => {}}
                />
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: '7%',
  },
});
