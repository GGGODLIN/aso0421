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
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
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
} from 'react-native-elements';

import {request, PERMISSIONS} from 'react-native-permissions';
import {useFocusEffect} from '@react-navigation/native';
import SegmentedControl from '@react-native-community/segmented-control';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DateTimePicker from '@react-native-community/datetimepicker';

function Item({data, navigation}) {
  let date = new Date();
  let nowDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate()}`;
  let startTime = data.ReservationDate;
  let startDate = data.ReservationDate;
  let pos = startTime.indexOf('T');
  if (pos != -1) {
    startDate = startTime.substring(0, pos);
    startTime = startTime.substring(pos + 1, pos + 6);
  }
  let even = startDate == nowDate ? true : false;
  console.log(nowDate, even, startDate);

  return (
    <View
      style={{
        marginTop: 20,
        paddingBottom: 0,
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
      }}
      elevation={5}>
      <View style={{flexDirection: 'row', margin: 14}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 18}}>
          {startDate}
        </Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{startTime}</Text>
        <Text
          style={{fontSize: 14, textAlign: 'right', flex: 1, color: '#E37F22'}}>
          {data.Status === 0
            ? '新訂單'
            : data.Status === 1
            ? '已排班'
            : data.Status === 2
            ? '客戶未到'
            : data.Status === 3
            ? '客戶取消'
            : data.Status === 4
            ? '後台取消'
            : '已完成'}
        </Text>
      </View>

      <View style={{flexDirection: 'column', margin: 14}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 18}}>
          {data.ShopName}
        </Text>
        <Text style={{fontSize: 14}}>{data.ShopAddr}</Text>
        <Text style={{fontSize: 14, flex: 1, color: '#964F19'}}>
          {data.ShopTel}
        </Text>
      </View>

      <View style={{flexDirection: 'row', margin: 14}}>
        <View style={{flexDirection: 'column', flex: 2}}>
          <Text style={{fontSize: 12, color: '#999999', lineHeight: 18}}>
            顧客姓名
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              marginRight: 18,
              lineHeight: 18,
            }}>
            {data.CustomerName}
          </Text>
          <Text style={{fontSize: 12, color: '#999999', lineHeight: 18}}>
            預約編號
          </Text>
          <Text style={{fontSize: 12, lineHeight: 18}}>{data.OrderNo}</Text>
        </View>
        <View
          style={
            even
              ? {
                  flexDirection: 'column',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              : {display: 'none'}
          }>
          <Button
            title="異動聯繫"
            titleStyle={{
              fontSize: 14,
              color: '#964F19',
              paddingHorizontal: 7,
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
          <Button
            title="任務完成"
            titleStyle={{
              fontSize: 14,

              paddingHorizontal: 7,
              padding: 0,
              margin: 0,
            }}
            buttonStyle={{
              alignSelf: 'center',
              backgroundColor: '#964F19',
              borderRadius: 50,
              marginVertical: 5,
            }}
            type="solid"
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
}

const TodayTaskListScreen = props => {
  console.log('CHECK CAR?');
  const [data, setdata] = useState({});
  const [hisData, sethisData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(0);

  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [changeDate, setchangeDate] = useState(false);
  const [changeDate2, setchangeDate2] = useState(false);
  const [searchKey, setsearchKey] = useState('');

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    if (event.type === 'set') {
      console.log(event.type);
      const currentDate = selectedDate || date;

      setDate(currentDate);
      setchangeDate(true);
      if (changeDate2) {
        let nowDate = `${currentDate.getFullYear()}-${currentDate.getMonth() +
          1}-${currentDate.getDate()}`;
        let nowDate2 = `${date2.getFullYear()}-${date2.getMonth() +
          1}-${date2.getDate()}`;

        searchData(nowDate, nowDate2, searchKey);
      }
    }
  };

  const onChange2 = (event, selectedDate) => {
    setShow2(Platform.OS === 'ios');
    if (event.type === 'set') {
      const currentDate2 = selectedDate || date2;

      setDate2(currentDate2);
      setchangeDate2(true);
      if (changeDate) {
        let nowDate = `${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()}`;
        let nowDate2 = `${currentDate2.getFullYear()}-${currentDate2.getMonth() +
          1}-${currentDate2.getDate()}`;

        searchData(nowDate, nowDate2, searchKey);
      }
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showMode2 = currentMode => {
    setShow2(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker2 = () => {
    showMode2('date');
  };

  async function searchData(sDate, eDate, key) {
    const data = await fetch(
      'http://aso.1966.org.tw:20020/api/Login/JWTTokenMaster?name=0909000010&pass=19300101',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(res => {
        console.log('TOKEN AJAX', res);

        searchData_His(res.token, sDate, eDate, key);
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
  }

  async function searchData_His(input, sDate, eDate, key) {
    let token = input;
    let url = `http://aso.1966.org.tw:20020/api/Orders/GetList?_date=${sDate}&_eDate=${eDate}&key=${key}&orderBy=%20ReservationDate%20desc%20`;
    console.log('searchData_His request to', url);
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.success) {
          console.log('TASK AJAX!!!!!!!!!', res);
          sethisData(res);
        } else {
          console.log('TASK AJAX GG', res);
        }
      })
      .catch(err => {
        console.log('fetchData_test', err);
      });
  }

  async function getToken() {
    const data = await fetch(
      'http://aso.1966.org.tw:20020/api/Login/JWTTokenMaster?name=0909000010&pass=19300101',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(res => {
        console.log('TOKEN AJAX', res);

        fetchData_test(res.token);

        fetchData_His(res.token);
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
  }

  async function fetchData_test(input) {
    let date = new Date();
    let nowDate = `${date.getFullYear()}-${date.getMonth() + 1
    }-${date.getDate()}`;
    let token = input;
    let url =
      `http://aso.1966.org.tw:20020/api/Orders/GetList?_date=${nowDate}&_eDate=${nowDate}`;
      console.log("fetchData_test request to ",url);
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.success) {
          console.log('TASK AJAX!!!!!!!!!', res);
          setdata(res);
        } else {
          console.log('TASK AJAX GG', res);
        }
      })
      .catch(err => {
        console.log('fetchData_test', err);
      });
  }

  async function fetchData_His(input) {
    let token = input;
    let url = 'http://aso.1966.org.tw:20020/api/Orders/GetList?_date=';
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res.success) {
          console.log('TASK AJAX!!!!!!!!!', res);
          sethisData(res);
        } else {
          console.log('TASK AJAX GG', res);
        }
      })
      .catch(err => {
        console.log('fetchData_test', err);
      });
  }

  const fetchData = async () => {
    getToken();
  };

  useFocusEffect(() => {
    const backAction = () => {
      Alert.alert('確定要離開APP?', ' ', [
        {
          text: '取消',
          onPress: () => null,
          style: 'cancel',
        },
        {text: '確定', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      //alert('Screen was focused');
      fetchData().then(() => setLoading(false));
      return () => {
        setLoading(true);
        //alert('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, []),
  );

  async function _onRefresh() {
    setisRefreshing(true);
    fetchData().then(() => {
      setLoading(false);
      setisRefreshing(false);
    });
  }

  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  useEffect(() => {
    console.log('HAY!');
  }, [changeDate, changeDate2]);

  if (isLoading || data.response === undefined) {
    console.log('TASKS screen is loading...');
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  } else {
    const list = selectedIndex === 0 ? data.response : hisData.response;
    let nowDate = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`;
    let nowDate2 = `${date2.getFullYear()}-${date2.getMonth() +
      1}-${date2.getDate()}`;
    return (
      <View
        style={{
          flex: 1,
        }}>
        <SegmentedControl
          style={{
            marginTop: 20,
            paddingBottom: 0,
            width: '95%',
            alignSelf: 'center',
          }}
          values={['本日任務', '任務歷程']}
          selectedIndex={selectedIndex}
          onChange={event => {
            setselectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        {/*<SegmentedControlTab
        tabsContainerStyle={{
            marginTop: 20,
            paddingBottom: 0,
            width: '95%',
            alignSelf: 'center',

          }}
          values={['本日任務', '任務歷程']}
          selectedIndex={selectedIndex}
          onTabPress={(index)=>setselectedIndex(index)}
        />*/}
        <View
          style={
            selectedIndex === 1
              ? {
                  borderWidth: 0.5,
                  borderRadius: 50,
                  flexDirection: 'row',
                  marginTop: 20,
                  paddingBottom: 0,
                  width: '95%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  borderColor: '#444444',
                }
              : {display: 'none'}
          }>
          <Icon name="ios-calendar" type="ionicon" />

          <Text
            onPress={showDatepicker}
            style={{
              flex: 4,
              margin: 10,
              textAlign: 'center',
              color: '#AAAAAA',
            }}>
            {changeDate ? nowDate : '開始日期'}
          </Text>
          <Text style={{flex: 1}}>至</Text>
          <Text
            onPress={showTimepicker2}
            style={{flex: 5, textAlign: 'center', color: '#AAAAAA'}}>
            {changeDate2 ? nowDate2 : '結束日期'}
          </Text>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        {show2 && (
          <DateTimePicker
            testID="dateTimePicker2"
            timeZoneOffsetInMinutes={0}
            value={date2}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange2}
          />
        )}

        <View
          style={
            selectedIndex === 1
              ? {
                  borderWidth: 0.5,
                  borderRadius: 50,
                  flexDirection: 'row',
                  marginTop: 20,
                  paddingBottom: 0,
                  width: '95%',
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                  borderColor: '#444444',
                }
              : {display: 'none'}
          }>
          <Icon name="ios-search" type="ionicon" />

          <TextInput
            onPress={showDatepicker}
            style={{flex: 4, padding: 7, textAlign: 'center', color: '#AAAAAA'}}
            placeholder="您可以搜尋分店名、電話、顧客姓名"
            onEndEditing={e => {
              setsearchKey(e.nativeEvent.text);
              if (changeDate && changeDate2) {
                searchData(nowDate, nowDate2, e.nativeEvent.text);
              }
            }}
          />
        </View>
        <FlatList
          data={list}
          refreshControl={
            selectedIndex === 0 && (
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={_onRefresh}
                tintColor="#ff0000"
                title="Loading..."
                size="large"
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffff00"
              />
            )
          }
          renderItem={({item}) => (
            <Item data={item} navigation={props.navigation} />
          )}
          keyExtractor={item => item.OrderNo}
        />
        <Text
          style={
            list.length === 0
              ? {
                  flex: 20,
                  alignSelf: 'center',
                  fontSize: 36,
                  fontWeight: 'bold',
                }
              : {display: 'none'}
          }>
          尚無任務
        </Text>
      </View>
    );
  }
};

export default TodayTaskListScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: '7%',
  },
});
