import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

import styles from './styles';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {Storage, API, graphqlOperation, Auth} from 'aws-amplify';
import {createPost} from '../../../graphql/mutations';
import {useNavigation, useRoute} from '@react-navigation/native';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [videoKey, setVideoKey] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  const uploadToStorage = async (imagePath) => {
    try {
      const response = await fetch(imagePath);

      const blob = await response.blob();

      const filename = `${uuidv4()}.mp4`;
      const s3Response = await Storage.put(filename, blob);

      setVideoKey(s3Response.key);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    uploadToStorage(route.params.videoUri);
  }, [route.params.videoUri]);

  const onPublish = async () => {
    if (!videoKey) {
      console.warn('Video is not yet uploaded.');
      return;
    }

    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const newPost = {
        videoUri: videoKey,
        description: description,
        userID: userInfo.attributes.sub,
        songID: '2f468d8c-9fb2-47b6-969d-7e3dd47f2b8f',
      };

      const response = await API.graphql(
        graphqlOperation(createPost, {input: newPost}),
      );
      navigation.navigate('Home', {screen: 'Home'});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={description}
        onChangeText={setDescription}
        numberOfLines={5}
        placeholder="Description"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.button} onPress={onPublish}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Publish</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;
