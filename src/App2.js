import { createFromIconfontCN } from "@ant-design/icons";
import { Layout, Affix } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import ChangePassword from "./containers/ChangePassword";
import ForgotPassord from "./containers/ForgotPassord";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import ResetPassword from "./containers/ResetPassword";
import React from 'react';
import Navbar from "./components/navbar";

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js',
  ],
});


const { Header, Content, Footer } = Layout;

function App() {

  const renderHeader = () => {
    return (
      <Affix offsetTop={0}>
        <Header className="app-header">
          <Navbar />
        </Header>
      </Affix >
    );
  };

  return (
    <BrowserRouter>
      <Layout>

        {renderHeader()}

        <Content className="app-content">
          <div className="app-wrapper">
            <Routes>
              <Route
                path="/"
                element={
                  <Auth>
                    <Home />
                  </Auth>
                }
              />
              <Route path="/forgotPassword" element={<ForgotPassord />} />
              <Route path="/resetPassword/:token" element={<ResetPassword />} />
              <Route
                path="/changePassword"
                element={
                  <Auth authRoute={true} redirectTo="/login">
                    <ChangePassword />
                  </Auth>
                }
              />
              <Route
                path="/login"
                element={
                  <Auth redirectTo="/">
                    <Login />
                  </Auth>
                }
              />
              <Route
                path="/register"
                element={
                  <Auth redirectTo="/">
                    <Register />
                  </Auth>
                }
              />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Dev It Media @2022</Footer>

      </Layout>
    </BrowserRouter>
  );
}

export default App;
