import React, { Component } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity, Image, Button,
} from 'react-native';

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
        userinfo: 'default',
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
    login
    following(last: 10) {
      nodes {
        login
        name
        avatarUrl
      }
    }
    }
  }
` })
            .then((result) => {
                if (isMounted) {
                    this.setState(() => ({
                        userinfo: result.data.data.user,
                        organization: result.data.data.user.following,
                        errors: result.data.errors,
                    }));
                }
            }, console.log(this.state.organization['nodes']));
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
                <Text>
                    {this.state.userinfo.name} is following these users:
                    {/*  /!*{this.state.organization.['nodes'[0].['name']]}*!/*/}
                </Text>
                <Text/>

                <FlatList
                    data={this.state.organization['nodes']}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.container}>
                            <Image source={{ uri: item.avatarUrl }} style={styles.logo} />
                            <Text> Name: {item.name}</Text>
                            <Button
                                title={item.login}
                                onPress={() => navigation.push('Profile', {
                                    login: `${item.login}`,
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
