import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import './SpecialityManager.scss';
import Select from 'react-select';

class SelecComp extends Component {
  state = {
    selectedItem: null,
    optionArr: [
      { value: 'name 1', label: 'name 1' },
      { value: 'name 2', label: 'name 2' },
    ],
  };

  componentDidMount = () => {
    if (this.props.specialityId) {
      //loading data of speciality selection
    }
  };

  componentDidUpdate = (prevProps, prevState) => {};

  handleChange = (selectedOne) => {
    this.props.getSelectedValue(selectedOne.value);

    this.setState({
      selectedItem: selectedOne,
    });
  };

  renderSelections = () => {
    const { selectedItem, optionArr } = this.state;

    return (
      <Select
        value={selectedItem}
        options={optionArr}
        onChange={this.handleChange}
      />
    );
  };

  render() {
    return <div className='selectComp'>{this.renderSelections()}</div>;
  }
}
const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SelecComp);
