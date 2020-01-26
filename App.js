import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import home from './components/home';
import swipe from './components/swipe.js';
import match from './components/match.js';


const MainNavigator = createStackNavigator(
  {
    Home: { screen: home },
    Swipe: { screen: swipe },
    Match: { screen: match }
  },
  {
    initialRouteName: 'Home',
  }
);

const App = createAppContainer(MainNavigator);

export default App;