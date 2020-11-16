import React from 'react';

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
];


function Keyboard({dispatch}) {
    return (
        
            buttons.map(({ type, value, Icon, danger }) => {
                if(!type) return <Col span={8} key={"vacio"} />;
                return (
                    <Col span={8} key={value ?? type}>
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

export default function HitPoints({dispatch, state}) {
    return <>
            <Row gutter={[16, 16]} justify="center">
                <Col span={8} >
                    <Statistic
                        style={{ margin : 10}}
                        value={"HP: " + state.inputHitpoints}
                        precision={0}
                    />
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                <Keyboard dispatch={dispatch} />
            </Row>
        </>
}
