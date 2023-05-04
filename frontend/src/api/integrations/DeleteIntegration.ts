import { DELETE_INTEGRATION_API } from "../apis";
import axios from "../../utils/axios";
import { useState } from "react";

type MyError = Error;

interface DeleteIntegrationHook {
  isDeleting: boolean;
  error: MyError | null;
  IntegrationDelete: (integrationID: string) => Promise<void>;
}

export const UseIntegrationDelete = (): DeleteIntegrationHook => {

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<MyError | null>(null);
  const IntegrationDelete = async (integrationID: string) => {
    setIsDeleting(true);
    try {
      await axios.post(DELETE_INTEGRATION_API, integrationID);
    } catch (err) {
      setError(err as MyError);
    } finally {
      setIsDeleting(false);
    }
  };
  
  return { isDeleting, error, IntegrationDelete };

};
