import React, { useState, useEffect, useReducer } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Card,
  // Typography,
  Box,
  CircularProgress,
  Stack,
  Popover
} from '@mui/material';
import { capitalize } from 'lodash';
import Scrollbar from '../../../components/Scrollbar';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { ModelListRow } from '../../../@types/model';
import ModelListToolbar from './ModelListToolbar';
import { usePaginatedModels } from '../../../api/models/GetModels';
import { formattedDate } from '../../../utils/date';
import TableSortLabel from '@mui/material/TableSortLabel';
import { colors } from '../../../theme/colors';
import { DialogAnimate } from '../../../components/animate';
import { display } from '@mui/system';
import { log } from 'console';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useModelDelete } from 'api/models/DeleteModel';
import { useSnackbar } from 'notistack';

const PREFIX = 'ModelListTable';

const classes = {
  card: `${PREFIX}-card`,
  actionBtn: `${PREFIX}-actionBtn`,
  actionPopup: `${PREFIX}-actionPopup`,
  actionPopupBtn: `${PREFIX}-actionPopupBtn`,
  popupBox: `${PREFIX}-popupBox`,
  tableContainer: `${PREFIX}-tableContainer`,
  table: `${PREFIX}-table`,
  tableHeading: `${PREFIX}-tableHeading`,
  tableHead: `${PREFIX}-tableHead`,
  tableHeadCell: `${PREFIX}-tableHeadCell`,
  subModel: `${PREFIX}-subModel`,
  tableRow: `${PREFIX}-tableRow`,
  tableCell: `${PREFIX}-tableCell`,
  pagination: `${PREFIX}-pagination`,
  modelid: `${PREFIX}-modelid`,
  icon: `${PREFIX}-icon`
};

const StyledButton = styled(Button)({
  padding: '.5rem 2rem',
    borderRadius: '4px',
    color: colors.textLight,
    fontWeight: 500,
    // borderBottom: `1px solid ${colors.textLight}`,
    '&:last-child': {
      borderBottom: 0
    },
    '& :hover': {
      color: colors.textPrimary
    }
})
const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '4px',
});
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.card}`]: {
    backgroundColor: colors.white,
    borderRadius: '10px',
    marginBottom: '20px'
  },

  [`& .${classes.actionBtn}`]: {
    padding: 0,
    margin: 0,
    color: colors.textLight,
    '& :hover': {
      backgroundColor: 'rgba(103, 128, 220, 0.2)',
      color: colors.textPrimary,
      borderRadius: '4px'
    },
    borderRadius: '4px',
    letterSpacing: 3.6,
    fontWeight: 900
  },

  [`& .${classes.actionPopup}`]: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '4px'
  },

  [`& .${classes.actionPopupBtn}`]: {
    padding: '.5rem 2rem',
    borderRadius: '4px',
    color: colors.textLight,
    fontWeight: 500,
    '&:last-child': {
      borderBottom: 0
    },
    '& :hover': {
      color: colors.textPrimary
    }
  },

  [`& .${classes.popupBox}`]: {
    '& .css-1p14d49-MuiPaper-root-MuiPopover-paper': {
      borderRadius: '4px !important'
    },
    borderRadius: '4px !important'
  },

  [`& .${classes.tableContainer}`]: {
    width: '100%',
    overflowX: 'hidden'
  },

  [`& .${classes.table}`]: {
    width: '100%',
    margin: 0
  },

  [`& .${classes.tableHeading}`]: {
    width: '100%'
  },

  [`& .${classes.tableHead}`]: {
    root: {
      backgroundColor: colors.black
    },
    opacity: 1,
    height: 40,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '22px'
  },

  [`& .${classes.tableHeadCell}`]: {
    root: {
      backgroundColor: colors.black
    },
    backgroundColor: colors.tableHeadBack,
    height: 40,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '22px',
    color: colors.text,
    boxShadow: 'none !important',
    borderBottomLeftRadius: '0px !important',
    borderBottomRightRadius: '0px !important'
  },

  [`& .${classes.subModel}`]: {
    height: 40,
    borderRightWidth: '1px',
    borderBottomWidth: '1px',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderRightColor: colors.tableHeadBack,
    borderBottomColor: colors.tableHeadBack,
    backgroundColor: colors.white,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '22px',
    color: colors.text,
    '&:last-child': {
      borderRight: 0
    }
  },

  [`& .${classes.tableRow}`]: {
    cursor: 'pointer',
    hover: {
      backgroundColor: colors.navActive,
      opacity: 0.1,
      boxShadow: '0px 4px 10px rgba(103, 128, 220, 0.1)'
    }
  },

  [`& .${classes.tableCell}`]: {
    height: 40,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: colors.tableHeadBack,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    color: colors.text,
    '&:last-child': {
      borderRight: 0
    }
  },

  [`& .${classes.pagination}`]: {
    fontFamily: 'Public Sans',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '22px',
    color: colors.text
  },

  [`& .${classes.modelid}`]: {
    fontWeight: 300,
    fontSize: '12px',
    color: colors.textLight
  },

  [`& .${classes.icon}`]: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}));

interface ModelColumn {
  id: 'name' | 'date' | 'action' | 'alert' | 'delete';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: number) => string;
  span: number;
}
interface subModelColumn {
  id:
    | 'submodel'
    | 'subcreated'
    | 'totalPrediction'
    | 'lastPrediction'
    | 'performance'
    | 'behavior'
    | 'integrity'
    | 'delete';
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: number) => string;
  subSpan: number;
}

const MODEL_COLUMNS: ModelColumn[] = [
  { id: 'action', label: 'Actions', minWidth: 50, align: 'center', span: 2 },
  { id: 'alert', label: 'Alerts', minWidth: 50, align: 'center', span: 3 },
  { id: 'delete', label: 'Options', minWidth: 50, align: 'center', span: 1}
];
const sub_MODEL_COLUMNS: subModelColumn[] = [
  { id: 'submodel', label: '', minWidth: 50, subSpan: 1, align: 'center' },
  { id: 'subcreated', label: '', minWidth: 50, subSpan: 1 },
  { id: 'totalPrediction', label: 'Total prediction', minWidth: 50, subSpan: 1, align: 'center' },
  { id: 'lastPrediction', label: 'Last Prediction', minWidth: 50, subSpan: 1, align: 'center' },
  { id: 'performance', label: 'Model Performance', minWidth: 50, subSpan: 1, align: 'center' },
  { id: 'behavior', label: 'Data Drift', minWidth: 50, subSpan: 1, align: 'center' },
  { id: 'integrity', label: 'Data Quality', minWidth: 50, subSpan: 1, align: 'center' },
  { id: 'delete', label: '', minWidth: 50, subSpan: 1, align: 'center' }
];

interface SortProps {
  name: 'asc' | 'desc' | undefined;
  created: 'asc' | 'desc' | undefined;
}
const ModelListTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState('');
  const [columnName, setColumnName] = useState('name');
  const [expandForm, setExpandForm] = useState(false);
  const [orderDirection, setOrderDirection] = useState<SortProps>({ name: 'asc', created: 'asc' });


  const [openPopover, setOpenPopover] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleActionClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    if (id === openPopover) {
      setOpenPopover('');
      setAnchorEl(null);
    } else {
      setOpenPopover(id);
      setAnchorEl(event.currentTarget);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenPopover('');
    setAnchorEl(null);
  };
  const { enqueueSnackbar } = useSnackbar();
  const { isDeleting, error, ModelDelete } = useModelDelete();
  const handleDelete = async (modelId: string) => {
    await ModelDelete(modelId);
    enqueueSnackbar(`Successfully Deleted Model`, { variant: 'info' });
    setItems(ItemLists.filter((model : any) => model.model_id !== modelId));
    forceUpdate();
  }
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { data, isLoading } = usePaginatedModels({
    query: searchName,
    page: page + 1,
    limit: rowsPerPage,
    get_all_versions_flag: true,
    sort:
      columnName === 'name'
        ? orderDirection.name === 'asc'
          ? 'model_name_asc'
          : 'model_name_desc'
        : orderDirection.created === 'asc'
        ? 'created_at_asc'
        : 'created_at_desc'
  });
  // const modelList = data?.modelList || [];
  // const meta = data?.meta || { page: 0, total: 0, limit: 10, sort: 'name_asc' };

  const [items, setItems] = useState<any>([]);
  const BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(
      `${BASE_URL}/v1/list.models?query=${searchName}&page=${page + 1}&limit=${rowsPerPage}&sort=${
        columnName === 'name'
          ? orderDirection.name === 'asc'
            ? 'model_name_asc'
            : 'model_name_desc'
          : orderDirection.created === 'asc'
          ? 'created_at_asc'
          : 'created_at_desc'
      }`
    )
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, rowsPerPage, ignored, orderDirection]);
  const ItemLists = items?.model_list || [];
  const meta = items?.meta || { page: 0, total: 0, limit: 10, sort: 'model_name_asc' };



  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const dat = new Date();

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(page);
  };

  const handleClick = (modelId: string, versionId: string) => {
    if (versionId != null) {
      navigate(`${PATH_DASHBOARD.general.models}/${modelId}/overview?version_id=${versionId}`);
      // navigate(
      //   {
      //   pathname:`${PATH_DASHBOARD.general.models}/${modelId}/overview`,
      //   search: `versionId:${versionId}`
      // }
      //   );
    } else {
      setExpandForm((state) => !state);
    }
  };

  const handleFilterByName = (searchName: string) => {
    setSearchName(searchName);
  };

  const handleSortRequest = (data: string) => {
    setColumnName(data);
    data === 'name'
      ? orderDirection.name === 'asc'
        ? setOrderDirection({ name: 'desc', created: orderDirection.created })
        : setOrderDirection({ name: 'asc', created: orderDirection.created })
      : orderDirection.created === 'asc'
      ? setOrderDirection({ name: orderDirection.name, created: 'desc' })
      : setOrderDirection({ name: orderDirection.name, created: 'asc' });
  };

  const DialogBox = () => {

    const [boxDisplay, setBoxDisplay] = useState(true);

    return (
      (<>
        {boxDisplay === true ? (
          <Box >
            <DialogTitle>{"No Versions Found"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please create a new version for the selected model to continue.
              </DialogContentText>
            </DialogContent>
            <DialogActions >
              <Button onClick={() => setExpandForm(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Box>
        ) : null}
      </>)
    );
  };

  return <Root>
    <ModelListToolbar
      searchName={searchName}
      onSearch={handleFilterByName}
      forceUpdate={forceUpdate}
    />
    <Card className={classes.card}>
      <Scrollbar>
        <TableContainer className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead className={classes.tableHeading}>
              <TableRow className={classes.tableHead}>
                <TableCell
                  key="name"
                  align="center"
                  className={classes.tableHeadCell}
                  onClick={() => handleSortRequest('name')}
                >
                  <TableSortLabel active={true} direction={orderDirection.name}>
                    Model name&nbsp;
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  key="date"
                  align="center"
                  // colSpan= 1
                  className={classes.tableHeadCell}
                  onClick={() => handleSortRequest('created')}
                >
                  <TableSortLabel active={true} direction={orderDirection.created}>
                    Created at&nbsp;
                  </TableSortLabel>
                </TableCell>
                {MODEL_COLUMNS.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    colSpan={column.span}
                    className={classes.tableHeadCell}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {sub_MODEL_COLUMNS.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    colSpan={column.subSpan}
                    className={classes.subModel}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell align="center" colSpan={7}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {ItemLists &&
                ItemLists.map((row: any) => (
                  <TableRow
                    hover
                    key={row.model_id}
                    tabIndex={-1}
                    role="checkbox"
                    onClick={() => handleClick(row.model_id, row.model_version_id)}
                    className={classes.tableRow}
                  >
                    <TableCell className={classes.tableCell} align="center">
                      <Stack direction='column' gap='10px'>
                        <div>{row.model_name}</div>
                        <Stack gap='10px' direction='row' justifyContent="center" alignItems="center">
                          <div className={classes.modelid}>{row.model_id}</div>
                          <IconButton
                            aria-label="Copy ModelID"
                            onClick={
                              (e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(row.model_id);
                                }
                              }
                            size="large">
                            <FileCopyIcon fontSize='small'/>
                          </IconButton>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {/* {`${formatDateTime(Date.parse(row.createdAt))}`} */}
                      {/* {row.createdAt} */}
                      {formattedDate(row.created_at)}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {capitalize(row.total_predictions)}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {/* {`${formatDateTime(row.lastPrediction)}`} */}
                      {formattedDate(row.last_prediction)}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {capitalize(row.num_alert_perf)}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {capitalize(row.num_alert_drift)}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{ borderRightWidth: '0px', borderRightColor: colors.white }}
                    >
                      {capitalize(row.num_alert_data_quality)}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      align="center"
                      sx={{
                        borderRightWidth: '0px',
                        borderRightColor: colors.white,
                        color: 'black'
                      }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Button
                        className={classes.actionBtn}
                        aria-describedby={id}
                        onClick={(event) => handleActionClick(event, row.model_id)}
                      >
                        <MoreHorizIcon className={classes.icon} />
                      </Button>
                      <Popover
                        id={row.model_id}
                        open={row.model_id === openPopover}
                        anchorEl={anchorEl}
                        key={row.model_id}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left'
                        }}
                        className={classes.popupBox}
                      >
                        <StyledBox className={classes.actionPopup}>
                          <StyledButton onClick={() => handleDelete(row.model_id)} className={classes.actionPopupBtn}>Delete</StyledButton>
                        </StyledBox>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogAnimate maxWidth="sm" open={expandForm} onClose={() => setExpandForm(false)}>
          <DialogBox />
        </DialogAnimate>
      </Scrollbar>

      <TablePagination
        page={meta.page - 1}
        component="div"
        count={meta.total}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={classes.pagination}
      />
    </Card>
  </Root>;
};

export default ModelListTable;
