import React, { useEffect, useReducer, useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import CharactersList from './CharactersList';
import AddCharacter from './AddCharacter';
import HitPointsConditionsManager from './HitPointsConditionsManager';

const { TabPane } = Tabs;

const initialState = { initiatives: [], selected: null, inputInitiative: 0, inputName: '', inputHitpoints: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'addInitiative': {
            const initiative = {
                value: state.inputInitiative ?? 0,
                name: state.inputName ?? '',
                hitpoints: state.inputHitpoints,
                id: Date.now(),
                monster: action.monster,
                conditions: []
            };
            const initiatives = [...state.initiatives, initiative].sort((a, b) => b.value - a.value);
            return { ...state, initiatives, inputInitiative: 0, inputName: '', inputHitpoints: 0 };
        }
        case 'sortInitiatives': {
            return { ...state, initiatives: action.initiatives };
        }
        case 'removeInitiative': {
            const initiatives = state.initiatives.filter(({ id }) => id !== action.value);

            return { ...state, initiatives, selected: state.selected === action.value ? null : state.selected};
        }
        case 'writeInputInitiative': {
            const inputInitiative = parseInt(state.inputInitiative + action.value);
            return { ...state, inputInitiative };
        }
        case 'writeInputName': {
            const inputName = state.inputName + action.value;
            return { ...state, inputName };
        }
        case 'writeInputHitpoints': {
            const inputHitpoints = parseInt(state.inputHitpoints + action.value);
            return { ...state, inputHitpoints };
        }
        case 'deleteInputInitiative': {
            return { ...state, inputInitiative: 0 };
        }
        case 'deleteInputHitpoints': {
            return { ...state, inputHitpoints: 0 };
        }
        case 'deleteInputName': {
            return { ...state, inputName: '' };
        }
        case 'negativeInputInitiative': {
            return { ...state, inputInitiative: -state.inputInitiative };
        }
        case 'next': {
            return { 
                ...state,
                initiatives: state.initiatives.slice(1).concat(state.initiatives.slice(0, 1))
            };
        }
        case 'back': {
            return {
                ...state,
                initiatives: state.initiatives.slice(-1).concat(state.initiatives.slice(0, -1))
            };
        }
        case 'select': {
            return { ...state, selected: action.value };
        }
        case 'editHitpoints': {
            const initiatives = state.initiatives.map(ini => {
                if (ini.id === state.selected) {
                    const copy = cloneDeep(ini);
                    copy.hitpoints = copy.hitpoints + action.value;
                    return copy;
                }
                return ini;
            })
            return { ...state, initiatives };
        }
        case 'editCondition': {
            const initiatives = state.initiatives.map(ini => {
                if (ini.id === state.selected) {
                    const copy = cloneDeep(ini);
                    copy.conditions.push(action.value);
                    return copy;
                }
                return ini;
            })
            return { ...state, initiatives };
        }
        case 'removeCondition': {
            const initiatives = state.initiatives.map(ini => {
                if (ini.id === state.selected) {
                    const copy = cloneDeep(ini);
                    copy.conditions = copy.conditions.filter( cond => cond.condition !== action.value.condition);
                    return copy;
                }
                return ini;
            })
            return { ...state, initiatives };
        }
        case 'clean': {
            return { ...state, inputInitiative: 0, inputName: '', inputHitpoints: 0, selected: null };
        }
        default:
            throw new Error();
    }
}

export default function App({storedState}) {
    const [state, dispatch] = useReducer(reducer, storedState ?? initialState);
    const [activeTab, setTab] = useState("2");

    useEffect(() => {
        localStorage.setItem("storedState", JSON.stringify(state))
    }, [state]);


    useEffect(() => {
        if(!state.selected){
            setTab("2");
        } else {
            setTab("1");
        }
    }, [state.selected]);

    return (
        <Row gutter={[16, 16]} style={{ width: "100%", height: "100%" }}>
            <Col span={activeTab === "2" ? 8 : 12} >
                <CharactersList state={state} dispatch={dispatch} wider={activeTab === "1"} />
            </Col>
            <Col  span={activeTab === "2" ? 16 : 12} >
                <Tabs onChange={setTab} activeKey={activeTab}>
                    <TabPane tab="Add Character" key="2">
                        <AddCharacter state={state} dispatch={dispatch} />
                    </TabPane>
                    <TabPane disabled={!state.selected} tab="Character Manager" key="1">
                        <HitPointsConditionsManager state={state} dispatch={dispatch} />
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    )
}
