import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Typography, Form, Input, Button, Checkbox,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoginForm = ({ loginFormSubmitted }) => {
  const onFinish = (values) => {
    loginFormSubmitted(values);
  };

  return (
    <Row justify="center">
      <Col span={8}>
        <Title level={1}>
          NutriView
        </Title>
      </Col>
      <Col span={8}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              autoFocus
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember_me" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            &nbsp; or &nbsp;
            <a href="/users/sign_up">Sign up!</a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

LoginForm.propTypes = {
  loginFormSubmitted: PropTypes.func.isRequired,
};

export default LoginForm;
