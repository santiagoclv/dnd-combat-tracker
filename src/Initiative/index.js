import React from 'react';

import { DeleteOutlined, LineOutlined  } from '@ant-design/icons';
import { Button, Row, Col, Statistic } from 'antd';

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
    { Icon: DeleteOutlined, type: 'deleteInputInitiative', danger: true },
];


function Keyboard({dispatch}) {
    return (
        
            buttons.map(({ type, value, Icon, danger }) => {
                return (
                    <Col span={8} key={value}>
                        <Button
                            danger={danger}
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
            <Row gutter={[16, 16]} justify="center">
                <Col span={8} >
                    <Statistic
                        style={{ margin : 10}}
                        value={state.inputInitiative}
                        precision={0}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Keyboard dispatch={dispatch} />
            </Row>
        </>
}
