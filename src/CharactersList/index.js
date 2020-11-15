import React, {useMemo} from 'react';
import { Table, Tag } from 'antd';
import { sortableContainer, sortableElement, sortableHandle, arrayMove } from 'react-sortable-hoc';

import { MenuOutlined } from '@ant-design/icons';
import { Row, Col, Button } from 'antd';

const DragHandle = sortableHandle(() => (
    <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);


const CharacterList = ({ state: { initiatives: initiativesRaw, initiatives_position }, dispatch, wider }) => {
    const initiatives = initiativesRaw
                        .slice(initiatives_position)
                        .concat(
                            initiativesRaw
                                .slice(0, initiatives_position)
                        );

    const columns = useMemo(() => {
        const fields = [
            {
                title: 'Sort',
                dataIndex: 'sort',
                width: 30,
                className: 'drag-visible',
                render: () => <DragHandle />,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                className: 'drag-visible',
            },
            {
                title: 'Initiative',
                key: 'value',
                dataIndex: 'value',
            }
        ];

        if(wider){
            fields.push({
                title: 'HP',
                dataIndex: 'hitpoints',
                key: 'hitpoints',
            });
            fields.push({
                title: 'Conditions',
                dataIndex: 'conditions',
                key: 'conditions',
                render: tags => (
                    <span>
                      {tags.map( ({color, condition}) => (
                          <Tag color={color} key={condition}>
                            {condition}
                          </Tag>
                        ))}
                    </span>
                  ),
            });
            fields.push({
                title: 'Action',
                key: 'id',
                dataIndex: 'id',
                render: id => (
                  <a onClick={() => dispatch({ type: 'removeInitiative', value: id})}>Delete</a>
                ),
              },);
        }
        return fields;
    }, [wider, dispatch]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const newData = arrayMove([].concat(initiativesRaw), oldIndex, newIndex).filter(el => !!el);
            console.log('Sorted items: ', newData);
            dispatch({ type: "sortInitiatives", initiatives: newData });
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
        <>
            <Row style={{ height: '40px' }} >
                <Col span={12}>
                    <Button
                        size="large"
                        style={{ maxWidth: '150px', height: '100%' }}
                        type="primary"
                        disabled={initiativesRaw.length < 2}
                        onClick={() => dispatch({ type: "back" })} >
                        Back
                     </Button>
                </Col>
                <Col span={12} style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button
                        size="large"
                        style={{ maxWidth: '150px', height: '100%' }}
                        type="primary"
                        disabled={initiativesRaw.length < 2}
                        onClick={() => dispatch({ type: "next" })} >
                        Next
                         </Button>
                </Col>
            </Row>
            <Table
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

        </>
    );
}
export default CharacterList;
// export default function CharactersList({ state, dispatch, wider }) {
//     return (
//         <>
//             <Menu style={{ maxHeight: 'calc(100vh - 40px)', overflow: 'scroll', overflowX: 'hidden' }} >
//                 {state.initiatives
//                     .slice(state.initiatives_position)
//                     .concat(
//                         state.initiatives
//                             .slice(0, state.initiatives_position)
//                     )
//                     .map(({ value, name, id, hitpoints, monster }) => (
//                         <Menu.Item
//                             style={{ height: '50px' }}
//                             key={id}
//                             onClick={() => dispatch({ type: "select", value: id })}
//                             icon={<Avatar size={50} style={{ fontSize: 25, fontWeight: 700, color: 'blue' }}>{value}</Avatar>}>
//                             <Avatar
//                                 size={50}
//                                 style={{
//                                     textAlign: 'end',
//                                     fontSize: 25,
//                                     fontWeight: 500,
//                                     marginLeft: 20,
//                                     color: 'white',
//                                     backgroundColor: hitpoints > 0 ? 'green' : 'red'
//                                 }}>
//                                 {hitpoints}
//                             </Avatar>
//                             <span className="initiative">{name}</span>
//                         </Menu.Item>
//                     ))}
//             </Menu>
//         </>
//     )
// }
