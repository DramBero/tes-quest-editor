import React from 'react'
import DialogueModal from './DialogueModal'

function NpcCard(props) {
    const [isModal, setIsModal] = React.useState(false)
    const onClose = () => setIsModal(false)

    return (
    <div className="npc-page-card" onClick={() => setIsModal(true)}>
        <div className="npc-page-card__image"></div>
        <div className="npc-page-card__id">{props.name}</div>
        <DialogueModal 
            name={props.name} 
            visible={isModal} 
            modalZindex={props.modalZindex} 
            setModalZindex={props.setModalZindex}
            npcAnswers={props.npcAnswers}
            onClose={onClose}/>
    </div>
    )
}

export default NpcCard
