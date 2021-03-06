import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Header from './common/Header';
import GridView from 'react-native-super-grid';
import speakerData from '../../data/speakers.json';

class Speakers extends Component {
  constructor() {
    super();
    this.state = { "speakers": [] };
    this.fetch = this.fetch.bind(this);
  }
  componentDidMount() {
    this.fetch();
  }
  fetch() {
    const url = 'https://raw.githubusercontent.com/sirjmkitavi/droidCon/master/data/speakers.json';

    return axios.get(url)
      .then(response => {
        this.setState({
          speakers: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title='Speakers' />
        <ImageBackground
          style={styles.bgImage}
          source={require('../../assets/img/bg.png')}
        >
        {this.state.speakers.length < 1 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator
              color='black'
              size={30}
            />
          </View>
        ):(
          <View style={{ flex: 1, marginBottom: 67 }}>
            <GridView
              itemDimension={140}
              items={this.state.speakers}
              style={styles.gridView}
              renderItem={speaker => (
                <ImageBackground
                  style={styles.itemContainer}
                  source={{ uri: speaker.pic}}
                >
                  <TouchableOpacity
                    style={styles.overlay}
                    onPress={() => Linking.openURL(`https://twitter.com/${speaker.twitter}`)}
                  />
                  <Text style={styles.itemName}>{speaker.name}</Text>
                  <Text style={styles.itemCode}>{speaker.job}</Text>
                  <Text style={styles.itemCode}>@{speaker.twitter}</Text>
                </ImageBackground>
                )}
              />
          </View>
        )}

        </ImageBackground>
      </View>
    );
  }
}

export default Speakers;

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%',
  },
  gridView: {
    paddingTop: 15,
    paddingBottom: 150,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 190,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontFamily: 'DINPro-Bold',
    fontSize: 12,
    color: '#fff',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.4
  }
});