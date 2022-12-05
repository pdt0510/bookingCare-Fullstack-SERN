import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

class SelectComp extends Component {
  state = {
    selectedItem: null,
    optionArr: [
      { value: 'value 1', label: 'label 1' },
      { value: 'value 2', label: 'label 2' },
    ],
  };

  componentDidMount = () => {
    const { arrPassed } = this.props;
    if (arrPassed.length > 0) {
      this.props.getSelectedValue(arrPassed[0].value); //1st
      this.setState({
        optionArr: arrPassed,
        selectedItem: arrPassed[0],
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { language } = this.props;
    if (language !== prevProps.language) {
      const { arrPassed } = this.props;
      const { selectedItem } = this.state;

      this.setState({
        optionArr: arrPassed,
        selectedItem: selectedItem ? arrPassed[selectedItem.idx] : arrPassed[0],
      });
    }
  };

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
    return <div className='selectComp-content'>{this.renderSelections()}</div>;
  }
}
const mapStateToProps = (state) => ({
  language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SelectComp);
