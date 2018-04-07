import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { CHANNELS, CHANNELS_LIST } from './channels';
import ChannelList from './list';

class Button extends React.Component {
  render() {
    return (
      <div className="btn btn-secondary btn-remote" onClick={() => this.props.onClick()}>
        {this.props.number}
      </div>
    );
  }
}

class Screen extends React.Component {
  render() {
    if(this.props.channel === "list") {
      return <ChannelList />;
    } else {
      return (
        <iframe 
          key="screen"
          id="screen" 
          src={this.props.channel}
          frameBorder="0"  
          height="100%" 
          width="100%"
        />
      );
    }
  };
}

class Television extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channelNumber: null,
      channel: null,
      numberColor: "black"
    }
  }

  renderButton(number) {
    return (
      <Button 
        number={number} 
        onClick={() => this.handleClick(number)}
      />
    )
  };

  handleClick(number) {
    if(number === "IR") {
      let channel = CHANNELS[this.state.channelNumber]

      if(channel) {
        this.setState({
          channelNumber: null,
          channel: channel,
          numberColor: "white"
        });
      }
    } else if(number === "☰") {
      this.setState({
        channelNumber: null,
        channel: "list",
        numberColor: "white"
      });
    } else if(!this.state.channelNumber || this.state.channelNumber.length > 2) {
      this.setState({channelNumber: number});
    } else {
      this.setState({channelNumber: this.state.channelNumber + number});
    }
  };

  render() {
    return (
      <div id="television">
        <Screen channel={this.state.channel} />

        <div id="channelNumber" style={{color: this.state.numberColor}}>
          {this.state.channelNumber}
        </div>

        <div id="remoteControl">
          <div className="row justify-content-center">
            <div className="col-xs-4">
              {this.renderButton("7")}
            </div>
            <div className="col-xs-4">
              {this.renderButton("8")}
            </div>
            <div className="col-xs-4">
              {this.renderButton("9")}
            </div>
          </div>    

          <div className="row justify-content-center">
            <div className="col-xs-4">
              {this.renderButton("4")}
            </div>
            <div className="col-xs-4">
              {this.renderButton("5")}
            </div>
            <div className="col-xs-4">
              {this.renderButton("6")}
            </div>
          </div>    

          <div className="row justify-content-center">
            <div className="col-xs-4">
              {this.renderButton("1")}
            </div>
            <div className="col-xs-4">
              {this.renderButton("2")}
            </div>
            <div className="col-xs-4">
              {this.renderButton("3")}
            </div>
          </div>    

          <div className="row justify-content-center">
            <div className="col-xs-4">
              {this.renderButton("0")}
            </div>
            <div className="col-xs-4">
              {this.renderButton("☰")}
            </div>
            <div className="col-xs-8">
              {this.renderButton("IR")}
            </div>
          </div>    
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Television />,
  document.getElementById('root')
);