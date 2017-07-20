import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PaginationDot from './paginationDot';


class Pagination extends Component {
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

  handleClick = (event, index) => {
    this.props.onChangeIndex(index);
  };

  render() {
    const {
            index,
            dots,
            slide_idx
          } = this.props;

    const children = [];

    for (let i = 0; i < dots; i += 1) {
      children.push(
        <PaginationDot
          key={i}
          index={i}
          slide_idx={slide_idx}
          active={i === index}
          onClick={this.handleClick}
        />,
      );
    }

    return (
      <div style={slide_idx === 1 ? {
        position:      'absolute',
        top:           645,
        left:          this.state.windowWidth / 2 - 60,
        display:       'flex',
        flexDirection: 'row',
        height:        50
      } : null}>
        {children}
      </div>
    );
  }
}

Pagination.propTypes = {
  dots:          PropTypes.number.isRequired,
  slide_idx:     PropTypes.number.isRequired,
  index:         PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired,
};

export default Pagination;
