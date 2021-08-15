import { useStateValue } from '../../state-manager/context';
import { Button, Row, Col, Statistic } from 'antd';

import { WRITE_INPUT_NAME } from '../../state-manager/actions';

const buttonLetters = [
    { value: "q", type: WRITE_INPUT_NAME },
    { value: "w", type: WRITE_INPUT_NAME },
    { value: "e", type: WRITE_INPUT_NAME },
    { value: "r", type: WRITE_INPUT_NAME },
    { value: "t", type: WRITE_INPUT_NAME },
    { value: "y", type: WRITE_INPUT_NAME },
    { value: "u", type: WRITE_INPUT_NAME },
    { value: "i", type: WRITE_INPUT_NAME },
    { value: "o", type: WRITE_INPUT_NAME },
    { value: "p", type: WRITE_INPUT_NAME },
    { value: "a", type: WRITE_INPUT_NAME },
    { value: "s", type: WRITE_INPUT_NAME },
    { value: "d", type: WRITE_INPUT_NAME },
    { value: "f", type: WRITE_INPUT_NAME },
    { value: "g", type: WRITE_INPUT_NAME },
    { value: "h", type: WRITE_INPUT_NAME },
    { value: "j", type: WRITE_INPUT_NAME },
    { value: "k", type: WRITE_INPUT_NAME },
    { value: "l", type: WRITE_INPUT_NAME },
    { value: "ñ", type: WRITE_INPUT_NAME },
    { value: "z", type: WRITE_INPUT_NAME },
    { value: "x", type: WRITE_INPUT_NAME },
    { value: "c", type: WRITE_INPUT_NAME },
    { value: "v", type: WRITE_INPUT_NAME },
    { value: "b", type: WRITE_INPUT_NAME },
    { value: "n", type: WRITE_INPUT_NAME },
    { value: "m", type: WRITE_INPUT_NAME },
    { value: "_", type: WRITE_INPUT_NAME },
    { value: "??", type: WRITE_INPUT_NAME },
    { value: "1", type: WRITE_INPUT_NAME },
    { value: "2", type: WRITE_INPUT_NAME },
    { value: "3", type: WRITE_INPUT_NAME },
    { value: "4", type: WRITE_INPUT_NAME },
    { value: "5", type: WRITE_INPUT_NAME },
    { value: "6", type: WRITE_INPUT_NAME },
    { value: "7", type: WRITE_INPUT_NAME },
    { value: "8", type: WRITE_INPUT_NAME },
    { value: "9", type: WRITE_INPUT_NAME },
    { value: "0", type: WRITE_INPUT_NAME },
];

function Keyboard({ extraWords }) {
    const [, dispatch] = useStateValue();
    return (
        <>
            {buttonLetters.concat(extraWords).map(({ type, value, Icon }) => {
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
            }
        </>
    )
}

const Name = () => {
    const [{ inputName }] = useStateValue();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const players_param = urlParams.get('players') ? urlParams.get('players') : null;
    const players = players_param?.split("-")?.map(ply => ({ value: ply, type: WRITE_INPUT_NAME })) ?? [];

    return <>
        <Row gutter={[16, 16]} justify="center">
            <Col>
                <Statistic
                    style={{ margin: 10 }}
                    value={"Name: " + inputName}
                />
            </Col>
        </Row>
        <Row gutter={[8, 8]}>
            <Keyboard extraWords={players} />
        </Row>
    </>
};

export default Name;
