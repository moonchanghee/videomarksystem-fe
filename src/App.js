import React from 'react';
import { Route, BrowserRouter, Switch} from "react-router-dom";
import Axios from 'axios'
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import {Sider , Header} from './components'
import {VideoDetail,VideoUpload} from './page'


const App = () => {
  const click =() => {
    // Axios.get(`${backend_url}`).then(e => {console.log(e)})
    Axios.get(`http://localhost:3002`).then(e => {console.log(e)})
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <BrowserRouter>
    <Sider/>
    <Layout>
      <Header/>
      <Switch>
      <Route
      exact
      path="/"
      component={VideoDetail}
    ></Route>
    </Switch>
    <Switch>
    <Route
    exact
    path="/upload"
    component={VideoUpload}
  ></Route>
  </Switch>
    </Layout>
    </BrowserRouter>
  </Layout>
  );
};

export default App;