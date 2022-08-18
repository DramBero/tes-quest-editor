import React from 'react'
import useCollapse from 'react-collapsed'
import { JournalQuestEntry } from '.';

function JournalQuest(props) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="journal-quest">
        <span className="journal-quest-title" {...getToggleProps()}>{isExpanded ? '▴ ' : '▾ '}{props.questName}</span>
        <span className="journal-quest-id">{props.questId}</span>
        <div className="journal-quest-expanded" {...getCollapseProps()}>
            {props.questEntries.map((obj, ind) =>
                <JournalQuestEntry key={ind} entryText={obj["entryText"]} entryIndex={obj["entryIndex"]} entryFinish={obj["entryFinish"]}/>
            )}
        </div>
    </div>
    )
}

export default JournalQuest
