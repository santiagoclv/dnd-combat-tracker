import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import CharactersList from './components/CharactersList';
import AddCharacter from './components/AddCharacter';
import Settings from './components/Settings';
import HitPointsConditionsManager from './components/HitPointsConditionsManager';
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
                <CharactersList wider={activeTab === "1"} />
            </Col>
            <Col span={activeTab === "2" ? 16 : 10} >
                <Tabs style={{padding: 8}}  onChange={setTab} activeKey={activeTab}>
                    <TabPane tab="Add Character" key="2">
                        <AddCharacter />
                    </TabPane>
                    <TabPane disabled={!selected} tab="Character Manager" key="1">
                        <HitPointsConditionsManager />
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