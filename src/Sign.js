/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react');
var ReactNative = require('react-native');

var {Component} = React;

var {AppRegistry, StyleSheet, Text, View, TouchableHighlight,Alert} = ReactNative;

import SignatureCapture from 'react-native-signature-capture';

class RNSignatureExample extends Component {
    constructor(props) {
    super(props);
    this.state = {isDragged: false};
    console.log(this.props.handleSavePic);
    this._onSaveEvent = this._onSaveEvent.bind(this);
    this._onDragEvent = this._onDragEvent.bind(this);
  }

  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.log(result);
    this.setState({isDragged: false});
    this.props.handleSavePic(result);
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={{alignItems: 'center', justifyContent: 'center'}}>
          客戶簽收
        </Text>
        <View style={{flex:7,borderColor:'black',borderWidth:2}}>
        <SignatureCapture
          style={[{flex: 1}, styles.signature]}
          ref="sign"
          onSaveEvent={this._onSaveEvent}
          onDragEvent={this._onDragEvent}
          saveImageFileInExtStorage={false}
          showNativeButtons={false}
          showTitleLabel={false}
          viewMode={'portrait'}
          fileName={`${this.props.name}.png`}
        />
        </View>

        <View style={{flex: 1, flexDirection: 'row',alignItems:'center',justifyContent:'space-evenly'}}>
          

          <TouchableHighlight
            style={styles.buttonStyle('gray')}
            onPress={() => {
              this.resetSign();
            }}>
            <Text style={{color:'#fff'}}>取消</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonStyle('#008F00')}
            onPress={() => {
              this.saveSign();
            }}>
            <Text style={{color:'#fff'}}>送出</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  saveSign() {
    if (this.state.isDragged){
      this.refs['sign'].saveImage();
    }
    else{
      Alert.alert('請在簽完名後再按完成', ' ', [
              {
                text: '確定',
                onPress: () => {},
              },
            ]);
    }
  }

  resetSign() {
    this.refs['sign'].resetImage();
    this.setState({isDragged: false});
    console.log('resetSign');
    this.props.handleCancel();
  }

  _onDragEvent() {
    // This callback will be called when the user enters signature
    this.setState({isDragged: true});
    console.log('dragged');
  }
}

const styles = StyleSheet.create({
  signature: {
    flex: 5,
    borderColor: 'black',
    borderWidth: 10,
    width:'100%'
  },
  buttonStyle:(color)=> {
    return {
      width:64,
      borderRadius:10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 32,
      backgroundColor: color,
      margin: 10,
    }
    
  },
});

export default RNSignatureExample;
