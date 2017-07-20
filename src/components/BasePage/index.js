import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

import './style.css';


class BasePage extends React.Component {
  render() {
    // todo replace multiple <br/> with styles
    return (
      <div>
        <Header/>
        <div className="normal">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default BasePage;
