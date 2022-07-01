import { Row, Col, Form, InputNumber } from 'antd';
import { WRITE_INPUT_HP } from '../../../../state-manager/initiatives/actions';

import {
    useStateValueInitiatives as useStateValue
} from '../../../../state-manager/context';

const Name = () => {
    const [{ inputHitpoints }, dispatch] = useStateValue();

    return (
        <Row gutter={[16, 16]} justify="center">
            <Col>
                <Form.Item label="HP" name="hp" >
                    <InputNumber
                        onChange={(value) => dispatch({ type: WRITE_INPUT_HP, value })}
                        value={inputHitpoints}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default Name;
