import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './src/routes';
import { ThemeProvider } from './src/contexts/ThemeContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
