import React, { useState } from 'react';
import { Button, Row, Col, Checkbox, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useStateValue } from '../../state-manager/context';
import { EDIT_CONDITION, EDIT_HP, REMOVE_CONDITION } from '../../state-manager/actions';

const buttonsHitpoints = [
    { value: 1, type: EDIT_HP },
    { value: 2, type: EDIT_HP },
    { value: 3, type: EDIT_HP },
    { value: 5, type: EDIT_HP },
    { value: 10, type: EDIT_HP },
    { value: 20, type: EDIT_HP },
    { value: 30, type: EDIT_HP },
    { value: 50, type: EDIT_HP }
];

const buttonsConditions = [
    { color: "grey", condition: "Petrified", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "lime", condition: "Incapacitated", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "gold", condition: "Unconscious", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "orange", condition: "Paralyzed", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "cornflowerblue", condition: "Invisible", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "cyan", condition: "Deafened", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "geekblue", condition: "Blinded", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "blue", condition: "Frightened", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "purple", condition: "Grappled", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "burlywood", condition: "Restrained", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "magenta", condition: "Charmed", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "green", condition: "Poisoned", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "red", condition: "Stunned", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
    { color: "volcano", condition: "Prone", add: EDIT_CONDITION, remove: REMOVE_CONDITION },
];

function KeyboardConditions({ conditions }) {
    const [, dispatch] = useStateValue();
    return (
        <>
            {buttonsConditions.map(({ add, remove, condition, color }) => {
                const hasIt = conditions?.find(cond => cond.condition === condition);
                return (
                    <Col span={6} key={condition}>
                        <Tag
                            key={condition}
                            color={'cornflowerblue'}
                            onClick={() => dispatch({ type: hasIt ? remove : add, value: { condition, color } })}
                        >
                            {hasIt && <DeleteOutlined />} {condition}
                        </Tag>
                    </Col>
                );
            })}
        </>
    )
}


function KeyboardHitpoints({ isNegative }) {
    const [, dispatch] = useStateValue();
    return (
        <>
            {buttonsHitpoints.map(({ type, value, Icon }) => {
                if (!type) return <Col span={8} key={"vacio"} />;
                return (
                    <Col span={8} key={value}>
                        <Button
                            size="large"
                            style={{ minWidth: '70px', height: '100%' }}
                            type="primary" onClick={() => dispatch({ type, value: isNegative ? -value : value })} >
                            {isNegative && "- "}{!!value ? value : <Icon />}
                        </Button>
                    </Col>
                );
            })}
        </>
    )
}

export default function HitPointsConditionsManager() {
    const [{ initiatives, selected }] = useStateValue();
    const [checked, onChange] = useState(true);
    const { conditions, name } = initiatives?.find(ini => ini.id === selected) ?? {};

    return (
        <>
            <div className="LabelName"><span className="Name">{name}</span></div>
            <div className="LabelName">Hit Points:</div>
            <Row gutter={[16, 16]} justify="center">
                <Col>
                    <Row gutter={[8, 8]}>
                        <Col span={8} ><Checkbox checked={checked} onChange={({ target: { checked: value } }) => onChange(value)}>Minus</Checkbox></Col>
                        <KeyboardHitpoints isNegative={checked} />
                    </Row>
                </Col>
            </Row>
            <div className="LabelName">Conditions:</div>
            <Row gutter={[16, 16]} justify="center">
                <Col>
                    <Row gutter={[8, 8]}>
                        <KeyboardConditions conditions={conditions} />
                    </Row>
                </Col>
            </Row>
        </>
    );
}
