import React from 'react'
import JournalQuest from './JournalQuest'
import { Scrollbars } from 'react-custom-scrollbars';
import WorkAreaNpcTopic from './WorkAreaNpcTopic';

function getJournalData(pluginData) {
    let journalData = []
    let topicsData = []
    if (pluginData === undefined) return []
    for (let i = 0; i < pluginData.length; i++) {
        if (pluginData[i]["type"] === "Dialogue" && pluginData[i]["dialogue_type"] === "Journal") {
            let questData = {}
            questData["questId"] = pluginData[i]["id"]
            questData["questEntries"] = []
            for (let j = 1; j < pluginData.length - i; j++) {
                if (pluginData[i+j]["type"] !== "Info") break
                if (pluginData[i+j].hasOwnProperty("data") === false) break
                if (pluginData[i+j]["data"].hasOwnProperty("dialogue_type") === false) break
                if (pluginData[i+j]["data"]["dialogue_type"] !== "Journal") break
                else {
                    if (pluginData[i+j]["quest_name"] === 1) {
                        questData["questName"] = pluginData[i+j]["text"]
                    }
                    else if ("text" in pluginData[i+j]) {
                        let questEntry = {}
                        questEntry["entryText"] = pluginData[i+j]["text"]
                        questEntry["entryIndex"] = pluginData[i+j]["data"]["disposition"]
                        if (pluginData[i+j].hasOwnProperty("quest_finish")) {
                            if (pluginData[i+j]["quest_finish"] === 1) {
                                questEntry["entryFinish"] = true
                            }
                            else {
                                questEntry["entryFinish"] = false
                            }
                        }
                        else {
                            questEntry["entryFinish"] = false
                        }
                        questData["questEntries"].push(questEntry)
                    }
                }
            }
            journalData.push(questData)
        }
        if (pluginData[i]["type"] === "Dialogue" && pluginData[i]["dialogue_type"] === "Topic") {
            if (pluginData[i].hasOwnProperty("id") === false) continue
            let topicData = {}
            topicData["topicName"] = pluginData[i]["id"]
            let topicAnswers = []
            for (let j = 1; j < pluginData.length - i; j++) {
                let topicAnswer = {}
                if (pluginData[i+j]["type"] !== "Info") break
                if (pluginData[i+j].hasOwnProperty("data") === false) break
                if (pluginData[i+j].hasOwnProperty("speaker_id") === false) break
                if (pluginData[i+j].hasOwnProperty("text") === false) break
                if (pluginData[i+j]["data"].hasOwnProperty("dialogue_type") === false) break
                if (pluginData[i+j]["data"]["dialogue_type"] !== "Topic") break
                topicAnswer["topicNpc"] = pluginData[i+j]["speaker_id"]
                topicAnswer["topicText"] = pluginData[i+j]["text"]
                if (pluginData[i+j].hasOwnProperty("result") === true) {
                    topicAnswer["topicResult"] = pluginData[i+j]["result"]
                }
                else {
                    topicAnswer["topicResult"] = ""
                }
                if (pluginData[i+j].hasOwnProperty("filters") === true) {
                    topicAnswer["topicFilters"] = pluginData[i+j]["filters"]
                    for (let k = 0; k < topicAnswer["topicFilters"].length; k++) {
                        switch(topicAnswer["topicFilters"][k]["filter_comparison"]) {
                            case "Equal":
                                topicAnswer["topicFilters"][k]["filter_comparison"] = "=="
                                break
                            case "Less":
                                topicAnswer["topicFilters"][k]["filter_comparison"] = "<"
                                break
                            case "GreaterEqual":
                                topicAnswer["topicFilters"][k]["filter_comparison"] = ">="
                                break
                            case "NotEqual":
                                topicAnswer["topicFilters"][k]["filter_comparison"] = "!="
                                break
                            case "LesserEqual":
                                topicAnswer["topicFilters"][k]["filter_comparison"] = "<="
                                break
                            case "Greater":
                                topicAnswer["topicFilters"][k]["filter_comparison"] = ">"
                                break
                            default:
                                break
                        }
                    }
                }
                else {
                    topicAnswer["topicFilters"] = []
                }
                if (pluginData[i+j]["data"].hasOwnProperty("disposition") === true) {
                    topicAnswer["topicDisp"] = pluginData[i+j]["data"]["disposition"]
                }
                else {
                    topicAnswer["topicDisp"] = 0
                }
                topicAnswers.push(topicAnswer)
            }
            topicData["topicAnswers"] = topicAnswers
            topicsData.push(topicData)
        }
    }
    let newPluginData = [journalData, topicsData]
    return newPluginData
}

function WorkArea() {
    const [journalData, setJournalData] = React.useState([[], []]);

    React.useEffect(() => {
        fetch('http://localhost:3000/input/tribunal.json').then((resp) => resp.json()).then((json) => {setJournalData(getJournalData(json));
        });
    }, []);

    console.log(journalData)

    return (
        <div className="workarea">
            <div className="workarea-journal">
                <div className="zone-wrapper">
                    <Scrollbars>
                        {journalData[0].map((obj, ind) => 
                            <JournalQuest key={ind} questName={obj["questName"]} questId={obj["questId"]} questEntries={obj["questEntries"]}/>
                        )}
                    </Scrollbars>
                </div>
            </div>
            <WorkAreaNpcTopic topicsData={journalData[1]}/>
        </div>
    )
}

export default WorkArea
