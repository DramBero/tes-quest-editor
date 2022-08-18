import React from 'react'
import DialogueModal from './DialogueModal'

function NpcCard(props) {
    const [isModal, setIsModal] = React.useState(false)
    const onClose = () => setIsModal(false)

    let cardStyle="npc-page-card"
    if (props.styleMod === "cell") {
    cardStyle += " npc-page-card_cell"
    }

    return (
    <button className={cardStyle} onClick={() => setIsModal(true)}>
        <div className="npc-page-card__image"></div>
        <div className="npc-page-card__id">{props.name !== "" ? props.name : "GLOBAL"}</div>
        {isModal && <DialogueModal 
            name={props.name} 
            visible={isModal} 
            modalZindex={props.modalZindex} 
            setModalZindex={props.setModalZindex}
            topicsData={props.topicsData}
            onClose={onClose}/>}
    </button>
    )
}

export default NpcCard
