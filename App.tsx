import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CodePush from 'react-native-code-push';
import { RootStackParamList } from './src/types';
import MoviesScreen from './src/screens/MoviesScreen/MoviesScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MovieScreen from './src/screens/MovieScreen/MovieScreen';
import RemindersScreen from './src/screens/RemindersScreen/RemindersScreen';
import LoadingScreen from './src/screens/LoadingScreen/LoadingScreen';
import useCodePush from './src/hooks/useCodePush';

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

const App = () => {
  const { updating, progress } = useCodePush();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {updating ? (
            <Stack.Screen name="Loading">
              {props => (
                <LoadingScreen
                  {...props}
                  progress={
                    progress != null
                      ? {
                          total: progress.totalBytes,
                          now: progress.receivedBytes,
                        }
                      : undefined
                  }
                />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Movies" component={MoviesScreen} />
              <Stack.Screen name="Movie" component={MovieScreen} />
              <Stack.Screen name="Reminders" component={RemindersScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};

export default CodePush(codePushOptions)(App);
