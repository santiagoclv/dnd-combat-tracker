import { useMemo } from "react";
import Icon, { EditOutlined } from "@ant-design/icons";
import { Card, Col, List, Row, Typography } from "antd";
import { useStateValueCharacters, useStateValueInitiatives } from "../../../../state-manager/context";
import { ADD_INITIATIVE, WRITE_INPUT_ALL } from "../../../../state-manager/initiatives/actions";

import { ReactComponent as DragonHead } from '../../../../assets/dragon-head.svg';
import { ReactComponent as HelmHead } from '../../../../assets/visored-helm.svg';

const DragonHeadIcon = props => <Icon component={DragonHead} {...props} style={{ fontSize: '20px' }} />;
const HelmHeadIcon = props => <Icon component={HelmHead} {...props} style={{ fontSize: '20px' }} />;

const matchName = (inputName, name) => name.toLowerCase().search(inputName.toLowerCase()) >= 0;

const { Title } = Typography;

export default function SuggestedCharacters() {
    const [{ inputName, inputCreatureType }, dispatch] = useStateValueInitiatives();
    const [allCharacters] = useStateValueCharacters();

    const creatures = useMemo(() => (
        allCharacters.filter(chr => matchName(inputName, chr.name) && chr.monster === inputCreatureType)
    ), [inputName, inputCreatureType, allCharacters]);

    const handleInputAction = (value) => {
        dispatch({
            type: WRITE_INPUT_ALL,
            value
        })
    };

    const handleAdd = (value) => {
        dispatch({
            type: ADD_INITIATIVE,
            value
        });
    };

    return (
        <Row>
            <Col span={24}>
                <Title level={5}>{ inputCreatureType ? 'Monsters': 'Characters'}</Title>
                <CreatureList
                    dataSource={creatures}
                    handleInputAction={handleInputAction}
                    handleAdd={handleAdd}
                />
            </ Col>
        </ Row>
    )
}


const CreatureList = ({ dataSource, handleInputAction, handleAdd }) => {
    return (
        <List
            style={{
                margin: '0.5rem',
                height: '53vh',
                overflowY: 'scroll',
                overflowX: 'hidden',
                border: 'solid 1px lightgrey',
                borderTop: 'solid 2px lightgrey',
            }}
            grid={{ gutter: 16, column: 3 }}
            dataSource={dataSource}
            renderItem={({ name, initiative, hitpoints, monster }) => (
                <Card
                    size="small"
                    actions={[
                        <EditOutlined
                            key="load"
                            title="Load and edit"
                            onClick={() => handleInputAction({ name, initiative, hitpoints, monster })}
                        />,
                        monster ?
                            <DragonHeadIcon
                                title="Add as a monster"
                                key="monster"
                                onClick={() => handleAdd({ name, initiative, hitpoints, monster })}
                            />
                            :
                            <HelmHeadIcon
                                title="Add as a player"
                                key="player"
                                onClick={() => handleAdd({ name, initiative, hitpoints, monster })}
                            />
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
            )}
        />
    )
}