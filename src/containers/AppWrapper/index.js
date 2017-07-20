/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import withProgressBar from '../../components/ProgressBar';
import {web3InitConnection} from '../../containers/Web3Guard/actions';


class AppWrapper extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    // Launch connection to the Ethereum network
    this.props.web3Actions.web3InitConnection();
  }

  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - Jibrel Platform"
          defaultTitle="Jibrel Web Platform"
          meta={[
            {name: 'description', content: 'Jibrel Web Platform'},
          ]}
        />
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

AppWrapper.propTypes = {
  children: PropTypes.node,
  web3Actions: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    web3Actions: bindActionCreators({web3InitConnection}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withProgressBar(AppWrapper));

