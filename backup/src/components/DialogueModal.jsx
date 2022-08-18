import React from 'react'
import Draggable from 'react-draggable';
import { Scrollbars } from 'react-custom-scrollbars';

function DialogueModal(props) {
    const [responces, setResponces] = React.useState([]);
    const [topic, setTopic] = React.useState("");
    const onKeyDown = ({key}) => {
        if (key === 'Escape') props.onClose()
    }
    
    const modalAbove = () => {
        if (props.visible && props.name) {
            if (props.modalZindex && props.modalZindex.includes(props.name)) {
                props.setModalZindex([...props.modalZindex.filter(item => item !== props.name), props.name])
            }
            else {
                (props.modalZindex === []) ? props.setModalZindex(['', props.name]) : props.setModalZindex([...props.modalZindex, props.name])
            }
        }
        else {
            if (props.modalZindex && props.modalZindex.includes(props.name)) {
                props.setModalZindex([...props.modalZindex.filter(item => item !== props.name)])
            }
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    })

    React.useEffect(() => {
        if (props.visible) {
            modalAbove()
            setResponces([])
            setTopic("")
        }
    }, [props.visible])

    React.useEffect(() => {
        if (props.visible && props.name && props.modalZindex && props.modalZindex.includes(props.name)) document.getElementById(props.name).style.zIndex = 99 + props.modalZindex.indexOf(props.name);
        else if (props.visible && props.name) document.getElementById(props.name).style.zIndex = 99;
        
    }, [props.name, props.visible, props.modalZindex])

    if (!props.visible) return null
    return (
        <Draggable handle=".modal-header">
            <div id={props.name} className="modal" onClick={modalAbove}>
                <div className="modal-header">
                    <div className="modal-header__left"></div>
                    <div className="modal-header__name">{props.name}</div>
                    <div className="modal-header__right"></div>
                </div>
                <div className="dialogue-container">
                    <div className="dialogue-container-responces">
                        
                    <Scrollbars
                        renderThumbVertical={({ style, ...props }) =>
                        <div {...props} style={{ ...style, backgroundColor: 'rgb(202,165,96)'}}/>
                        } renderThumbHorizontal={({ style, ...props }) =>
                        <div {...props} style={{ ...style, backgroundColor: 'rgb(202,165,96)'}}/>
                    }>
                        <div className="dialogue-container-responces__header">{topic}</div>
                        {responces.map((val) => 
                            <div className="responce-wrapper">
                                <div className="dialogue-container-responces-conditions">
                                {val["answerFilters"].map((val) => 
                                    <div className="dialogue-container-responces-conditions-slot">
                                        <span className="if">if </span>
                                        {val["filter_function"] + ' ' + 
                                        val["filter_comparison"] + ' ' + 
                                        val["id"] + ' ' +
                                        val["value"][Object.keys(val["value"])[0]]}
                                    </div>)}
                                </div>
                                <div className="responces-border">
                                    <div className="dialogue-container-responces__unit">
                                        <span>{val["answerText"]}</span><span className="dialogue-container-responces__disp"> (Disp: {val["answerDisp"]})</span>
                                    </div>

                                    {val["answerResult"] && <div className="dialogue-container-responces__result">
                                        {val["answerResult"]}
                                    </div>}
                                </div>

                            </div>
                        )}
                    </Scrollbars>
                    </div>
                    <div className="dialogue-container-topics" onClick={e => e.stopPropagation()}>
                        
                        <Scrollbars
                            renderThumbVertical={({ style, ...props }) =>
                            <div {...props} style={{ ...style, backgroundColor: 'rgb(202,165,96)'}}/>
                            } renderThumbHorizontal={({ style, ...props }) =>
                            <div {...props} style={{ ...style, backgroundColor: 'rgb(202,165,96)'}}/>
                        }>
                            <div className="topics-wrapper" onClick={modalAbove}>
                            {props.npcAnswers.map((obj) => 
                                <div className="dialogue-container-topics__unit" onClick={() => {
                                    setTopic(obj["npcTopic"])
                                    obj["npcAnswers"] && setResponces(obj["npcAnswers"])}}>
                                    <p>{obj["npcTopic"]}</p>
                                </div>
                            )}
                            </div>
                        </Scrollbars>
                        
                        <button onClick={() => {props.onClose()
                             modalAbove()
                             setResponces([])
                             setTopic("")}} className="modal-button">Goodbye</button>
                    </div>
                </div>
            </div>
    </Draggable>
    )
}

export default DialogueModal
