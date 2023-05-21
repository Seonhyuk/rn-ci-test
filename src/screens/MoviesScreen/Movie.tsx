import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../../types';
import Colors from 'open-color';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    borderColor: Colors.gray[6],
  },
  poster: {
    width: 100,
    height: 150,
    backgroundColor: Colors.gray[3],
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  posterImage: {
    width: 100,
    height: 150,
  },
  titleText: {
    fontSze: 18,
    color: Colors.white,
    fontWeight: 'bold',
  },
  originalTitleText: {
    marginTop: 2,
    fontSize: 14,
    color: Colors.white,
  },
  releaseDateText: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.white,
  },
  overviewText: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.white,
  },
});

interface MovieProps {
  movie: Movie;
}

const MovieComponent = ({ movie }: MovieProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.poster}>
        {movie.posterUrl != null && (
          <Image source={{ uri: movie.posterUrl }} style={styles.posterImage} />
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.titleText}>{movie.title}</Text>
        <Text style={styles.originalTitleText}>{movie.originalTitle}</Text>
        <Text style={styles.overviewText}>{movie.overview}</Text>
      </View>
    </View>
  );
};

export default MovieComponent;
