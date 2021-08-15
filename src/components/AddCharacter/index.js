import React, {useState} from 'react';

import { Button, Steps } from 'antd';

import { DeleteOutlined, RollbackOutlined } from '@ant-design/icons';

import Initiative from '../Initiative';
import HitPoints from '../HitPoints';
import Name from '../Name';

import { useStateValue } from '../../state-manager/context';
import { ADD_INITIATIVE, DELETE_INPUT_HP, DELETE_INPUT_INITIATIVE, DELETE_INPUT_NAME } from '../../state-manager/actions';

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

export default function AddCharacter() {
    const [, dispatch] = useStateValue();
    const [current, setCurrent] = useState(0);
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
                        <div className="steps-action">
                            {
                                current === 0 &&
                                <Button
                                    danger
                                    style={{width: '100px'}}
                                    type="primary" onClick={() => dispatch({ type: DELETE_INPUT_NAME })} >
                                    <RollbackOutlined />
                                </Button>
                            }
                            {
                                current === 1 &&
                                <Button
                                    danger
                                    style={{width: '100px'}}
                                    type="primary" onClick={() => dispatch({ type: DELETE_INPUT_INITIATIVE })} >
                                    <DeleteOutlined />
                                </Button>
                            }
                            {
                                current === 2 &&
                                <Button
                                    danger
                                    style={{width: '100px'}}
                                    type="primary" onClick={() => dispatch({ type: DELETE_INPUT_HP })} >
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
                                <Button type="primary" danger onClick={() => { setCurrent(0); dispatch({ type: ADD_INITIATIVE, monster: true }) }}>
                                    Create as a Monster
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={() => { setCurrent(0); dispatch({ type: ADD_INITIATIVE, monster: false }) }}>
                                    Create as a Player
                                </Button>
                            )}
                        </div> 
        </>
    )
}
