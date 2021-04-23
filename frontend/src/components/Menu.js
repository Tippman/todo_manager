import React from 'react'
import {Menu, Button} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom';


class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            navBarItems: [
                {name: 'profile', title: 'Профиль', href: '/profile', icon: <i className="far fa-user-circle"></i>},
                {name: 'users', title: 'Пользователи', href: '/users', icon: <i className="fas fa-users"></i>},
                {name: 'projects',title: 'Проекты',href: '/projects',icon: <i className="fas fa-project-diagram"></i>},
                {name: 'tasks', title: 'Задания', href: '/todo', icon: <i className="fas fa-tasks"></i>}
            ],
        };
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <nav>
                <Button type="primary" onClick={this.toggleCollapsed} style={{marginBottom: 16}}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                    // defaultSelectedKeys={['users']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    {this.state.navBarItems.map(item => {
                        return (
                            <Menu.Item key={item.name} icon={item.icon}>
                                <Link to={item.href}>{item.title}</Link>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </nav>
        );
    }
}

export default MainMenu