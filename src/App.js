import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import ListCharacters from './components/ListCharacters/ListCharacters';
import AddCharacter from './components/AddCharacter/AddCharacter';
import Settings from './components/Settings/Settings';
import EditCharacter from './components/EditCharacter/EditCharacter';
import { useStateValue, ContextWrapper } from './state-manager/context';

import './App.css';

const { TabPane } = Tabs;

const App = () => {
    const [{ selected }] = useStateValue();
    const [activeTab, setTab] = useState("2");

    useEffect(() => {
        if(!selected){
            setTab("2");
        }
    }, [selected]);

    return (
        <Row style={{ width: "100%", height: "100%" }}>
            <Col span={activeTab === "2" ? 8 : 14} >
                <ListCharacters wider={activeTab === "1"} />
            </Col>
            <Col span={activeTab === "2" ? 16 : 10} >
                <Tabs style={{padding: 8}}  onChange={setTab} activeKey={activeTab}>
                    <TabPane tab="Add Character" key="2">
                        <AddCharacter />
                    </TabPane>
                    <TabPane disabled={!selected} tab="Edit Character" key="1">
                        <EditCharacter />
                    </TabPane>
                    <TabPane tab={<> <SettingOutlined /> Settings</>} key="3">
                        <Settings />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}

const AppWrapped = () => (
    <ContextWrapper>
        <App />
    </ContextWrapper>
);


export default AppWrapped;