import React from 'react';

import { Button, Row, Col, Statistic } from 'antd';

import { useStateValue } from '../../state-manager/context';
import { WRITE_INPUT_HP } from '../../state-manager/actions';

const buttons = [
    { value: "1", type: WRITE_INPUT_HP },
    { value: "2", type: WRITE_INPUT_HP },
    { value: "3", type: WRITE_INPUT_HP },
    { value: "4", type: WRITE_INPUT_HP },
    { value: "5", type: WRITE_INPUT_HP },
    { value: "6", type: WRITE_INPUT_HP },
    { value: "7", type: WRITE_INPUT_HP },
    { value: "8", type: WRITE_INPUT_HP },
    { value: "9", type: WRITE_INPUT_HP },
    {},
    { value: "0", type: WRITE_INPUT_HP },
];


function Keyboard() {
    const [, dispatch] = useStateValue();
    return (
        <>
            {buttons.map(({ type, value, Icon, danger }) => {
                if (!type) return <Col span={8} key={"vacio"} />;
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
            })}
        </>
    );
}

export default function HitPoints() {
    const [{ inputHitpoints }] = useStateValue();
    return <>
        <Row gutter={[16, 16]} justify="center">
            <Col span={8} >
                <Statistic
                    style={{ margin: 10 }}
                    value={"HP: " + inputHitpoints}
                    precision={0}
                />
            </Col>
        </Row>
        <Row gutter={[8, 8]}>
            <Keyboard />
        </Row>
    </>
}
