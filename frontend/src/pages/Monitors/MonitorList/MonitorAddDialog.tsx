import { styled } from '@mui/material/styles';
import { Box, Button, Tab, TextField, Tabs, Select, MenuItem, DialogActions } from '@mui/material';
import { Icon } from '@iconify/react';
import { useState } from 'react';

import { PATH_PAGE, PATH_DASHBOARD } from '../../../routes/paths';
import { useNavigate, useParams } from 'react-router-dom';

import { colors } from '../../../theme/colors';
import { useSelector } from '../../../redux/store';
import { ModelMonitorState } from '../../../redux/slices/ModelMonitorState';
import { usePaginatedModels } from '../../../api/models/GetModels';
import { ModelListRow } from '../../../@types/model';
import { versions } from 'process';

const PREFIX = 'MonitorAddDialog';

const classes = {
  dialogBoxMonitorType: `${PREFIX}-dialogBoxMonitorType`,
  modelContainer: `${PREFIX}-modelContainer`,
  select: `${PREFIX}-select`,
  selectDiv: `${PREFIX}-selectDiv`,
  tabContainer: `${PREFIX}-tabContainer`,
  conatinerHeading: `${PREFIX}-conatinerHeading`,
  TabItems: `${PREFIX}-TabItems`,
  TabItem: `${PREFIX}-TabItem`,
  tabItemContent: `${PREFIX}-tabItemContent`,
  itemContentChild: `${PREFIX}-itemContentChild`,
  itemContentChildDisabled: `${PREFIX}-itemContentChildDisabled`,
  itemHeading: `${PREFIX}-itemHeading`,
  itemHeadingDisabled: `${PREFIX}-itemHeadingDisabled`,
  itemDesc: `${PREFIX}-itemDesc`
};

const StyledBox = styled(Box)(() => ({
  [`& .${classes.dialogBoxMonitorType}`]: { padding: '1.1rem 1.8rem' },

  [`& .${classes.modelContainer}`]: {
    marginBottom: '-0.5rem',
    padding: '1.4rem'
  },

  [`& .${classes.select}`]: {
    marginTop: '.75rem',
    marginBottom: '.75rem',
    minWidth: '20rem',
    maxWidth: '20rem',
    transform: 'scale(1,.8)',
    '& .MuiInputBase-input': {
      transform: 'scale(1,1.2)'
    },
    [`& fieldset`]: {
      borderRadius: 4,
      borderColor: `${colors.textLight} !important`
    },
    [`&.Mui-focused fieldset`]: {
      borderRadius: 4,
      borderColor: `${colors.text} !important`
    }
  },

  [`& .${classes.selectDiv}`]: {
    marginTop: '.75rem',
    minWidth: '20rem',
    fontSize: '0.8rem',
    letterSpacing: '0.05rem',
    color: colors.textLight
    // border: `1px solid ${colors.textLight}`
  },

  [`& .${classes.tabContainer}`]: {
    marginBottom: '1rem'
  },

  [`& .${classes.conatinerHeading}`]: {
    fontSize: '.9rem',
    color: colors.text,
    fontWeight: 500
  },

  [`& .${classes.TabItems}`]: {
    marginTop: '1.1rem',
    '& .css-1pvp4f6-MuiButtonBase-root-MuiTab-root:not(:last-child)': {
      marginRight: '0 !important'
    },
    '& .css-1c79mml-MuiTabs-indicator': {
      display: 'none'
    },
    '& .css-1pvp4f6-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      background: '#d1d9f5',
      color: colors.textPrimary,
      fontWeight: 500
    }
  },

  [`& .${classes.TabItem}`]: {
    borderBottom: `1px solid ${colors.textLight}`,
    borderRadius: '4px 4px 0 0 !important',
    fontWeight: 400,
    fontSize: '0.8rem',
    letterSpacing: '0.05rem',
    color: colors.textLight,
    padding: '0.36rem 1.2rem',
    minHeight: '27px'
  },

  [`&.${classes.tabItemContent}`]: {
    padding: '0rem 2.4rem 0 1.2rem'
  },

  [`& .${classes.itemContentChild}`]: {
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '0.5rem 0 1rem 0rem',
    '&:hover .titlehover': {
      color: colors.textPrimary
    },
    '&:hover .hoverdesc': {
      color: colors.textPrimary
    },
    '&:hover::marker': {
      color: colors.textPrimary
    },
    '&::marker': {
      color: colors.textLight,
      fontSize: '0.8rem'
    }
  },

  [`& .${classes.itemContentChildDisabled}`]: {
    padding: '0.5rem 0 1rem 0rem',
    borderRadius: '4px',
    cursor: 'not-allowed',
    '&::marker': {
      color: colors.textLight,
      fontSize: '0.8rem'
    }
  },

  [`& .${classes.itemHeading}`]: {
    fontSize: '0.8rem',
    fontWeight: 500,
    color: colors.text,
    marginBottom: '0.25rem'
  },

  [`& .${classes.itemHeadingDisabled}`]: {
    fontSize: '0.8rem',
    fontWeight: 500,
    color: colors.textLight,
    marginBottom: '0.25rem'
  },

  [`& .${classes.itemDesc}`]: {
    fontSize: '0.7rem',
    fontWeight: 400,
    color: colors.textLight
  }
}));

type Props = {
  data: any[];
};

type TabItemProps = {
  title: string;
  desc: string;
  disabled: boolean;
};

const TabContent = ({ data }: Props) => {

  const navigate = useNavigate();
  return (
    <StyledBox className={classes.tabItemContent}>
      <ul>
        {data.map((item: any) => {
          const disabled = item.disabled;
          return (
            <StyledBox>
              <li
                className={`${
                  disabled === false
                    ? `${classes.itemContentChild}`
                    : `${classes.itemContentChildDisabled}`
                }`}
                onClick={() => {
                  if (disabled === false)
                    navigate(`${PATH_DASHBOARD.general.monitorCreate}`, {
                      state: { value: item.title }
                    });
                }}
              >
                <Box
                  className={`${
                    disabled === false ? `${classes.itemHeading}` : `${classes.itemHeadingDisabled}`
                  } titlehover`}
                >
                  {item.title}
                </Box>
                <Box className={`hoverdesc ${classes.itemDesc}`}>{item.desc}</Box>
              </li>
            </StyledBox>
          );
        })}
      </ul>
    </StyledBox>
  );
};

const MonitorAddDialog = (props: any) => {
  const { modelID, pathLocation } = useSelector(
    (state: { modelMonitorState: ModelMonitorState }) => state.modelMonitorState
  );

  const [model, setModel] = useState(modelID ? modelID : '');
  const [version, setVersion] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const { data } = usePaginatedModels({
    query: '',
    page: 1,
    limit: 1000,
    sort: 'model_name_asc',
    get_all_versions_flag: true
  });
  const modelList = data?.modelList || [];
  console.log(modelList);
  const handleChangeModel = (event: any) => {
    setModel(event.target.value);

  };
  const handleChangeVersion = (event: any) => {
    setVersion(event.target.value);
  };
  const handleChangeType = (event: any) => {
    setType(event.target.value);
  };
  
  const handleVersionFilter = (Model: any) => {
    if (pathLocation == "model"){
      if (Model.id == modelID) {
        return Model;
      }
    } else {
      if (Model.id == model) {
        return Model;
      }
    }
  }
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 250,
      },
    },
  };
  console.log(modelList.filter(handleVersionFilter));
  console.log(pathLocation);
  return (
    <StyledBox className={classes.dialogBoxMonitorType}>
      <Box className={classes.modelContainer}>
        <Box className={classes.conatinerHeading}>Select Model</Box>
        {pathLocation === 'model' ? (
          <Select defaultValue={`${modelID}`} className={classes.select} disabled onChange={handleChangeModel}>
            <MenuItem value={`${modelID}`}>{modelID}</MenuItem>
          </Select>
        ) : (
          <Select defaultValue="select" className={classes.select} onChange={handleChangeModel} MenuProps={MenuProps}>
            <MenuItem value="select" disabled className="selectDisable">
              Select Model Name
            </MenuItem>
            {modelList.map((row: ModelListRow) => (
              <MenuItem value={row.id} key={row.id}>
                {row.name}
              </MenuItem>
            ))}
          </Select>
        )}
        <Box className={classes.conatinerHeading}>Model Version</Box>
        {pathLocation === 'model' ? (
          <Select defaultValue={"select"} className={classes.select} onChange={handleChangeVersion} MenuProps={MenuProps}>
            <MenuItem value="select" disabled className="selectDisable">
              Select Version
            </MenuItem>
            {(modelList.filter(handleVersionFilter).length !== 0  && modelList.filter(handleVersionFilter)[0] && modelList.filter(handleVersionFilter)[0].versions)? Object.values(modelList.filter(handleVersionFilter)[0].versions).map((row: any) => (
              <MenuItem value={row.v1} key={row.v1}>
                {row.v1}
              </MenuItem>
            )) : null}
          </Select>
        ) : (
          <Select defaultValue="select" className={classes.select} onChange={handleChangeVersion} MenuProps={MenuProps}>
            <MenuItem value="select" disabled className="selectDisable">
              Select Version
            </MenuItem>
            {(modelList.filter(handleVersionFilter).length !== 0  && modelList.filter(handleVersionFilter)[0] && modelList.filter(handleVersionFilter)[0].versions)? Object.values(modelList.filter(handleVersionFilter)[0].versions).map((row: any) => (
              <MenuItem value={row.v1} key={row.v1}>
                {row.v1}
              </MenuItem>
            )) : null}
          </Select>
        )}
        <Box className={classes.conatinerHeading}>Monitor Type</Box>
        {pathLocation === 'model' ? (
          <Select defaultValue="select" className={classes.select} onChange={handleChangeType} MenuProps={MenuProps}>
            <MenuItem value="select" disabled className="selectDisable">
              Select Type
            </MenuItem>
              <MenuItem value="Data Quality" key="1">Data Quality</MenuItem>
              <MenuItem value="Drift" key="2">Drift</MenuItem>
              <MenuItem value="Model Performance" key="3">Model Performance</MenuItem>
          </Select>
        ) : (
          <Select defaultValue="select" className={classes.select} onChange={handleChangeType}>
            <MenuItem value="select" disabled className="selectDisable">
              Select Type
            </MenuItem>
              <MenuItem value="Data Quality" key="1">Data Quality</MenuItem>
              <MenuItem value="Drift" key="2">Drift</MenuItem>
              <MenuItem value="Model Performance" key="3">Model Performance</MenuItem>
          </Select>
        )}
        <DialogActions>
          <Button sx={{
                            width: '130px',
                            height: '40px',
                            background: '#FFFFFF',
                            boxShadow: '0px 4px 10px rgba(103, 128, 220, 0.24)',
                            borderRadius: '4px'
                          }} onClick={props.close}>Cancel</Button>
          <Button variant="contained" sx={{
                            width: '130px',
                            height: '40px',
                            background: '#6780DC',
                            boxShadow: '0px 4px 10px rgba(103, 128, 220, 0.24)',
                            borderRadius: '4px',
                          }} onClick={() => {
                  if (model !== "" && version !=="" && type !== "")
                    navigate(`${PATH_DASHBOARD.general.monitorCreate}`, {
                      state: { model, version, type }
                    });
                }}>Next</Button>
        </DialogActions>
      </Box>
    </StyledBox>
  );
};

export default MonitorAddDialog;
