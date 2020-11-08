import React, { useReducer } from 'react';
import { DeleteOutlined, EnterOutlined, DingtalkOutlined, LineOutlined } from '@ant-design/icons';
import { Button, Row, Col, Statistic, List, Avatar } from 'antd';

const buttons = [
    { value: "1", type: 'writeInputInitiative' },
    { value: "2", type: 'writeInputInitiative' },
    { value: "3", type: 'writeInputInitiative' },
    { value: "4", type: 'writeInputInitiative' },
    { value: "5", type: 'writeInputInitiative' },
    { value: "6", type: 'writeInputInitiative' },
    { value: "7", type: 'writeInputInitiative' },
    { value: "8", type: 'writeInputInitiative' },
    { value: "9", type: 'writeInputInitiative' },
    { Icon: LineOutlined, type: 'negativeInputInitiative' },
    { value: "0", type: 'writeInputInitiative' },
    { Icon: EnterOutlined, type: 'addInitiative' },
];

const initialState = { initiatives: [], inputInitiative: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'addInitiative': {
            const initiatives = [...state.initiatives, state.inputInitiative].sort((a, b) => b - a);
            return { ...state, initiatives, inputInitiative: 0 };
        }
        case 'removeInitiative': {
            const initiatives = state.initiatives.filter(value => value !== action.value);
            return { ...state, initiatives };
        }
        case 'writeInputInitiative': {
            const inputInitiative = parseInt(state.inputInitiative + action.value);
            return { ...state, inputInitiative };
        }
        case 'deleteInputInitiative': {
            return { ...state, inputInitiative: 0 };
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
            <Col span={12} >
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
                <List
                    itemLayout="horizontal"
                    dataSource={state.initiatives}
                    renderItem={item => (
                        <List.Item key={item}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item}</a>}
                            />
                        </List.Item>
                    )}
                />
            </Col>
            <Col span={12} >
                <Row gutter={[16, 16]}>
                    <Col span={8} >
                        <Statistic
                            title="Initiative"
                            value={state.inputInitiative}
                            precision={0}
                            prefix={<DingtalkOutlined />}
                        />
                    </Col>
                    <Col span={8} >
                        <Button
                            size="large"
                            style={{ maxWidth: '150px' }}
                            type="primary" onClick={() => dispatch({ type: 'deleteInputInitiative' })} >
                            <DeleteOutlined />
                        </Button>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    {
                        buttons.map(({ type, value, Icon }) => {
                            return (
                                <Col span={8} key={value}>
                                    <Button
                                        size="large"
                                        style={{ minWidth: '70px', height: '100%' }}
                                        type="primary" onClick={() => dispatch({ type, value })} >
                                        {!!value ? value : <Icon />}
                                    </Button>
                                </Col>
                            );
                        })
                    }

                </Row>
            </Col>
        </Row>
    )
}
