import React from 'react';
import { Button, Row, Col, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { confirm } = Modal;

export default function Settings({dispatch}) {
    return (
        <Row gutter={[8, 8]}>
            <Col span={8}>
                <Button
                    size="large"
                    danger
                    type="primary" onClick={() => {
                        confirm({
                            title: `Do you want to delete everything in the store?`,
                            icon: null,
                            onOk() {
                                dispatch({ type: 'deleteAll'});
                            },
                          });
                    }} >
                    <DeleteOutlined /> Delete Store
                </Button>
            </Col>
        </Row>
    );
        
}