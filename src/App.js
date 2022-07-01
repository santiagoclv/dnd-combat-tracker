import { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css';
import { Row, Col, Tabs } from 'antd';
import { SettingOutlined, RadarChartOutlined } from '@ant-design/icons';

import Dices from './components/Dices/Dices';
import ListCharacters from './components/ListCharacters/ListCharacters';
import AddCharacter from './components/AddCharacter/AddCharacter';
import EditCharacter from './components/EditCharacter/EditCharacter';
import ManageScenes from './components/ManageScenes/ManageScenes';
import ManageCharacters from './components/ManageCharacters/ManageCharacters';
import { 
    useStateValueInitiatives as useStateInitValue,
    ContextWrapper
} from './state-manager/context';

import './App.css';

const { TabPane } = Tabs;

const App = () => {
    const [{ selected }] = useStateInitValue();
    const [activeTab, setTab] = useState("2");

    useEffect(() => {
        if(!selected){
            setTab("2");
        }
    }, [selected]);

    return (
        <Row style={{ width: "100%", height: "100%" }}>
            <Col span={14} >
                <ListCharacters />
            </Col>
            <Col
                span={10} 
                style={{ 
                    height: '100vh',
                    overflowX: 'hidden',
                }}
            >
                <Tabs style={{ padding: 8 }}  onChange={setTab} activeKey={activeTab}>
                    <TabPane tab="Add Creature" key="2">
                        <AddCharacter />
                    </TabPane>
                    <TabPane disabled={!selected} tab="Edit Creature" key="1">
                        <EditCharacter />
                    </TabPane>
                    <TabPane tab={<><SettingOutlined /> Scenes</>} key="3">
                        <ManageScenes />
                    </TabPane>
                    <TabPane tab={<><SettingOutlined /> Creatures</>} key="4">
                        <ManageCharacters />
                    </TabPane>
                    <TabPane tab={<><RadarChartOutlined /> Dices</>} key="5">
                        <Dices />
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