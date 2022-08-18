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

function getJournalData(pluginData) {
    let journalData = {}
    let topicsData = []
    let npcData = new Set()
    let cellData = new Set()
    if (pluginData === undefined) return []
    for (let i = 0; i < pluginData.length; i++) {
        if (pluginData[i]["type"] === "Dialogue" && pluginData[i]["dialogue_type"] === "Journal") {

            let questIds = []
            if (pluginData[i]["id"] in questIds) {
                questIds.push(pluginData[i]["id"])
            }

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

            let questId = pluginData[i]["id"]
            if (journalData.hasOwnProperty(questId) === false) {
                journalData[questId] = {'questEntries': {},
                                        'questName': ''}
            }
            for (let j = 1; j < pluginData.length - i; j++) {
                if (pluginData[i+j]["type"] !== "Info") break
                if (pluginData[i+j].hasOwnProperty("data") === false) break
                if (pluginData[i+j]["data"].hasOwnProperty("dialogue_type") === false) break
                if (pluginData[i+j]["data"]["dialogue_type"] !== "Journal") break
                else {
                    if (pluginData[i+j]["quest_name"] === 1) {
                        journalData[questId]["questName"] = pluginData[i+j]["text"]
                    }
                    if ("text" in pluginData[i+j]) {
                        let infoId = pluginData[i+j]["info_id"]
                        if (pluginData[i+j]["quest_name"] === 1) {
                            journalData[questId]['questEntries'][infoId]["isQuestName"] = true
                        }
                        else {
                            journalData[questId]['questEntries'][infoId]["isQuestName"] = false
                        }
                        if (journalData[questId]['questEntries'].hasOwnProperty(infoId) === false) {
                            journalData[questId]['questEntries'][infoId] = {'questName': '', 
                                                            'entryText': '', 
                                                            'entryIndex': 0, 
                                                            'entryFinish': false, 
                                                            'prevId': 0, 
                                                            'nextId': 0}
                        }
                        journalData[questId]['questEntries'][infoId]["entryText"] = pluginData[i+j]["text"]
                        journalData[questId]['questEntries'][infoId]["prevId"] = pluginData[i+j]["prev_id"]
                        journalData[questId]['questEntries'][infoId]["nextId"] = pluginData[i+j]["next_id"]
                        journalData[questId]['questEntries'][infoId]["entryIndex"] = pluginData[i+j]["data"]["disposition"]
                        if (pluginData[i+j].hasOwnProperty("quest_finish")) {
                            if (pluginData[i+j]["quest_finish"] === 1) {
                                journalData[questId]['questEntries'][infoId]["entryFinish"] = true
                            }
                        }
                    }
                }
            }
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
}

export default getJournalData
/*

    let journalData = []
    let topicsData = []
    let npcData = new Set()
    let cellData = new Set()
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

*/



/*
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
                            case "LessEqual":
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
*/
