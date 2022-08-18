import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: {},
}

    /*
    {questId: 
      'questEntries': {infoId:
                        {'entryText': entryText, 
                        'entryIndex': entryIndex, 
                        'entryFinish': entryFinish, 
                        'prevId': prevId, 
                        'nextId': nextId,
                        'isQuestName': isQuestName}
                      }
      'questName': questName,
      }
    }
    */

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addJournal: (state, action) => Object.assign({}, state, {...state, data: {...state.data, ...action.payload}}),

    setJournal: (state, action) => Object.assign({}, state, {...state, data: { ...action.payload}}),

    addQuestById: (state, action) => Object.assign({}, state, {...state, data: {...state.data, [action.payload]: {questName: '', questEntries: {}}}}),

    setQuestName: (state, action) => Object.assign({}, state, {...state, 
                data: {...state.data, 
                    [action.payload.questId]: {...state.data[action.payload.questId], questName: action.payload.questName}
                    }
                }
    ),


    addQuestEntryByInfoId: (state, action) => Object.assign({}, state, {...state,
                data: {...state.data,
                    [action.payload.questId]: {...state.data[action.payload.questId],
                      questEntries: {...state.data[action.payload.questId].questEntries,
                      [action.payload.infoId]: {...state.data[action.payload.questId]["questEntries"][action.payload.infoId], questName: "", entryText: '...', entryIndex: 0, entryFinish: false, prevId: "", nextId: ""}}
                    }      
                }        
        }
    ),

    setEntryText: (state, action) => Object.assign({}, state, {...state, 
        data: {...state.data, 
            [action.payload.questId]: {...state.data[action.payload.questId],
              questEntries: {...state.data[action.payload.questId].questEntries,
              [action.payload.infoId]: {...state.data[action.payload.questId]["questEntries"][action.payload.infoId], entryText: action.payload.entryText}}}
            }
        }
    ),

    setEntryIndex: (state, action) => Object.assign({}, state, {...state, 
        data: {...state.data, 
            [action.payload.questId]: {...state.data[action.payload.questId],
              questEntries: {...state.data[action.payload.questId].questEntries,
              [action.payload.infoId]: {...state.data[action.payload.questId]["questEntries"][action.payload.infoId], entryIndex: action.payload.entryIndex}}}
            }
        }
    ),

    setEntryFinish: (state, action) => Object.assign({}, state, {...state, 
        data: {...state.data, 
            [action.payload.questId]: {...state.data[action.payload.questId],
              questEntries: {...state.data[action.payload.questId].questEntries,
              [action.payload.infoId]: {...state.data[action.payload.questId]["questEntries"][action.payload.infoId], entryFinish: action.payload.entryFinish}}}
            }
        }
    ),

    setEntryPrevId: (state, action) => Object.assign({}, state, {...state, 
        data: {...state.data, 
            [action.payload.questId]: {...state.data[action.payload.questId],
              questEntries: {...state.data[action.payload.questId].questEntries,
              [action.payload.infoId]: {...state.data[action.payload.questId]["questEntries"][action.payload.infoId], entryPrevId: action.payload.entryPrevId}}}
            }
        }
    ),

    setEntryNextId: (state, action) => Object.assign({}, state, {...state, 
        data: {...state.data, 
            [action.payload.questId]: {...state.data[action.payload.questId],
              questEntries: {...state.data[action.payload.questId].questEntries,
              [action.payload.infoId]: {...state.data[action.payload.questId]["questEntries"][action.payload.infoId], entryNextId: action.payload.entryNextId}}}
            }
        }
    ),

    setIsQuestName: (state, action) => Object.assign({}, state, {...state, 
      data: {...state.data, 
          [action.payload.questId]: {...state.data[action.payload.questId],
            questEntries: {...state.data[action.payload.questId].questEntries,
            [action.payload.infoId]: {...state.data[action.payload.questId]["questEntries"][action.payload.infoId], isQuestId: action.payload.isQuestId}}}
          }
      }
  ),

    removeEntry: (state, action) => {
      let newEntries = {...state.data[action.payload.questId]["questEntries"]}
      delete newEntries[action.payload.infoId]
      return {...state, 
      data: {...state.data, 
          [action.payload.questId]: {...state.data[action.payload.questId],
            questEntries: newEntries}}
      }
    },

    removeQuest: (state, action) => {
      let newQuests = {...state.data}
      delete newQuests[action.payload.questId]
      return {...state, 
      data: newQuests
      }
    }
  },
})

export const { 
  addQuestById, 
  setQuestName, 
  addQuestEntryByInfoId, 
  setEntryText, 
  setEntryIndex, 
  setEntryFinish, 
  setEntryPrevId, 
  setEntryNextId, 
  addJournal,
  setJournal,
  setIsQuestName,
  removeEntry, 
  removeQuest 
} = journalSlice.actions

export default journalSlice.reducer