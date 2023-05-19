#  Copyright 2022-present, the Waterdip Labs Pvt. Ltd.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.

from uuid import UUID

import pytest
from fastapi.testclient import TestClient

from tests.testing_helpers import (
    INTEGRATION_APP_NAME,
    INTEGRATION_CONFIGURATION_V3,
    INTEGRATION_ID_V3,
    MongodbBackendTesting,
)
from waterdip.core.commons.models import Integration, Integration_Type
from waterdip.server.db.mongodb import MONGO_COLLECTION_INTEGRATIONS


@pytest.mark.usefixtures("test_client")
class TestIntegration:
    def test_should_add_integration(self, test_client: TestClient):
        response = test_client.post(
            f"/v1/integration.add",
            json={
                "integration": Integration.DATA_SOURCE,
                "app_name": INTEGRATION_APP_NAME,
                "configuration": INTEGRATION_CONFIGURATION_V3,
            },
        )
        response_data = response.json()
        assert response.status_code == 200
        assert response_data["app_name"] == INTEGRATION_APP_NAME
        assert response_data["configuration"] == INTEGRATION_CONFIGURATION_V3
        assert response_data["integration"] == Integration.DATA_SOURCE
        assert response_data["integration_id"] is not None

        response = test_client.post(
            f"/v1/integration.delete", json=response_data["integration_id"]
        )
        assert response.status_code == 200

    def test_should_return_integration_list(self, test_client: TestClient):
        add_response = test_client.post(
            f"/v1/integration.add",
            json={
                "integration": Integration.DATA_SOURCE,
                "app_name": INTEGRATION_APP_NAME,
                "configuration": INTEGRATION_CONFIGURATION_V3,
            },
        )
        response = test_client.get(f"/v1/integration.list")
        response_data = response.json()
        assert response.status_code == 200
        assert len(response_data) == 1
        assert response_data[0]["app_name"] == INTEGRATION_APP_NAME
        assert response_data[0]["configuration"] == INTEGRATION_CONFIGURATION_V3
        assert response_data[0]["integration"] == Integration.DATA_SOURCE
        assert response_data[0]["integration_id"] is not None

        response = test_client.post(
            f"/v1/integration.delete", json=response_data[0]["integration_id"]
        )
        assert response.status_code == 200
