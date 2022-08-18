import React from 'react'
import JournalQuest from './JournalQuest'
import { Scrollbars } from 'react-custom-scrollbars';
import WorkAreaNpcTopic from './WorkAreaNpcTopic';
import { useSelector } from 'react-redux';
import getJournalData from '../parsing'
import { useDispatch } from 'react-redux';
import { 
    setJournal
} from '../redux/journalSlice'


const plugin = "http://localhost:3000/input/tra.json";

function WorkArea() {
    const dispatch = useDispatch()
    const [pluginData, setPluginData] = React.useState([[], [], [], []])
    const [parsedData, setParsedData] = React.useState([[], [], [], []])
    

    React.useEffect(() => {
        fetch(plugin).then((resp) => resp.json()).then((json) => {
            setPluginData(json)
        });
    }, []);

    React.useEffect(() => {
        setParsedData(getJournalData(pluginData))
    }, [pluginData]);

    React.useEffect(() => {
        dispatch(setJournal(parsedData[0]))
    }, [parsedData, dispatch]);

    
    
    const journalData = useSelector(state => state.journal.data)

    return (
        <div className="workarea">
            <div className="workarea-journal">
                <div className="zone-wrapper">
                    <Scrollbars>
                        {Object.keys(journalData).map((obj) => 
                            <JournalQuest key={obj} questName={journalData[obj].questName} questId={obj}/>
                        )}
                    </Scrollbars>
                </div>
            </div>
            <WorkAreaNpcTopic topicsData={parsedData[1]} npcData={parsedData[2]} cellData={parsedData[3]}/>
        </div>
    )
}

export default WorkArea
