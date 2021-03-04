import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ExchangeScreen extends Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      itemName: '',
      reasonToRequest: '',
    };
  }

  createUniqueId() {
    return Math.random().toString(36).substring(7);
  }

  addRequest = (itemName, reasonToRequest) => {
    var userID = this.state.userID;
    var randomRequestID = this.createUniqueId();
    db.collection('Requested_Items').add({
      user_ID: userID,
      item_Name: itemName,
      reason_To_Request: reasonToRequest,
      request_ID: randomRequestID,
    });
    this.setState({ itemName: '', reasonToRequest: '' });
    return Alert.alert('Item Rquested Successfully');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Request Item" />
        <KeyboardAvoidingView style={styles.keyBoardStyle}>
          <TextInput
            style={styles.formTextInput}
            placeholder={'enter item name'}
            onChangeText={(text) => {
              this.setState({ itemName: text });
            }}
            value={this.state.itemName}
          />
          <TextInput
            style={[styles.formTextInput, { height: 300 }]}
            multiline
            numberOfLines={2}
            placeholder={'Why do you need this item'}
            onChangeText={(text) => {
              this.setState({ reasonToRequest: text });
            }}
            value={this.state.reasonToRequest}
          />
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
});
