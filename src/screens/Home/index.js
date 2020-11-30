import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import posts from '../../../data/posts';
import Post from '../../components/Post';

const Home = () => {
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 74}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
};

export default Home;
