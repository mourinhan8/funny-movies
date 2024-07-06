import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../../utils/axios';

const RegisterPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: { email: string, password: string, confirm: string }) => {
        setLoading(true);
        try {
            await axios.post('/user/register', values);
            message.success('Registration successful, you can login now!');
            navigate('/login');
        } catch (error) {
            message.error('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-center text-2xl font-bold mb-6">Register for Funny Movies</h2>
                <Form
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Email" 
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        hasFeedback
                    >
                        <Input.Password 
                            prefix={<LockOutlined className="site-form-item-icon" />} 
                            placeholder="Password" 
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined className="site-form-item-icon" />} 
                            placeholder="Confirm Password" 
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="w-full" 
                            loading={loading}
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default RegisterPage;
