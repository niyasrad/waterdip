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

from fastapi import APIRouter, Body, Depends

from waterdip.server.apis.models.models import (
    ModelListResponse,
    RegisterModelRequest,
    RegisterModelResponse,
    RegisterModelVersionRequest,
    RegisterModelVersionResponse,
)
from waterdip.server.apis.models.params import RequestPagination, RequestSort
from waterdip.server.db.models.models import ModelVersionDB
from waterdip.server.services.model_service import ModelService, ModelVersionService
from typing import Optional

router = APIRouter()


@router.get("/list.models", response_model=ModelListResponse, name="list:models")
def model_list(
    pagination: RequestPagination = Depends(),
    sort: RequestSort = Depends(),
    service: ModelService = Depends(ModelService.get_instance),
    get_all_versions_flag: Optional[bool] = False,
):
    list_models = service.list_models(sort_request=sort, pagination=pagination, 
                                    get_all_versions_flag=get_all_versions_flag)
    response = ModelListResponse(
        model_list=list_models,
        meta={
            "page": pagination.page,
            "limit": pagination.limit,
            "total": service.count_models(),
        },
    )
    return response


@router.post(
    "/model.register", response_model=RegisterModelResponse, name="model:register"
)
def register_model(
    request: RegisterModelRequest = Body(
        ..., description="the request model register info"
    ),
    service: ModelService = Depends(ModelService.get_instance),
):
    registered_model = service.register_model(request.model_name)

    return RegisterModelResponse(
        model_id=registered_model.model_id, model_name=registered_model.model_name
    )


@router.post(
    "/model.version.register",
    response_model=RegisterModelVersionResponse,
    name="model_version:register",
)
def register_model_version(
    request: RegisterModelVersionRequest = Body(
        ..., description="the request model version register info"
    ),
    service: ModelVersionService = Depends(ModelVersionService.get_instance),
):
    registered_model_version: ModelVersionDB = service.register_model_version(
        model_id=request.model_id,
        model_version=request.model_version,
        version_schema=request.version_schema,
    )
    return RegisterModelVersionResponse(
        model_version=registered_model_version.model_version,
        model_version_id=registered_model_version.model_version_id,
    )
