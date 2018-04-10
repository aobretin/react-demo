import {unflatten, mergeDeep} from '../../../helpers';

export default {
  setIsValid() {
    this.formIsValid = true
  },
  setIsInvalid() {
    this.formIsValid = false
  },
  setNewInputValue(object) {
    this.party = mergeDeep(
      this.party,
      unflatten(object)
    )
  },
  setParty(party) {
    this.party = mergeDeep(
      this.party,
      party
    )
  }
}
