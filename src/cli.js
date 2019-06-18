import React from 'react';
import {render, Box} from 'ink';
import TextInput from 'ink-text-input';
import TestView from './components/TestView.jsx';

const fs = require('fs');

class SearchQuery extends React.Component {
    constructor() {
        super();
 
        this.state = {
            query: ''
        };
 
        this.handleChange = this.handleChange.bind(this);
    }
 
    render() {
        TestView.readFile("GAYLORD");
        return (
            <Box>
                <Box marginRight={1}>
                    Enter your query:
                </Box>
 
                <TextInput
                    value={this.state.query}
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                />
            </Box>
        );
    }
 
    handleChange(query) {
        this.setState({query});
    }

    handleSubmit(query) {
        console.log(query);
        const folderPath = query;
        //passsing directoryPath and callback function
        // fs.readdir(folderPath, function (err, files) {
        //     console.log(files.length)
        //     //handling error
        //     if (err) {
        //         return console.log('Unable to scan directory: ' + err);
        //     } 
        // })
        fs.readFile(query, "utf8", function read(err, data) {
            if (err) {
                throw err;
            }
            console.log(data);
        });
    }
}
 
render(<SearchQuery/>);