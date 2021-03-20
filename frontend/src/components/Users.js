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
        <table>
            <th>
                login
            </th>
            <th>
                First Name
            </th>
            <th>
                L name
            </th>
            {users.map(user => <UserItem user={user}/>)}
        </table>
    )
}

export default UserList