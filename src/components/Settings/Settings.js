import React, { useState } from 'react';
import { Button, Row, Col, Modal, Input, Table } from 'antd';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';

import { useStateValue } from '../../state-manager/context';
import { DELETE_ALL, LOAD_STATE } from '../../state-manager/actions';

const { confirm } = Modal;

const saveState = (states) => {
    localStorage.setItem("states", JSON.stringify(states))
}

const getStates = () => {
    let states = []
    try {
        const states_str = localStorage.getItem("states");
        states = states_str ? JSON.parse(states_str) : [];
    } catch (error) {
        console.error("Error on getStates from settings", error);
    }
    return states;
}

export default function Settings() {
    const [ state, dispatch ] = useStateValue();
    const [stateSelected, setstateSelected] = useState(null);
    const [name, setName] = useState(null);
    const [states, setStates] = useState(getStates());

    return (<>
        <Row gutter={[8, 8]}>
            <Col>
                <Button
                    size="large"
                    danger
                    type="primary" onClick={() => {
                        confirm({
                            title: `Do you want to delete everything in the store?`,
                            icon: null,
                            onOk() {
                                dispatch({ type: DELETE_ALL });
                            },
                        });
                    }} >
                    <DeleteOutlined /> Delete Store
                </Button>
            </Col>
        </Row>
        <Row gutter={[8, 8]}>
            <Col span={14}>
                <Input size="large" placeholder="name" value={name} onChange={ ({target: {value}}) => setName(value)} />
            </Col>
            <Col span={5}>
                <Button
                    size="large"
                    type="primary"
                    disabled={!name}
                    onClick={() => {
                        confirm({
                            title: `Do you want to save the actual character set list?`,
                            icon: null,
                            onOk() {
                                const stateToBeSaved = {
                                    name,
                                    id: Date.now(),
                                    state
                                }
                                states.push(stateToBeSaved);
                                setName(null);
                                saveState(states);
                                setTimeout(() => setStates(getStates()), 0);
                            },
                        });
                    }} >
                    <SaveOutlined />
                </Button>
            </Col>
            <Col span={5}>
                <Button
                    size="large"
                    type="primary"
                    disabled={!stateSelected}
                    onClick={() => {
                        confirm({
                            title: `Do you want to activate this fight set list?`,
                            icon: null,
                            onOk() {
                                dispatch({ type: LOAD_STATE, value: stateSelected });
                            },
                        });
                    }} >
                    Activate
                </Button>
            </Col>
        </Row>
        <Table
            style={{ overflow: 'scroll', overflowX: 'hidden' }}
            pagination={false}
            dataSource={states} // states stored in localstorage
            columns={[
                {
                    title: 'Creation Date',
                    key: 'id',
                    dataIndex: 'id',
                    render: id => <span>{(new Date(id)).toDateString()}</span>
                },
                {
                    title: 'Fight',
                    key: 'name',
                    dataIndex: 'name',
                },
                {
                    render: ({ id, name }) => (
                        <DeleteOutlined onClick={() => {
                            confirm({
                                title: `Do you Want to delete ${name ?? ''}?`,
                                icon: null,
                                onOk() {
                                    const newStates = states?.filter( state => id !== state.id);
                                    saveState(newStates);
                                    setTimeout(() => setStates(getStates()), 0);
                                },
                            });
                        }} />
                    )
                }
            ]}
            rowKey="state"
            rowSelection={{
                type: 'radio',
                onChange: ([state]) => setstateSelected(state),
            }}
        />
    </>
    );
}