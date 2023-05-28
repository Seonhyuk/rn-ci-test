import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    height: 48,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  backIcon: {
    fontSize: 20,
    color: Colors.white,
    marginLeft: 20,
  },
  subscription: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: 10,
  },
  subscriptionText: {
    color: Colors.black,
  },
});

interface ScreenProp {
  children?: React.ReactNode;
  title?: string;
  headerVisible?: boolean;
  renderLeftComponent?: () => JSX.Element;
  renderRightComponent?: () => JSX.Element;
}

const Screen = ({
  children,
  title,
  headerVisible = true,
  renderLeftComponent,
  renderRightComponent,
}: ScreenProp) => {
  const colorScheme = useColorScheme();
  const { goBack, canGoBack } = useNavigation();

  const onPressBackButton = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={
          Platform.OS === 'ios'
            ? 'light-content'
            : colorScheme === 'dark'
            ? 'light-content'
            : 'dark-content'
        }
      />
      {headerVisible && (
        <View style={styles.header}>
          <View style={styles.left}>
            {canGoBack() && (
              <TouchableOpacity onPress={onPressBackButton}>
                <Icon style={styles.backIcon} name="arrow-back" />
              </TouchableOpacity>
            )}
            {renderLeftComponent != null && renderLeftComponent()}
          </View>
          <View style={styles.center}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <View style={styles.right}>
            {renderRightComponent != null && renderRightComponent()}
          </View>
        </View>
      )}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
