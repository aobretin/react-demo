import React from 'react';
import Input from '../../../../reusables/Input';

import {AutoComplete} from 'material-ui';

import styles from './styles.scss';

const Index = ({
  setNewInputValue,
  parentStyles
}) => {
  return (
    <div className={parentStyles['tab-content']}>
      <AutoComplete
        hintText="Type host name..."
        dataSource={[
          'alex', 'andrei'
        ]}
        onUpdateInput={() => {}}
        fullWidth
      />
    </div>
  )
}

export default Index;
