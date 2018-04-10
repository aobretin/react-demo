export default {
  setParties(parties) {
    this.parties = [...parties];
  },
  toggleCreateParty(flag) {
    this.createParty = flag;
  }
}
