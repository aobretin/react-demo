import React from 'react';
import Formsy from 'formsy-react-2';

import {
  DatePicker,
  TimePicker,
  TextField,
  FlatButton,
  RaisedButton,
  SelectField,
  MenuItem,
  Tabs,
  Tab
} from 'material-ui';

import Search from 'material-ui/svg-icons/action/search';
import Add from 'material-ui/svg-icons/av/playlist-add';

import {
  GLOBAL_NAMES
} from '../../constants';

import Input from '../../reusables/Input';
import Picker from '../../reusables/Pickers';

import AddHost from './subcomponents/AddHost';
import SearchHost from './subcomponents/SearchHost';

const Template = ({
  // getters
  party: {
    name,
    type,
    date: {
      startDate,
      startTime,
      endDate,
      endTime
    },
    host
  },
  formIsValid,
  // setters
  setIsValid,
  setIsInvalid,
  setNewInputValue,
  // others
  submit,
  cancelCreateParty,
  filters: {
  },
  // scss
  styles
}) => {
  const {
    GLOBAL_TIME_FORMAT,
    TIME_FORMAT
  } = GLOBAL_NAMES;

  return(
    <Formsy.Form
      className={styles['create-party-form']}
      onValidSubmit={submit}
      onValid={setIsValid}
      onInvalid={setIsInvalid}
    >
      <Input
        element='input'
        type="text"
        name="name"
        value={name}
        customCallback={setNewInputValue}
        inputClass={styles['input-element']}
        placeholder="Party name"
        required
      />

      <Input
        element='select'
        name="type"
        value={type}
        customCallback={setNewInputValue}
        inputClass={styles['input-element']}
      >
        <option value="virtual">virtual</option>
        <option value="collective">collective</option>
        <option value="real">real</option>
      </Input>

      <Picker
        floatingLabelText="Start date"
        name="date.startDate"
        type={DatePicker}
        value={startDate}
        customCallback={setNewInputValue}
        DateTimeFormat={GLOBAL_TIME_FORMAT}
        locale="fr"
        inputClass={styles['input-element-picker']}
        autoOk
      />

      <Picker
        floatingLabelText="Start time"
        type={TimePicker}
        name="date.startTime"
        value={startTime}
        format={TIME_FORMAT}
        customCallback={setNewInputValue}
        inputClass={styles['input-element-picker']}
        autoOk
      />

      <Picker
        floatingLabelText="End date"
        type={DatePicker}
        name="date.endDate"
        value={endDate}
        minDate={startDate}
        customCallback={setNewInputValue}
        DateTimeFormat={GLOBAL_TIME_FORMAT}
        locale="fr"
        inputClass={styles['input-element-picker']}
        autoOk
      />

      <Picker
        floatingLabelText="End time"
        type={TimePicker}
        name="date.endTime"
        value={endTime}
        customCallback={setNewInputValue}
        format={TIME_FORMAT}
        inputClass={styles['input-element-picker']}
        autoOk
      />

      <Tabs className={styles['tabs']}>
        <Tab label="Add host" icon={<Search/>}>
          <AddHost
            {...host}
            parentStyles={styles}
            setNewInputValue={setNewInputValue}
          />
        </Tab>

        <Tab label="Search host" icon={<Add/>}>
          <SearchHost
            parentStyles={styles}
            setNewInputValue={setNewInputValue}
          />
        </Tab>
      </Tabs>

      <div className={styles['form-actions']}>
        <FlatButton
          label="Cancel"
          onClick={cancelCreateParty}
        />

        <RaisedButton
          disabled={!formIsValid}
          type="submit"
          label="Create"
          primary={true}
        />
      </div>
    </Formsy.Form>
  )
}

export default Template;
