import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {createStructuredSelector} from 'reselect';

import BasePage from '../../components/BasePage';
import Swiper from '../../components/Swiper';

import {
  API_REQUEST_STATUS__ROUTINE_SUCCESS,
} from '../../utils/apirequest/constants';

import {selectWeb3Accounts} from '../Web3Guard/selectors';

import {
  selectJibrelCrydrList,
  selectJibrelCrydrAllLicenses,
} from '../JibrelGlobal/selectors'

import {
  selectDefaultInvestorAdmittance,
  selectDefaultInvestorLicenses,
  selectDefaultInvestorBalances,
} from '../JibrelInvestors/selectors'

import {updateRequiredPageDataLaunch} from './actions';
import {selectUpdateNeeded} from './selectors';


class CrydrPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.getCrydrData              = this.getCrydrData.bind(this);
    this.getCrydrLicense           = this.getCrydrLicense.bind(this);
    this.isCrydrLicensed           = this.isCrydrLicensed.bind(this);
    this.getInvestorAdmittance     = this.getInvestorAdmittance.bind(this);
    this.isInvestorAdmitted        = this.isInvestorAdmitted.bind(this);
    this.getInvestorLicense        = this.getInvestorLicense.bind(this);
    this.isCrydrAllowedForInvestor = this.isCrydrAllowedForInvestor.bind(this);
    this.getInvestorBalance        = this.getInvestorBalance.bind(this);

    this.renderInvestorCard   = this.renderInvestorCard.bind(this);
    this.renderCrydrCard      = this.renderCrydrCard.bind(this);
    this.renderCrydrCardsList = this.renderCrydrCardsList.bind(this);
    this.renderTransferTokens = this.renderTransferTokens.bind(this);
  }

  //noinspection JSMethodCanBeStatic
  componentWillReceiveProps(nextProps) {
    if (nextProps.isUpdateNeeded) {
      nextProps.actions.updateRequiredPageDataLaunch();
    }
  }
  componentDidMount(){
    this.props.actions.updateRequiredPageDataLaunch();
  }

  /* Helpers */

  getCrydrData(crydrSymbol) {
    let crydrData = this.props.crydrList.get("data").find(obj => obj.get("symbol") === crydrSymbol);
    if (typeof crydrData === 'undefined' || crydrData === null) {
      return null;
    }
    return crydrData;
  }

  getCrydrLicense(crydrSymbol) {
    let crydrLicense = this.props.crydrLicenses.find(obj => obj.get("crydrSymbol") === crydrSymbol);
    if (typeof crydrLicense === 'undefined' || crydrLicense === null || crydrLicense.get("routineStatus") !== API_REQUEST_STATUS__ROUTINE_SUCCESS) {
      return null;
    }
    return crydrLicense;
  }

  isCrydrLicensed(crydrSymbol) {
    let crydrLicense = this.getCrydrLicense(crydrSymbol);
    if (crydrLicense === null) {
      return null;
    }
    return crydrLicense.get("licenseInfo").get("license_needed");
  }

  getInvestorAdmittance() {
    if (
      typeof this.props.investorAdmittance === 'undefined' ||
      this.props.investorAdmittance === null ||
      this.props.investorAdmittance.get("routineStatus") !== API_REQUEST_STATUS__ROUTINE_SUCCESS
    ) {
      return null;
    }
    return this.props.investorAdmittance;
  }

  isInvestorAdmitted() {
    let admittance = this.getInvestorAdmittance();
    if (admittance === null) {
      return null;
    }
    return admittance.get("isAdmitted");
  }

  getInvestorLicense(licenseName) {
    if (typeof this.props.investorLicenses === 'undefined' || this.props.investorLicenses === null) {
      return null;
    }
    let license = this.props.investorLicenses.find(obj => obj.get("licenseName") === licenseName);
    if (typeof license === 'undefined' || license === null || license.get("routineStatus") !== API_REQUEST_STATUS__ROUTINE_SUCCESS) {
      return null;
    }
    return license;
  }

  isCrydrAllowedForInvestor(crydrSymbol) {
    let isCrydrLicensed = this.isCrydrLicensed(crydrSymbol);
    if (isCrydrLicensed === null) {
      return null;
    }
    if (isCrydrLicensed === false) {
      return true;
    }

    let crydrLicense = this.getCrydrLicense(crydrSymbol);
    if (crydrLicense === null) {
      return null;
    }

    let isAdmitted = this.isInvestorAdmitted();
    if (isAdmitted === null) {
      return null;
    }
    if (isAdmitted === false) {
      return false;
    }

    let investorLicense = this.getInvestorLicense(crydrLicense.get("licenseInfo").get("single_license"));
    if (investorLicense === null) {
      return null;
    }
    return investorLicense.get("isGranted");
  }

  getInvestorBalance(crydrSymbol) {
    if (typeof this.props.investorBalances === 'undefined' || this.props.investorBalances === null) {
      return null;
    }
    let balance = this.props.investorBalances.find(obj => obj.get("crydrSymbol") === crydrSymbol);
    if (typeof balance === 'undefined' || balance === null || balance.get("routineStatus") !== API_REQUEST_STATUS__ROUTINE_SUCCESS) {
      return null;
    }
    return balance.get("balance");
  }


  /* Investor card */

  renderInvestorCard() {
    let investorAddress = this.props.web3Accounts.get("accountsList").get(0);
    let isAdmitted      = this.isInvestorAdmitted();

    return (
      <div style={{margin: 25}}>
        <span>Your address: {investorAddress}</span><br/>
        <span>Admittance to licensed assets: {isAdmitted === null ? "loaded" : isAdmitted === true ? "yes" : "no"}</span>
      </div>
    );
  }


  /* Crydr card */

  renderCrydrCard(crydrSymbol) {
  //  let currentPath = browserHistory.getCurrentLocation().pathname;
    let crydrData   = this.getCrydrData(crydrSymbol);
    if (crydrData === null) {
      return null;
    }
    let isLicensed = this.isCrydrLicensed(crydrSymbol);
    let isAllowed  = this.isCrydrAllowedForInvestor(crydrSymbol);
    let balance    = this.getInvestorBalance(crydrSymbol);


    var License_needed
    if(isLicensed){
      License_needed = "yes"
    }else{
      License_needed = "no"
    }

    var Allowed_transactions
    if(isAllowed){
      Allowed_transactions = "yes"
    }else{
      Allowed_transactions = "no"
    }

    var Balance
    if(balance === null){
      Balance = "loading"
    }else{
      Balance = (balance / Math.pow(10, 18))
    }

    var info = {
      Address: crydrData.get("address"),
      Name: crydrData.get("name"),
      Symbol: crydrData.get("symbol"),
      License_needed: License_needed,
      Allowed_transactions: Allowed_transactions,
      Balance: Balance
    }

    return info
  }

  renderCrydrCardsList() {
    return this.props.crydrList.get("data").map((crydrElement, index) =>
      {return this.renderCrydrCard(crydrElement.get("symbol"))}
    )
  }


  /* Transfer tokens */

  renderTransferTokens() {
    // let currentPath = browserHistory.getCurrentLocation().pathname;
    return (
      <div>
        <span>Your address: {this.props.web3Accounts.get("accountsList").get(0)}</span><br/>
      </div>
    );
  }


  /* Main render method */

  render() {
    if (
      typeof this.props.params.crydrSymbol === 'undefined' ||
      this.props.params.crydrSymbol === null ||
      this.props.params.crydrSymbol.length === 0
    ) {
      // if URL do not contain CryDR symbol - show list of CryDRs
      return (
        <BasePage>
          <Swiper info={this.renderCrydrCardsList()}/>
        </BasePage>
      );
    }
    else {
      // otherwise show crydr page
      return (
        <BasePage>
          <Swiper info={this.renderCrydrCardsList()}/>
        </BasePage>
      );
    }
  }
}


CrydrPage.propTypes = {
  actions:            PropTypes.any,
  web3Accounts:       PropTypes.any,
  crydrList:          PropTypes.any,
  crydrLicenses:      PropTypes.any,
  investorAdmittance: PropTypes.any,
  investorLicenses:   PropTypes.any,
  investorBalances:   PropTypes.any,
  isUpdateNeeded:     PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
                                                   web3Accounts:       selectWeb3Accounts,
                                                   crydrList:          selectJibrelCrydrList,
                                                   crydrLicenses:      selectJibrelCrydrAllLicenses,
                                                   investorAdmittance: selectDefaultInvestorAdmittance,
                                                   investorLicenses:   selectDefaultInvestorLicenses,
                                                   investorBalances:   selectDefaultInvestorBalances,
                                                   isUpdateNeeded:     selectUpdateNeeded,
                                                 });

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
                                  updateRequiredPageDataLaunch,
                                },
                                dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CrydrPage));
