import React from 'react';

import BasePageWeb3 from '../../components/BasePageWeb3';

import './style.css';

class HomePage extends React.Component {
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
    return (
      <BasePageWeb3/>
    );
  }
}

export default HomePage;
