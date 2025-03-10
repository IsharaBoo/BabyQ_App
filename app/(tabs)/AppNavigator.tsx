import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CommunityPage from './index'; // Your CommunityPage component
import NewPost from './NewPost'; // Your NewPost component

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CommunityPage">
        <Stack.Screen name="CommunityPage" component={CommunityPage} />
        <Stack.Screen name="NewPost" component={NewPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
