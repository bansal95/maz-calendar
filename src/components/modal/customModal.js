/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React  from 'react';
import { Button, Modal, ModalBody, Input } from 'reactstrap';
import './style.scss';

const CustomModal = (props) => {
    const card_id = JSON.parse(props.card_booked);

    return (
        <div>
            <Modal isOpen={props.modal_open} toggle={props.toggle} className="my-modal">
                <ModalBody>
                    <div>
                        <button
                            className="close"
                            style={{marginBottom: '20px',
                                float: 'left'
                            }}
                            onClick={props.toggle}>&times;</button>
                    </div>
                    <div style={{margin: '30px'}}>
                        <Input
                            style={{fontSize:'2em',fontWeight:'bold'}}
                            className="custum_class_input"
                            value={`${props.event_text}`}
                            id="event_name"
                            onChange={(e) => props.handleTextChange(e)}/>
                        <b>
                            { (card_id) ? `${card_id.day}, ${card_id.month} ${card_id.date} at ${card_id.time}` : null }
                        </b>

                        <div className="schedule-cancel-button">
                            <Button
                                style={{backgroundColor: '#f5ca5f', color:'white', borderStyle: 'none'}}
                                onClick={() => {props.toggle(); props.addingEvent(document.getElementById('event_name').value)}}>
                                <i className="fas fa-calendar mr-2"></i>
                                Reschedule</Button>{' '}
                            <Button
                                style={{backgroundColor: '#fa4141', color:'white', borderStyle: 'none'}}
                                onClick={() => {props.toggle(); props.deletingEvent(JSON.stringify(card_id))}}>
                                <i className="fas fa-times mr-2"></i>
                                Cancel Event</Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default CustomModal;