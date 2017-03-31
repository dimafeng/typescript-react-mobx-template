import * as React from 'react';
import {observer} from 'mobx-react';
import {UserViewStore, UserStore} from './UserStore';
import FontAwesome = require('react-fontawesome');
import {diInject} from '../app/DIContext';
import {Link} from 'react-router-dom';
import {linkToUserDetails} from '../route/RouteStore';

interface Props {
}

@observer
export class UsersView extends React.Component<Props, any> {

    @diInject() userStore: UserStore;
    viewStore: UserViewStore;

    constructor(props: Props, context: any) {
        super(props, context);
        this.viewStore = this.userStore.createUserViewStore();
    }

    render() {
        return (<div>
            <table className="table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th/>
                </tr>
                </thead>
                <tbody>
                {this.viewStore.users.map(u =>
                    <tr key={u.id}>
                        <td>{u.firstName}</td>
                        <td>{u.lastName}</td>
                        <td>
                            <Link to={linkToUserDetails(u.id)} className="btn btn-primary">
                                <FontAwesome name="info-circle"/>
                            </Link>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>);
    }
}