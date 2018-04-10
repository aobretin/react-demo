import moment from 'moment';

export default {
  party: {
    id: '',
    name: '',
    date: {
      startDate: moment().format('YYYY-MM-DD'),
      startTime: moment().startOf('day').format('HH:mm'),
      endDate: moment().format('YYYY-MM-DD'),
      endTime: moment().startOf('day').format('HH:mm')
    },
    host: {
      name: '',
      mail: '',
      phone: '',
      social: '',
      address: ''
    },
    type: 'virtual',
    status: '1'
  },
  formIsValid: false
}
