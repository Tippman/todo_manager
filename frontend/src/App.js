import logo from './logo.svg';
import 'antd/dist/antd.dark.css'
import './App.css';
import React from 'react';
import axios from "axios";
import MainMenu from "./components/Menu.js";
import {SearchInput} from "./components/Search.js";
import {LoginForm, LoginButton} from "./components/LoginForm.js";
import Profile from "./components/Profile.js";
import UserList from "./components/Users";
import {ProjectList, ProjectDetail} from "./components/Projects.js";
import {TaskList, TaskDetail} from "./components/Tasks.js";
import {Footer} from "./components/Footer.js";
import {NotFound404} from "./components/NotFound404.js";
import {Forbidden403} from "./components/Forbidden403.js";
import {Input, Row, Col, Space, Layout} from 'antd';
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Cookies from 'universal-cookie';

export const SERVER = 'http://127.0.0.1:9001';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            tasks: [],
            access_token: '',
            refresh_token: '',
        }
    }

    set_tokens(tokens) {
        const cookies = new Cookies();
        cookies.set('access_token', tokens.access);
        cookies.set('refresh_token', tokens.refresh);
        this.setState({
            access_token: tokens.access,
            refresh_token: tokens.refresh
        }, () => this.load_data());
        console.log('set cookie', tokens)
    }

    is_authenticated() {
        return this.state.access_token != '';
    }

    logout() {
        console.log('logout')
        this.set_tokens({access: '', refresh: ''})
    }

    get_token_from_storage() {
        const cookies = new Cookies();
        const access_token = cookies.get('access_token');
        const refresh_token = cookies.get('refresh_token');
        this.setState({
            access_token: access_token,
            refresh_token: refresh_token
        }, () => this.load_data());
    }

    get_token(username, password) {
        axios.post(`${SERVER}/api/token/`, {username: username, password: password})
            .then(response => {
                this.set_tokens(response.data)
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Bearer ' + this.state.access_token
        }
        return headers
    }


    load_data() {
        const headers = this.get_headers()
        console.log('headers:', headers)
        axios.get(`${SERVER}/api/users/`, {headers})
            .then(response => {
                const users = response.data.results;
                this.setState({users: users})
            }).catch(error => console.log(error))

        axios.get(`${SERVER}/api/projects/`, {headers})
            .then(response => {
                const projects = response.data.results;
                this.setState({projects: projects})
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            })

        axios.get(`${SERVER}/api/todo/`, {headers})
            .then(response => {
                const tasks = response.data.results;
                this.setState({tasks: tasks})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage();
        // this.load_data();
    }

    render() {
        const x = 4;
        return (
            <BrowserRouter>
                <Row justify="start" style={{paddingTop: 10, paddingRight: 20}}>
                    <Col span="auto">
                        <MainMenu/>
                    </Col>
                    <Col span={19} offset={1}>
                        <Row>
                            <SearchInput/>
                            <LoginButton
                                is_authenticated={() => this.is_authenticated()}
                                logout={() => this.logout()}
                            />
                        </Row>
                        <Row>
                            <Switch>
                                <Route exact path="/login" component={() => <LoginForm
                                    get_token={(username, password) => this.get_token(username, password)}/>}/>
                                {/*<Route exact path='/profile' component={() => <Profile user={}/>}/>*/}
                                <Route exact path='/users' component={() => <UserList users={this.state.users}/>}/>
                                <Route exact path='/projects'
                                       component={() => <ProjectList projects={this.state.projects}/>}/>
                                <Route exact path='/todo' component={() => <TaskList tasks={this.state.tasks}/>}/>
                                <Route exact path="/projects/:id" component={(item) =>
                                    <ProjectDetail projectId={item.match.params.id}/>
                                }/>
                                <Route exact path="/todo/:id" component={(item) =>
                                    <TaskDetail taskId={item.match.params.id}/>
                                }/>
                                <Route component={NotFound404}/>
                            </Switch>
                        </Row>
                    </Col>
                </Row>
            </BrowserRouter>
        )
    }
}

export default App;
