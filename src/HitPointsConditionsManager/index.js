import React, { useState } from 'react';
import { Button, Row, Col, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const buttonsHitpoints = [
    { value: 1, type: 'editHitpoints' },
    { value: 2, type: 'editHitpoints' },
    { value: 3, type: 'editHitpoints' },
    { value: 5, type: 'editHitpoints' },
    { value: 10, type: 'editHitpoints' },
    { value: 20, type: 'editHitpoints' },
    { value: 30, type: 'editHitpoints' },
    { value: 50, type: 'editHitpoints' }
];

const buttonsConditions = [
    { color: "grey" , condition: "Petrified", add: 'editCondition', remove: 'removeCondition' },
    { color: "grey" , condition: "Incapacitated", add: 'editCondition', remove: 'removeCondition' },
    { color: "volcano" , condition: "Unconscious", add: 'editCondition', remove: 'removeCondition' },
    { color: "orange" , condition: "Paralyzed", add: 'editCondition', remove: 'removeCondition' },
    { color: "brown" , condition: "Invisible", add: 'editCondition', remove: 'removeCondition' },
    { color: "darkblue" , condition: "Deafened", add: 'editCondition', remove: 'removeCondition' },
    { color: "geekblue" , condition: "Blinded", add: 'editCondition', remove: 'removeCondition' },
    { color: "blue" , condition: "Frightened", add: 'editCondition', remove: 'removeCondition' },
    { color: "purple" , condition: "Grappled", add: 'editCondition', remove: 'removeCondition' },
    { color: "burlywood" , condition: "Restrained", add: 'editCondition', remove: 'removeCondition' },
    { color: "magenta" , condition: "Charmed", add: 'editCondition', remove: 'removeCondition' },
    { color: "green" , condition: "Poisoned", add: 'editCondition', remove: 'removeCondition' },
    { color: "gold" , condition: "Stunned", add: 'editCondition', remove: 'removeCondition' },
    { color: "cyan" , condition: "Prone", add: 'editCondition', remove: 'removeCondition' },
];

function KeyboardConditions({dispatch, conditions}) {

    return (
        buttonsConditions.map(({ add, remove, condition, color }) => {
                const hasIt = conditions?.find( cond => cond.condition === condition);
                return (
                    <Col span={6} key={condition}>
                        <Button
                            type="ghost"
                            style={{color}}
                            size="small"
                            style={{ minWidth: '70px', height: '100%' }}
                            onClick={() => dispatch({ type: hasIt ? remove : add, value: { condition,  color }  })} >
                            {hasIt && <DeleteOutlined /> } {condition}
                        </Button>
                    </Col>
                );
            })
        
    )
}


function KeyboardHitpoints({dispatch, isNegative}) {
    return (
        
        buttonsHitpoints.map(({ type, value, Icon }) => {
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

export default function HitPointsConditionsManager({dispatch, state}) {
    const [checked, onChange] = useState(true);
    const { conditions, name } = state?.initiatives?.find( ini => ini.id === state.selected) ?? {};
    return <>
            <div className="LabelName"><span className="Name">{name}</span></div>
            <div className="LabelName">Hit Points:</div>
            <Row gutter={[16, 16]} justify="center">
                <Col>
                    <Row gutter={[8, 8]}>
                        <Col span={8} ><Checkbox checked={checked} onChange={({target : {checked: value}}) => onChange(value)}>Minus</Checkbox></Col>
                        <KeyboardHitpoints dispatch={dispatch} isNegative={checked} />
                    </Row>
                </Col>
            </Row>
            <div className="LabelName">Conditions:</div>
            <Row gutter={[16, 16]} justify="center">
                <Col>
                    <Row gutter={[8, 8]}>
                        <KeyboardConditions dispatch={dispatch} conditions={conditions} />
                    </Row>
                </Col>
            </Row>
        </>
}
