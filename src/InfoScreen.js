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

const InfoScreen = props => {
  console.log('CHECK INFO?', props.route.params);
  const [data, setdata] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [carChecked, setcarChecked] = useState(false);
  const [bodyChecked, setbodyChecked] = useState(false);

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
        <View style={{flexDirection: 'row'}}>
          <Avatar
            size={96}
            rounded
            source={{
              uri:
                'https://vignette.wikia.nocookie.net/meme/images/e/ee/Imbad_001.jpg/revision/latest/zoom-crop/width/240/height/240?cb=20200129070247&path-prefix=zh-tw',
            }}
          />
          <View style={{flexDirection: 'column',paddingLeft:16,alignItems:'flex-start',justifyContent:'center'}}>
            <Text>{props.route.params.mRealName}</Text>
            <Text>{props.route.params.mEmail}</Text>
            <Button
              title="變更密碼"
              type="clear"
              titleStyle={{fontSize: 12, color: '#964F19'}}
              
              buttonStyle={{padding:0}}
            />
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
