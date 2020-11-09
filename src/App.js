import React, { useReducer } from 'react';
import { Row, Col, Button, List, Avatar, Menu } from 'antd';
import { Tabs } from 'antd';
import Initiative from './Initiative';
import HitPoints from './HitPoints';

const { TabPane } = Tabs;

const initialState = { initiatives: [], inputInitiative: 0, inputName: '' };

function reducer(state, action) {
    switch (action.type) {
        case 'addInitiative': {
            const index = state.initiatives.findIndex(initiative => initiative.value <= state.inputInitiative);
            const initiative = { value: state.inputInitiative ?? 0, name: state.inputName, id: Date.now() };
            if (index === -1) {
                const initiatives = [initiative, ...state.initiatives];
                return { ...state, initiatives, inputInitiative: 0, inputName: '' };
            } else {
                const initiatives = state.initiatives.slice(0, index).concat(initiative).concat(state.initiatives.slice(index));
                return { ...state, initiatives, inputInitiative: 0, inputName: '' };
            }
        }
        case 'removeInitiative': {
            const initiatives = state.initiatives.filter(({ value, name }) => value !== action.value && name !== action.name);
            return { ...state, initiatives };
        }
        case 'writeInputInitiative': {
            const inputInitiative = parseInt(state.inputInitiative + action.value);
            return { ...state, inputInitiative };
        }
        case 'writeInputName': {
            const inputName = state.inputName + action.value;
            return { ...state, inputName };
        }
        case 'deleteInputInitiative': {
            return { ...state, inputInitiative: 0, inputName: '' };
        }
        case 'negativeInputInitiative': {
            return { ...state, inputInitiative: -state.inputInitiative };
        }
        case 'next': {
            return { ...state, initiatives: state.initiatives.slice(1).concat(state.initiatives[0]) };
        }
        case 'back': {
            return { ...state, initiatives: state.initiatives.slice(-1).concat(state.initiatives.slice(0, -1)) };
        }
        default:
            throw new Error();
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Row className="App" gutter={[16, 16]}>
            <Col span={8} >
                <Row>
                    <Col span={12}>
                        <Button
                            size="large"
                            style={{ maxWidth: '150px', height: '100%' }}
                            type="primary"
                            disabled={state.initiatives.length < 2}
                            onClick={() => dispatch({ type: "back" })} >
                            Back
                    </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            size="large"
                            style={{ maxWidth: '150px', height: '100%' }}
                            type="primary"
                            disabled={state.initiatives.length < 2}
                            onClick={() => dispatch({ type: "next" })} >
                            Next
                        </Button>
                    </Col>
                </Row>
                <Menu>
                    { state.initiatives.map( ({value, name, id}) => (
                         <Menu.Item 
                            style={{height: '50px'}}
                            key={id} 
                            icon={<Avatar size={50} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{name}</Avatar>}>
                            {value ? value : '0'}
                        </Menu.Item>
                    ))}
                </Menu>
            </Col>
            <Col span={16} >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Initiative" key="1">
                        <Initiative state={state} dispatch={dispatch} />
                    </TabPane>
                    <TabPane tab="Hit Points" key="2">
                        <HitPoints state={state} dispatch={dispatch} />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>


    )
}
