import React from 'react';
import styles from './Login.module.css'
import {Button, Form, Input} from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    username?: string;
    password?: string;
};

function Login() {
    return (
        <div>
            <div className={styles.LoginPage}>
                <div className={styles.LoginPageLogo}>

                </div>
                <div className={styles.LoginPageForm}>
                    <div className={styles.TextFieldsForm}>
                        <div className={styles.LoginPageFormMessage}>
                            <label>
                                Sign in to Load Testing App
                            </label>
                        </div>

                        <Form
                            requiredMark={false}
                            name="basic"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 18 }}
                            style={{ maxWidth: 500 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            layout="vertical"
                        >
                            <Form.Item<FieldType>
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!'}]}
                            >
                                <Input placeholder="Username"/>
                            </Form.Item>

                            <Form.Item<FieldType>
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder="Password"/>
                            </Form.Item>

                            <Form.Item style={{paddingTop: "1px"}}>
                                <Button type="primary" htmlType="submit" className={styles.SubmitButton}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;