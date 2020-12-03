/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import 'react-native-gesture-handler';
import Navigation from './src/navigation';

import {withAuthenticator} from 'aws-amplify-react-native';
import {Auth, API, graphqlOperation, input} from 'aws-amplify';

import {getUser} from './graphql/queries';
import {createUser} from './graphql/mutations';

const randomImages = [
  'https://images.unsplash.com/photo-1606827728563-d08486ce78c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
  'https://images.unsplash.com/photo-1606877542251-aaa06b4b3f75?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
  'https://images.unsplash.com/photo-1606823942350-db8feea368c1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1606820920595-93727abac7e1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
];

const getRandomImage = () => {
  return randomImages[
    Math.floor[Math.floor(Math.random() * randomImages.length)]
  ];
};

const App: () => React$Node = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});

      if (!userInfo) {
        return;
      }

      const getUserResponse = await API.graphql(
        graphqlOperation(getUser, {id: userInfo.attributes.sub}),
      );

      if (getUserResponse.data.getUser) {
        console.log('User already exists in database.');
        return;
      }

      const newUser = {
        id: userInfo.attributes.sub,
        username: userInfo.username,
        email: userInfo.attributes.email,
        imageUri: getRandomImage(),
      };

      await API.graphql(graphqlOperation(createUser, {input: newUser}));
    };

    fetchUser();
  });

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <Navigation />
      </SafeAreaView>
    </>
  );
};

export default withAuthenticator(App);
