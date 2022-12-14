import { Button, Col, Form, Input, message, Row, Divider } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useCustomers from "../_actions/customerActions";

function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { customerLogin } = useCustomers();
  const onFinish = (value) => {
    dispatch(customerLogin(value)).then((res) => {
      console.log("REs: ", res);
      if (res.payload.status) {
        const token = res.payload.data.token;
        localStorage.setItem("customerToken", token);
        message.success(res.payload.message);
      } else {
        message.error(res.payload.message);
      }
    });
  };

  return (
    <div className="page-wrapper">
      <Row justify="center">
        <Col xs={20} sm={12} md={12} lg={14} xl={6} xxl={5}>
          <h2 className="top-form">Login</h2>
          <Form
            form={form}
            name="register"
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
            scrollToFirstError
            className="box-form"
          >
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
              <Input />
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
              <Input.Password />
              <Link to="/forgotPassword" className="forgot-password">Forgot Password</Link>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>

            <Form.Item>
              <Divider orientation="center">
                <Link to="/register">
                  Create account
                </Link>
              </Divider>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;