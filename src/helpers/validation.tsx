
import * as React from 'react';

// var messageColor;
export default class ValidationMessage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = { type: this.props.type, value: this.props.value, style: this.props.style , id: this.props.id};

    }

    public render() {

        if (this.state.type == "ERROR") {
            return (
                <div className="validation_box" id={this.state.id} style={{ ...this.state.style, color: "red", fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px'}}>{this.state.value}</div>
            );
        }
        if (this.state.type == "SUCCESS") {
            return (
                <div className="validation_box" id={this.state.id} style={{ ...this.state.style, color: "green", fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px'}}>{this.state.value}</div>
            );
        }
        if (this.state.type == "WARNING") {
            return (
                <div className="validation_box" id={this.state.id} style={{ ...this.state.style, color: "#c0c031", fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px' }}>{this.state.value}</div>
            );
        }
        else {
            return (
                <div className="validation_box" id={this.state.id} style={{ ...this.state.style, color: "blue", fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px'}}>{this.state.value}</div>
            );
        }
    }
}
