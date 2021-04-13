import React, { Component } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity, Button,
} from 'react-native';

import { REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN } from '@env';

const screenWidth = Dimensions.get('window').width;
const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
});

const GET_REPOS = `
  {
    user(login: "mthatt") {
    name
    login
    repositories(last: 10) {
      nodes {
        name
        description
        owner {
           login
        }
        description
      }
    }
   }
  }
`;

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
      axiosGitHubGraphQL
        .post('', { query: `
  {
    user(login: "${login}") {
    name
    login
    repositories(last: 10) {
      nodes {
        name
        description
        owner {
           login
        }
        description
      }
    }
   }
  }
` })
        .then((result) => {
          if (isMounted) {
            this.setState(() => ({
              organization: result.data.data.user.repositories,
              errors: result.data.errors,
            }));
          }
        }, console.log(this.state.organization['nodes']));
    }

    _handleChange = (evt) => {
      this.setState({ path: evt.nativeEvent.text });
      console.log(evt.nativeEvent.text);
    }

    _handleSubmit = (event) => {
      this.onFetchFromGitHub(this.state.path);

      event.preventDefault();
    }

    render() {
      const { path, organization } = this.state;
        const { navigation } = this.props;
      // const Stack = createStackNavigator();
      return (

        <View style={styles.container}>
          <TouchableOpacity
            style={{ backgroundColor: 'blue' }}
            onPress={this._handleSubmit}
          >
          </TouchableOpacity>
          <Text style={{fontSize: 20}}>
            Repos:
          </Text>
            <Text/>

            <FlatList
                data={this.state.organization['nodes']}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View styles ={styles.container}>
                        <Text>Repository name: {item.name}</Text>
                        <Text>Description: {item.description}</Text>
                        <Text>Owner:</Text>
                        <Button
                            title={item.owner.login}
                            onPress={() => navigation.push('Profile', {
                                login: `${item.owner.login}`,
                            })}
                        />
                    </View>

                )}
            />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#cef',
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
