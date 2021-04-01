import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {SERVER} from "../App.js";
import {PageHeader, Button, Descriptions} from "antd";
import {CheckOutlined, ThunderboltOutlined} from '@ant-design/icons';

const ProjectItem = ({project}) => {
    let href = `/projects/${project.id}`;
    return (
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={href}>{project.name}</Link>
            </td>
            <td>{project.createdAt.slice(0, 10)}</td>
            <td>{project.isActive ? <ThunderboltOutlined/> : <CheckOutlined style={{color: "#52c41a"}}/>}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название проекта</th>
                    <th>Дата создания проекта</th>
                    <th>Статус проекта</th>
                </tr>
                </thead>
                <tbody>
                {projects.map(project => <ProjectItem project={project}/>)}
                </tbody>
            </table>
        </div>
    )
}


const ProjectUser = ({user}) => {
    return (
        <li style={{paddingRight: 5}}>{user}</li>
    )
}

const ProjectTask = ({task}) => {
    const taskHref = `/todo/${task.id}`;
    return (
        <Link to={taskHref}>
            <li>{task.title}</li>
        </Link>
    )
}


class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectId: this.props.projectId,
            project: {}
        };
    }

    componentDidMount() {
        axios.get(`${SERVER}/api/projects/${this.state.projectId}/`)
            .then(response => {
                const project = response.data;
                project['createdDate'] = project.createdAt.slice(0, 10);
                this.setState({project: project});
            }).catch(error => console.log(error))
    }

    render() {
        let users = this.state.project.usernames ? this.state.project.usernames.slice() : [];
        let tasks = this.state.project.tasks ? this.state.project.tasks.slice() : [];
        return (
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={true}
                    onBack={() => window.history.back()}
                    title={this.state.project.name}
                    subTitle={this.state.project.id}
                    extra={[
                        <Button key="3" ghost={true}>Operation</Button>,
                        <Button key="2" ghost={true}>Operation</Button>,
                        <Button key="1" ghost={true} type="primary">
                            Primary
                        </Button>,
                    ]}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="Created">{this.state.project.createdDate}</Descriptions.Item>
                        <Descriptions.Item label="Статус">
                            {this.state.project.isActive ? <ThunderboltOutlined>В работе</ThunderboltOutlined> : <CheckOutlined style={{color: "#52c41a"}}>Завершен</CheckOutlined>}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated">2017-01-10</Descriptions.Item>
                        <Descriptions.Item span='5' label="TODO проекта">
                            <strong>({tasks.length})</strong>
                            <ul>
                                {tasks.map(task => <ProjectTask task={task}/>)}
                            </ul>
                        </Descriptions.Item>
                        <Descriptions.Item label="Участники проекта">
                            <strong>({users.length})</strong>
                            <ul>
                                {users.map(user => <ProjectUser user={user}/>)}
                            </ul>
                        </Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            </div>
        )
    }
}


export {ProjectList, ProjectDetail}