import logo from './logo.svg';
import 'antd/dist/antd.css'
import './App.css';
import React from 'react';
import UserList from "./components/Users";
import {ProjectList, ProjectDetail} from "./components/Projects.js";
import TaskList from "./components/Tasks.js";
import Profile from "./components/Profile.js";
import axios from "axios";
import MainMenu from "./components/Menu.js";
import {Footer} from "./components/Footer.js";
import {Row, Col, Space, Layout} from 'antd';
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route} from "react-router-dom";

export const SERVER = 'http://127.0.0.1:9001';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            tasks: [],
            task: {}
        }
    }

    componentDidMount() {
        axios.get(`${SERVER}/api/users/`)
            .then(response => {
                const users = response.data.results;
                this.setState({users: users})
            }).catch(error => console.log(error))

        axios.get(`${SERVER}/api/projects/`)
            .then(response => {
                const projects = response.data.results;
                this.setState({projects: projects})
            }).catch(error => console.log(error))

        axios.get(`${SERVER}/api/todo/`)
            .then(response => {
                const tasks = response.data.results;
                this.setState({tasks: tasks})
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <BrowserRouter>
                <Row justify="start" style={{paddingTop: 10, paddingRight: 20}}>
                    <Col span={4}>
                        <MainMenu/>
                    </Col>
                    <Col span={19} offset={1}>
                        <Switch>
                            {/*<Route exact path='/profile' component={() => <Profile user={}/>}/>*/}
                            <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                            <Route exact path='/projects'
                                   component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route exact path='/todo' component={() => <TaskList tasks={this.state.tasks}/>}/>
                            <Route exact path="/project/:id" component={(item) =>
                                <ProjectDetail projectId={item.match.params.id}/>}
                            />
                        </Switch>
                    </Col>
                </Row>
            </BrowserRouter>
        )
    }
}

export default App;
