import React from 'react';
import {Layout} from 'antd'
const {Header} = Layout
const headerPresenter = () => {
    return (
        <div>
        <Header className="site-layout-background" style={{ padding: 0 , backgroundColor : "#E6E6E6" }}   />
        </div>
    );
};

export default headerPresenter;