import logo from './logo.svg';
import './App.css';
import React from 'react';
import UserList from "./components/Users";
import axios from "axios";
import Menu from "./components/Menu";
import Footer from "./components/Footer";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:9001/api/users/')
            .then(response => {
                const users = response.data.results;
                this.setState({
                    'users': users
                })
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users}/>
            </div>
        )
    }
}

export default App;
