import { styled } from '@mui/material/styles';
import { Box, Button, Tab, TextField, Tabs, Select, MenuItem, DialogActions } from '@mui/material';
import { colors } from '../../../../theme/colors';
import { useGetDatasetsInfo } from '../../../../api/datasets/GetDatasetInfo';
import { useState, useEffect } from 'react';
import { string } from 'yup/lib/locale';
import { useGetDatasets } from '../../../../api/datasets/GetDatasets';
import { useSelector } from '../../../../redux/store';
import { DateRangeFilterState } from '../../../../redux/slices/dateRangeFilter';
import { useModelInfo } from '../../../../api/models/GetModelInfo';
const PREFIX = 'DataProfileVersionCard';

const classes = {
  select: `${PREFIX}-select`,
  conatinerHeading: `${PREFIX}-conatinerHeading`,
  card: `${PREFIX}-card`,
  cardHeading: `${PREFIX}-cardHeading`,
  cardContent: `${PREFIX}-cardContent`,
  cardEntry: `${PREFIX}-cardEntry`,
  entryTitle: `${PREFIX}-entryTitle`,
  entryContent: `${PREFIX}-entryContent`
};

const StyledBox = styled(Box)({
  [`& .${classes.select}`]: {
    marginTop: '.75rem',
    marginBottom: '.75rem',
    backgroundColor: `${colors.white} !important`,
    fontFamily: 'Poppins',
    maxWidth: '20rem',
    minWidth: '20rem',
    transform: 'scale(1,.8)',
    '& .MuiInputBase-input': {
      transform: 'scale(1,1.2)'
    },
    [`& fieldset`]: {
      borderRadius: 2,
      borderColor: `${colors.textLight} !important`
    },
    [`&.Mui-focused fieldset`]: {
      borderRadius: 4,
      borderColor: `${colors.text} !important`
    }
  },
  [`& .${classes.conatinerHeading}`]: {
    fontSize: '.9rem',
    color: colors.text,
    fontWeight: 500
  },
  [`& .${classes.card}`]: {
    width: '100%',
    maxWidth: '360px',
    color: colors.text,
    background: colors.boxBackground,
    borderRadius: '4px',
    padding: '1rem',
    height: '160px'
  },
  [`& .${classes.cardHeading}`]: {
    fontSize: '.85rem',
    fontWeight: 600,
    letterSpacing: '.25px',
    marginBottom: '.5rem'
  },
  [`& .${classes.cardContent}`]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gridTemplateRows: 'repeat(3,1fr)',
    gridColumnGap: '1.5rem'
  },
  [`&.${classes.cardEntry}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.6rem  0'
  },
  [`& .${classes.entryTitle}`]: { fontSize: '.62rem', fontWeight: 400, color: colors.text },
  [`& .${classes.entryContent}`]: { fontSize: '.62rem', fontWeight: 400, color: colors.textLight }
});

const CardEntry = ({ title, value }: any) => {

  return (
    <StyledBox className={classes.cardEntry}>
      <Box className={classes.entryTitle}>{title}</Box>
      <Box className={classes.entryContent}>{value}</Box>
    </StyledBox>
  );
};

type Props = {
  model_id: string;
  on_change: Function;
}
export const DataProfileVersionCard = ({ model_id, on_change }: Props) => {

  const [selected, setSelected] = useState('');
  useEffect(() => { on_change(selected) }, [selected])
  const modelOverview = useModelInfo({
    id: model_id
  })
  const handleChangeVersion = (event: any) => {
    setSelected(event.target.value);
    on_change(event.target.value);
  }
  console.log(modelOverview)

  return (
    <StyledBox>
      <Box className={classes.card}>
        <Box className={classes.conatinerHeading}>Select Model Version</Box>
        {modelOverview && (
          <Select defaultValue="select" className={classes.select} onChange={handleChangeVersion}>
            <MenuItem value="select" disabled className="selectDisable">
              Select Version
            </MenuItem>
            {modelOverview && modelOverview?.data?.data?.model_versions?.map((row: any) => (
              <MenuItem value={row.model_version_id} key={row}>
                {row.model_version}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>
    </StyledBox>
  );
};

export const DataDatasetSelectCard = (props: any) => {


  const [selected, setSelected] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const handleChangeVersion = (event: any) => {
    setSelected(event.target.value);
    setSelectedName(data?.data.dataset_list.find(dataset => dataset.dataset_id === event.target.value)?.dataset_name || '');
    props.on_change(event.target.value);
  }
  const { data } = useGetDatasets({ version_id: props.version_id });

  return (
    <StyledBox>
      <Box className={classes.card}>
        <Box className={classes.conatinerHeading}>Select Dataset</Box>
        <Select defaultValue="select" className={classes.select} onChange={handleChangeVersion}>
          <MenuItem value="select" disabled className="selectDisable">
            Choose Dataset
          </MenuItem>
          {data && data?.data.dataset_list.map((item: any) => {
            return (
              <MenuItem key={item.dataset_id} value={item.dataset_id}>
                {item.dataset_name}
              </MenuItem>
            );
          })}
        </Select>
        { 
          selectedName === 'PRODUCTION' &&
          <Box className={classes.cardHeading}>Date from {props.dateTimeString}</Box>
        }
      </Box>
    </StyledBox>
  );
};


export const DataProfileOverviewCards = ({ datasetId }: any) => {

  const now = new Date();
  const { fromDate, toDate } = useSelector(
    (state: { dateRangeFilter: DateRangeFilterState }) => state.dateRangeFilter
  );

  const { data } = useGetDatasetsInfo({
    dataset_id: datasetId,
    start_date: fromDate,
    end_date: toDate
  });
  const datasetInfo = data && data;

  return (
    <Box className={classes.card}>
      <Box className={classes.cardHeading}>Overview</Box>
      {datasetInfo && (
        <Box className={classes.cardContent}>
          <CardEntry title="Missing %" value={datasetInfo?.dataset_overview.missing_percentage} />
          <CardEntry title="Total Data Rows" value={datasetInfo?.dataset_overview.total_row} />
          <CardEntry
            title="Total Duplicates"
            value={datasetInfo?.dataset_overview.duplicate_total}
          />
          <CardEntry title="Total Missing" value={datasetInfo?.dataset_overview.missing_total} />
          <CardEntry
            title="Duplicates %"
            value={datasetInfo?.dataset_overview.duplicate_percentage}
          />
        </Box>
      )}
    </Box>
  );
};
