import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import React, { useState } from 'react';
import api from '../services/api';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function refreshPage() {
    window.location.reload(false);
  }

  async function handlePost(name, email, password) {

    const data = {
      user_name: name,
      user_email: email,
      user_password: password
    }
    console.log(data)

    const response = await api.post('/api/users/', data);

    if (response.status === 200) {
      alert("Cadastro Realizado");
      refreshPage()

    } else {
      alert("Erro ao cadastrar o User");
    }
  }


  return (
    <div className="page-wrapper">
      <Row justify="center">
        <Col xs={20} sm={12} md={12} lg={14} xl={6} xxl={5}>
          <h2 className="top-form">Register</h2>
          <Form
            // form={form}
            name="register"
            layout="vertical"
            // onFinish={onFinish}
            scrollToFirstError
            className="box-form"
          >
            <Form.Item
              name="firstName"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                value={password}
                onChange={e => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            {/* <Form.Item name="phoneNo" label="Phone Number">
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item> */}

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("Should accept agreement")),
                },
              ]}
            >
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={() => handlePost(name, email, password)} block>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;