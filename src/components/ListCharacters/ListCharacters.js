import {useMemo} from 'react';
import { Table, Tag, Modal, Row, Col, Button, Typography } from 'antd';
import { sortableContainer, sortableElement, sortableHandle, arrayMove } from 'react-sortable-hoc';
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';

import { useStateValueInitiatives as useStateValue } from '../../state-manager/context';
import { BACK, NEXT, REMOVE_CHARACTER, SELECT, SET_INITIATIVES } from '../../state-manager/initiatives/actions';

import classes from './ListCharacters.module.css';

const { Text } = Typography;
const { confirm } = Modal;

const DragHandle = sortableHandle(() => (
    <MenuOutlined style={{ width: '15px' ,cursor: 'pointer', color: '#999' }} />
));

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

const getTime = (count = 0) => {
    var date = new Date(null);
    date.setSeconds(count);
    return date.toISOString().substring(11, 19);
};

const ListCharacters = () => {
    const [{ initiatives, rounds, time }, dispatch] = useStateValue();

    const columns = useMemo(() => {
        return [
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
                key: 'initiative',
                dataIndex: 'initiative',
            },
            {
                title: 'HP',
                render: ({hitpoints, monster}) => (
                    <span style={{ fontWeight: 500 , color: hitpoints > 0 || !monster ? 'green' : 'red'}}>{hitpoints}</span>
                )
            },
            {
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
            },
            {
                key: 'id',
                render: ({id, name}) => (
                  <DeleteOutlined onClick={() => {
                    confirm({
                        title: `Do you Want to delete ${name ?? ''}?`,
                        icon: null,
                        onOk() {
                            dispatch({ type: REMOVE_CHARACTER, value: id});
                        },
                      });
                    }} />
                ),
            }
        ];
    }, [dispatch]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const newInitiatives = arrayMove([].concat(initiatives), oldIndex, newIndex).filter(el => !!el);
            dispatch({ type: SET_INITIATIVES, value: newInitiatives });
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
        <section className={classes['list-characters-container']} >
            <Table
                className={classes['list-characters-table']}
                pagination={false}
                dataSource={initiatives}
                columns={columns}
                rowKey="id"
                rowSelection={{
                    type: 'radio',
                    onChange: ([id]) => dispatch({ type: SELECT, value: id }),
                }}
                components={{
                    body: {
                        wrapper: DraggableContainer,
                        row: DraggableBodyRow,
                    },
                }}
            />
            <Row style={{ height: '40px', display: 'flex', justifyContent: 'space-between' }} >
                <Col>
                    <Button
                        size="large"
                        style={{ maxWidth: '150px', height: '100%' }}
                        type="primary"
                        title="Previous turn"
                        disabled={initiatives.length < 2}
                        onClick={() => dispatch({ type: BACK })} >
                        Back
                     </Button>
                </Col>
                <Col>
                    <Text keyboard>Rounds: {rounds}</Text>
                </Col>
                <Col>
                    <Text keyboard>Time: {getTime(time)}</Text>
                </Col>
                <Col>
                    <Button
                        size="large"
                        style={{ maxWidth: '150px', height: '100%' }}
                        type="primary"
                        title="Next turn"
                        disabled={initiatives.length < 2}
                        onClick={() => dispatch({ type: NEXT })} >
                        Next
                    </Button>
                </Col>
            </Row>
        </section>
    );
};

export default ListCharacters;
