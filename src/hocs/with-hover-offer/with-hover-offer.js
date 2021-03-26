import React, {PureComponent} from "react";
import PropTypes from "prop-types";


const withHoverOffer = (Component) => {
  class WithHoverOffer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentOffer: null,
      };

      this._mouseEnterHandler = this._mouseEnterHandler.bind(this);
      this._mouseLeaveHandler = this._mouseLeaveHandler.bind(this);
    }

    render() {
      const {currentOffer} = this.state;

      return (
        <Component
          {...this.props}
          currentOffer={currentOffer}
          onMouseEnter={this._mouseEnterHandler}
          onMouseLeave={this._mouseLeaveHandler}
        />
      );
    }

    _mouseEnterHandler(current) {
      this.setState({
        currentOffer: current,
      });
    }

    _mouseLeaveHandler() {
      this.setState({
        currentOffer: null,
      });
    }
  }

  WithHoverOffer.propTypes = {
    city: PropTypes.string.isRequired,
    offers: PropTypes.array.isRequired,
  };

  return WithHoverOffer;
};


export default withHoverOffer;
