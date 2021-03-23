import React from 'react';
import { Layout,Menu } from 'antd';
const {Sider} = Layout;

const siderPresenter = () => {
    return (
        <div>
            <Sider style={{
                overflow: 'auto',
                height: '100vh',
                // position: 'fixed',
                left: 0,
              }}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              nav 1
            </Menu.Item>
            <Menu.Item key="2">
              nav 2
            </Menu.Item>
            <Menu.Item key="3">
              nav 3
            </Menu.Item>
    
          </Menu></Sider>
        </div>
    );
};

export default siderPresenter;