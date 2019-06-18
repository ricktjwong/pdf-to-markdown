import React from 'react';

export default class UploadView extends React.Component {
    onDrop(file) {
        const reader = new FileReader();
        // reader.onload = (evt) => {
        //     const fileBuffer = evt.target.result;
        //     uploadFunction(new Uint8Array(fileBuffer));
        // };
        reader.readAsArrayBuffer(file);
    }
}
