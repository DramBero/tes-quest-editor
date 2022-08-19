import React, { useEffect } from 'react'
import useCollapse from 'react-collapsed'
import { useSelector, useDispatch } from 'react-redux';
import { JournalQuestEntry } from '.';
import { addQuestEntryByInfoId, removeEntry, setEntryFinish } from '../redux/journalSlice';
import { CSSTransition } from 'react-transition-group';

/*
{questId: 
    'questEntries': {infoId:
                      {'entryText': entryText, 
                      'entryIndex': entryIndex, 
                      'entryFinish': entryFinish, 
                      'prevId': prevId, 
                      'nextId': nextId}
                    }
    'questName': questName,
    }
  }
  */

const generateId = () => {
    return Math.floor(Math.random() * 9999999999).toString() + Math.floor(Math.random() * 9999999999).toString()
}

function JournalQuest(props) {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = React.useState(false);
    const [advancedMode, setAdvancedMode] = React.useState(false);
    let questEntries = useSelector(state => state.journal.data[props.questId].questEntries)

    useEffect(() => {
      }, [questEntries]);

    if (questEntries === undefined) {
        questEntries = {'questName': '', 
        'entryText': '', 
        'entryIndex': 0, 
        'entryFinish': false, 
        'prevId': 0, 
        'nextId': 0}
    }
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="journal-quest">
            <div className="journal-quest-wrapper">
                <div className="journal-quest-header">
                    <button className="journal-quest-title" {...getToggleProps()}>{isExpanded ? '▴ ' : '▾ '}{props.questName}</button>
                    <span className="journal-quest-id">{props.questId}</span>
                </div>
                {editMode 
                ?   <>
                        <button className="edit-mode">🗑</button>
                        <button className="edit-mode" onClick={() => setAdvancedMode(!advancedMode)}>⚙</button>
                        <button className="edit-mode" onClick={() => {setEditMode(false); setAdvancedMode(false)}}>✓</button>
                    </>
                : <button className="edit-mode" onClick={() => setEditMode(true)}>✎</button>
                }
            </div>
            <div className="journal-quest-expanded" {...getCollapseProps()}>
                {Object.keys(questEntries).map((obj) =>
                    <div className="entry-wrapper">
                        {editMode
                        ? 
                        <CSSTransition in={editMode} timeout={200} classNames="my-node">
                            <button className="delete-entry" onClick={() => 
                            {dispatch(setEntryFinish({questId: props.questId, infoId: obj, entryFinish: !questEntries[obj]["entryFinish"]}))
                            }}>⚑</button>
                        </CSSTransition>
                        : ''
                        }
                        <JournalQuestEntry 
                            key={obj} 
                            editMode={editMode} 
                            advancedMode={advancedMode} 
                            entryText={questEntries[obj]["entryText"]} 
                            entryIndex={questEntries[obj]["entryIndex"]} 
                            entryFinish={questEntries[obj]["entryFinish"]} 
                            entryId={obj} 
                            prevId={questEntries[obj]["prevId"]} 
                            nextId={questEntries[obj]["nextId"]}
                            />
                        {editMode
                        ? 
                        <CSSTransition in={editMode} timeout={200} classNames="my-node">
                            <button className="delete-entry" onClick={() => 
                            {dispatch(removeEntry({questId: props.questId, infoId: obj}))
                            }}>⨯</button>
                        </CSSTransition>
                        : ''
                        }
                    </div>
                )}
                {editMode && <button className="add-entry" onClick={() => 
                            {dispatch(addQuestEntryByInfoId({questId: props.questId, infoId: generateId()}))
                            }}>+</button>}
            </div>
        </div>
    )
}

export default JournalQuest
