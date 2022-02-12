import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Switch, Typography } from 'antd';
import { SettingOutlined, RadarChartOutlined, KeyOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import Dices from './components/Dices/Dices';
import ListCharacters from './components/ListCharacters/ListCharacters';
import AddCharacter from './components/AddCharacter/AddCharacter';
import EditCharacter from './components/EditCharacter/EditCharacter';
import ManageScenes from './components/ManageScenes/ManageScenes';
import ManageCharacters from './components/ManageCharacters/ManageCharacters';
import { 
    useStateValueInitiatives as useStateInitValue,
    useStateValueKeyboard as useStateKBValue,
    ContextWrapper
} from './state-manager/context';

import './App.css';

const { Text } = Typography;
const { TabPane } = Tabs;

const App = () => {    
    const { isKeyboardMode, setKeyboardMode } = useStateKBValue();
    const [{ selected }] = useStateInitValue();
    const [activeTab, setTab] = useState("2");

    useEffect(() => {
        if(!selected){
            setTab("2");
        }
    }, [selected]);

    const shrinkList = activeTab !== "1";

    return (
        <Row style={{ width: "100%", height: "100%" }}>
            <Col span={shrinkList ? 8 : 14} >
                <ListCharacters wider={!shrinkList} />
            </Col>
            <Col
                span={shrinkList ? 16 : 10} 
                style={{ 
                    height: '100vh',
                    overflowX: 'hidden',
                }}
            >
                <Tabs style={{ padding: 8 }}  onChange={setTab} activeKey={activeTab}>
                    <TabPane tab="Add Character" key="2">
                        <AddCharacter />
                    </TabPane>
                    <TabPane disabled={!selected} tab="Edit Character" key="1">
                        <EditCharacter />
                    </TabPane>
                    <TabPane tab={<><SettingOutlined /> Scenes</>} key="3">
                        <ManageScenes />
                    </TabPane>
                    <TabPane tab={<><SettingOutlined /> Characters</>} key="4">
                        <ManageCharacters />
                    </TabPane>
                    <TabPane tab={<><RadarChartOutlined /> Dices</>} key="5">
                        <Dices />
                    </TabPane>
                    <TabPane tab={<><KeyOutlined />Keyboard</>} key="6">
                        <Text>Screen Keyboard:  </Text> 
                        <Switch
                            checkedChildren="ON"
                            checked={isKeyboardMode}
                            onChange={(checked) => setKeyboardMode(checked)}
                            title="KB Mode"
                        />
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