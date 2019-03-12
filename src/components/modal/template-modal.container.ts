import { connect } from "react-redux";
import { TemplateModalComponent } from '../../components/modal/template-modal.component';
import {handleShow, handleClose} from '../../actions/modal/template-modal-actions';
import { IState } from "../../reducers";

const mapStateToProps = (state: IState, ownProps) => ({
        showModal: state.surveyState.templateModal.showModal,
        ownProps: ownProps,
})

const mapDispatchToProps= {
  handleShow,
  handleClose
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateModalComponent)