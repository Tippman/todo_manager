import React from 'react';


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div style={{paddingTop: 48}}>
            <table>
                <thead>
                    <tr>
                        <th>Логин</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <UserItem user={user}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default UserList