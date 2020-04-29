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
import {
  Button,
  Avatar,
  Input,
  ThemeProvider,
  Icon,
  Overlay,
} from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

import {request, PERMISSIONS} from 'react-native-permissions';
import {City_counties, Counties} from './cities';

const InfoScreen = props => {
  console.log('CHECK INFO?', props?.route?.params);
  const [data, setdata] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [addrLevel, setaddrLevel] = useState(1);
  const [overlay, setoverlay] = useState(false);
  const [addr, setaddr] = useState("高譚市");
  const [addr2, setaddr2] = useState("二十一區");
  const [addr3, setaddr3] = useState('');
  const [counties2, setcounties2] = useState([]);

  let testStr = props?.route?.params?.ServiceArea;
  testStr = testStr.split(',');
  console.log('TEST', testStr);
  let counties = Object.keys(City_counties);
  console.log('TEST2', counties);
  console.log('TEST3', counties2);

  let startTime = props?.route?.params?.mBirthDay;
  let startDate = props?.route?.params?.mBirthDay;
  let pos = startTime.indexOf('T');
  if (pos != -1) {
    startDate = startTime.substring(0, pos);
    startTime = startTime.substring(pos + 1, pos + 6);
  }

  async function fetchData() {}

  async function submitAddr() {
    setoverlay(false);
  }

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
        <Overlay
          onBackdropPress={() => setoverlay(false)}
          isVisible={overlay}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="white"
          width="90%"
          height="auto">
          <Text
            style={{
              backgroundColor: 'orange',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              padding: 10,
              marginBottom: 10,
            }}>
            {`修改地址`}
          </Text>

          <Picker
            enabled={true}
            selectedValue={addr}
            onValueChange={(itemValue, itemIndex) => {
              setaddr(itemValue);
              setcounties2(City_counties?.[itemValue]);
            }}>
            <Picker.Item label="請選擇縣市" value={"高譚市"} />
            {counties?.map((val, index) => {
              return <Picker.Item label={val} value={val} />;
            })}
          </Picker>

          <Picker
            enabled={true}
            style={addr==="高譚市" && {display: 'none'}}
            selectedValue={addr2}
            onValueChange={(itemValue, itemIndex) => setaddr2(itemValue)}>
            <Picker.Item label="請選擇鄉鎮市區" value={"二十一區"} />
            {counties2?.map((val, index) => {
              return <Picker.Item label={val} value={val} />;
            })}
          </Picker>

          <Input
          containerStyle={addr2==="二十一區" && {display: 'none'}}
          inputStyle={{fontSize:12}}
          placeholder="請由道路開始填寫，例：延平路27號3樓"
          
          onEndEditing={e => {
            setaddr3(e?.nativeEvent?.text);
          }}
        />

          <Button
            titleStyle={{
              color: 'black',
              fontWeight: 'normal',
              fontSize: 24,
            }}
            containerStyle={{margin: 0}}
            buttonStyle={{
              padding: 0,
              margin: 0,
              alignSelf: 'flex-start',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            }}
            title="確認送出"
            type="clear"
            onPress={()=>submitAddr()}
          />
        </Overlay>

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
            <View style={{flexDirection: 'row'}}>
              <Button
                titleStyle={{
                  color: 'black',
                  fontWeight: 'normal',
                  fontSize: 14,
                  textAlign: 'left',
                }}
                containerStyle={{margin: 0}}
                buttonStyle={{
                  padding: 0,
                  margin: 0,
                  alignSelf: 'flex-start',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}
                title={props?.route?.params?.mRealName}
                type="clear"
                iconRight
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Button
                titleStyle={{
                  color: 'black',
                  fontWeight: 'normal',
                  fontSize: 14,
                  textAlign: 'left',
                }}
                containerStyle={{margin: 0}}
                buttonStyle={{
                  padding: 0,
                  margin: 0,
                  alignSelf: 'flex-start',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                }}
                title={props?.route?.params?.mEmail}
                type="clear"
                icon={
                  <Icon
                    name="pencil"
                    type="material-community"
                    color="#666666"
                    onPress={() => console.log('hello')}
                  />
                }
                iconRight
                onPress={() => setoverlay(true)}
              />
            </View>

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

            <Button
              titleStyle={{
                color: 'black',
                fontWeight: 'normal',
                fontSize: 14,
                textAlign: 'left',
              }}
              containerStyle={{flex: 2, paddingLeft: 16, margin: 0}}
              buttonStyle={{
                padding: 0,
                margin: 0,
                alignSelf: 'flex-start',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}
              title={props?.route?.params?.mTel}
              type="clear"
              icon={
                <Icon
                  name="pencil"
                  type="material-community"
                  color="#666666"
                  onPress={() => console.log('hello')}
                />
              }
              iconRight
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, color: '#999999'}}>生日</Text>

            <Button
              titleStyle={{
                color: 'black',
                fontWeight: 'normal',
                fontSize: 14,
                textAlign: 'left',
              }}
              containerStyle={{flex: 2, paddingLeft: 16, margin: 0}}
              buttonStyle={{
                padding: 0,
                margin: 0,
                alignSelf: 'flex-start',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}
              title={startDate}
              type="clear"
              iconRight
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, color: '#999999'}}>通訊地址</Text>

            <Button
              titleStyle={{
                color: 'black',
                fontWeight: 'normal',
                fontSize: 14,
                textAlign: 'left',
              }}
              containerStyle={{flex: 2, paddingLeft: 16, margin: 0}}
              buttonStyle={{
                padding: 0,
                margin: 0,
                alignSelf: 'flex-start',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}
              title={
                props?.route?.params?.CommCounty +
                props?.route?.params?.CommDistrict +
                props?.route?.params?.CommAddr
              }
              type="clear"
              icon={
                <Icon
                  name="pencil"
                  type="material-community"
                  color="#666666"
                  onPress={() => console.log('hello')}
                />
              }
              iconRight
            />
          </View>
        </View>
        <View style={{borderWidth: 0.5, borderColor: '#DDDDDD'}} />
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, color: '#999999'}}>服務地區</Text>
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {testStr.map((val, index) => {
              return (
                <Text style={{width: '50%', textAlign: 'center'}}>{val}</Text>
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
