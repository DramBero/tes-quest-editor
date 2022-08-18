import React from 'react'
import Draggable from 'react-draggable';
import { Scrollbars } from 'react-custom-scrollbars';
import useCollapse from 'react-collapsed';
import reactStringReplace from 'react-string-replace';

function DialogueModal(props) {
    const [responces, setResponces] = React.useState([]);
    const [greetToggle, setGreetToggle] = React.useState(true);
    const [topic, setTopic] = React.useState("");
    const { getCollapseProps, getToggleProps} = useCollapse({defaultExpanded: true});
    
    const topicList = props.topicsData.filter((obj) => 
    (obj["topicType"] === "Persuasion" || obj["topicType"] === "Greeting" || obj["topicType"] === "Topic") &&
    (obj["topicAnswers"].some(e => e["topicNpc"] === props.name) || 
    obj["topicAnswers"].some(e => e["topicCell"] === props.name))
    )

    const onKeyDown = ({key}) => {
        if (key === 'Escape') props.onClose()
    }
    
    const hyperLink = (text) => {
        for (let topic in topicList) {
            text = reactStringReplace(text, topicList[topic]["topicName"], (match, i) => (
                <span key={topic + i} className="hyperlink" onClick={() => {
                    setTopic(topicList[topic]["topicName"])
                    setResponces(topicList[topic]["topicAnswers"])}}>{match}</span>
            ))
        }
        return text
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
                    <div className="modal-header__name">{props.name !== "" ? props.name : "GLOBAL"}</div>
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
                        {responces.filter((obj) => obj["topicNpc"] === props.name || obj["topicCell"] === props.name).map((val, i) => 
                            <div key={i} className="responce-wrapper">
                                <div className="dialogue-container-responces-conditions">
                                {val["topicDisp"] ?
                                    <div className="dialogue-container-responces-conditions-slot">
                                        <span className="if">if </span>
                                        {'Disp > ' + val["topicDisp"]}
                                    </div> : ''}
                                {val["topicFilters"].map((val) => 
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
                                        <span>{hyperLink(val["topicText"])}</span>
                                    </div>

                                    {val["topicResult"] && <div className="dialogue-container-responces__result">
                                        {val["topicResult"]}
                                    </div>}
                                </div>

                            </div>
                        )}
                    </Scrollbars>
                    </div>
                    <div className="dialogue-container-topics" onClick={e => e.stopPropagation()}>
                        
                        <div className="dialogue-container-topics-other">
                            <div className="dialogue-container-topics-other-topic">
                                <div className="dialogue-container-topics-other-topic__header" 
                                onClick={() => setGreetToggle(!greetToggle)}>Greetings:</div>
                                {greetToggle && <div className="dialogue-container-topics-other-topic-subtopics">
                                    {props.topicsData.filter((obj) => 
                                    obj["topicType"] === "Greeting" &&
                                    (obj["topicAnswers"].some(e => e["topicNpc"] === props.name) || 
                                    obj["topicAnswers"].some(e => e["topicCell"] === props.name))
                                    ).map((obj, i) => 
                                        <div key={i} className="dialogue-container-topics-other-topic-subtopics__elem" onClick={() => {
                                            setTopic(obj["topicName"])
                                            obj["topicAnswers"] && setResponces(obj["topicAnswers"])}}>
                                            <p>{obj["topicName"]}</p>
                                        </div>
                                    )}
                                </div>}
                            </div>
                            <div className="dialogue-container-topics-other-topic">
                                <div className="dialogue-container-topics-other-topic__header" {...getToggleProps()}>Persuasion:</div>
                                <div className="dialogue-container-topics-other-topic-subtopics" {...getCollapseProps()}>
                                    {props.topicsData.filter((obj) => 
                                    obj["topicType"] === "Persuasion" &&
                                    (obj["topicAnswers"].some(e => e["topicNpc"] === props.name) || 
                                    obj["topicAnswers"].some(e => e["topicCell"] === props.name))
                                    ).map((obj, i) => 
                                        <div key={i} className="dialogue-container-topics-other-topic-subtopics__elem" onClick={() => {
                                            setTopic(obj["topicName"])
                                            obj["topicAnswers"] && setResponces(obj["topicAnswers"])}}>
                                            <p>{obj["topicName"]}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <Scrollbars
                            renderThumbVertical={({ style, ...props }) =>
                            <div {...props} style={{ ...style, backgroundColor: 'rgb(202,165,96)'}}/>
                            } renderThumbHorizontal={({ style, ...props }) =>
                            <div {...props} style={{ ...style, backgroundColor: 'rgb(202,165,96)'}}/>
                        }>
                            <div className="topics-wrapper" onClick={modalAbove}>
                            {props.topicsData.filter((obj) => 
                                obj["topicType"] === "Topic" &&
                                (obj["topicAnswers"].some(e => e["topicNpc"] === props.name) || 
                                obj["topicAnswers"].some(e => e["topicCell"] === props.name))
                                ).map((obj, i) => 
                                <div key={i} className="dialogue-container-topics__unit" onClick={() => {
                                    setTopic(obj["topicName"])
                                    obj["topicAnswers"] && setResponces(obj["topicAnswers"])}}>
                                    <p>{obj["topicName"]}</p>
                                </div>
                            )}
                            </div>
                        </Scrollbars>
                        
                        <div onClick={() => {props.onClose()
                             modalAbove()
                             setResponces([])
                             setTopic("")}} className="modal-button">Goodbye</div>
                    </div>
                </div>
            </div>
    </Draggable>
    )
}

/*
topicsData = [{"topicName": name,
               "topicAnswers": [{
                   "topicFilter": [],
                   "topicNpc": npc,
                   "topicCell": cell,
                   "topicText": text,
                   "topicResult": result,
                   "topicDisp": disp
               }]}]
*/

export default DialogueModal
