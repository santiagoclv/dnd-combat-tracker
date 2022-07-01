import { Button, Row, Col, Typography } from "antd";

import { useStateValueInitiatives as useStateValue } from "../../../../state-manager/context";
import { WRITE_INPUT_INITIATIVE } from "../../../../state-manager/initiatives/actions";

const { Title } = Typography;

const numbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0"
];

const dices = [
  "d4",
  "d6",
  "d8",
  "d10",
  "d12",
  "d20",
  "-",
  "+",
];

function Keyboard({ handleKey, elements }) {
  return (
    <>
      {elements.map((value) => {
        return (
          <Col key={value}>
            <Button
              size="middle"
              title={value}
              name={value}
              style={{ minWidth: "40px", height: "100%" }}
              type="primary"
              onClick={() => handleKey(value)}
            >
              {value}
            </Button>
          </Col>
        );
      })}
    </>
  );
}

export default function Dices() {
  const [{ inputInitiative }, dispatch] = useStateValue();

  const handleKey = (value) => {
    dispatch({ type: WRITE_INPUT_INITIATIVE, value });
  };

  return (
    <>
      <Row gutter={[4, 4]} justify="center">
        <Col>
          <Title level={5}>Set: {inputInitiative?.join("")}</Title>
        </Col>
      </Row>
      <Row style={{ marginBottom: "5px" }}>
        <Col span={11}>
          <Row gutter={[4, 4]}>
            <Keyboard handleKey={handleKey} elements={numbers} />
          </Row>
        </Col>
        <Col span={13}>
          <Row gutter={[4, 4]}>
            <Keyboard handleKey={handleKey} elements={dices} />
          </Row>
        </Col>
      </Row>
    </>
  );
}
