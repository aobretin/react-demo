import ApiService from '../../../api';

class Service {
  async fetchParties() {
    const {
      data: {
        data: processedData
      }
    } = await ApiService.graphql(
      `
        {
          parties {
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
        }
      `
    );

    return processedData;
  }

  async deleteParty(id) {
    const {
      data: {
        data: processedData
      }
    } = await ApiService.graphql(
      `mutation DeleteParty($id: ID!) {
        parties: deleteParty(id: $id) {
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
      {id}
    )

    return processedData;
  }
}

export default Service;
