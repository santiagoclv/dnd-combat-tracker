import React, { useReducer, useState } from 'react';
import { Row, Col, Button, Avatar, Menu, Tabs, Steps } from 'antd';

import Initiative from './Initiative';
import HitPoints from './HitPoints';
import HitPointsEditor from './HitPointsEditor';
import Name from './Name';

const { TabPane } = Tabs;
const { Step } = Steps;

const steps = [
    {
        title: 'Initiative',
    },
    {
        title: 'Name',
    },
    {
        title: 'Hit Points',
    },
];


const initialState = { initiatives: [], initiatives_position: 0, selected: null, inputInitiative: 0, inputName: '', inputHitpoints: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'addInitiative': {
            const index = state.initiatives.findIndex(initiative => initiative.value <= state.inputInitiative);
            const initiative = {
                value: state.inputInitiative ?? 0,
                name: state.inputName,
                hitpoints: state.inputHitpoints,
                id: Date.now(),
                monster: action.monster
            };
            if (index === -1) {
                const initiatives = [initiative, ...state.initiatives].sort((a, b) => a.value - b.value);
                return { ...state, initiatives, inputInitiative: 0, inputName: '', inputHitpoints: 0 };
            } else {
                const initiatives = state.initiatives
                    .slice(0, index)
                    .concat(initiative)
                    .concat(state.initiatives.slice(index))
                    .sort((a, b) => a.value - b.value);
                return { ...state, initiatives, inputInitiative: 0, inputName: '', inputHitpoints: 0 };
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
        case 'writeInputHitpoints': {
            const inputHitpoints = parseInt(state.inputHitpoints + action.value);
            return { ...state, inputHitpoints };
        }
        case 'deleteInputInitiative': {
            return { ...state, inputInitiative: 0 };
        }
        case 'deleteInputHitpoints': {
            return { ...state, inputHitpoints: 0 };
        }
        case 'deleteInputName': {
            return { ...state, inputName: '' };
        }
        case 'negativeInputInitiative': {
            return { ...state, inputInitiative: -state.inputInitiative };
        }
        case 'next': {
            return { ...state, initiatives_position: (state.initiatives_position + 1) % state.initiatives.length };
        }
        case 'back': {
            return {
                ...state,
                initiatives_position:
                    state.initiatives_position === 0
                        ? state.initiatives.length - 1
                        : state.initiatives_position - 1
            };
        }
        case 'select': {
            return { ...state, selected: action.value };
        }
        case 'editHitpoints': {
            const initiatives = state.initiatives.map( ini => {
                const copy_ini = {...ini};
                if(ini.id === state.selected){
                    copy_ini.hitpoints = copy_ini.hitpoints + action.value;
                }
                return copy_ini;
            })
            return { ...state, initiatives };
        }
        case 'clean': {
            return { ...state, inputInitiative: 0, inputName: '', inputHitpoints: 0, selected: null  };
        }
        default:
            throw new Error();
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [current, setCurrent] = useState(0);

    return (
        <Row className="App" gutter={[16, 16]}>
            <Col span={8} >
                <Row style={{ height: '40px' }} >
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
                    <Col span={12} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
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
                <Menu style={{ maxHeight: 'calc(100vh - 40px)', overflow: 'scroll', overflowX: 'hidden' }} >
                    {state.initiatives
                        .slice(state.initiatives_position)
                        .concat(
                            state.initiatives
                                .slice(0, state.initiatives_position)
                        )
                        .map(({ value, name, id, hitpoints, monster }) => (
                            <Menu.Item
                                style={{ height: '50px' }}
                                key={id}
                                onClick={() => dispatch({ type: "select", value: id })}
                                icon={<Avatar size={50} style={{ fontSize: 25, fontWeight: 700, color: 'blue' }}>{value}</Avatar>}>
                                { monster && <Avatar
                                    size={50}
                                    style={{
                                        textAlign: 'end',
                                        fontSize: 25,
                                        fontWeight: 500,
                                        marginLeft: 20,
                                        color: 'white',
                                        backgroundColor: hitpoints > 0 ? 'green' : 'red'
                                    }}>
                                    {hitpoints}
                                </Avatar>}
                                <span className="initiative">{name}</span>
                            </Menu.Item>
                        ))}
                </Menu>
            </Col>
            <Col span={16} >
                <Tabs defaultActiveKey="2">
                    <TabPane tab="Add NPC/PC" key="2">
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        {
                            current === 0 && <Initiative state={state} dispatch={dispatch} />
                        }
                        {
                            current === 1 && <Name state={state} dispatch={dispatch} />
                        }
                        {
                            current === 2 && <HitPoints state={state} dispatch={dispatch} />
                        }
                        <div className="steps-action">

                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => setCurrent(current - 1)}>
                                    Previous
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => setCurrent(current + 1)}>
                                    Next
                                </Button>
                            )}

                            {current === steps.length - 1 && (
                                <Button type="primary" danger onClick={() => {setCurrent(0); dispatch({ type: 'addInitiative', monster: true })}}>
                                    Done Monster
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={() => {setCurrent(0); dispatch({ type: 'addInitiative', monster: false })}}>
                                    Done Player
                                </Button>
                            )}
                        </div>
                    </TabPane>
                    <TabPane disabled={!state.selected} tab="Hit Points" key="1">
                        <HitPointsEditor state={state} dispatch={dispatch} />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>


    )
}
