import React from 'react';
import {CheckOutlined, ThunderboltOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import axios from "axios";
import {SERVER} from "../App";
import {Button, Descriptions, PageHeader} from "antd";


const TaskItem = ({task}) => {
    let projectHref = `/projects/${task.project}`,
        taskHref = `/todo/${task.id}`;
    return (
        <tr>
            <td>{task.id}</td>
            <td><Link to={taskHref}>{task.title}</Link></td>
            <td><Link to={projectHref}>{task.projectName}</Link></td>
            <td>{task.createdAt.slice(0, 10)}</td>
            <td>{task.updatedAt.slice(0, 10)}</td>
            <td>{task.isActive ? <ThunderboltOutlined/> : <CheckOutlined style={{color: "#52c41a"}}/>}</td>
        </tr>
    )
}

const TaskList = ({tasks}) => {
    return (
        <div>
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

class TaskDetail extends React.Component {
    constructor(props) {
        super(props);
        this.getHeaders = this.props.getHeaders
        this.state = {
            taskId: this.props.taskId,
            task: {}
        };
    }

    componentDidMount() {
        const headers = this.getHeaders()
        axios.get(`${SERVER}/api/todo/${this.state.taskId}/`, {headers})
            .then(response => {
                const task = response.data;
                task['createdDate'] = task.createdAt.slice(0, 10);
                task['updatedDate'] = task.updatedAt.slice(0, 10);
                this.setState({task: task});
            }).catch(error => console.log(error))
    }

    render() {
        const projectHref = `/projects/${this.state.task.project}`
        return (
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={true}
                    onBack={() => window.history.back()}
                    title={this.state.task.title}
                    subTitle={this.state.task.id}
                    extra={[
                        <Button key="3" ghost={true}>Operation</Button>,
                        <Button key="2" ghost={true}>Operation</Button>,
                        <Button key="1" type="primary" ghost={true}>Primary</Button>,
                    ]}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="Created">{this.state.task.createdDate}</Descriptions.Item>
                        <Descriptions.Item label="Статус">
                            {this.state.task.isActive ? <ThunderboltOutlined/> : <CheckOutlined style={{color: "#52c41a"}}/>}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated">{this.state.task.updatedDate}</Descriptions.Item>
                        <Descriptions.Item label="Проект">
                            <Link to={projectHref}>
                                {this.state.task.projectName}
                            </Link>
                        </Descriptions.Item>
                        <Descriptions.Item label="Автор задания">
                            {this.state.task.authorName}
                        </Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            </div>
        )
    }
}

export {TaskList, TaskDetail}