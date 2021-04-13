import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigator, TabNavigator } from 'react-navigation';
import ProfileScreen from './Profile';
import RepoScreen from './Repo';
import FollowingScreen from './Following';
import FollowersScreen from './Followers';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>Welcome</Text>
      <Button
        title="View Mihir's Profile"
        onPress={() => navigation.navigate('Profile', {
            login: "mthatt",
        })}
      />
      <Button
        title="View Mihir's Repositories"
        onPress={() => navigation.navigate('Repo', {login: "mthatt",})}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Repo" component={RepoScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Following" component={FollowingScreen} />
          <Stack.Screen name="Followers" component={FollowersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
