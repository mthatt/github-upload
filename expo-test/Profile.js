import React, { Component }  from 'react';
import axios from 'axios';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN } from '@env';
const screenWidth = Dimensions.get('window').width;
const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});


export default class Profile extends Component {


    state = {
      path: 'the-road-to-learn-react/the-road-to-learn-react',
      organization: 'default',
      errors: null,
    }

    componentDidMount() {
      this.onFetchFromGitHub();
    }

    onFetchFromGitHub = (path) => {
      const isMounted = true;
        const { navigation } = this.props;
        const { route } = this.props;
        const { login } = route.params;
        console.log({login})
      axiosGitHubGraphQL
        .post('', { query: `
  {
    user(login: "${login}") {
    name
    url
    bio
    avatarUrl
    login
    email
    
    }
  }
` })
        .then((result) => {
          if (isMounted) {
            this.setState(() => ({
              organization: result.data.data.user,
              errors: result.data.errors,
            }));
          }
        }, console.log(this.state));
    }

    _handleChange = (evt) => {
      this.setState({ path: evt.nativeEvent.text });
      console.log(evt.nativeEvent.text);
    }


    render() {
        const { navigation } = this.props;
        const { route } = this.props;
      const { path, organization } = this.state;
        const { login } = route.params;
      // const Stack = createStackNavigator();
      return (

        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>{this.state.organization.name}</Text>
            <Button
                title="Following"
                onPress={() => navigation.push('Following', {login: `${login}`})}
            />
            <Button
                title="Followers"
                onPress={() => navigation.push('Followers', {login: `${login}`})}
            />

            <Button
                title="View Repositories"
                onPress={() => navigation.navigate('Repo', {login: `${login}`})}
            />

          <Image source={{ uri: this.state.organization.avatarUrl }} style={styles.logo} />
          <Text />
          <Text>
            Username:
            {this.state.organization.login}
          </Text>
          <Text>
            Website:
            {this.state.organization.url}
          </Text>
          <Text>
            Bio:
              {this.state.organization.bio}
          </Text>
          <Text>
            Email:
            {this.state.organization.email}
          </Text>

        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    width: screenWidth - 20,
    height: 38,
    padding: 4,
    fontSize: 16,
    borderColor: '#3a3a3a',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#263238',
    borderColor: '#263238',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
});
