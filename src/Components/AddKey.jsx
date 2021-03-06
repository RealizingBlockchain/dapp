import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getETHaccount } from '../Actions';

class AddKey extends Component {

    componentWillMount = () => {
        if (window.web3 !== undefined) {
            this.props.ETHaccount().then( (response) => {
                if(response.account) {
                    if(response.account === 'undefined' || typeof response.account === undefined) {
                        this.props.history.push('/web3');
                    }
                }
            });
        }
    }

    render() {
        return (
            <div className="addkey">
                <Route exact path="/add-key/step1" render={ () => <Step1 { ...this.props } /> } />
                <Route exact path="/add-key/step2" render={ () => <Step2 { ...this.props } /> } />
                <Route exact path="/add-key/step3" render={ () => <Step3 { ...this.props } /> } />
                <Route exact path="/add-key/done" render={ () => <Step4 { ...this.props } /> } />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.web3Reducer.account
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        ETHaccount: bindActionCreators(getETHaccount, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddKey);

class Step1 extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount = () => {
        if (window.web3 !== undefined) {
            this.props.ETHaccount().then( (response) => {
                if(response.account) {
                    if(response.account === 'undefined' || typeof response.account === undefined) {
                        this.props.history.push('/web3');
                    }
                }
            });
        }
    }

    handleInputChange = (e) => {
        this.setState({ nickname: e.target.value });
    }

    handleAreaChange = (e) => {
        this.setState({ seed: e.target.value });
    }

    render() {
        return (
            <div className="step1">
                <div className="fl-row fl-space-between">
                    <div className="fl-32 step-meter checked">
                    </div>
                    <div className="fl-32 step-meter">
                    </div>
                    <div className="fl-32 step-meter">
                    </div>
                </div>
                <h1>Add Seed Words</h1>
                <p>KeySplit helps you recover your seed words safely by creating five keys you share with your trusty guardians.  Let’s start!</p>

                <div className="fl-row">
                    <div className="fl-offset-5 fl-90">
                        <h4>Nickname</h4>
                        <input onChange={ this.handleInputChange } placeholder="Nickname for the seed words" type="text" name="text" />
                        <textarea onChange={ this.handleAreaChange } placeholder="Your 12-word seed words" />
                    </div>
                </div>
                <center>
                    <button
                    onClick={ this.props.changeStep.bind(this, {nickname: this.state.nickname, seed: this.state.seed}, 1) }>
                    CONTINUE
                    </button>
                </center>
            </div>
        )
    }
}

class Step2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guardians: [
                {name: "", phone: "", community: ""},
                {name: "", phone: "", community: ""},
                {name: "", phone: "", community: ""},
                {name: "", phone: "", community: ""},
                {name: "", phone: "", community: ""}
            ]

        };
    }

    componentWillMount = () => {
        if (window.web3 !== undefined) {
            this.props.ETHaccount().then( (response) => {
                if(response.account) {
                    if(response.account === 'undefined' || typeof response.account === undefined) {
                        this.props.history.push('/web3');
                    }
                }
            });
        }
    }

    handleInputChange = (id, key, e) => {
        let newArr = [...this.state.guardians];
        newArr[id-1][key] = e.target.value;
        this.setState({
            guardians: newArr
        })
    }

    render() {
        return (
            <div className="step2">
                <div className="fl-row fl-space-between">
                    <div className="fl-32 step-meter checked">
                    </div>
                    <div className="fl-32 step-meter checked">
                    </div>
                    <div className="fl-32 step-meter">
                    </div>
                </div>
                <h1>Add Guardians</h1>
                <p>We strongly recommend that each guardian be from a different community in your life, so that they don't know each other and can't collude to recreate your private key.</p>
                <div className="fl-row">
                    <div className="fl-offset-5 fl-90">
                        <h4>Guardian 1</h4>
                        <input onChange={ this.handleInputChange.bind(this, 1, "name") } placeholder="Guardian 1's name" type="text" name="g1_name" />
                        <input onChange={ this.handleInputChange.bind(this, 1, "phone") } placeholder="Guardian 1's phone number" type="text" name="g1_phone" />
                        <input onChange={ this.handleInputChange.bind(this, 1, "community")} placeholder="Community" type="text" name="g1_community" />
                    </div>
                </div>
                <div className="fl-row">
                    <div className="fl-offset-5 fl-90">
                        <h4>Guardian 2</h4>
                        <input onChange={ this.handleInputChange.bind(this, 2, "name") } placeholder="Guardian 2's name" type="text" name="g2_name" />
                        <input onChange={ this.handleInputChange.bind(this, 2, "phone") } placeholder="Guardian 2's phone number" type="text" name="g2_phone" />
                        <input onChange={ this.handleInputChange.bind(this, 2, "community") } placeholder="Community" type="text" name="g2_community" />
                    </div>
                </div>
                <div className="fl-row">
                    <div className="fl-offset-5 fl-90">
                        <h4>Guardian 3</h4>
                        <input onChange={ this.handleInputChange.bind(this, 3, "name") } placeholder="Guardian 3's name" type="text" name="g3_name" />
                        <input onChange={ this.handleInputChange.bind(this, 3, "phone") } placeholder="Guardian 3's phone number" type="text" name="g3_phone" />
                        <input onChange={ this.handleInputChange.bind(this, 3, "community") } placeholder="Community" type="text" name="g3_community" />
                    </div>
                </div>
                <div className="fl-row">
                    <div className="fl-offset-5 fl-90">
                        <h4>Guardian 4</h4>
                        <input onChange={ this.handleInputChange.bind(this, 4, "name") } placeholder="Guardian 4's name" type="text" name="g4_name" />
                        <input onChange={ this.handleInputChange.bind(this, 4, "phone") } placeholder="Guardian 4's phone number" type="text" name="g4_phone" />
                        <input onChange={ this.handleInputChange.bind(this, 4, "community") } placeholder="Community" type="text" name="g4_community" />
                    </div>
                </div>
                <div className="fl-row">
                    <div className="fl-offset-5 fl-90">
                        <h4>Guardian 5</h4>
                        <input onChange={ this.handleInputChange.bind(this, 5, "name") } placeholder="Guardian 5's name" type="text" name="g5_name" />
                        <input onChange={ this.handleInputChange.bind(this, 5, "phone") } placeholder="Guardian 5's phone number" type="text" name="g5_phone" />
                        <input onChange={ this.handleInputChange.bind(this, 5, "community") } placeholder="Community" type="text" name="g5_community" />
                    </div>
                </div>
                <center>
                    <button
                    onClick={
                        this.props.changeStep.bind(this, this.state, 2)
                    }>
                    CONTINUE</button>
                </center>

            </div>
        )
    }
}

class Step3 extends Component {

    componentWillMount = () => {
        if (window.web3 !== undefined) {
            this.props.ETHaccount().then( (response) => {
                if(response.account) {
                    if(response.account === 'undefined' || typeof response.account === undefined) {
                        this.props.history.push('/web3');
                    }
                }
            });
        }
    }

    createNotification = () => {
        NotificationManager.success('Copied to clipboard!', '');
    }

    copyLink = (url) => {
        console.log(url);
    }

    render() {
        return (
            <div className="step3">
                <div className="fl-row fl-space-between">
                    <div className="fl-32 step-meter checked">
                    </div>
                    <div className="fl-32 step-meter checked">
                    </div>
                    <div className="fl-32 step-meter checked">
                    </div>
                </div>
                <h1>Share Keys</h1>
                <p>Send the unique keys to your guardians. KeySplit recommends contacting the guardians personally after to make sure they got it.</p>
                {this.props.data.guardians.map( (guardian, index) =>
                    <div className="fl-row" key={index}>
                        <div className="fl-offset-5 fl-90">
                            <div className="share-tile">
                                <div className="fl-row">
                                    <div className="fl-100">
                                        <h3>{guardian.name}</h3>
                                        <h4>{guardian.community}</h4>
                                        <CopyToClipboard onCopy={() => {this.copyLink(guardian.url)}} text={guardian.url}>
                                            <span onClick={this.createNotification}>Copy Link</span>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <center><button onClick={() => { this.props.history.push('/add-key/done') }}>DONE</button></center>
                <NotificationContainer/>
            </div>
        )
    }
}

class Step4 extends Component {

    componentWillMount = () => {
        if (window.web3 !== undefined) {
            this.props.ETHaccount().then( (response) => {
                if(response.account) {
                    if(response.account === 'undefined' || typeof response.account === undefined) {
                        this.props.history.push('/web3');
                    }
                }
            });
        }
    }

    render() {
        return (
            <div className="step4">
                <h1>Done!</h1>
                <div className="fl-row">
                    <div className="fl-20">
                        <img alt="" src={require("../Assets/images/dashboard/happy_logo.png")} />
                    </div>
                    <div className="fl-20">
                        <img alt="" className="low-opacity" src={require("../Assets/images/dashboard/happy_logo.png")} />
                    </div>
                    <div className="fl-20">
                        <img alt="" className="low-opacity" src={require("../Assets/images/dashboard/happy_logo.png")} />
                    </div>
                    <div className="fl-20">
                        <img alt="" className="low-opacity" src={require("../Assets/images/dashboard/happy_logo.png")} />
                    </div>
                    <div className="fl-20">
                        <img alt="" className="low-opacity" src={require("../Assets/images/dashboard/happy_logo.png")} />
                    </div>
                </div>
                <p>Your guardians now have your key shards stored, and you can recover your key by requesting them to send their key shards back to you.</p>
                <center><button onClick={() => { this.props.history.push('/dashboard') }}>VIEW MY KEY</button></center>
            </div>
        )
    }
}
