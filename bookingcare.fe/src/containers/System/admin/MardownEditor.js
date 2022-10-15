import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

//src20, 11ms29ss
class MardownEditor extends Component {
  handleEditorChange = ({ html, text }) => {
    console.log('html', html);
    console.log('text', text);
  };

  render() {
    const mdParser = new MarkdownIt();

    return (
      <>
        <MdEditor
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
        );
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userListRedux: state.admin.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

// export default MardownEditor;
export default connect(mapStateToProps, mapDispatchToProps)(MardownEditor);
