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
from fastapi import APIRouter, Depends

from waterdip.server.apis.models.alerts import AlertListResponse
from waterdip.server.apis.models.params import RequestPagination, RequestSort
from waterdip.server.services.alert_service import AlertService

router = APIRouter()


@router.get("/list.alerts", response_model=AlertListResponse, name="list:alerts")
def alert_list(
    pagination: RequestPagination = Depends(),
    sort: RequestSort = Depends(),
    service: AlertService = Depends(AlertService.get_instance),
):
    list_alerts = service.list_alerts(
        sort_request=sort,
        pagination=pagination,
    )
    response = AlertListResponse(
        model_list=list_alerts,
        meta={
            "page": pagination.page,
            "limit": pagination.limit,
            "total": service.count_alerts(),
        },
    )
    return response
