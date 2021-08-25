import { useMemo } from "react";
import Icon, { EditOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import { useStateValueCharacters, useStateValueInitiatives } from "../../../../state-manager/context";
import { ADD_INITIATIVE, WRITE_INPUT_ALL } from "../../../../state-manager/initiatives/actions";

import { ReactComponent as DragonHead } from '../../../../assets/dragon-head.svg';
import { ReactComponent as HelmHead } from '../../../../assets/visored-helm.svg';

const DragonHeadIcon = props => <Icon component={DragonHead} {...props} style={{ fontSize: '20px' }} />;
const HelmHeadIcon = props => <Icon component={HelmHead} {...props} style={{ fontSize: '20px' }} />;

export default function SuggestedCharacters() {
    const [{ inputName }, dispatch ] = useStateValueInitiatives();
    const [ allCharacters ] = useStateValueCharacters();

    const characters = useMemo(() => {
        if(!!inputName){
            return allCharacters.filter(chr => chr.name.search(inputName) >= 0);
        }
        return allCharacters;
    }, [ inputName, allCharacters ]);

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
        <List
            style={{ margin: '0.5rem'}}
            grid={{ gutter: 16, column: 5 }}
            dataSource={characters}
            renderItem={ ({name, initiative, hitpoints, monster }) => (
                <Card
                    size="small"
                    actions={[
                        <EditOutlined
                            key="load"
                            title="Load and edit" 
                            onClick={() => handleInputAction({ name, initiative, hitpoints })}
                        />,
                        monster ?
                            <DragonHeadIcon
                                title="Add as a monster"
                                key="monster"
                                onClick={() => handleAdd({name, initiative, hitpoints, monster })} 
                            />
                            :
                            <HelmHeadIcon
                                title="Add as a player"
                                key="player"
                                onClick={() => handleAdd({name, initiative, hitpoints, monster })}
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
