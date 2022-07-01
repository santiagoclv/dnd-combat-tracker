import { useState, useCallback } from 'react';
import { Button, Steps } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import SuggestedCharacters from './components/SuggestedCharacters/SuggestedCharacters';
import Initiative from './components/Initiative/Initiative';
import HitPoints from './components/HitPoints/HitPoints';
import NameaAndKind from './components/NameaAndKind/NameaAndKind';

import { useStateValueCharacters, useStateValueInitiatives as useStateValue } from '../../state-manager/context';
import {
    ADD_INITIATIVE,
    DELETE_INPUT_INITIATIVE
} from '../../state-manager/initiatives/actions';
import { ADD_CHARACTER } from '../../state-manager/characters/actions';

import classes from './AddCharacter.module.css';

const { Step } = Steps;

const steps = [
    {
        title: 'Name And Kind',
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
        inputInitiative: initiative,
        inputCreatureType: monster
    }, dispatch] = useStateValue();
    const [, dispatchCharacters ] = useStateValueCharacters();
    const [current, setCurrent] = useState(0);

    const handleClickAdd = useCallback(
        () => {
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
        [monster, hitpoints, name, initiative, dispatch, setCurrent, dispatchCharacters],
    );

    return (
        <>
            <Steps current={current} size="small" style={{
                marginBottom: '5px'
            }}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            {
                current === 1 && <Initiative />
            }
            {
                current === 0 && <NameaAndKind />
            }
            {
                current === 2 && <HitPoints />
            }
            <section className={classes['steps-action']}>
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
                        title="Add creature"
                        danger={monster}
                        onClick={() => handleClickAdd()}>
                        Add Creature
                    </Button>
                )}
            </section>
            <SuggestedCharacters />
        </>
    )
}
