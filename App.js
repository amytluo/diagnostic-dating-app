import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { home, swipe, match } from 'Components';


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