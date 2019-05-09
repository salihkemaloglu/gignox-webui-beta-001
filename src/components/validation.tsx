
import * as React from 'react';

// var messageColor;
export default class ValidationMessage extends React.Component<any, any> {
   
    constructor(props: any){
        super(props);
        
        this.state = { color: this.props.color, value: this.props.value};
        
    }
  
    public render() {
        return (    
          <div className="validation_box" style={{display: 'inline-block'}}><span style={{color: this.state.color, fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '13px'}}>{this.state.value}</span></div>
        );
    }
}
