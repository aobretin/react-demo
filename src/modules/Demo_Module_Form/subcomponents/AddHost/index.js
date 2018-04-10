import React from 'react';
import Input from '../../../../reusables/Input';

import styles from './styles.scss';

const Index = ({
  name: hostName,
  mail: hostMail,
  phone: hostPhone,
  social: hostSocial,
  address: hostAddress,

  setNewInputValue,
  parentStyles
}) => {
  return (
    <div className={parentStyles['tab-content']}>
      <Input
        element='input'
        type="text"
        name="host.name"
        value={hostName}
        customCallback={setNewInputValue}
        inputClass={parentStyles['input-element']}
        placeholder="Host name"
        required
      />

      <Input
        element='input'
        type="mail"
        name="host.mail"
        value={hostMail}
        customCallback={setNewInputValue}
        inputClass={parentStyles['input-element']}
        placeholder="Host mail"
        required
      />

      <Input
        element='input'
        type="text"
        name="host.phone"
        value={hostPhone}
        customCallback={setNewInputValue}
        inputClass={parentStyles['input-element']}
        placeholder="Host phone"
      />

      <Input
        element='input'
        type="text"
        name="host.address"
        value={hostAddress}
        customCallback={setNewInputValue}
        inputClass={parentStyles['input-element']}
        placeholder="Host address"
      />
    </div>
  )
}

export default Index;
