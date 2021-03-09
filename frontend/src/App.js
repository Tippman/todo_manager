import logo from './logo.svg';
import './App.css';
import React from 'react';
import AuthorList from "./components/Author";
import axios from "axios";
import Menu from "./components/Menu";
import Footer from "./components/Footer";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'authors': []
        }
    }

    componentDidMount() {
        this.setState({
            'links': [
                {
                    'title': 'link1',
                },
                {
                    'title': 'link2',
                },
                {
                    'title': 'link3',
                }
            ]
        })
        axios.get('http://127.0.0.1:9001/api/authors')
            .then(response => {
                const authors = response.data
                this.setState({
                    'authors': authors
                })
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <AuthorList authors={this.state.authors}/>
            </div>
        )
    }
}

export default App;
