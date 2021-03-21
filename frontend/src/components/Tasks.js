import React from 'react';
import {CheckOutlined, ThunderboltOutlined} from '@ant-design/icons';


const TaskItem = ({task}) => {
    return (
        <tr>
            <td>
                {task.id}
            </td>
            <td>
                {task.title}
            </td>
            <td>
                {/*todo сделать вывод названия проета (сейчас выводится ID)*/}
                {task.project}
            </td>
            <td>
                {task.createdAt.slice(0,10)}
            </td>
            <td>
                {task.updatedAt.slice(0,10)}
            </td>
            <td>
                {task.isActive  ? <ThunderboltOutlined /> : <CheckOutlined style={{color: "#52c41a"}} />}
            </td>
        </tr>
    )
}

const TaskList = ({tasks}) => {
    return (
        <div style={{paddingTop: 48}}>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название задания</th>
                    <th>Название проекта</th>
                    <th>Дата создания задания</th>
                    <th>Дата обновления задания</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => <TaskItem task={task}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default TaskList