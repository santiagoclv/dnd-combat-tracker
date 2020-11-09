import React from 'react';

import { DeleteOutlined, DingtalkOutlined, LineOutlined, EnterOutlined  } from '@ant-design/icons';
import { Button, Row, Col, Statistic } from 'antd';

const buttonLetters = { letters: "q w e r t y u i o p a s d f g h j k l ñ z x c v b n m", type: 'writeInputName'};

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


function Keyboard({dispatch}) {
    return (
        
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
        
    )
}

export default function Initiative({dispatch, state}) {
    return <>
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
                <Keyboard dispatch={dispatch} />
            </Row>
        </>
}
