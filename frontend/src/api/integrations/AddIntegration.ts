import { ADD_INTEGRATION_API } from "../apis";

import axios from "../../utils/axios";

type IntegrationType = {
  integration: string;
  app_name: string;
  configuration: any;
};

type AddIntegrationResponse = {
  integration_id: string;
  integration: string;
  app_name: string;
  configuration: any;
};

export const UseIntegrationAdd = async (integration: IntegrationType) => {

  const response = await axios.post(ADD_INTEGRATION_API, integration)

  const addIntegrationResponse: AddIntegrationResponse = {
    integration_id: response.data.integration_id || "",
    integration: response.data.integration || "",
    app_name: response.data.app_name || "",
    configuration: response.data.configuration || "",
  };

  return { ...response, addIntegrationResponse }
};
