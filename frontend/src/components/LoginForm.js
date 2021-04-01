import React from 'react';
import {Form, Input, Button, Checkbox, Col} from 'antd';
import {
    LoginOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";


class LoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.iconSize = 32;
        this.is_authenticated= this.props.is_authenticated;
        this.logout = this.props.logout;
        this.state = {
        };
    }

    render() {
        if (this.is_authenticated()) {
            return (
                <LogoutOutlined onClick={() => this.logout()} style={{fontSize: this.iconSize, marginLeft: 40}}/>
            )
        } else {
            return (
                <Link to='/login'>
                    <LoginOutlined style={{fontSize: this.iconSize, marginLeft: 40}}/>
                </Link>
            )
        }
    }
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.get_token = this.props.get_token
        this.layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            }
        };
        this.tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            }
        };
        this.state = {
            login: '',
            password: ''
        }
    }

    onFinish(values) {
        // values = {username: "asdf", password: "d", remember: true}
        this.props.get_token(values.username, values.password)
    }

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    render() {
        return (
            <Form
                {...this.layout}
                name="loginForm"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish.bind(this)}
                onFinishFailed={this.onFinishFailed}
                style={{paddingTop: 20}}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...this.tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export {
    LoginForm,
    LoginButton
}
