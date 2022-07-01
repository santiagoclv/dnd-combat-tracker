import { Row, Col, Input, Checkbox } from "antd";

import { useStateValueInitiatives as useStateValue } from "../../../../state-manager/context";
import {
  SET_INPUT_NAME,
  SET_CREATURE_TYPE,
} from "../../../../state-manager/initiatives/actions";

const Name = () => {
  const [{ inputName, inputCreatureType }, dispatch] = useStateValue();

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col>
        <Input
            name="name"
            value={inputName}
            onChange={({ target: { value } }) =>
              dispatch({ type: SET_INPUT_NAME, value })
            }
        />
      </Col>
      <Col>
        <Checkbox
          checked={inputCreatureType}
          onChange={({ target: { checked } }) =>
            dispatch({ type: SET_CREATURE_TYPE, value: checked })
          }
        >
          Monster
        </Checkbox>
      </Col>
    </Row>
  );
};

export default Name;
