import React from 'react';

import Images from './images';
import './style.css';

import { Link } from 'react-router'


class FooterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth:      window.innerWidth,
      mobileNavVisible: false,
    };

    this.handleResize   = this.handleResize.bind(this);
  };

  componentWillMount() {
    this.handleResize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
                    windowWidth:      window.innerWidth,
                    mobileNavVisible: this.state.mobileNavVisible && window.innerWidth <= 1000,
                  });
  }

  render() {
    if (this.state.windowWidth <= 1000) {
      return <div className="footer_normal">
        <div className="september_div">
          <li style={{fontSize: 22}}>FULL RELEASE Q4 2017</li>
          <div className="mobile_icon_div">
            <div className="apple_icon_div"><img src={Images.apple} alt=""/></div>
            <div className="apple_icon_div"><img src={Images.android_logo} alt=""/></div>
          </div>
          <div className="button_div">
            <div className="apple_button" style={{width: window.innerWidth * 7 / 10}}><a href={'https://github.com/jibreldao/'} target="_blank" rel="noopener noreferrer">
              <li style={{fontSize: 14}}>CONTRIBUTE TO OUR CODE</li></a>
            </div>
            <div className="apple_button" style={{width: window.innerWidth * 7 / 10}}><a href={'https://jibrel.network'} target="_blank" rel="noopener noreferrer">
              <li style={{fontSize: 14}}>PARTICIPATE IN OUR FUNDRAISER</li></a>
            </div>
          </div>
        </div>
        <div className="footer_div_mobile">
          <div className="footer_view_mobile">
            <div className="logo-div-mobile">
              Jibrel Network
              <div className="footer_icon_div">Copyright © 2017 Qubist Labs</div>
            </div>
            <div className="right-div-footer-mobile">
              Network
              <div className="item-div"><Link to="/" className="item-link">Network</Link></div>
              <div className="item-div"><Link to="/crydr" className="item-link">CryDRs</Link></div>
            </div>
            <div className="right-div-footer-mobile">
              Community
              <a href={'https://twitter.com/JibrelNetwork'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.twitter_logo_1} alt=''/>Twitter</div></a>
              <a href={'https://www.reddit.com/r/JibrelNetwork/'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.reddit_character} alt=''/>Reddit</div></a>
              <div className="item-div"><img src={Images.bitcoin_logo} alt=''/>Bitcointalk</div>
              <a href={'https://www.youtube.com/watch?v=LBMyd7Ql8QU'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.youtube} alt=''/>Youtube</div></a>
              <a href={'https://t.me/jibrelnetwork'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.telegram} alt=''/>Telegram</div></a>
              <a href={'https://join.slack.com/jibrelnetwork/signup'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.slack_symbol_1} alt=''/>Slack</div></a>
            </div>
            <div className="developers-div">
              Developers
              <a href={'https://github.com/jibreldao/'} target="_blank" rel="noopener noreferrer"><div className="item-div">Github</div></a>
            </div>
          </div>
        </div>
      </div>
        ;
    } else {
      return <div className="footer_normal">
        <div className="september_div">
          <li>FULL RELEASE Q4 2017</li>
          <div className="mobile_icon_div">
            <div className="apple_icon_div"><img src={Images.apple} alt=""/></div>
            <div className="apple_icon_div"><img src={Images.android_logo} alt=""/></div>
          </div>
          <div className="button_div">
            <div className="apple_button"><a href={'https://github.com/jibreldao/'} target="_blank" rel="noopener noreferrer">
              <li>CONTRIBUTE TO OUR CODE</li></a>
            </div>
            <div className="apple_button"><a href={'https://jibrel.network'} target="_blank" rel="noopener noreferrer">
              <li>PARTICIPATE IN OUR FUNDRAISER</li></a>
            </div>
          </div>
        </div>
          <div className="footer_div">
            <div className="footer_view" style={{width: this.state.windowWidth >= 1200 ? 1100 : '90%'}}>
              <div className="logo-div">
                Jibrel Network
                <div className="footer_icon_div">Copyright © 2017 Qubist Labs</div>
              </div>
              <div className="right-div-footer">
                Network
                <div className="item-div"><Link to="/" className="item-link">Network</Link></div>
                <div className="item-div"><Link to="/crydr" className="item-link">CryDRs</Link></div>
              </div>
              <div className="right-div-footer">
                Community
                <a href={'https://twitter.com/JibrelNetwork'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.twitter_logo_1} alt=''/>Twitter</div></a>
                <a href={'https://www.reddit.com/r/JibrelNetwork/'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.reddit_character} alt=''/>Reddit</div></a>
                <div className="item-div"><img src={Images.bitcoin_logo} alt=''/>Bitcointalk</div>
                <a href={'https://www.youtube.com/watch?v=LBMyd7Ql8QU'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.youtube} alt=''/>Youtube</div></a>
                <a href={'https://t.me/jibrelnetwork'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.telegram} alt=''/>Telegram</div></a>
                <a href={'https://join.slack.com/jibrelnetwork/signup'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.slack_symbol_1} alt=''/>Slack</div></a>
              </div>
              <div className="developers-div">
                Developers
                <a href={'https://github.com/jibreldao/'} target="_blank" rel="noopener noreferrer"><div className="item-div"><img src={Images.github} alt=''/>Github</div></a>
              </div>
            </div>
          </div>
      </div>
        ;
    }
  }
}

export default FooterView;
