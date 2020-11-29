import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Post from '../../components/Post';

const post1 = {
  id: 'p1',
  user: {
    id: 'v1',
    username: 'daviddobrik',
  },
  description: 'hahahah oh boy @borat',
  songName: 'NF - The search',
  songImage: 'https://picsum.photos/id/237/536/354',
  likes: 123,
  comments: 12,
  shares: 44,
  videoUri:
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
};

const post2 = {
  id: 'p1',
  user: {
    id: 'v1',
    username: 'vadimsavin',
  },
  description: 'hello there',
  songName: 'NF - The search',
  songImage: 'https://picsum.photos/id/237/536/354',
  likes: 123,
  comments: 12,
  shares: 44,
  videoUri:
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
};

const Home = () => {
  return (
    <View>
      <Post post={post2} />
    </View>
  );
};

export default Home;
