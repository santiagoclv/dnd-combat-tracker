import { useState } from 'react';
import { Button, Row, Col, Typography } from 'antd';
import Icon, { RollbackOutlined } from '@ant-design/icons';

import { rollIt } from '../../helpers/rolling';

import { ReactComponent as D4 } from '../../assets/d4.svg';
import { ReactComponent as D6 } from '../../assets/d6.svg';
import { ReactComponent as D8 } from '../../assets/d8.svg';
import { ReactComponent as D10 } from '../../assets/d10.svg';
import { ReactComponent as D12 } from '../../assets/d12.svg';
import { ReactComponent as D20 } from '../../assets/d20.svg';

const { Title } = Typography;

const buttons = [
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "-" },
    { value: "0" },
    { value: "+" },
];

const D4Icon = props => <Icon component={D4} {...props} />;
const D6Icon = props => <Icon component={D6} {...props} />;
const D8Icon = props => <Icon component={D8} {...props} />;
const D10Icon = props => <Icon component={D10} {...props} />;
const D12Icon = props => <Icon component={D12} {...props} />;
const D20Icon = props => <Icon component={D20} {...props} />;

const dices = [
    { value: "d4", DiceIcon: <D4Icon style={{ fontSize: '50px' }} /> },
    { value: "d6", DiceIcon: <D6Icon style={{ fontSize: '50px' }} /> },
    { value: "d8", DiceIcon: <D8Icon style={{ fontSize: '50px' }} /> },
    { value: "d10", DiceIcon: <D10Icon style={{ fontSize: '50px' }} /> },
    { value: "d12", DiceIcon: <D12Icon style={{ fontSize: '50px' }} /> },
    { value: "d20", DiceIcon: <D20Icon style={{ fontSize: '50px' }} /> }
];

function KeyboardNumbers({ handleKey }) {
    return (
        <>
            {buttons.map(({ value }) => {
                return (
                    <Col span={8} key={value}>
                        <Button
                            size="large"
                            title={value}
                            style={{ minWidth: '70px', height: '100%' }}
                            type="primary"
                            onClick={() => handleKey(value)}
                        >
                            {value}
                        </Button>
                    </Col>
                );
            })}
        </>
    )
}

function KeyboardDices({ handleKey }) {
    return (
        <>
            {dices.map(({ value, DiceIcon }) => {
                return (
                    <Col span={8} key={value}>
                        <Button
                            size="large"
                            title={value}
                            icon={DiceIcon}
                            style={{ minWidth: '70px', height: '100%' }}
                            type="primary"
                            onClick={() => handleKey(value)}
                        >
                        </Button>
                    </Col>
                );
            })}
        </>
    )
}

export default function Dices() {
    const [roll, setRoll] = useState([]);
    const [rolled, setRolled] = useState(0);

    const handleKey = (value) => {
        const isNaNValue = isNaN(parseInt(value));
        const lastValue = roll.length > 0 ? roll[roll.length - 1] : null;
        const isLastNaN = isNaN(parseInt(lastValue));

        if (isNaNValue || isLastNaN) {
            let rollSplit = [...roll];
            const isValueSing = ["-", "+"].includes(value);
            const isLastValueSing = ["-", "+"].includes(lastValue);
            if (!isValueSing && !isLastValueSing
                && isLastNaN && !!lastValue)
            {
                rollSplit.push('+');
            }
            rollSplit.push(value);
            return setRoll(rollSplit);
        }

        setRoll([...roll?.slice(0, -1), lastValue + value ]);
    };

    const deleteLastKey = () => {
        setRoll(roll?.slice(0, -1));
    };

    return (
        <>
            <Row gutter={[16, 16]} justify="center">
                <Col>
                    <Title style={{ margin: 10 }} level={3}>Set: {roll.join("")}</Title>
                </Col>
            </Row>
            <Row style={{ marginBottom: '1rem' }} gutter={[8, 8]}>
                <Col span={12} >
                    <Row gutter={[8, 8]}>
                        <KeyboardNumbers handleKey={handleKey} />
                    </Row>
                </Col>
                <Col span={12} >
                    <Row gutter={[8, 8]}>
                        <KeyboardDices handleKey={handleKey} />
                    </Row>
                </Col>
            </Row>
            <Row style={{ marginBottom: '1rem' }} gutter={[16, 16]} justify="space-between">
                <Col>
                    <Button
                        size="large"
                        title={"back"}
                        icon={<RollbackOutlined />}
                        style={{ minWidth: '70px', height: '100%' }}
                        type="primary"
                        danger
                        onClick={() => deleteLastKey()}
                    />
                </Col>
                <Col>
                    <Title level={3}>Result: {rolled}</Title>
                </Col>
                <Col>
                    <Button
                        size="large"
                        title={"Roll it"}
                        style={{ minWidth: '70px', height: '100%' }}
                        type="primary"
                        onClick={() => setRolled(rollIt(roll))}
                    >
                        Roll it
                    </Button>
                </Col>
            </Row>
        </>
    );
}
