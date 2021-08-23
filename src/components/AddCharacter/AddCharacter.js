import { useState, useCallback } from 'react';
import { Button, Steps, Card, Row, Col } from 'antd';
import Icon, { DeleteOutlined, RollbackOutlined, EditOutlined } from '@ant-design/icons';

import Initiative from './components/Initiative/Initiative';
import HitPoints from './components/HitPoints/HitPoints';
import Name from './components/Name/Name';

import { ReactComponent as DragonHead } from '../../assets/dragon-head.svg';
import { ReactComponent as HelmHead } from '../../assets/visored-helm.svg';
import { useStateValue } from '../../state-manager/context';
import {
    ADD_INITIATIVE,
    DELETE_INPUT_HP,
    DELETE_INPUT_INITIATIVE,
    DELETE_INPUT_NAME
} from '../../state-manager/actions';


const DragonHeadIcon = props => <Icon component={DragonHead} {...props} style={{ fontSize: '20px' }} />;
const HelmHeadIcon = props => <Icon component={HelmHead} {...props} style={{ fontSize: '20px' }} />;

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
    const [{
        inputHitpoints: hitpoints,
        inputName: name,
        inputInitiative: initiative
    }, dispatch] = useStateValue();
    const [current, setCurrent] = useState(0);

    const handleClickAdd = useCallback(
        (monster) => {
            setCurrent(0);
            dispatch({
                type: ADD_INITIATIVE,
                value: { monster, hitpoints, name, initiative }
            });
        },
        [hitpoints, name, initiative, dispatch, setCurrent],
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
            <div className="steps-action">
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
                        <DeleteOutlined />
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
            </div>
            <div className="site-card-wrapper" style={{ height: 'auto', overflowY: 'scroll', overflowX: 'hidden' }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card
                            size="small"
                            actions={[
                                <EditOutlined key="load" />,
                                true ? <DragonHeadIcon key="monster" />: <HelmHeadIcon key="player" />
                            ]}
                        >
                            <Card.Meta
                                title={name}
                                description={
                                    <>
                                        <div>Initiative: {initiative}</div>
                                        <div>HP: {hitpoints}</div>
                                    </>
                                }
                            />
                        </Card>
                        
                    </Col>
                </Row>
            </div>
        </>
    )
}
