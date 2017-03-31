import * as React from 'react';
import {observer} from 'mobx-react';
import {UserStore, UserDetailsViewStore} from './UserStore';
import {diInject} from '../app/DIContext';

interface Props {
    match: {params: Params};
}

interface Params {
    userId: number;
}

@observer
export class UsersDetailsView extends React.Component<Props, any> {

    @diInject() userStore: UserStore;
    viewStore: UserDetailsViewStore;

    constructor(props: Props, context: any) {
        super(props, context);
        this.viewStore = this.userStore.createUserDetailsViewStore(props.match.params.userId);
    }

    render() {
        if (this.viewStore.user) {
            return (<div>
                {this.viewStore.user.firstName}

                <table className="table">
                    <thead>
                    <tr>
                        <th>Transactions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.viewStore.transactions.map(t =>
                        <tr key={t.id}>
                            <td>{t.description}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>);
        } else {
            return null;
        }
    }
}