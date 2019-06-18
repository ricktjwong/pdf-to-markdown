import React from 'react';

export default class TestView extends React.Component {
    static readFile (filePath) {
        console.log("TestView read: " + filePath);
    } 
}
