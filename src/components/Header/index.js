import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

import MenuStructure from '../../global/MenuStructure';

import logo from './img/jibrel_logo.jpg';
import './style.css'


import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {
  WEB3__CONNECTION_STATUS__SUCCESS,
  WEB3__ACCOUNTS_STATUS__SUCCESS,
} from '../../containers/Web3Guard/constants';
import {selectWeb3Global} from '../../containers/Web3Guard/selectors';
import{selectJibrelSupportedNetworkIds} from '../../containers/JibrelAPIConfig/selectors'


class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth:      window.innerWidth,
      mobileNavVisible: false,
    };

    this.handleResize   = this.handleResize.bind(this);
    this.handleToggleMobileNavVisible = this.handleToggleMobileNavVisible.bind(this);
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

  handleToggleMobileNavVisible() {
    this.setState({mobileNavVisible: !this.state.mobileNavVisible});
  };

  renderDesktopNavigationLinks() {
    return MenuStructure.map((menuElement, i) => {
      let isActiveElement = (browserHistory.getCurrentLocation().pathname === menuElement.url);
      let connect_state = (i === 1 && (this.props.web3Global.get('web3Accounts').get('status') !== WEB3__ACCOUNTS_STATUS__SUCCESS || this.props.web3Global.get('web3Connection').get('status') !== WEB3__CONNECTION_STATUS__SUCCESS || this.props.escrowerSupportedNetworkIds.includes(this.props.web3Global.get('web3Network').get('networkId')) === false || this.props.web3Global.get('web3Accounts').get('accountsList').toJS().length === 0))
      return (
        <Link to={menuElement.url} key={i} className={connect_state && "disabled"}>
          <li
            className={isActiveElement ? "li-normal-click" : "li-normal"}
          >
            {menuElement.text}
          </li>
        </Link>
      );
    });
  }

  renderMobileNavigationLinks() {
    return MenuStructure.map((menuElement, i) => {
      let isActiveElement = (browserHistory.getCurrentLocation().pathname === menuElement.url);
      let connect_state = (i === 1 && (this.props.web3Global.get('web3Accounts').get('status') !== WEB3__ACCOUNTS_STATUS__SUCCESS || this.props.web3Global.get('web3Connection').get('status') !== WEB3__CONNECTION_STATUS__SUCCESS || this.props.escrowerSupportedNetworkIds.includes(this.props.web3Global.get('web3Network').get('networkId')) === false || this.props.web3Global.get('web3Accounts').get('accountsList').toJS().length === 0))
      return (
        <Link to={menuElement.url} key={i} style={{textDecoration: 'none'}} className={connect_state && "disabled"}>
          <li
            className={isActiveElement ? "li-mobile-click" : "li-mobile"}
            onClick={() => {!connect_state && this.handleToggleMobileNavVisible()}}
          >
            {menuElement.text}
          </li>
        </Link>
      );
    });
  }

  renderNavigation() {
    if (this.state.windowWidth <= 1000) {
      return (
        <div className="mobile">
          {
            this.state.mobileNavVisible ? (
              <div className="hamburger">
                <i onClick={e => this.handleToggleMobileNavVisible(e)} className="fa fa-times fa-1x" aria-hidden="true"></i>
              </div>
            ) : (
              <div className="hamburger">
                <i onClick={e => this.handleToggleMobileNavVisible(e)} className="fa fa-bars fa-1x" aria-hidden="true"></i>
              </div>
            )
          }
          <li className="mobile-center"><Link
            style={{textDecoration: 'none', color: '#a9a9a9'}} to="/">jibrel network</Link></li>
          <ul className="nav-mobile"
              style={this.state.mobileNavVisible ? {backgroundColor: '#ffffff', height: window.innerHeight} : null}
          >
            {this.state.mobileNavVisible && this.renderMobileNavigationLinks()}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="nav_normal">
          <ul>
            <li
              className="li-logo"
              style={{marginRight: this.state.windowWidth <= 1200 && '9%'}}
            >
              <Link to="/">
                <img src={logo} alt=""/>
                <span className="logo-text">jibrel<br/>network</span>
              </Link>
            </li>
            {this.renderDesktopNavigationLinks()}
            <div className="pig-button" style={{marginLeft: this.state.windowWidth <= 1200 && '35'}}/>
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        {this.renderNavigation()}
      </nav>
    );
  }
}

Header.propTypes = {
  web3Global:                  PropTypes.any,
  escrowerSupportedNetworkIds: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
                                                   web3Global:                  selectWeb3Global,
                                                   escrowerSupportedNetworkIds: selectJibrelSupportedNetworkIds,
                                                 });

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
