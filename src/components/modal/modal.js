import React, { Component } from 'react';
import { hideModal } from '../../actions/modalActions'
import { connect } from 'react-redux'
import './modal.css'
import Button from 'react-bootstrap/Button'

export class Modal extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        if (this.props.modalType == null) {
            return (
                null
            )
        }
        return (
            <div id="ModalBackground">
                <div id="ModalContainer" className={`ModalType-${this.props.modalType}`}>
                    <div id="ModalHeader">
                        {this.props.modalProps.header}
                        <div id="ModalHeaderClose" onClick={() => this.props.hideModal()}><i className="far fa-window-close"></i></div>
                    </div>
                    <div id="ModalBody">
                        {this.props.modalProps.body}
                    </div>
                    <div id="ModalButtonsContainer">
                        {this.props.modalProps.buttons.map(modalButton => (
                            <Button
                                variant="success"
                                className="ModalButtons"
                                size="sm"
                                onClick={()=> 
                                    modalButton.action !== null && this.props[modalButton.action]()
                                }
                            >
                                {modalButton.title}
                            </Button>
                        ))}
                    </div>


                </div>
            </div>

        )
    }
}


const mapStateToProps = state => ({
    modalProps: state.modal.modalProps,
    modalType: state.modal.modalType,
    hideModal: state.hideModal
})

export default connect(mapStateToProps, { hideModal })(Modal)
