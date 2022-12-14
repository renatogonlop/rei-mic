import { createFromIconfontCN } from "@ant-design/icons";
import { Menu, Affix, Button } from "antd";
import { Link, } from "react-router-dom";
import logo from "../assets/images/logo.png";
import React from 'react';

const IconFont = createFromIconfontCN({
  scriptUrl: [

    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js',
  ],
});

const navbar = () => {
  return (

    <Affix className="topNav">
      <img src={logo} style={{ borderRadius: "100%", }} className="app-logo" />

      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        className="navBarMenu"
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item key="login">
          <Link to="login">Login</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="register">Register</Link>
        </Menu.Item>

      </Menu>


        <Button className="primary shop-car">
          < IconFont type="icon-shoppingcart" />
          <Link to="/">Carrinho</Link>
        </Button>



    </Affix >
  );
};


export default navbar;