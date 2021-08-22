import { useState } from 'react';
import { Modal, Table, Col, Row, Button } from 'antd';
import { DeleteOutlined, RedoOutlined } from '@ant-design/icons';

import { getCharacters, saveCharacters } from './storage-data';

const { confirm } = Modal;

export default function ManageCharacters() {
    const [characters, setCharacters] = useState(getCharacters());

    return (
        <>
            <Row gutter={[8, 8]} style={{ marginBottom: '1rem' }}>
                <Col>
                    <Button
                        size="large"
                        type="primary" onClick={() => setCharacters(getCharacters())} >
                        <RedoOutlined />
                    </Button>
                </Col>
            </Row>
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
                        render: ({ id, name }) => (
                            <DeleteOutlined onClick={() => {
                                confirm({
                                    title: `Do you Want to delete ${name ?? ''}?`,
                                    icon: null,
                                    onOk() {
                                        const newCharacters = characters?.filter(character => id !== character.id);
                                        saveCharacters(newCharacters);
                                        setTimeout(() => setCharacters(getCharacters()), 0);
                                    },
                                });
                            }} />
                        )
                    }
                ]}
                rowKey="id"
            />
        </>
    );
}