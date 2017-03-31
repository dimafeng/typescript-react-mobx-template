import {UserViewStore} from '../../src/scripts/user/UserStore';
import * as TypeMoq from "typemoq";
import {UserService} from '../../src/scripts/user/UserService';
import {diContext} from '../../src/scripts/app/DIContext';
import {Observable} from 'rx';
import {User} from '../../src/scripts/user/model';

it('UserViewStore should be filled with data', () => {
    const user: User = {
        id: 1,
        firstName: "test",
        lastName: "test"
    };

    const userServiceMock = TypeMoq.Mock.ofType(UserService);
    userServiceMock.setup(x => x.getUsers()).returns(() => Observable.just([user]));

    diContext.userService = userServiceMock.object;
    const store = new UserViewStore();

    expect(store.users.length).toEqual(1);
    expect(store.users[0].firstName).toEqual("test");
});