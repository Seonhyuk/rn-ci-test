import React from 'react';
import useMovies from './useMovies';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import MovieComponent from './Movie';
import Colors from 'open-color';
import Screen from '../components/Screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  movieList: {
    padding: 20,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MoviesScreen = () => {
  const { movies, isLoading, loadMore, canLoadMore, refresh } = useMovies();
  return (
    <Screen headerVisible={false}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          style={styles.movieList}
          data={movies}
          renderItem={({ item: movie }) => <MovieComponent movie={movie} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={canLoadMore ? loadMore : null}
          refreshControl={
            <RefreshControl
              onRefresh={refresh}
              refreshing={isLoading}
              tintColor={Colors.white}
            />
          }
        />
      )}
    </Screen>
  );
};

export default MoviesScreen;
