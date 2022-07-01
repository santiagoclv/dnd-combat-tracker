import { Row, InputNumber } from "antd";
import { WRITE_INPUT_HP } from "../../../../state-manager/initiatives/actions";

import { useStateValueInitiatives as useStateValue } from "../../../../state-manager/context";

const Name = () => {
  const [{ inputHitpoints }, dispatch] = useStateValue();

  return (
    <Row gutter={[16, 16]} justify="center">
      <InputNumber
        name="hp"
        onChange={(value) => dispatch({ type: WRITE_INPUT_HP, value })}
        value={inputHitpoints}
      />
    </Row>
  );
};

export default Name;
