import { Modal, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { DELETE_CHARACTER } from '../../state-manager/characters/actions';
import { useStateValueCharacters } from '../../state-manager/context';

const { confirm } = Modal;

export default function ManageCharacters() {
    const [characters, dispatch] = useStateValueCharacters();

    return (
        <Table
            style={{ overflow: 'scroll', overflowX: 'hidden' }}
            pagination={false}
            dataSource={characters}
            columns={[
                {
                    title: 'Name',
                    key: 'name',
                    dataIndex: 'name',
                },
                {
                    title: 'Initiative',
                    key: 'initiative',
                    dataIndex: 'initiative',
                },
                {
                    title: 'HP',
                    key: 'hitpoints',
                    dataIndex: 'hitpoints',
                },
                {
                    render: ({ name }) => (
                        <DeleteOutlined onClick={() => {
                            confirm({
                                title: `Do you Want to delete ${name ?? ''}?`,
                                icon: null,
                                onOk() {
                                    dispatch({
                                        type: DELETE_CHARACTER,
                                        value: name
                                    });
                                },
                            });
                        }} />
                    )
                }
            ]}
            rowKey="id"
        />
    );
}