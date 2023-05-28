import React, { useCallback } from 'react';
import useMovies from './useMovies';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MovieComponent from './Movie';
import Colors from 'open-color';
import Screen from '../components/Screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { version } from '../../../package.json';

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
  headerRightComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alarmButton: {},
  alarmIcon: {
    fontSize: 24,
    color: Colors.white,
  },
  headerLeftComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  versionText: {
    color: Colors.white,
  },
});

const MoviesScreen = () => {
  const { movies, isLoading, loadMore, canLoadMore, refresh } = useMovies();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderRightComponent = useCallback(() => {
    return (
      <View style={styles.headerRightComponent}>
        <TouchableOpacity
          style={styles.alarmButton}
          onPress={() => {
            navigate('Reminders');
          }}>
          <Icon name="notifications" style={styles.alarmIcon} />
        </TouchableOpacity>
      </View>
    );
  }, [navigate]);

  const renderLeftComponent = useCallback(() => {
    return (
      <View style={styles.headerLeftComponent}>
        <Text style={styles.versionText}>{`v${version}`}</Text>
      </View>
    );
  }, []);

  return (
    <Screen
      headerVisible
      renderLeftComponent={renderLeftComponent}
      renderRightComponent={renderRightComponent}>
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
