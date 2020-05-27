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
import ModalSelector from 'react-native-modal-selector';

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
  const [addr, setaddr] = useState('請選擇縣市');
  const [addr2, setaddr2] = useState('請選擇鄉鎮市區');
  const [timeOverlay, settimeOverlay] = useState(false);
  const [addr3, setaddr3] = useState('');
  const [counties2, setcounties2] = useState([]);
  const [email, setemail] = useState('');
  const [tel, settel] = useState('');
  const [pwd, setpwd] = useState('');
  const [weekDay, setweekDay] = useState(1);
  const [startHour, setstartHour] = useState(10);
  const [endHour, setendHour] = useState(23);

  let testStr = profile?.ServiceArea;
  testStr = testStr?.split(',');

  let MondayServiceArr = profile?.MondayService;
  MondayServiceArr = MondayServiceArr?.split(',');
  let MondayServiceText =
    MondayServiceArr?.length > 1
      ? `${MondayServiceArr[0]}:00~${
          MondayServiceArr[MondayServiceArr?.length - 1]
        }:00`
      : '無';
  let TuesdayServiceArr = profile?.TuesdayService;
  TuesdayServiceArr = TuesdayServiceArr?.split(',');
  let TuesdayServiceText =
    TuesdayServiceArr?.length > 1
      ? `${TuesdayServiceArr[0]}:00~${
          TuesdayServiceArr[TuesdayServiceArr?.length - 1]
        }:00`
      : '無';
  let WednesdayServiceArr = profile?.WednesdayService;
  WednesdayServiceArr = WednesdayServiceArr?.split(',');
  let WednesdayServiceText =
    WednesdayServiceArr?.length > 1
      ? `${WednesdayServiceArr[0]}:00~${
          WednesdayServiceArr[WednesdayServiceArr?.length - 1]
        }:00`
      : '無';
  let ThursdayServiceArr = profile?.ThursdayService;
  ThursdayServiceArr = ThursdayServiceArr?.split(',');
  let ThursdayServiceText =
    ThursdayServiceArr?.length > 1
      ? `${ThursdayServiceArr[0]}:00~${
          ThursdayServiceArr[ThursdayServiceArr?.length - 1]
        }:00`
      : '無';
  let FridayServiceArr = profile?.FridayService;
  FridayServiceArr = FridayServiceArr?.split(',');
  let FridayServiceText =
    FridayServiceArr?.length > 1
      ? `${FridayServiceArr[0]}:00~${
          FridayServiceArr[FridayServiceArr?.length - 1]
        }:00`
      : '無';
  let SaturdayServiceArr = profile?.SaturdayService;
  SaturdayServiceArr = SaturdayServiceArr?.split(',');
  let SaturdayServiceText =
    SaturdayServiceArr?.length > 1
      ? `${SaturdayServiceArr[0]}:00~${
          SaturdayServiceArr[SaturdayServiceArr?.length - 1]
        }:00`
      : '無';
  let SundayServiceArr = profile?.SundayService;
  SundayServiceArr = SundayServiceArr?.split(',');
  let SundayServiceText =
    SundayServiceArr?.length > 1
      ? `${SundayServiceArr[0]}:00~${
          SundayServiceArr[SundayServiceArr?.length - 1]
        }:00`
      : '無';

  console.log(
    'TEST',
    MondayServiceArr,
    TuesdayServiceArr,
    WednesdayServiceArr,
    ThursdayServiceArr,
    FridayServiceArr,
    SaturdayServiceArr,
    SundayServiceArr,
  );
  console.log(
    'TEST TEXT',
    MondayServiceText,
    TuesdayServiceText,
    WednesdayServiceText,
    ThursdayServiceText,
    FridayServiceText,
    SaturdayServiceText,
    SundayServiceText,
  );

  let rows = [];
  rows.push(<Picker.Item label={`無服務時間`} value={0} />);
  for (let i = 10; i < 23; i++) {
    rows.push(<Picker.Item label={`${i}:00`} value={i} />);
  }
  let rows2 = [];
  rows2.push(<Picker.Item label={`無服務時間`} value={0} />);
  for (let i = startHour + 1; i < 24; i++) {
    rows2.push(<Picker.Item label={`${i}:00`} value={i} />);
  }
  console.log(startHour, endHour);

  let counties = Object.keys(City_counties);
  let obj_value = counties?.map((val, index) => {
    return {key: index, label: val};
  });
  //console.log('TEST2', obj_value);
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

  async function submitServiceTime(day) {
    //console.log(tel);

    let token = await getToken();
    console.log('TOKEN???????????', token);
    let serviceArr = [];
    if (startHour !== 0 && endHour !== 0) {
      for (let i = startHour; i <= endHour; i++) {
        serviceArr.push(i);
      }
    }

    serviceArr = serviceArr.toString();
    console.log(serviceArr);
    let temp = profile;
    switch (day) {
      default:
        break;
      case 1:
        temp.MondayService = serviceArr;
        break;
      case 2:
        temp.TuesdayService = serviceArr;
        break;
      case 3:
        temp.WednesdayService = serviceArr;
        break;
      case 4:
        temp.ThursdayService = serviceArr;
        break;
      case 5:
        temp.FridayService = serviceArr;
        break;
      case 6:
        temp.SaturdayService = serviceArr;
        break;
      case 7:
        temp.SundayService = serviceArr;
        break;
    }

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
    settimeOverlay(false);
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

          {/*<Picker
            enabled={true}
            selectedValue={addr}
            onValueChange={(itemValue, itemIndex) => {
              setaddr(itemValue);
              setcounties2(City_counties?.[itemValue]);
            }}>
            <Picker.Item label="請選擇縣市" value={'請選擇縣市'} />
            {counties?.map((val, index) => {
              return <Picker.Item label={val} value={val} />;
            })}
          </Picker>*/}
          <ModalSelector
            data={obj_value}
            initValue={addr}
            initValueTextStyle={{color:'black'}}
            onChange={option => {
              setaddr(option?.label);
              setaddr2('請選擇鄉鎮市區');
              let obj_value2 = City_counties?.[option?.label]?.map(
                (val, index) => {
                  return {key: index, label: val};
                },
              );
              setcounties2(obj_value2);
            }}
          />

          {/*<Picker
            enabled={true}
            style={addr === '請選擇縣市' && {display: 'none'}}
            selectedValue={addr2}
            onValueChange={(itemValue, itemIndex) => setaddr2(itemValue)}>
            <Picker.Item label="請選擇鄉鎮市區" value={'請選擇鄉鎮市區'} />
            {counties2?.map((val, index) => {
              return <Picker.Item label={val?.label} value={val?.label} />;
            })}
          </Picker>*/}

          <ModalSelector
          disabled={addr === '請選擇縣市'}
          initValueTextStyle={{color:'black'}}
            data={counties2}
            initValue={addr2}
            onChange={option => {
              setaddr2(option?.label);

            }}
          />

          <Input
            containerStyle={addr2 === '請選擇鄉鎮市區' && {display: 'none'}}
            inputStyle={{fontSize: 12}}
            placeholder="請由道路開始填寫，例：延平路27號3樓"
            onEndEditing={e => {
              setaddr3(e?.nativeEvent?.text);
            }}
          />

          <Button
          disabled = {addr==='請選擇縣市' || addr2 === '請選擇鄉鎮市區'}
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
            onPress={() => {
              submitAddr();
            }}
          />
        </Overlay>

        <Overlay
          onBackdropPress={() => settimeOverlay(false)}
          isVisible={timeOverlay}
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
            {`修改服務時間`}
          </Text>

          <Picker
            enabled={true}
            selectedValue={weekDay}
            onValueChange={(itemValue, itemIndex) => {
              setweekDay(itemValue);
              //console.log(itemValue);
            }}>
            <Picker.Item label="星期一" value={1} />
            <Picker.Item label="星期二" value={2} />
            <Picker.Item label="星期三" value={3} />
            <Picker.Item label="星期四" value={4} />
            <Picker.Item label="星期五" value={5} />
            <Picker.Item label="星期六" value={6} />
            <Picker.Item label="星期日" value={7} />
          </Picker>

          <Picker
            enabled={true}
            style={endHour === 0 && {display: 'none'}}
            selectedValue={startHour}
            onValueChange={(itemValue, itemIndex) => setstartHour(itemValue)}>
            {rows}
          </Picker>
          {(endHour !== 0 && startHour !== 0) &&<Text style={{alignSelf: 'center'}}>至</Text>}
          <Picker
            enabled={true}
            style={startHour === 0 && {display: 'none'}}
            selectedValue={endHour}
            onValueChange={(itemValue2, itemIndex2) => setendHour(itemValue2)}>
            {rows2}
          </Picker>

          <Button
            titleStyle={{
              color: 'black',
              fontWeight: 'normal',
              fontSize: 20,
            }}
            containerStyle={{marginTop: 12}}
            buttonStyle={{
              alignSelf: 'flex-end',
              borderColor: '#964F19',
            }}
            title="確認送出"
            type="outline"
            onPress={() => {
              console.log(weekDay, startHour, endHour);
              submitServiceTime(weekDay);
            }}
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
            inputStyle={{fontSize: 14}}
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
            inputStyle={{fontSize: 14}}
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
            inputStyle={{fontSize: 14}}
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
            source={require('../img/male2.png')}
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
                    onPress={() => setoverlay2(true)}
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
                  onPress={() => setoverlay3(true)}
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
                  onPress={() => setoverlay(true)}
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
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, color: '#999999'}}>服務時間</Text>
          </View>
          <View>
            <Button
              onPress={() => {
                settimeOverlay(true);
                setweekDay(1);
              }}
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
              title={`週一： ${MondayServiceText}`}
              type="clear"
              icon={
                <Icon
                  name="pencil"
                  type="material-community"
                  color="#666666"
                  onPress={() => {
                    settimeOverlay(true);
                    setweekDay(1);
                  }}
                />
              }
              iconRight
            />
            <Button
              onPress={() => {
                settimeOverlay(true);
                setweekDay(2);
              }}
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
              title={`週二： ${TuesdayServiceText}`}
              type="clear"
              icon={
                <Icon
                  name="pencil"
                  type="material-community"
                  color="#666666"
                  onPress={() => {
                    settimeOverlay(true);
                    setweekDay(2);
                  }}
                />
              }
              iconRight
            />
            <Button
              onPress={() => {
                settimeOverlay(true);
                setweekDay(3);
              }}
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
              title={`週三： ${WednesdayServiceText}`}
              type="clear"
              icon={
                <Icon
                  name="pencil"
                  type="material-community"
                  color="#666666"
                  onPress={() => {
                    settimeOverlay(true);
                    setweekDay(3);
                  }}
                />
              }
              iconRight
            />
            <Button
              onPress={() => {
                settimeOverlay(true);
                setweekDay(4);
              }}
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
              title={`週四： ${ThursdayServiceText}`}
              type="clear"
              icon={
                <Icon
                  name="pencil"
                  type="material-community"
                  color="#666666"
                  onPress={() => {
                    settimeOverlay(true);
                    setweekDay(4);
                  }}
                />
              }
              iconRight
            />
            <Button
              onPress={() => {
                settimeOverlay(true);
                setweekDay(5);
              }}
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
              title={`週五： ${FridayServiceText}`}
              type="clear"
              icon={
                <Icon
                  name="pencil"
                  type="material-community"
                  color="#666666"
                  onPress={() => {
                    settimeOverlay(true);
                    setweekDay(5);
                  }}
                />
              }
              iconRight
            />
            <Button
              onPress={() => {
                settimeOverlay(true);
                setweekDay(6);
              }}
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
              title={`週六： ${SaturdayServiceText}`}
              type="clear"
              icon={
                <Icon
                  name="pencil"
                  type="material-community"
                  color="#666666"
                  onPress={() => {
                    settimeOverlay(true);
                    setweekDay(6);
                  }}
                />
              }
              iconRight
            />
            <Button
              onPress={() => {
                settimeOverlay(true);
                setweekDay(7);
              }}
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
              title={`週日： ${SundayServiceText}`}
              type="clear"
              icon={
                <Icon
                  name="pencil"
                  type="material-community"
                  color="#666666"
                  onPress={() => {
                    settimeOverlay(true);
                    setweekDay(7);
                  }}
                />
              }
              iconRight
            />
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
              Alert.alert('確定登出?', ' ', [
                {
                  text: '取消',
                  onPress: () => null,
                  style: 'cancel',
                },
                {text: '確定', onPress: () => handleLogout()},
              ]);
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
