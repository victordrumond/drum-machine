import './DrumPad.css';
import React from 'react';
import { containerOnStyle, containerOffStyle, textOnStyle, textOffStyle } from './global.js';

class DrumPad extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    };

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
        window.focus();
    };

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    };

    handleClick() {
        if (this.props.power) {
            this.audio.play();
            this.audio.currentTime = 0;
            this.audio.volume = this.props.volume;
            this.props.handleDisplay(this.props.id);
        };
    };

    handleKeyDown(e) {
        if (e.keyCode === this.props.keyCode) {
            this.handleClick();
        };
    };

    render() {
        const containerStyle = this.props.power ? containerOnStyle : containerOffStyle;
        const textStyle = this.props.power ? textOnStyle : textOffStyle;

        return (
            <div id={this.props.id} className="drum-pad d-flex text-center" style={containerStyle} onClick={this.handleClick}>
                <h2 style={textStyle}>{this.props.keyTrigger}</h2>
                <audio 
                    id={this.props.keyTrigger} 
                    className="clip" 
                    src={this.props.url}
                    ref={ref => this.audio = ref}
                />
            </div>
        );
    };
};

export default DrumPad;