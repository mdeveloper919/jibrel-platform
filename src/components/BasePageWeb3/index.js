import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import Images from './images';
import './style.css';

import {
  WEB3__CONNECTION_STATUS__SUCCESS,
  WEB3__ACCOUNTS_STATUS__SUCCESS,
} from '../../containers/Web3Guard/constants';
import {selectWeb3Global} from '../../containers/Web3Guard/selectors';
import{selectJibrelSupportedNetworkIds} from '../../containers/JibrelAPIConfig/selectors'
import ETHEREUM_NETWORK_INFO from '../../utils/EthUtils/NetworksInfo';

import BasePage from '../BasePage';

const metaMaskUrl = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn";


class BasePageWeb3 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
        }
  }

  handleResize(){
      this.setState({
          windowWidth: window.innerWidth,
      });
  }

  componentWillMount(){
      this.handleResize();
  }
  componentDidMount() {
      window.addEventListener('resize', this.handleResize=()=>{this.setState({windowWidth: window.innerWidth})});
  }

  componentWillUnmount(){
      window.removeEventListener('resize', this.handleResize=()=>{this.setState({windowWidth: window.innerWidth})});
  }

  render() {
    const styles = {
      table_div: {
        width: this.state.windowWidth >= 1200 ? 1100 : '90%'
      },
      title_div: {
        fontSize: this.state.windowWidth >= 700 ? 42 : 30,
        fontWeight: '400',
      },
      desciption: {
        fontSize: this.state.windowWidth >= 700 ? 22 : 16,
      },
      error_div: {
        fontSize: this.state.windowWidth >= 700 ? 22 : 16,
        textDecoration: 'none'
      }
    }
    if (this.props.web3Global.get('web3Connection').get('status') !== WEB3__CONNECTION_STATUS__SUCCESS) {
      return (
        <BasePage>
          <div className="blue-div">
            <div className="table-div" style={styles.table_div}>
              <div className="left-div">
                <h1 className="title_div" style={styles.title_div}>Not Connected</h1><br/>
                <p className="desciption" style={styles.desciption}>No connection to the Ethereum network has been detected. Please ensure you are using Chrome with the Metamask extension installed.</p><br/>
                <a className="error_div" style={styles.error_div} href={metaMaskUrl} target="_blank" rel="noopener noreferrer">Click here to install Metamask</a>
              </div>
              <div className="right-div">
                <img src={Images.circle_close} className={this.state.windowWidth >= 1000 ? "img_div" : "img_div_mobile"} alt=''/>
              </div>
            </div>
          </div>
        </BasePage>
      );
    }

    if (this.props.escrowerSupportedNetworkIds.includes(this.props.web3Global.get('web3Network').get('networkId')) === false) {
      let currentNetworkId   = this.props.web3Global.get('web3Network').get('networkId');
      let currentNetworkName = null;
      for (let i = 0; i < ETHEREUM_NETWORK_INFO.length; i++) {
        if (ETHEREUM_NETWORK_INFO[i].networkId === currentNetworkId) {
          currentNetworkName = ETHEREUM_NETWORK_INFO[i].networkName;
        }
      }

      return (
        <BasePage>
          <div className="blue-div">
            <div className="table-div" style={styles.table_div}>
              <div className="left-div">
                <h1 className="title_div" style={styles.title_div}>Not Connected</h1><br/>
                <p className="desciption" style={styles.desciption}>{currentNetworkName} network is unsupported, Jibrel currently supports the following networks:</p>
                {
                  this.props.escrowerSupportedNetworkIds.map((networkId, k) =>

                    ETHEREUM_NETWORK_INFO.map((info, i) =>
                      info.networkId === networkId &&
                        (<p className="desciption" style={styles.desciption} key={networkId}><i>{info.networkName}</i></p>)
                    )

                  )
                }
                <p className="error_div" style={styles.error_div}>Please check Metamask settings and try again</p>
              </div>
              <div className="right-div">
                <img src={Images.circle_close} className={this.state.windowWidth >= 1000 ? "img_div" : "img_div_mobile"} alt=''/>
              </div>
            </div>
          </div>
        </BasePage>
      );
    }

    if (this.props.web3Global.get('web3Accounts').get('status') !== WEB3__ACCOUNTS_STATUS__SUCCESS ||
      this.props.web3Global.get('web3Accounts').get('accountsList').toJS().length === 0) {
      return (
        <BasePage>
          <div className="blue-div">
            <div className="table-div" style={styles.table_div}>
              <div className="left-div">
                <h1 className="title_div" style={styles.title_div}>Not Connected</h1><br/>
                <p className="desciption" style={styles.desciption}>A connection to the Ethereum network has been established but no loaded Ethereum accounts were detected.</p>
                <p className="error_div" style={styles.error_div}>Please unlock Metamask and try again</p>
              </div>
              <div className="right-div">
                <img src={Images.circle_close} className={this.state.windowWidth >= 1000 ? "img_div" : "img_div_mobile"} alt=''/>
              </div>
            </div>
          </div>
        </BasePage>
      );
    }

    if (this.props.web3Global.get('web3Accounts').get('status') === WEB3__ACCOUNTS_STATUS__SUCCESS &&
      this.props.web3Global.get('web3Connection').get('status') === WEB3__CONNECTION_STATUS__SUCCESS) {
      return (
        <BasePage>
          <div className="blue-div">
            <div className="table-div" style={styles.table_div}>
              <div className="left-div">
                <h1 className="title_div" style={styles.title_div}>Connected</h1><br/>
                <p className="desciption" style={styles.desciption}>You are currently connected to the jibrel Network. To get started, navigate to the CryDRs page to browse your available authorizations.</p>
                <p className="error_div" style={styles.error_div}>View my CryDR Authorizations</p>
              </div>
              <div className="right-div">
                <img src={Images.circle_connection} className={this.state.windowWidth >= 1000 ? "img_div" : "img_div_mobile"} alt=''/>
              </div>
            </div>
          </div>
        </BasePage>
      );
    }

    return (
      <BasePage>
        { this.props.children }
      </BasePage>
    );
  }
}


BasePageWeb3.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BasePageWeb3);
