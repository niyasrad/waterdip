import { useQuery, UseQueryResult } from 'react-query';
import axios from '../../utils/axios';
import { GET_INTEGRATIONS_API } from '../apis';

interface IntegrationsList {
    integration_id: string,
    integration: string,
    app_name: string,
    configuration: any
}


export const UseGetIntegration  = () => {
  return useQuery(['integration.list'], queryModels, {
    refetchOnWindowFocus: false
  });

  async function queryModels() {

    const response = await axios.get<Array<IntegrationsList>>(
      GET_INTEGRATIONS_API
    );
    return response;
    
  }
};
