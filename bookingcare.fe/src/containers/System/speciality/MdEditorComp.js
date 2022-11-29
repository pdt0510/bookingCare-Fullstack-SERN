import React, { Component } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './MdEditorComp.scss';

const mdParser = new MarkdownIt();
class MdEditorComp extends Component {
  state = {
    contentHTML: '',
    contentText: '',
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { toggleClear } = this.props;
    if (toggleClear !== prevProps.toggleClear) {
      this.setState({
        contentHTML: '',
        contentText: '',
      });
    }
  };

  editorOnchange = ({ text, html }) => {
    this.props.getMditorData({ text, html });
    this.setState({
      contentHTML: html,
      contentText: text,
    });
  };

  renderMdEditor = () => {
    return (
      <MdEditor
        style={{ height: '590px' }}
        value={this.state.contentText}
        renderHTML={(htmlStr) => mdParser.render(htmlStr)}
        onChange={this.editorOnchange}
      />
    );
  };

  render() {
    return <div className='MdEditorComp-content'>{this.renderMdEditor()}</div>;
  }
}

export default MdEditorComp;
