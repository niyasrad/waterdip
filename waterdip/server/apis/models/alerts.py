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
from datetime import datetime
from typing import Dict, List, Optional, Union
from uuid import UUID

from pydantic import BaseModel, Field

from waterdip.core.commons.models import MonitorType


class AlertIdentification(BaseModel):
    """
    Schema of Alert Identification

    Attributes:
    ------------------
    model_version_id: UUID
        Model version id
    model_id: UUID
        Model id
    """

    model_version_id: UUID = Field(description="")
    model_id: UUID = Field(description="...")


class AlertListRow(BaseModel):
    """
    Schema of Model List row response

    Attributes:
    ------------------
    created_at: datetime
        Alert creation time
    monitor_name: str
        Name of the monitor
    monitor_type: MonitorType
        Type of the monitor
    severity: str
        Severity of the alert
    status: str
        Status of the alert
    action: str
        Action to be taken on the alert
    """

    created_at: datetime = Field(..., description="Alert creation time")
    monitor_name: str = Field(..., description="Name of the monitor")
    monitor_type: MonitorType = Field(..., description="Type of the monitor")
    severity: str = Field(..., description="Severity of the alert")
    status: Optional[str]
    action: Optional[str]


class AlertListResponse(BaseModel):
    """
    Schema of Model List response

    Attributes:
    ------------------
    model_list: List[AlertListRow]
        List of alerts
    meta: Optional[Dict[str, Union[str, int]]]
        Meta data of the response
    """

    model_list: List[AlertListRow]
    meta: Optional[Dict[str, int]]
