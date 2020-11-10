import React from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { Button, Row, Col, Statistic } from 'antd';

const buttons = [
    { value: "1", type: 'writeInputHitpoints' },
    { value: "2", type: 'writeInputHitpoints' },
    { value: "3", type: 'writeInputHitpoints' },
    { value: "4", type: 'writeInputHitpoints' },
    { value: "5", type: 'writeInputHitpoints' },
    { value: "6", type: 'writeInputHitpoints' },
    { value: "7", type: 'writeInputHitpoints' },
    { value: "8", type: 'writeInputHitpoints' },
    { value: "9", type: 'writeInputHitpoints' },
    { },
    { value: "0", type: 'writeInputHitpoints' },
    { Icon: DeleteOutlined, type: 'deleteInputHitpoints' },
];


function Keyboard({dispatch}) {
    return (
        
            buttons.map(({ type, value, Icon }) => {
                if(!type) return <Col span={8} key={"vacio"} />;
                return (
                    <Col span={8} key={value ?? type}>
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

export default function HitPoints({dispatch, state}) {
    return <>
            <Row gutter={[16, 16]} justify="center">
                <Col span={8} >
                    <Statistic
                        style={{ margin : 10}}
                        value={state.inputHitpoints}
                        precision={0}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Keyboard dispatch={dispatch} />
            </Row>
        </>
}
