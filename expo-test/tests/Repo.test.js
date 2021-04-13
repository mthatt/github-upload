import React from 'react';

import axios from 'axios';

import Profile from '.././Profile';
import renderer from "react-test-renderer";
import Repo from "../Repo";
import App from "../App";
jest.useFakeTimers();
jest.mock('axios');

describe('<Repo />', () => {
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
