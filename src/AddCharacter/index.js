import React, {useState} from 'react';

import { Button, Steps } from 'antd';

import { DeleteOutlined, RollbackOutlined } from '@ant-design/icons';

import Initiative from '../Initiative';
import HitPoints from '../HitPoints';
import Name from '../Name';

const { Step } = Steps;

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

export default function AddCharacter({state, dispatch}) {
    const [current, setCurrent] = useState(0);
    return (
        <>
           <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        {
                            current === 1 && <Initiative state={state} dispatch={dispatch} />
                        }
                        {
                            current === 0 && <Name state={state} dispatch={dispatch} />
                        }
                        {
                            current === 2 && <HitPoints state={state} dispatch={dispatch} />
                        }
                        <div className="steps-action">
                            {
                                current === 0 &&
                                <Button
                                    danger
                                    style={{width: '100px'}}
                                    type="primary" onClick={() => dispatch({ type: 'deleteInputName' })} >
                                    <RollbackOutlined />
                                </Button>
                            }
                            {
                                current === 1 &&
                                <Button
                                    danger
                                    style={{width: '100px'}}
                                    type="primary" onClick={() => dispatch({ type: 'deleteInputInitiative' })} >
                                    <DeleteOutlined />
                                </Button>
                            }
                            {
                                current === 2 &&
                                <Button
                                    danger
                                    style={{width: '100px'}}
                                    type="primary" onClick={() => dispatch({ type: 'deleteInputHitpoints' })} >
                                    <DeleteOutlined />
                                </Button>
                            }

                            {current > 0 && (
                                <Button onClick={() => setCurrent(current - 1)}>
                                    Previous
                                </Button>
                            )}
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => setCurrent(current + 1)}>
                                    Next
                                </Button>
                            )}

                            {current === steps.length - 1 && (
                                <Button type="primary" danger onClick={() => { setCurrent(0); dispatch({ type: 'addInitiative', monster: true }) }}>
                                    Create as a Monster
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={() => { setCurrent(0); dispatch({ type: 'addInitiative', monster: false }) }}>
                                    Create as a Player
                                </Button>
                            )}
                        </div> 
        </>
    )
}
