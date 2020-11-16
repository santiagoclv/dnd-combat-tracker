import React, {useMemo} from 'react';
import { Table, Tag, Modal, Row, Col, Button } from 'antd';
import { sortableContainer, sortableElement, sortableHandle, arrayMove } from 'react-sortable-hoc';

import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';


const { confirm } = Modal;

const DragHandle = sortableHandle(() => (
    <MenuOutlined style={{ width: '15px' ,cursor: 'pointer', color: '#999' }} />
));

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);


const CharacterList = ({ state: { initiatives }, dispatch, wider }) => {

    const columns = useMemo(() => {
        const fields = [
            {
                dataIndex: 'sort',
                width: 15,
                className: 'drag-visible',
                render: () => <DragHandle />,
            },
            {
                title: 'Name',
                width: '50px',
                className: 'drag-visible',
                render: ({name, monster}) => (
                    <span style={{ fontWeight: 500 , color: monster ? 'red' : 'green'  }}>{name}</span>
                )
            },
            {
                title: 'Init',
                key: 'value',
                dataIndex: 'value',
            }
        ];

        if(wider){
            fields.push({
                title: 'HP',
                render: ({hitpoints, monster}) => (
                    <span style={{ fontWeight: 500 , color: hitpoints > 0 || !monster ? 'green' : 'red'}}>{hitpoints}</span>
                )
            });
            fields.push({
                title: 'Conditions',
                dataIndex: 'conditions',
                key: 'conditions',
                render: tags => (
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                      {tags.map( ({color, condition}) => (
                          <Tag color={color} key={condition}>
                            {condition}
                          </Tag>
                        ))}
                    </div>
                  ),
            });
            fields.push({
                key: 'id',
                render: ({id, name}) => (
                  <DeleteOutlined onClick={() => {
                    confirm({
                        title: `Do you Want to delete ${name ?? ''}?`,
                        icon: null,
                        onOk() {
                            dispatch({ type: 'removeCharacter', value: id});
                        },
                      });
                    }} />
                ),
              },);
        }
        return fields;
    }, [wider, dispatch]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const newInitiatives = arrayMove([].concat(initiatives), oldIndex, newIndex).filter(el => !!el);
            dispatch({ type: "sortInitiatives", initiatives: newInitiatives });
        }
    };

    const DraggableBodyRow = ({ className, style, ...restProps }) => {
        const index = initiatives.findIndex(x => x.id === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };

    const DraggableContainer = props => (
        <SortableContainer
            useDragHandle
            helperClass="row-dragging"
            onSortEnd={onSortEnd}
            {...props}
        />
    );

    return (
        <div style={{ 
                height: '100vh',
                overflowX: 'hidden',
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRight: 'solid 2px lightgrey'
            }} >
            <Table
                style={{ height: 'calc(100vh - 35px)', overflow: 'scroll', overflowX: 'hidden' }}
                pagination={false}
                dataSource={initiatives}
                columns={columns}
                rowKey="id"
                rowSelection={{
                    type: 'radio',
                    onChange: ([id]) => dispatch({ type: "select", value: id }),
                }}
                components={{
                    body: {
                        wrapper: DraggableContainer,
                        row: DraggableBodyRow,
                    },
                }}
            />
            <Row style={{ height: '40px' }} >
                <Col span={12}>
                    <Button
                        size="large"
                        style={{ maxWidth: '150px', height: '100%' }}
                        type="primary"
                        disabled={initiatives.length < 2}
                        onClick={() => dispatch({ type: "back" })} >
                        Go Back
                     </Button>
                </Col>
                <Col span={12} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button
                        size="large"
                        style={{ maxWidth: '150px', height: '100%' }}
                        type="primary"
                        disabled={initiatives.length < 2}
                        onClick={() => dispatch({ type: "next" })} >
                        Next Character
                    </Button>
                </Col>
            </Row>
        </div>
    );
}
export default CharacterList;
