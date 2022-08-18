import React from 'react'
import { NpcCard } from '.'
import { Scrollbars } from 'react-custom-scrollbars';

function WorkAreaNpcTopic(props) {
    const [modalZindex, setModalZindex] = React.useState([]);

    return (
        <div className="workarea-topic">
            <div className="zone-wrapper">
                <Scrollbars
                    renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgb(202,165,96)'}}/>}
                    renderThumbHorizontal={({ style, ...props }) => <div {...props} style={{ ...style, backgroundColor: 'rgb(202,165,96)'}}/>}
                >
                    <div className="npc-page">
                        {props.npcData && props.npcData.map((npc) => 
                            npc !== "" && <NpcCard styleMod="npc" key={npc} name={npc} topicsData={props.topicsData} modalZindex={modalZindex} setModalZindex={setModalZindex}/>
                        )}
                        {props.cellData && props.cellData.map((cell) => 
                            cell !== "" && <NpcCard styleMod="cell" key={cell} name={cell} topicsData={props.topicsData} modalZindex={modalZindex} setModalZindex={setModalZindex}/>
                        )}
                    </div>
                </Scrollbars>
            </div>
        </div>
    )
}

export default WorkAreaNpcTopic
