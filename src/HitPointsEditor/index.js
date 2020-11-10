import React, { useState } from 'react';

import { Button, Row, Col, Statistic, Checkbox } from 'antd';

const buttons = [
    { value: 1, type: 'editHitpoints' },
    { value: 2, type: 'editHitpoints' },
    { value: 3, type: 'editHitpoints' },
    { value: 5, type: 'editHitpoints' },
    { value: 10, type: 'editHitpoints' },
    { value: 20, type: 'editHitpoints' },
    { value: 30, type: 'editHitpoints' },
    { value: 50, type: 'editHitpoints' }
];


function Keyboard({dispatch, isNegative}) {
    return (
        
            buttons.map(({ type, value, Icon }) => {
                if(!type) return <Col span={8} key={"vacio"} />;
                return (
                    <Col span={8} key={value}>
                        <Button
                            size="large"
                            style={{ minWidth: '70px', height: '100%' }}
                            type="primary" onClick={() => dispatch({ type, value: isNegative ? -value: value })} >
                            {isNegative && "- "}{!!value ? value : <Icon />}
                        </Button>
                    </Col>
                );
            })
        
    )
}

export default function HitPoints({dispatch, state}) {
    const [checked, onChange] = useState(true)
    return <>
            <Row gutter={[16, 16]} justify="center">
                <Col span={8} >
                    <Statistic
                        style={{ margin : 10}}
                        value={state?.initiatives?.find( ini => ini.id === state.selected)?.hitpoints}
                        precision={0}
                    />
                    <Checkbox checked={checked} onChange={({target : {checked: value}}) => onChange(value)}>Minus</Checkbox>
                </Col>
                <Col>
                    
                    <Row>
                        <Keyboard dispatch={dispatch} isNegative={checked} />
                    </Row>
                </Col>
            </Row>
        </>
}
