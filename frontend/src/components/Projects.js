import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {SERVER} from "../App.js";
import {PageHeader, Button, Descriptions} from "antd";
import {CheckOutlined, ThunderboltOutlined} from '@ant-design/icons';

const ProjectItem = ({project}) => {
    let href = `/project/${project.id}`;
    return (
        <tr>
            <td>{project.id}</td>
            <td>
                <Link to={href}>{project.name}</Link>
            </td>
            <td>{project.createdAt.slice(0, 10)}</td>
            <td>{project.isActive ? <ThunderboltOutlined /> : <CheckOutlined style={{color: "#52c41a"}} />}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <div style={{paddingTop: 48}}>
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


const ProjectUser = ({userId}) => {
    console.log(userId)
    return (
        <li style={{paddingRight: 5}}>{userId}</li>
    )
}

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.project = {};
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
                this.project = project;
            }).catch(error => console.log(error))
    }

    render() {
        let users = this.state.project.users ? this.state.project.users.slice() : [];
        return (
            <div className="site-page-header-ghost-wrapper" style={{paddingTop: 48}}>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title={this.state.project.name}
                    subTitle={this.state.project.id}
                    extra={[
                        <Button key="3">Operation</Button>,
                        <Button key="2">Operation</Button>,
                        <Button key="1" type="primary">
                            Primary
                        </Button>,
                    ]}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="Created">{this.state.project.createdDate}</Descriptions.Item>
                        <Descriptions.Item label="Association">
                            <a>421421</a>
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated">2017-01-10</Descriptions.Item>
                        <Descriptions.Item label="Количество TODO">9</Descriptions.Item>
                        <Descriptions.Item label="Участники проекта">
                            <strong>({users.length})</strong>
                            {users.map(item => <ProjectUser userId={item}/>)}
                        </Descriptions.Item>
                    </Descriptions>
                </PageHeader>
            </div>
        )
    }
}


export {ProjectList, ProjectDetail}