import React from 'react';

import { Button, Row, Col, Statistic } from 'antd';

const buttonLetters = [
    { value : "q", type: "writeInputName" },
    { value : "w", type: "writeInputName" },
    { value : "e", type: "writeInputName" },
    { value : "r", type: "writeInputName" },
    { value : "t", type: "writeInputName" },
    { value : "y", type: "writeInputName" },
    { value : "u", type: "writeInputName" },
    { value : "i", type: "writeInputName" },
    { value : "o", type: "writeInputName" },
    { value : "p", type: "writeInputName" },
    { value : "a", type: "writeInputName" },
    { value : "s", type: "writeInputName" },
    { value : "d", type: "writeInputName" },
    { value : "f", type: "writeInputName" },
    { value : "g", type: "writeInputName" },
    { value : "h", type: "writeInputName" },
    { value : "j", type: "writeInputName" },
    { value : "k", type: "writeInputName" },
    { value : "l", type: "writeInputName" },
    { value : "ñ", type: "writeInputName" },
    { value : "z", type: "writeInputName" },
    { value : "x", type: "writeInputName" },
    { value : "c", type: "writeInputName" },
    { value : "v", type: "writeInputName" },
    { value : "b", type: "writeInputName" },
    { value : "n", type: "writeInputName" },
    { value : "m", type: "writeInputName" },
    { value : "_", type: "writeInputName" },
    { value : "??", type: "writeInputName" },
    { value : "1", type: "writeInputName" },
    { value : "2", type: "writeInputName" },
    { value : "3", type: "writeInputName" },
    { value : "4", type: "writeInputName" },
    { value : "5", type: "writeInputName" },
    { value : "6", type: "writeInputName" },
    { value : "7", type: "writeInputName" },
    { value : "8", type: "writeInputName" },
    { value : "9", type: "writeInputName" },
    { value : "0", type: "writeInputName" },
];

function Keyboard({dispatch, extraWords}) {
    return (
        buttonLetters.concat(extraWords).map(({ type, value, Icon }) => {
            return (
                <Col key={value}>
                    <Button
                        size="large"
                        style={{ minWidth: '70px', height: '100%' }}
                        type="primary" onClick={() => dispatch({ type, value })} >
                        {!!value ? value : <Icon />}
                    </Button>
                </Col>
            );
        })
    )
}

export default function Name({dispatch, state}) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const players_param = urlParams.get('players') ? urlParams.get('players')  : null;
    const players = players_param?.split(",")?.map( ply => ({ value : ply, type: "writeInputName" })) ?? [];

    return <>
            <Row gutter={[16, 16]} justify="center">
                <Col span={8} >
                    <Statistic
                        style={{ margin : 10}}
                        value={state.inputName}
                    />
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                <Keyboard extraWords={players} dispatch={dispatch} />
            </Row>
        </>
}