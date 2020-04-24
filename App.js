/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
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
import {NavigationContainer} from '@react-navigation/native';

import InfoStack from './src/InfoStack';
import LoginScreen from './src/LoginScreen';

const App: () => React$Node = () => {
  const [login, setlogin] = useState(false);
  const [profile, setprofile] = useState('1');
  const [acc, setacc] = useState('');
  const [pwd, setpwd] = useState('');
  const [token, settoken] = useState('');


  async function getToken(acc,pwd) {
    const data = await fetch(
      `http://aso.1966.org.tw:20020/api/Login/JWTTokenMaster?name=${acc}&pass=${pwd}`,
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
        settoken(res?.token);
        setlogin(true);
        
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
    let token = input;
    const data = await fetch('http://aso.1966.org.tw:20020/api/Orders/Get', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res?.success){
          console.log('TASK AJAX', res);
        }else {
          console.log('TASK AJAX GGWP', res);
        }
        
      })
      .catch(err => {
        console.log("fetchData_test",err);
        
      });
  }

  async function fetchLogin(acc,pwd) {
   
    let url = `http://aso.1966.org.tw:20020/api/Login/MasterLogin?acc=${acc}&pwd=${pwd}`;
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        if (res?.success){
          console.log('LOGIN AJAX', res);
          res.response.addPwd = pwd;
          res.response.addAcc = acc;
          setprofile(res?.response);
          setacc(acc);
          setpwd(pwd);
          getToken(acc,pwd);
          
        }else {
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
        console.log("fetchData_test",err);
        
      });
  }

  const handleLogin = (acc,pwd) => {
    console.log(acc,pwd);
    fetchLogin(acc,pwd);
  };

  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />

        {login ? <InfoStack profile={profile} acc={acc} pwd={pwd} token={token}/> : <LoginScreen handleLogin={handleLogin} />}
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
