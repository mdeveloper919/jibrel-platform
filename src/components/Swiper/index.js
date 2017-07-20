import React from 'react';

import Images from './images';

import EtherscanLink from '../EtherscanLink';

import './style.css';

import './css/bootstrap.css';
import './css/rotating-card.css';

var Coverflow = require('reactjs-coverflow');

class Swipers extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            position: 0,
            symbols: [
              {
                name: 'USD',
                s_name: 'jUSD',
                logo: require('./img/jUSD.png'),
                logo_g: require('./img/jUSDg.png'),
                color: '#d0011b'
              },
              {
                name: 'AED',
                s_name: 'jAED',
                logo: require('./img/jAED.png'),
                logo_g: require('./img/jAEDg.png'),
                color: '#73af00'
              },
              {
                name: 'GBP',
                s_name: 'jGBP',
                logo: require('./img/jGBP.png'),
                logo_g: require('./img/jGBPg.png'),
                color: '#507adb'
              },
              {
                name: 'RUB',
                s_name: 'jRUB',
                logo: require('./img/jRUB.png'),
                logo_g: require('./img/jRUBg.png'),
                color: '#f52531'
              },
              {
                name: 'CNY',
                s_name: 'jCNY',
                logo: require('./img/jCNY.png'),
                logo_g: require('./img/jCNYg.png'),
                color: '#f24949'
              },
              {
                name: 'GDR',
                s_name: 'jGDR',
                logo: require('./img/jGDR.png'),
                logo_g: require('./img/jGDRg.png'),
                color: '#64beef'
              },
              {
                name: 'TBill',
                s_name: 'jTBill',
                logo: require('./img/jUST.png'),
                logo_g: require('./img/jUSTg.png'),
                color: '#3dcc9d'
              },
              {
                name: 'EUR',
                s_name: 'jEUR',
                logo: require('./img/jEUR.png'),
                logo_g: require('./img/jEURg.png'),
                color: '#41479b'
              }
            ]
        }
      this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillReceiveProps(){
    this.setState({position: this.props.info.size % 2})
    if(this.props.info.size !== 0){
      this.goAts(this.props.info.size % 2)
    }
  }
  componentWillUnmount(){
    this.setState({position: this.props.info.size % 2})
    if(this.props.info.size !== 0){
      this.goAts(this.props.info.size % 2)
    }
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  componentWillMount() {
     document.addEventListener('keydown', this.handleKeyPress);
  }

  prev() {
      this.refs.coverflow.previous();
      this.state.position--
      if(this.state.position < 0){
        this.setState({position: 0})
      }else{
        this.setState({position: this.state.position})
      }
  }
  next() {
      this.refs.coverflow.next();
      this.state.position++
      if(this.state.position > this.props.info.size - 1){
        this.setState({position: this.props.info.size - 1})
      }else{
        this.setState({position: this.state.position})
      }
  }

  getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1;
  }

  goAts(num) {
      this.refs.coverflow.goAt(num);
  }

  handleKeyPress(event) {
    if(event.keyCode===65){
      this.prev()
    }else if(event.keyCode===68){
      this.next()
    }
  }

  detailsView(info){
    if(info.length !== 0){
      return <div className="details-div">
          <div className="address-div">ETH Address: <EtherscanLink entityType="address" entityHash={info[this.state.position].Address}/></div>
          {
            info[this.state.position].Allowed_transactions === 'yes' ? (
              'You are authorized to hold and transfer ' + info[this.state.position].Symbol
            ) : info[this.state.position].Allowed_transactions === 'no' && info[this.state.position].License_needed === 'no' ? (
              'You are authorized to hold ' + info[this.state.position].Symbol
            ) : (
              'You are not authorized for ' + info[this.state.position].Symbol
            )
          }
          <br/>
          {
            info[this.state.position].Balance === 'loading' || info[this.state.position].Balance === 0 ? (
              'You have no ' + info[this.state.position].Symbol + ' in your wallet'
            ) : (
              'Your ' + info[this.state.position].Symbol + ' balance is ' + info[this.state.position].Balance
            )
          }
      </div>
    }
  }

  render() {
    var info
    if(this.props.info._tail){
      info = this.props.info._tail.array
    }else{
      info = []
    }

    let gray_color = '#e4e4e4'

    return (
      <div className="main-div">
        <form>
          <Coverflow ref="coverflow"
  					style={{width: "100%", height:"480px", backgroundColor: 'rgba(0,0,0,0)'}}
  					startPosition={this.state.position}
  					enableScroll={false}
  					animationSpeed={1}>
            {
              info.map((symbol, i) =>
              <div key={i} className="card-container" style={{opacity: (symbol.Allowed_transactions === 'yes' && symbol.License_needed === 'no') && (symbol.Balance === 0 || symbol.Balance === 'loading') ? 0.6 : 1}}>
                 <div className="card">
                   <div className="front">
                      <div className="cover" style={{backgroundColor: symbol.Allowed_transactions === 'yes' && symbol.License_needed === 'no' ? this.state.symbols[this.getIndex(symbol.Symbol, this.state.symbols, 's_name')].color : gray_color}}>
                        {this.state.symbols[this.getIndex(symbol.Symbol, this.state.symbols, 's_name')].name}
                      </div>
                      <img src={symbol.Allowed_transactions === 'yes' && symbol.License_needed === 'no' ? this.state.symbols[this.getIndex(symbol.Symbol, this.state.symbols, 's_name')].logo : this.state.symbols[this.getIndex(symbol.Symbol, this.state.symbols, 's_name')].logo_g} className="symbol-img" alt=''/>
                      <div className="symbol-name" style={{color: (symbol.Allowed_transactions !== 'yes' && symbol.License_needed !== 'no') && gray_color}}>
                        SYMBOL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style={{color: symbol.Allowed_transactions === 'yes' && symbol.License_needed === 'no' ? this.state.symbols[this.getIndex(symbol.Symbol, this.state.symbols, 's_name')].color : gray_color, display: 'inline-block'}}>{symbol.Symbol}</div>
                      </div>
                   </div>
                   <div className="back">
                      <div className="back-head" style={{color: (symbol.Allowed_transactions !== 'yes' && symbol.License_needed !== 'no') && gray_color}}>SMART REGULATION</div>
                      <div className="authorized">
                        <div className="left-authorized" style={{color: (symbol.Allowed_transactions !== 'yes' && symbol.License_needed !== 'no') && gray_color}}>HOLD</div>
                        {
                          (symbol.Allowed_transactions === 'yes' || symbol.Allowed_transactions === 'no') && symbol.License_needed === 'no' ? (
                            <div className="right-authorized" style={{color: '#93c47d'}}>Authorized</div>
                          ) : (
                            <div className="right-authorized" style={{color: '#e06666'}}>Restricted</div>
                          )
                        }
                      </div>
                      <div className="authorized">
                        <div className="left-authorized" style={{color: (symbol.Allowed_transactions !== 'yes' && symbol.License_needed !== 'no') && gray_color}}>TRANSFER</div>
                        {
                          symbol.Allowed_transactions === 'yes' ? (
                            <div className="right-authorized" style={{color: '#93c47d'}}>Authorized</div>
                          ) : (
                            <div className="right-authorized" style={{color: '#e06666'}}>Restricted</div>
                          )
                        }
                      </div>
                      <div className="line-div" style={{borderColor: (symbol.Allowed_transactions !== 'yes' && symbol.License_needed !== 'no') && gray_color}}/>
                      {
                        symbol.License_needed === 'no' ? (
                          <div className="details">
                            To deposit {this.state.symbols[this.getIndex(symbol.Symbol, this.state.symbols, 's_name')].name} and receive<br/>{symbol.Symbol}, please contact:
                          </div>
                        ) : (
                          <div className="details" style={{color: (symbol.Allowed_transactions !== 'yes' && symbol.License_needed !== 'no') && gray_color}}>
                            You do not have {symbol.Symbol} access, to<br/>upgrade your account, contact:
                          </div>
                        )
                      }
                      {
                        symbol.License_needed === 'no' ? (
                          <a href={'mailto:demo@jibrel.network'}><div className="email">demo@jibrel.network</div></a>
                        ) : (
                          <a href={'mailto:licenses@jibrel.network'}><div className="email" style={{color: (symbol.Allowed_transactions !== 'yes' && symbol.License_needed !== 'no') && gray_color}}>licenses@jibrel.network</div></a>
                        )
                      }
                      <div className="line-div" style={{borderColor: (symbol.Allowed_transactions !== 'yes' && symbol.License_needed !== 'no') && gray_color}}/>
                      <img src={symbol.Allowed_transactions === 'yes' && symbol.License_needed === 'no' ? Images.send : Images.left_arrow_gray} className="left_arrow_img" alt=''/>
                   </div>
                 </div>
               </div>
              )
            }
  				</Coverflow>
          <div className="bottom-div"/>
          <img src={Images.left_arrow} className="left_arrow" onClick={() => this.prev()} alt=''/>
          <img src={Images.right_arrow} className="right_arrow" onClick={() => this.next()} alt=''/>
        </form>
        {this.detailsView(info)}
      </div>
    );
  }
}

export default Swipers;
