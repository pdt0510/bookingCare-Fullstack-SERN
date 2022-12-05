import React, { Component } from 'react';
import './BillModal.scss';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from 'reactstrap';
import ImageFileComp from '../generalComps/ImageFileComp';
import CommonUtils from './../../../utils/CommonUtils';
import { sendBillToPatientServ } from '../../../services/userService';
import LoadingSymbol from './../generalComps/LoadingSymbol';

class BillModal extends Component {
  state = {
    isOpen: false,
    isChecked: false,
    modalData: {
      id: null,
      img: null,
      email: '',
      patientId: null,
      doctorId: null,
    },
  };
  componentDidMount = () => {};

  componentDidUpdate = (prevProps, prevState) => {
    const { openModal, modalData } = this.props;
    if (openModal !== prevProps.openModal) {
      this.setState({
        isOpen: true, //v109xx1
        modalData: { ...modalData, img: null },
      });
    }
  };

  // v109xx1
  closeModalFn = () => {
    this.resetForm();
  };

  getImgFile = async (file) => {
    const toBase64 = await CommonUtils.convertFileToString(file);
    this.setState({
      modalData: {
        ...this.state.modalData,
        img: toBase64,
      },
    });
  };

  checkingInputValues = (stateObj) => {
    let isValid = false;
    for (let key in stateObj) {
      if (!stateObj[key]) {
        alert(`Error param: ${key.toUpperCase()}`);
        return isValid;
      }
    }
    return (isValid = true);
  };

  resetForm = () => {
    this.setState({
      isOpen: false,
      modalData: {
        id: null,
        img: null,
        email: '',
        patientId: null,
      },
      isChecked: false, //1h24ms45ss
    });
  };

  submitModal = async () => {
    const { modalData } = this.state;
    const isChecked = this.checkingInputValues(modalData);

    if (isChecked) {
      this.setState({
        isChecked, // 1h24ms45ss
      });

      // 1h24ms45ss
      setTimeout(async () => {
        const data = await sendBillToPatientServ(modalData); //36ms31ss
        if (data.errCode === 0) {
          this.resetForm();
        }
      }, 1000);
    }
  };

  render() {
    const { isOpen, modalData, isChecked } = this.state;
    const { email } = modalData;

    return (
      <>
        <Modal isOpen={isOpen} centered size='md' className='billModal-content'>
          <ModalHeader toggle={this.closeModalFn}>
            Send the bill to the patient
          </ModalHeader>
          <ModalBody>
            <ImageFileComp getImgFile={this.getImgFile} onlyGetImgName={true} />
            <Input
              type='email'
              name='email'
              value={email && email}
              disabled
              placeholder='Patient email...'
            />
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.submitModal}>
              Send
            </Button>
            <Button color='danger' onClick={this.closeModalFn}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {
          isChecked && <LoadingSymbol /> //1h24ms45ss
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  genderList: state.admin.genderList,
  priceList: state.admin.priceList,
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDoctorInfoAllcodeFn: () => dispatch(actions.fetchDoctorInfoAllcodeFn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillModal);
