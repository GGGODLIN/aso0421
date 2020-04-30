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
  //console.log('CHECK INFO?', props?.route?.params);
  const [data, setdata] = useState({});
  const [profile, setprofile] = useState('1');
  const [isLoading, setLoading] = useState(true);
  const [addrLevel, setaddrLevel] = useState(1);
  const [overlay, setoverlay] = useState(false);
  const [overlay2, setoverlay2] = useState(false);
  const [overlay3, setoverlay3] = useState(false);
  const [overlay4, setoverlay4] = useState(false);
  const [addr, setaddr] = useState('高譚市');
  const [addr2, setaddr2] = useState('二十一區');
  const [addr3, setaddr3] = useState('');
  const [counties2, setcounties2] = useState([]);
  const [email, setemail] = useState('');
  const [tel, settel] = useState('');
  const [pwd, setpwd] = useState('');

  let testStr = profile?.ServiceArea;
  testStr = testStr?.split(',');
  //console.log('TEST', testStr);
  let counties = Object.keys(City_counties);
  //console.log('TEST2', counties);
  //console.log('TEST3', counties2);

  let startTime = profile?.mBirthDay;
  let startDate = profile?.mBirthDay;
  let pos = startTime?.indexOf('T');
  if (pos != -1) {
    startDate = startTime?.substring(0, pos);
    startTime = startTime?.substring(pos + 1, pos + 6);
  }

  async function fetchData() {}

  async function fetchLogin(acc, pwd) {
    let url = `http://aso.1966.org.tw:20020/api/Login/MasterLogin?acc=${
      props?.route?.params?.addAcc
    }&pwd=${props?.route?.params?.addPwd}`;
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res?.success) {
          console.log('LOGIN AJAX', res);

          setprofile(res?.response);
        } else {
          console.log('TASK AJAX GGWP', res);
          Alert.alert(res?.msg, ' ', [
            {
              text: '確定',
              onPress: () => {},
            },
          ]);
        }
      })
      .catch(err => {
        console.log('fetchData_test', err);
      });
  }

  async function getToken() {
    const data = await fetch(
      `http://aso.1966.org.tw:20020/api/Login/JWTTokenMaster?name=${
        props?.route?.params?.addAcc
      }&pass=${props?.route?.params?.addPwd}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(res => {
        console.log('TOKEN AJAX APP', res?.token);
        return res?.token;
      })
      .catch(err => {
        console.log(err);
        Alert.alert('網路異常，請稍後再試...', ' ', [
          {
            text: '確定',
            onPress: () => {},
          },
        ]);
      });
    return data;
  }

  async function submitAddr() {
    let token = await getToken();
    console.log('TOKEN???????????', token);

    let temp = profile;
    temp.CommCounty = addr;
    temp.CommDistrict = addr2;
    temp.CommAddr = addr3;

    let url = `http://aso.1966.org.tw:20020/api/FootMaster/Put`;
    const data = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(temp),
    })
      .then(response => response.json())
      .then(res => {
        if (res?.success) {
          console.log('PUT MASTER AJAX', res);
        } else {
          console.log('TASK AJAX GGWP', res);
          Alert.alert(res?.msg, ' ', [
            {
              text: '確定',
              onPress: () => {},
            },
          ]);
        }
      })
      .catch(err => {
        console.log('fetchData_test', err);
      });

    setoverlay(false);
  }

  async function submitEmail() {
    let token = await getToken();
    console.log('TOKEN???????????', token);

    let temp = profile;
    temp.mEmail = email;

    let url = `http://aso.1966.org.tw:20020/api/FootMaster/Put`;
    const data = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(temp),
    })
      .then(response => response.json())
      .then(res => {
        if (res?.success) {
          console.log('PUT MASTER AJAX', res);
        } else {
          console.log('TASK AJAX GGWP', res);
          Alert.alert(res?.msg, ' ', [
            {
              text: '確定',
              onPress: () => {},
            },
          ]);
        }
      })
      .catch(err => {
        console.log('fetchData_test', err);
      });

    setoverlay2(false);
  }

  async function submitTel() {
    console.log(tel);

    let token = await getToken();
    console.log('TOKEN???????????', token);

    let temp = profile;
    temp.mTel = tel;

    let url = `http://aso.1966.org.tw:20020/api/FootMaster/Put`;
    const data = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(temp),
    })
      .then(response => response.json())
      .then(res => {
        if (res?.success) {
          console.log('PUT MASTER AJAX', res);
        } else {
          console.log('TASK AJAX GGWP', res);
          Alert.alert(res?.msg, ' ', [
            {
              text: '確定',
              onPress: () => {},
            },
          ]);
        }
      })
      .catch(err => {
        console.log('fetchData_test', err);
      });
    setoverlay3(false);
  }

  async function submitPwd() {
    let url = `http://aso.1966.org.tw:20020/api/Login/PutForgetPasswordMaster?cAccount=${
      props?.route?.params?.addAcc
    }&cPassword=${pwd}`;
    const data = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res?.success) {
          console.log('PUT PWD AJAX', res);
          Alert.alert(res?.msg, ' ', [
            {
              text: '確定',
              onPress: () => {
                handleLogout();
              },
            },
          ]);
        } else {
          console.log('TASK AJAX GGWP', res);
          Alert.alert(res?.msg, ' ', [
            {
              text: '確定',
              onPress: () => {},
            },
          ]);
        }
      })
      .catch(err => {
        console.log('fetchData_test', err);
      });
    setoverlay4(false);
  }

  async function handleLogout() {
    console.log('LG', props?.route?.params?.handleLogout);
    props?.route?.params?.handleLogout();
  }

  useEffect(() => {
    fetchLogin();
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
              backgroundColor: '#964F19',
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
            <Picker.Item label="請選擇縣市" value={'高譚市'} />
            {counties?.map((val, index) => {
              return <Picker.Item label={val} value={val} />;
            })}
          </Picker>

          <Picker
            enabled={true}
            style={addr === '高譚市' && {display: 'none'}}
            selectedValue={addr2}
            onValueChange={(itemValue, itemIndex) => setaddr2(itemValue)}>
            <Picker.Item label="請選擇鄉鎮市區" value={'二十一區'} />
            {counties2?.map((val, index) => {
              return <Picker.Item label={val} value={val} />;
            })}
          </Picker>

          <Input
            containerStyle={addr2 === '二十一區' && {display: 'none'}}
            inputStyle={{fontSize: 12}}
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
            containerStyle={{marginTop: 12}}
            buttonStyle={{
              alignSelf: 'flex-end',
              borderColor: '#964F19',
            }}
            title="確認送出"
            type="outline"
            onPress={() => submitAddr()}
          />
        </Overlay>

        <Overlay
          onBackdropPress={() => setoverlay2(false)}
          isVisible={overlay2}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="white"
          width="90%"
          height="auto">
          <Text
            style={{
              backgroundColor: '#964F19',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              padding: 10,
              marginBottom: 10,
            }}>
            {`修改Email`}
          </Text>

          <Input
            inputStyle={{fontSize: 12}}
            placeholder="請輸入新Email地址"
            onEndEditing={e => {
              setemail(e?.nativeEvent?.text);
            }}
          />

          <Button
            titleStyle={{
              color: 'black',
              fontWeight: 'normal',
              fontSize: 24,
            }}
            containerStyle={{marginTop: 12}}
            buttonStyle={{
              alignSelf: 'flex-end',
              borderColor: '#964F19',
            }}
            title="確認送出"
            type="outline"
            onPress={() => submitEmail()}
          />
        </Overlay>

        <Overlay
          onBackdropPress={() => setoverlay3(false)}
          isVisible={overlay3}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="white"
          width="90%"
          height="auto">
          <Text
            style={{
              backgroundColor: '#964F19',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              padding: 10,
              marginBottom: 10,
            }}>
            {`修改電話`}
          </Text>

          <Input
            inputStyle={{fontSize: 12}}
            placeholder="請輸入新電話"
            onEndEditing={e => {
              settel(e?.nativeEvent?.text);
            }}
          />

          <Button
            titleStyle={{
              color: 'black',
              fontWeight: 'normal',
              fontSize: 24,
            }}
            containerStyle={{marginTop: 12}}
            buttonStyle={{
              alignSelf: 'flex-end',
              borderColor: '#964F19',
            }}
            title="確認送出"
            type="outline"
            onPress={() => submitTel()}
          />
        </Overlay>

        <Overlay
          onBackdropPress={() => setoverlay4(false)}
          isVisible={overlay4}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="white"
          width="90%"
          height="auto">
          <Text
            style={{
              backgroundColor: '#964F19',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              padding: 10,
              marginBottom: 10,
            }}>
            {`變更密碼`}
          </Text>

          <Input
            inputStyle={{fontSize: 12}}
            placeholder="請輸入新密碼"
            onEndEditing={e => {
              setpwd(e?.nativeEvent?.text);
            }}
          />

          <Button
            titleStyle={{
              color: 'black',
              fontWeight: 'normal',
              fontSize: 24,
            }}
            containerStyle={{marginTop: 12}}
            buttonStyle={{
              alignSelf: 'flex-end',
              borderColor: '#964F19',
            }}
            title="確認送出"
            type="outline"
            onPress={() => submitPwd()}
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
                title={profile?.mRealName}
                type="clear"
                iconRight
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <Button
                titleStyle={{
                  color: '#999999',
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
                title={profile?.mEmail}
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
                onPress={() => setoverlay2(true)}
              />
            </View>

            <Button
              title="變更密碼"
              type="clear"
              titleStyle={{fontSize: 12, color: '#964F19'}}
              buttonStyle={{padding: 0}}
              onPress={() => setoverlay4(true)}
            />
          </View>
        </View>
        <View style={{borderWidth: 0.5, borderColor: '#DDDDDD'}} />
        <View style={{margin: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, color: '#999999'}}>連絡電話</Text>

            <Button
              onPress={() => setoverlay3(true)}
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
              title={profile?.mTel}
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
              onPress={() => setoverlay(true)}
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
                profile?.CommCounty + profile?.CommDistrict + profile?.CommAddr
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
            {testStr?.map((val, index) => {
              return (
                <Text style={{width: '50%', textAlign: 'center'}}>{val}</Text>
              );
            })}
          </View>
        </View>
        <View style={{borderWidth: 0.5, borderColor: '#DDDDDD'}} />
        <View style={{margin: 10}}>
          <Button
            title="登出"
            titleStyle={{
              fontSize: 14,
              color: '#D25959',
              paddingHorizontal: 7,
              padding: 0,
              margin: 0,
            }}
            buttonStyle={{
              alignSelf: 'center',
              borderColor: '#D25959',
              borderRadius: 50,
              marginVertical: 5,
            }}
            type="outline"
            onPress={() => {
              handleLogout();
            }}
          />
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
