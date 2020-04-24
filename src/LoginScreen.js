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

const LoginScreen = props => {
  console.log('Login');
  const [data, setdata] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [acc, setacc] = useState('');
  const [pwd, setpwd] = useState('');

  async function fetchData() {}

  const handleLogin = () => {
    props.handleLogin(acc,pwd);
  };

  useEffect(() => {
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

  return (
    <SafeAreaView style={{backgroundColor: '#E5E5E5'}}>
      <View
        style={{
          backgroundColor: '#E5E5E5',
          width: '90%',
          height: '100%',
          alignSelf: 'center',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <Avatar
          size={96}
          rounded
          source={{
            uri:
              'https://vignette.wikia.nocookie.net/meme/images/e/ee/Imbad_001.jpg/revision/latest/zoom-crop/width/240/height/240?cb=20200129070247&path-prefix=zh-tw',
          }}
        />
        <Text style={{fontSize: 32, marginTop: 24, marginBottom: 49}}>
          足健師登入
        </Text>
        <Input
          label="登入帳號"
          placeholder="請輸入您的使用者帳號"
          containerStyle={{marginBottom: 20}}
          onEndEditing={e => {
            setacc(e?.nativeEvent?.text);
          }}
        />
        <Input
          label="登入密碼"
          placeholder="預設為您的西元出生年月，例 19840318"
          inputStyle={{fontSize: 14}}
          onEndEditing={e => {
            setpwd(e?.nativeEvent?.text);
          }}
        />
        <Button
          title="忘記密碼了嗎？寄送 Email 重設密碼"
          type="clear"
          titleStyle={{fontSize: 12, color: '#964F19'}}
        />
        <Button
          title="立即登入"
          type="solid"
          buttonStyle={{backgroundColor: '#964F19'}}
          containerStyle={{width: '100%', marginTop: 32}}
          onPress={() => {
            handleLogin();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: '7%',
  },
});
