import React from 'react'

function JournalQuestEntry(props) {
    const [entryStyle, setEntryStyle] = React.useState([]);

    React.useEffect(() => {
        setEntryStyle("journal-quest-entry")
        if (props.entryFinish) {
            setEntryStyle("journal-quest-entry journal-quest-entry_finished")
        }
    }, [props.entryFinish])

    return (
    <div className={entryStyle}>
        {props.advancedMode
            ? <div className="journal-quest-entry-id">
                <div>{props.entryId}</div>
                <div>▴{props.prevId}</div>
            </div>
            : ''
        }
        <div className="journal-quest-entry-body">
            {props.editMode 
                ? <div contenteditable="true" className="journal-quest-entry__text journal-quest-entry__text_edit">{props.entryText}</div>
                : <div className="journal-quest-entry__text">{props.entryText}</div>
            }
            {props.editMode 
                ? <div contenteditable="true" className="journal-quest-entry__index journal-quest-entry__text_edit">{props.entryIndex}</div>
                : <div className="journal-quest-entry__index">{props.entryIndex}</div>
            }
        </div>
        {props.advancedMode
            ? <div className="journal-quest-entry-id">
                <div>{props.nextId}▾</div>
                <div>{props.entryId}</div>
            </div>
            : ''
        }
    </div>
    )
}

export default JournalQuestEntry
