import React, { Component } from 'react';

import { DatePicker } from 'antd';
import moment from 'moment';
var  selected=[moment().subtract(1,'hour'),moment()];
function get1Hbefore(value){
  var m = [moment(value[0]), moment(value[1])];
  m[0].subtract(1, 'hour');
  m[1].subtract(1, 'hour');
  return m;
}
 
const { RangePicker } = DatePicker;
class TimeInput extends React.Component {
  state = {
    mode: ['time','time'] ,
    value: [ ,]
  };
  constructor(props){
    super(props);
    this.onChange=this.onChange.bind(this);
    this.onOk=this.onOk.bind(this);
  }
  onChange(value, dateString) {
    
    selected=get1Hbefore(value);
    this.setState({ mode: ['time','time']  });
   }

  onOk(value) {
     this.props.setValue( value);
  }
  handleOpenChange = (open) => {
    if (open) {
      this.setState({ mode: ['time','time']  });
    }
   }
  
  
  handlePanelChange = ( mode) => {   
    this.setState({ mode:mode,
    });   
  }
   
  render() {
    
    return (
      
      <RangePicker
      showPanels={['time', 'time']}
        showTime={{ format: 'HH:mm:ss' ,defaultValue:[moment(),moment()]}}
        format="YYYY-MM-DD HH:mm:ss"
        placeholder={['Start Time', 'End Time']}
        
        ranges={{  "Last Hour" : [  moment().subtract(1,'hour'), moment() ],"1 Hour Before":selected}}     
        onOpenChange={this.handleOpenChange}
        mode={this.state.mode}
        onChange={this.onChange}
        onOk={this.onOk}
         
        
      />
    );
  }
}

export default TimeInput;