import React from 'react';
import PropTypes from 'prop-types';
import {
  DatePicker,
  TimePicker
} from 'material-ui';

import Formsy from 'formsy-react-2';
import moment from 'moment';

const parseTime = time => {
  const [
    hour,
    minute
  ] = time.split(':');

  return moment().set({
    hour,
    minute
  }).toDate();
}

const parseMinMaxDate = date => date ? moment(date).toDate() : null;

class Input extends Formsy.Mixin {
  updateValueDate = (date, {name}) => {
    const newDate = moment(date).format('YYYY-MM-DD');
    this.setValue(newDate);

    if (this.props.customCallback) {
      this.props.customCallback(
        {[name]: newDate}
      );
    }
  };

  updateValueTime = (date, {name}) => {
    const newTime = moment(date).format('HH:mm');
    this.setValue(newTime);

    if (this.props.customCallback) {
      this.props.customCallback(
        {[name]: newTime}
      );
    }
  };

  render() {
    const {
      type: Type = DatePicker,
      inputClass = 'input-element',
      minDate = moment(this.getValue()),
      maxDate = null,
      customCallback,
      ...rest
    } = this.removeFormsyProps(this.props);

    const errorMessage = this.getErrorMessage();

    const changeValue = Type === DatePicker ? this.updateValueDate : this.updateValueTime;
    const defaultValue = Type === DatePicker ? moment(this.getValue()).toDate() : parseTime(this.getValue());
    const minMaxDate = Type === DatePicker ? {minDate: parseMinMaxDate(minDate), maxDate: parseMinMaxDate(maxDate)} : {};

    return (
      <div className={inputClass}>
        <Type
            {...rest}
            {...minMaxDate}
            value={defaultValue}
            onChange={(e, date) => changeValue(date, rest)}
        />
        <span>{errorMessage}</span>
      </div>
    )
  }
}

export default Input;
