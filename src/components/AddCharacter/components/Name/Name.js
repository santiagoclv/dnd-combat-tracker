import { Row, Col, Form, Input } from 'antd';

import {
    useStateValueInitiatives as useStateValue
} from '../../../../state-manager/context';
import { SET_INPUT_NAME } from '../../../../state-manager/initiatives/actions';

const Name = () => {
    const [{ inputName }, dispatch] = useStateValue();

    return (
        <Row gutter={[16, 16]} justify="center">
            <Col>
                <Form.Item label="Name" name="name" >
                    <Input
                        name='name'
                        onChange={({ target: { value } }) => dispatch({ type: SET_INPUT_NAME, value })}
                        value={inputName}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
};

export default Name;
