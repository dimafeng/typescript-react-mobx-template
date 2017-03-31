import * as React from 'react';
import {create} from 'react-test-renderer';
import {diContext} from '../../src/scripts/app/DIContext';
import {UsersView} from '../../src/scripts/user/UsersView';
import * as TypeMoq from 'typemoq';
import {UserStore, UserViewStore} from '../../src/scripts/user/UserStore';
import {User} from '../../src/scripts/user/model';
import {BrowserRouter as Router} from 'react-router-dom';

it('UsersView should render proper DOM', () => {
    const user1: User = {
        id: 1,
        firstName: "test",
        lastName: "test"
    };
    const user2: User = {
        id: 2,
        firstName: "test2",
        lastName: "test2"
    };

    const userStoreMock = TypeMoq.Mock.ofType<UserStore>();
    const userViewStoreMock = TypeMoq.Mock.ofType<UserViewStore>();
    userStoreMock.setup(x => x.createUserViewStore()).returns(() => userViewStoreMock.object);
    userViewStoreMock.setup(x => x.users).returns(() => [user1, user2]);

    diContext.userStore = userStoreMock.object;

    expect(create(<Router><UsersView/></Router>).toJSON()).toMatchSnapshot();
});