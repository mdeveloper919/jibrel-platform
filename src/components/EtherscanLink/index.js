import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import ETHEREUM_NETWORK_INFO from '../../utils/EthUtils/NetworksInfo';
import {selectWeb3Network} from '../../containers/Web3Guard/selectors';


class EtherscanLink extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const networkId = this.props.web3Network.get('networkId');
    let href        = null;
    let linkText    = null;

    if (this.props.entityType === 'tx') {
      for (let i = 0; i < ETHEREUM_NETWORK_INFO.length; i++) {
        if (ETHEREUM_NETWORK_INFO[i].networkId === networkId) {
          href     = ETHEREUM_NETWORK_INFO[i].etherscanTxUrlBuilder(this.props.entityHash);
          linkText = this.props.entityHash.substring(0, 17) + '...'
        }
      }
    }
    if (this.props.entityType === 'address') {
      for (let i = 0; i < ETHEREUM_NETWORK_INFO.length; i++) {
        if (ETHEREUM_NETWORK_INFO[i].networkId === networkId) {
          href     = ETHEREUM_NETWORK_INFO[i].etherscanAddressUrlBuilder(this.props.entityHash);
          linkText = this.props.entityHash;
        }
      }
    }
    if (href !== null) {
      return (<a href={href} target="_blank" rel="noopener noreferrer">{linkText}</a>);
    }

    return (<span>{this.props.entityHash}</span>);
  }
}


EtherscanLink.propTypes = {
  entityType:  PropTypes.string.isRequired,
  entityHash:  PropTypes.string.isRequired,
  web3Network: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
                                                   web3Network: selectWeb3Network,
                                                 });

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(EtherscanLink);
