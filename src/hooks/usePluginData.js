
import React from 'react';
import { useDispatch } from 'react-redux';
import { 
    addQuestById, 
    addQuestEntryByInfoId, 
    setEntryFinish, 
    setEntryIndex, 
    setEntryNextId, 
    setEntryPrevId, 
    setEntryText, 
    setQuestName 
} from '../redux/journalSlice'

const usePluginData = (pluginData) => {

    function toSymbols(word) {
        switch(word) {
            case "Equal":
                return "=="
            case "Less":
                return "<"
            case "GreaterEqual":
                return ">="
            case "NotEqual":
                return "!="
            case "LessEqual":
                return "<="
            case "Greater":
                return ">"
            default:
                return word
        }
    }

        const dispatch = useDispatch()
        // let journalData = []
        // let topicsData = []
        // let npcData = new Set()
        // let cellData = new Set()
        if (pluginData === undefined) return []
        let questIds = []
        for (let i = 0; i < pluginData.length; i++) {
            if (pluginData[i]["type"] === "Dialogue" && pluginData[i]["dialogue_type"] === "Journal") {
                if (pluginData[i]["id"] in questIds) {
                    break
                }
                else {
                    questIds.push(pluginData[i]["id"])
 //                   React.useEffect(() => {dispatch(addQuestById(pluginData[i]["id"])), [pluginData[i]["id"]]})
                    dispatch(addQuestById(pluginData[i]["id"]))
                    
                }
                for (let j = 1; j < pluginData.length - i; j++) {
                    if (pluginData[i+j]["type"] !== "Info") break
                    if (pluginData[i+j].hasOwnProperty("data") === false) break
                    if (pluginData[i+j]["data"].hasOwnProperty("dialogue_type") === false) break
                    if (pluginData[i+j]["data"]["dialogue_type"] !== "Journal") break
                    else {
                        if (pluginData[i+j]["quest_name"] === 1) {
                            dispatch(setQuestName({
                                questId: pluginData[i]["id"], 
                                questName: pluginData[i+j]["text"]
                            }))
                        }
                        else if ("text" in pluginData[i+j]) {
                            dispatch(addQuestEntryByInfoId({
                                questId: pluginData[i]["id"],
                                entryId: pluginData[i+j]["info_id"]
                            }))
                            /*
                            dispatch(setEntryText({
                                questId: pluginData[i]["id"],
                                infoId: pluginData[i+j]["info_id"],
                                entryText: pluginData[i+j]["text"]
                            }))
                            dispatch(setEntryIndex({
                                questId: pluginData[i]["id"],
                                infoId: pluginData[i+j]["info_id"],
                                entryIndex: pluginData[i+j]["data"]["disposition"]
                            }))
                            dispatch(setEntryPrevId({
                                questId: pluginData[i]["id"],
                                infoId: pluginData[i+j]["info_id"],
                                entryPrevId: pluginData[i+j]["prev_id"]
                            }))
                            dispatch(setEntryNextId({
                                questId: pluginData[i]["id"],
                                infoId: pluginData[i+j]["info_id"],
                                entryNextId: pluginData[i+j]["next_id"]
                            }))
                            if (pluginData[i+j].hasOwnProperty("quest_finish")) {
                                if (pluginData[i+j]["quest_finish"] === 1) {
                                    dispatch(setEntryFinish({
                                        questId: pluginData[i]["id"],
                                        entryId: pluginData[i+j]["info_id"],
                                        entryFinish: true
                                    }))
                                }
                            }*/
                        }
                }
            }
        }
    }
    
    /*
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
            }*/
    
            /*
            if (pluginData[i]["type"] === "Dialogue" && ["Topic", "Persuasion", "Greeting"].includes(pluginData[i]["dialogue_type"])) {
                if (pluginData[i].hasOwnProperty("id") === false) continue
                let topicData = {}
                topicData["topicName"] = pluginData[i]["id"]
                topicData["topicType"] = pluginData[i]["dialogue_type"]
                let topicAnswers = []
                for (let j = 1; j < pluginData.length - i; j++) {
                    let topicAnswer = {"topicFilters": []}
                    if (pluginData[i+j]["type"] !== "Info") break
                    if (pluginData[i+j].hasOwnProperty("data") === false) break
                    if (pluginData[i+j]["data"].hasOwnProperty("dialogue_type") === false) break
                    topicAnswer["topicNpc"] = pluginData[i+j].hasOwnProperty("speaker_id") ? pluginData[i+j]["speaker_id"] : ""
                    topicAnswer["topicCell"] = pluginData[i+j].hasOwnProperty("speaker_cell") ? pluginData[i+j]["speaker_cell"] : ""
                    npcData.add(topicAnswer["topicNpc"])
                    cellData.add(topicAnswer["topicCell"])
                    topicAnswer["topicText"] = pluginData[i+j].hasOwnProperty("text") ? pluginData[i+j]["text"] : ""
                    topicAnswer["topicResult"] = pluginData[i+j].hasOwnProperty("result") ? pluginData[i+j]["result"] : ""
                    if (pluginData[i+j].hasOwnProperty("filters") === true) {
                        topicAnswer["topicFilters"] = pluginData[i+j]["filters"]
                        for (let k = 0; k < topicAnswer["topicFilters"].length; k++) {
                            topicAnswer["topicFilters"][k]["filter_comparison"] = toSymbols(topicAnswer["topicFilters"][k]["filter_comparison"])
                        }
                    }
                    topicAnswer["topicDisp"] = pluginData[i+j]["data"].hasOwnProperty("disposition") ? pluginData[i+j]["data"]["disposition"] : 0
                    topicAnswers.push(topicAnswer)
                }
                topicData["topicAnswers"] = topicAnswers
                topicsData.push(topicData)
            }
    
        }
        npcData = Array.from(npcData)
        cellData = Array.from(cellData)
        return [journalData, topicsData, npcData, cellData]
        */
    }

export default usePluginData