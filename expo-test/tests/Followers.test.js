import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';

import Followers from '.././Followers';
import App from "../App";

jest.useFakeTimers();
jest.mock('axios');

describe('<Followers />', () => {
    it('renders correctly', () => {
        const data = {
            "data": {
                "user": {
                    "name": "Mihir Thatte",
                    "url": "https://github.com/mthatt",
                    "bio": "CS student | UIUC '21",
                    "avatarUrl": "https://avatars.githubusercontent.com/u/43013545?v=4",
                    "login": "mthatt",
                    "email": "mvthatte@gmail.com"
                }
            }
        };
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
    });
});

describe('Testing navigation', () => {

    let wrapper = null
    const spyNavigate = jest.fn()
    const props = {
        navigation: {
            navigate: spyNavigate,
            state: {}
        }
    }
    const params = {
        token: 'randomToken'
    }

    beforeEach(() => {
        wrapper = shallow(<CreateProduct {...props} />)
        wrapper.setState({ params: params })
    })

    it('should test navigation', async () => {
        await wrapper.instance()._goBack(params)
        expect(spyNavigate).toHaveBeenCalled()
    })
})
