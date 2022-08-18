import React from 'react'
import { NpcCard } from '.'
import { Scrollbars } from 'react-custom-scrollbars';

function WorkAreaNpcTopic(props) {
    const [modalZindex, setModalZindex] = React.useState([]);
    const [npcTopicData, setNpcTopicData] = React.useState([]);

    React.useEffect(() => {
        let newNpcData = []
        /*
        [{"npcName": "name",
          "npcTopics": [
              {"npcTopic": "topic"
               "npcAnswers": [
                   { "answerText": "text",
                     "answerResult": "result",
                     "answerDisp": "disp",
                     "answerFilters": []}
               ]},...
          ]},...]
        */
        for (let i = 0; i < props.topicsData.length; i++) {
            let topicName = props.topicsData[i]["topicName"]
            for (let j = 0; j < props.topicsData[i]["topicAnswers"].length; j++) {
                let topicNpc = props.topicsData[i]["topicAnswers"][j]["topicNpc"];
                let topicText = props.topicsData[i]["topicAnswers"][j]["topicText"];
                let topicResult = props.topicsData[i]["topicAnswers"][j]["topicResult"];
                let topicFilters = props.topicsData[i]["topicAnswers"][j]["topicFilters"];
                let topicDisp = props.topicsData[i]["topicAnswers"][j]["topicDisp"];
                let answerDict = {"answerText": topicText,
                                    "answerResult": topicResult,
                                    "answerFilters": topicFilters,
                                    "answerDisp": topicDisp}
                if (newNpcData.some(e => e["npcName"] === topicNpc)) {
                    let npcIndex = newNpcData.findIndex(x => x["npcName"] === topicNpc)
                    if (newNpcData[npcIndex]["npcTopics"].some(e => e["npcTopic"] === topicName)) {
                        let topicIndex = newNpcData[npcIndex]["npcTopics"].findIndex(x => x["npcTopic"] === topicName)
                        newNpcData[npcIndex]["npcTopics"][topicIndex]["npcAnswers"].unshift(answerDict)
                    }
                    else {
                        newNpcData[npcIndex]["npcTopics"].push({"npcTopic": topicName, "npcAnswers": [answerDict]})
                    }
                }
                else {
                    newNpcData.push(
                        {"npcName": topicNpc, 
                         "npcTopics": [
                             {"npcTopic": topicName, 
                              "npcAnswers": [answerDict]}]
                        })
                }

            }
        }
        setNpcTopicData(newNpcData)
    }, [props.topicsData])

    return (
        <div className="workarea-topic">
            <div className="zone-wrapper">
                <Scrollbars
                    renderThumbVertical={({ style, ...props }) =>
                    <div {...props} style={{ ...style, backgroundColor: 'rgb(202,165,96)'}}/>
                } renderThumbHorizontal={({ style, ...props }) =>
                <div {...props} style={{ ...style, backgroundColor: 'rgb(202,165,96)'}}/>
                }>
                    <div className="npc-page">
                        {npcTopicData.map((obj) => 
                            <NpcCard key={obj["topicNpc"]} name={obj["npcName"]} npcAnswers={obj["npcTopics"]} modalZindex={modalZindex} setModalZindex={setModalZindex}/>
                        )}
                    </div>
                </Scrollbars>
            </div>
        </div>
    )
}

export default WorkAreaNpcTopic
