import React from 'react';
import Remarkable from 'remarkable';

import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'

import { transform } from '../lib/transformations.jsx'

export default class ResultView extends React.Component {

    static propTypes = {
        pages: React.PropTypes.array.isRequired,
        transformations: React.PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {pages, transformations} = this.props;
        const parseResult = transform(pages, transformations);

        var text = '';
        parseResult.pages.forEach(page => {
            page.items.forEach(item => {
                text += item + '\n';
            });
        });
        this.state = {
            preview: true,
            text: text
        };
    }

    switchToPreview() {
        this.setState({
            preview: true
        });
    }

    switchToEdit() {
        this.setState({
            preview: false
        });
    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        const remarkable = new Remarkable({
            breaks: true,
            html: true
        });
        const {preview, text} = this.state;

        // This chunk saves the output text as markdown file
        var saveFile = true
        if (saveFile) {
            var FileSaver = require('file-saver')
            var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(blob, "pdf-to-markdown-output.md");
        }

        var textComponent;
        if (preview) {
            const html = remarkable.render(text);
            textComponent = <div dangerouslySetInnerHTML={ { __html: html } } />
        } else {
            textComponent = <textarea
                                      rows="45"
                                      cols="150"
                                      value={ text }
                                      onChange={ this.handleChange.bind(this) } />
        }
        return (
            <div>
              <ButtonToolbar>
                <ButtonGroup bsSize="medium">
                  <Button onClick={ this.switchToEdit.bind(this) } className={ !preview ? 'active' : '' }>
                    Edit
                  </Button>
                  <Button onClick={ this.switchToPreview.bind(this) } className={ preview ? 'active' : '' }>
                    Preview
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
              <hr/>
              { textComponent }
            </div>
        );
    }

}
