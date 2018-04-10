import ApiService from '../../../api';

class Service {
  async fetchParty(id) {
    const {
      data: {
        data: processedData
      }
    } = await ApiService.graphql(
        `{
            party(id: ${id}) {
              id
              name
              date {
                startDate,
                startTime,
                endDate,
                endTime
              }
              host {
                name
                mail
                phone
                social
                address
              }
              type,
              status
            }
        }`
    );

    return processedData;
  }

  async editParty(editedParty) {
    const {
      data: {
        data: processedData
      }
    } = await ApiService.graphql(
      `mutation ModifyParty($editedParty: PartyInput!) {
        parties: modifyParty(editedParty: $editedParty) {
          id
          name
          date {
            startDate
            endDate
          }
          host {
            name
          }
          status
        }
      }`,
      {
        editedParty
      }
    )

    return processedData;
  }
}

export default Service;
