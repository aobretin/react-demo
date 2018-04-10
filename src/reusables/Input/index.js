import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react-2';

class Input extends Formsy.Mixin {
  updateValue = e => {
    this.setValue(e.target.value);
    
    if (this.props.customCallback) {
      this.props.customCallback({
        [e.target.name]: e.target.value
      });
    }
  };

  render() {
    const {
      element: Element,
      inputClass = 'input-element',
      children,
      customCallback,
      ...rest
    } = this.removeFormsyProps(this.props);

    const errorMessage = this.getErrorMessage();

    return (
      <div className={inputClass}>
        <Element {...rest} value={this.getValue()} onChange={this.updateValue}>
          {children}
        </Element>
        <span>{errorMessage}</span>
      </div>
    )
  }
}

export default Input;
