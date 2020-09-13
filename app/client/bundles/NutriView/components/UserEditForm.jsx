import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Typography, Form, Input, Button,
} from 'antd';

const { Title, Paragraph } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const UserEditForm = ({ userEditFormSubmitted, userDeleteButtonClicked }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    userEditFormSubmitted(values);
  };

  const handleUserDeleteClick = () => {
    if (confirm('Are you sure?')) { // eslint-disable-line
      userDeleteButtonClicked();
    }

    return null;
  };

  return (
    <Row justify="center">
      <Col span={8}>
        <Title level={3}>
          My name will go here later
        </Title>
      </Col>
      <Col span={10}>
        <Form
          {...formItemLayout}
          form={form}
          name="user-edit"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail (Username)"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input
              type="email"
              autoFocus
              autoComplete="nothing" // Prevent browser from autofilling
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="New Password"
            hasFeedback
          >
            <Input.Password
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            label="Confirm New Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="current_password"
            label="Current Password"
            rules={[
              {
                required: true,
                message: 'Please input your current password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              autoComplete="nothing" // Prevent browser from autofilling
            />
          </Form.Item>

          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              {
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
              {
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Title level={4}>
              Account Cancellation
            </Title>

            <Paragraph>
              Unhappy?
              <Button
                type="link"
                onClick={handleUserDeleteClick}
              >
                Cancel my account
              </Button>
            </Paragraph>

            <a
              rel="nofollow"
              href="/"
            >
              Back
            </a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

UserEditForm.propTypes = {
  userEditFormSubmitted: PropTypes.func.isRequired,
  userDeleteButtonClicked: PropTypes.func.isRequired,
};

export default UserEditForm;
