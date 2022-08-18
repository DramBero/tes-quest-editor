import React from 'react'

function JournalQuestEntry(props) {
    const [entryStyle, setEntryStyle] = React.useState([]);
    const [toggle, setToggle] = React.useState(true)

    React.useEffect(() => {
        setEntryStyle("journal-quest-entry")
        if (props.entryFinish) {
            setEntryStyle("journal-quest-entry journal-quest-entry_finished")
        }
    }, [props.entryFinish])

    function useOutsideChecker(ref) {
        React.useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setToggle(true)
                }
            }
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [ref])
    }
    const wrapperRef = React.useRef(null)
    useOutsideChecker(wrapperRef)
    return (
    <div className={entryStyle}>
        {toggle ? (
            <div className="journal-quest-entry__text" onDoubleClick={() => {setToggle(false)}}>{props.entryText}</div>
            ) : (
            <div ref={wrapperRef} contenteditable="true" className="journal-quest-entry__text journal-quest-entry__text_edit"
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === 'Escape') {
                        setToggle(true)
                        event.preventDefault()
                        event.stopPropagation()
                    }
                }}
            >{props.entryText}</div>
            )}
        <div className="journal-quest-entry__index">{props.entryIndex}</div>
    </div>
    )
}

export default JournalQuestEntry
