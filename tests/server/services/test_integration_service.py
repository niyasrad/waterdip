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

import uuid
from datetime import datetime, timedelta

import pytest

from tests.testing_helpers import (
    INTEGRATION_APP_NAME,
    INTEGRATION_CONFIGURATION_V1,
    INTEGRATION_CONFIGURATION_V2,
    INTEGRATION_CONFIGURATION_V3,
    INTEGRATION_ID_V1,
    INTEGRATION_ID_V2,
    INTEGRATION_ID_V3,
    MongodbBackendTesting,
)
from waterdip.core.commons.models import Integration, Integration_Type, MonitorType
from waterdip.server.apis.models.params import RequestSort
from waterdip.server.db.models.alerts import BaseAlertDB
from waterdip.server.db.models.integrations import BaseIntegrationDB
from waterdip.server.db.mongodb import MONGO_COLLECTION_INTEGRATIONS
from waterdip.server.db.repositories.integration_repository import IntegrationRepository
from waterdip.server.services.integration_service import IntegrationService


@pytest.mark.usefixtures("mock_mongo_backend")
class TestIntegrationService:
    @classmethod
    def setup_class(cls):
        cls.mock_mongo_backend = MongodbBackendTesting.get_instance()
        cls._intergration_repo = IntegrationRepository(mongodb=cls.mock_mongo_backend)
        cls._integration_service = IntegrationService(repository=cls._intergration_repo)
        integration = [
            {
                "integration_id": INTEGRATION_ID_V1,
                "app_name": INTEGRATION_APP_NAME,
                "integration": Integration.DATA_SOURCE,
                "configuration": INTEGRATION_CONFIGURATION_V1,
            },
            {
                "integration_id": INTEGRATION_ID_V2,
                "app_name": INTEGRATION_APP_NAME,
                "integration": Integration.DATA_SOURCE,
                "configuration": INTEGRATION_CONFIGURATION_V2,
            },
        ]
        cls.mock_mongo_backend.database[MONGO_COLLECTION_INTEGRATIONS].insert_many(
            integration
        )

    def test_should_add_integration(self):
        """
        Test the add integration method
        """
        integration = self._integration_service.add_integration(
            integration=Integration.DATA_SOURCE,
            app_name=INTEGRATION_APP_NAME,
            configuration=INTEGRATION_CONFIGURATION_V3,
        )
        result = self.mock_mongo_backend.database[
            MONGO_COLLECTION_INTEGRATIONS
        ].find_one({"integration_id": str(integration.integration_id)})
        assert result["app_name"] == INTEGRATION_APP_NAME
        assert result["configuration"] == INTEGRATION_CONFIGURATION_V3
        assert result["integration"] == Integration.DATA_SOURCE
        assert result["integration_id"] is not None

    def test_should_delete_integration(self):
        """
        Test the delete integration method
        """
        self._integration_service.delete_integration(integration_id=INTEGRATION_ID_V1)
        result = self.mock_mongo_backend.database[
            MONGO_COLLECTION_INTEGRATIONS
        ].find_one({"integration_id": INTEGRATION_ID_V1})
        assert result is None

    def test_should_return_integration_list(self):
        """
        Test the list integration method
        """
        integrations = self._integration_service.list_integration()
        assert len(integrations) == 2

    def test_should_get_integration(self):
        """
        Test the get integration method
        """
        integration = self._integration_service.get_integration(
            integration_id=INTEGRATION_ID_V2
        )
        assert integration.integration == Integration.DATA_SOURCE
        assert integration.app_name == INTEGRATION_APP_NAME
        assert integration.configuration == INTEGRATION_CONFIGURATION_V2

    @classmethod
    def teardown_class(cls):
        cls.mock_mongo_backend.database[MONGO_COLLECTION_INTEGRATIONS].drop()
