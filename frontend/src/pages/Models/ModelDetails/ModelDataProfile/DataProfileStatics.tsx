import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Heading } from '../../../../components/Heading';
import CollapsibleTable from '../../../../components/Tables/collapsible-table-2';
import { useGetMetricsDataset } from 'api/datasets/GetMetricsDataset';
import { useSelector } from '../../../../redux/store';
import { DateRangeFilterState } from '../../../../redux/slices/dateRangeFilter';

const PREFIX = 'DataProfileStats';
const classes = {};
const StyledBox = styled(Box)({});

export const DataProfileStats = ({ datasetId, model_id, model_version_id }: any) => {

  const now = new Date();
  const { fromDate, toDate } = useSelector(
    (state: { dateRangeFilter: DateRangeFilterState }) => state.dateRangeFilter
  );
  const { data } = useGetMetricsDataset({
      model_id: model_id,
      model_version_id: model_version_id,
      dataset_id: datasetId,
      start_time: fromDate,
      end_time: toDate 
  })
  const datasetInfo = data && data.data;
  return (
    <StyledBox sx={{ marginTop: '30px' }}>
      <Heading heading="Data Statistics" subtitle="Data Statistics for each columns" />
      {datasetInfo && datasetInfo.categorical_column_stats.length != 0 ?(
        <>
          <Heading heading="Categorical Table" />
          <CollapsibleTable
            dataValue={datasetInfo.categorical_column_stats}
            data_type="CATEGORICAL"
         />
        </>     
      ): null}
      {datasetInfo && datasetInfo.numeric_column_stats.length != 0  ?(
        <>
          <Heading heading="Numeric Table" />
          <CollapsibleTable dataValue={datasetInfo.numeric_column_stats} data_type="NUMERIC" />
        </>
      ): null}
    </StyledBox>
  );
};
