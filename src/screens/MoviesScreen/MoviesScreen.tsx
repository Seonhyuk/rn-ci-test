import React from 'react';
import useMovies from './useMovies';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import MovieComponent from './Movie';
import Colors from 'open-color';

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
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
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
    </SafeAreaView>
  );
};

export default MoviesScreen;
