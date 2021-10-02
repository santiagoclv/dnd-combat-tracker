import { useState, useCallback } from 'react';
import { Button, Steps, Typography, Row, Col } from 'antd';
import { DeleteOutlined, RollbackOutlined } from '@ant-design/icons';

import SuggestedCharacters from './components/SuggestedCharacters/SuggestedCharacters';
import Initiative from './components/Initiative/Initiative';
import HitPoints from './components/HitPoints/HitPoints';
import Name from './components/Name/Name';

import { useStateValueCharacters, useStateValueInitiatives as useStateValue } from '../../state-manager/context';
import {
    ADD_INITIATIVE,
    DELETE_INPUT_HP,
    DELETE_INPUT_INITIATIVE,
    DELETE_INPUT_NAME
} from '../../state-manager/initiatives/actions';
import { ADD_CHARACTER } from '../../state-manager/characters/actions';

import classes from './AddCharacter.module.css';

const { Step } = Steps;
const { Title } = Typography;

const steps = [
    {
        title: 'Name',
    },
    {
        title: 'Initiative',
    },
    {
        title: 'Hit Points',
    },
];

export default function AddCharacter() {
    const [{
        inputHitpoints: hitpoints,
        inputName: name,
        inputInitiative: initiative
    }, dispatch] = useStateValue();
    const [, dispatchCharacters ] = useStateValueCharacters();
    const [current, setCurrent] = useState(0);

    const handleClickAdd = useCallback(
        (monster) => {
            setCurrent(0);
            dispatch({
                type: ADD_INITIATIVE,
                value: { monster, hitpoints, name, initiative }
            });
            dispatchCharacters({
                type: ADD_CHARACTER,
                value: { monster, hitpoints, name, initiative }
            });
        },
        [hitpoints, name, initiative, dispatch, setCurrent, dispatchCharacters],
    );

    return (
        <>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            {
                current === 1 && <Initiative />
            }
            {
                current === 0 && <Name />
            }
            {
                current === 2 && <HitPoints />
            }
            <section className={classes['steps-action']}>
                {
                    current === 0 &&
                    <Button
                        danger
                        title="Delete last letter"
                        style={{ width: '100px' }}
                        type="primary" onClick={() => dispatch({ type: DELETE_INPUT_NAME })} >
                        <RollbackOutlined />
                    </Button>
                }
                {
                    current === 1 &&
                    <Button
                        danger
                        title="Delete initiative"
                        style={{ width: '100px' }}
                        type="primary" onClick={() => dispatch({ type: DELETE_INPUT_INITIATIVE })} >
                        <RollbackOutlined />
                    </Button>
                }
                {
                    current === 2 &&
                    <Button
                        danger
                        title="Delete HP"
                        style={{ width: '100px' }}
                        type="primary" onClick={() => dispatch({ type: DELETE_INPUT_HP })} >
                        <DeleteOutlined />
                    </Button>
                }

                {current > 0 && (
                    <Button title="Previous Character Options" onClick={() => setCurrent(current - 1)}>
                        Previous
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button title="Next Character Options" type="primary" onClick={() => setCurrent(current + 1)}>
                        Next
                    </Button>
                )}

                {current === steps.length - 1 && (
                    <Button
                        type="primary"
                        title="Add character as a Monster/NPC"
                        danger
                        onClick={() => handleClickAdd(true)}>
                        Add as a Monster
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button
                        type="primary"
                        title="Add character as a Player"
                        onClick={() => handleClickAdd(false)}>
                        Add as a Player
                    </Button>
                )}
            </section>
            <Row justify="center">
                <Col>
                    <Title level={4}>Suggested Characters and Monsters</Title>
                </Col>
            </Row>
            <SuggestedCharacters />
        </>
    )
}
