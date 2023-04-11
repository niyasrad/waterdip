import { Icon } from '@iconify/react';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';

// material
import {
  Box,
  Table,
  Collapse,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  IconButton
} from '@mui/material';
import { ChartBar } from 'components/charts';
import { colors } from '../../../theme/colors';

const PREFIX = 'CollapsibleTableRow';

const classes = {
  openBack: `${PREFIX}-openBack`,
  pointer: `${PREFIX}-pointer`,
  name: `${PREFIX}-name`,
  impact: `${PREFIX}-impact`,
  tableCell: `${PREFIX}-tableCell`,
  minMax: `${PREFIX}-minMax`,
  span: `${PREFIX}-span`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled(TableRow)(() => ({
  [`& .${classes.openBack}`]: {
    backgroundColor: colors.boxBackground,
    width: '100%'
  },

  [`& .${classes.pointer}`]: {
    '&:hover': {
      backgroundColor: colors.boxBackground,
      cursor: 'pointer'
    }
  },

  [`& .${classes.name}`]: {
    textTransform: 'capitalize',
    fontWeight: 600,
    color: colors.textPrimary,
    fontSize: '0.875rem'
  },

  [`& .${classes.impact}`]: {
    fontWeight: 500,
    color: colors.text,
    fontSize: '0.8rem'
  },

  [`& .${classes.tableCell}`]: {
    fontSize: '.8rem',
    fontWeight: 500
  },

  [`& .${classes.minMax}`]: { fontSize: '.75rem', fontWeight: 500 },

  [`& .${classes.span}`]: {
    background: 'rgba(103, 128, 220, 0.16)',
    borderRadius: '6px',
    color: colors.textPrimary,
    display: 'inline-block',
    padding: '0.2rem 0.7rem',
    fontWeight: 600
  }
}));

export default function CollapsibleTableRow(props: { row: any, data_type: any }) {

  const { row, data_type } = props;
  console.log(row);
  const [open, setOpen] = useState(false);

  return (
    (<>
      <Root
        sx={{ border: `1px solid ${colors.tableHeadBack}`, borderBottom: 0 }}
        className={`${open ? classes.openBack : ''} borderBottom`}
      >
        <TableCell className={(classes.tableCell, classes.name)}>{
          row.histogram && Object.keys(row.histogram).length !== 0 ?
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <Icon icon={open ? arrowIosUpwardFill : arrowIosDownwardFill} />
          </IconButton> : null
          }
          &nbsp;
          {row.column_name}
        </TableCell>

        {row.histogram && Object.keys(row.histogram).length !== 0 ? (
          <TableCell
            className={classes.tableCell}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <ChartBar
              name={row.column_name}
              categories={row.histogram.bins}
              data={row.histogram.val}
              options={{
                height: 60,
                width: '200',
                sparkline: true,
                enableDataLabels: false,
                showGridLines: false,
                showYAxisLabels: false,
                color: colors.graphDark,
                followCursor: true,
                tooltip: {
                  enabled: true,
                  followCursor: true,
                  style: {
                    fontSize: '12px',
                    fontFamily: 'Poppins'
                  },
                  onDatasetHover: {
                    highlightDataSeries: false
                  },
                  x: {
                    show: false
                  },
                  y: {
                    formatter: undefined,
                    title: {
                      formatter: () => ''
                    }
                  },
                  marker: {
                    show: false
                  }
                }
              }}
            />
          </TableCell>
        ): <TableCell className={classes.tableCell} align="center">
        No Data Available
      </TableCell>}
        {data_type === 'NUMERIC' && (
          <TableCell className={classes.tableCell} align="center">
            {row.zeros}&nbsp;&nbsp;
            <span className={classes.span}>{row.total === 0 ? 0 : row.zeros / row.total}%</span>
          </TableCell>
        )}

        <TableCell className={classes.tableCell} align="center">
          {row.missing_total}&nbsp;&nbsp;
          <span className={classes.span}>{row.missing_percentage}%</span>
        </TableCell>
        {data_type === 'NUMERIC' ? (
          <>
            <TableCell className={classes.tableCell} align="center">
              {row.range ? <>{row.range}</> : <>-</>}
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              {row.mean ? <>{row.mean}</> : <>-</>}
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              {row.variance ? <>{row.variance}</> : <>-</>}
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              {row.std_dev}
            </TableCell>
          </>
        ) : (
          <>
            <TableCell className={classes.tableCell} align="center">
              {row.unique ? <>{row.unique}</> : <>-</>}
            </TableCell>
            <TableCell className={classes.tableCell} align="center">
              {row.top ? <>{row.top}</> : <>-</>}
            </TableCell>
          </>
        )}
      </Root>
      <Root
        sx={{ border: `1px solid ${colors.tableHeadBack}`, borderTop: 0 }}
        className={classes.openBack}
      >
        <TableCell
          className={classes.tableCell}
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={10}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <>
              <Box className={classes.minMax}>
                Dataset {row.column_name}: Accuracy minimum is { row.histogram && row.histogram.val ? Math.min(...row.histogram.val) : "Infinity"} and
                maximum is { row.histogram && row.histogram.val ? Math.max(...row.histogram.val) : "Infinity"}
              </Box>
              <ChartBar
                name={row.column_name}
                categories={row.histogram && row.histogram.bins ? row.histogram.bins: []}
                data={row.histogram && row.histogram.val ? row.histogram.val : []}
                options={{
                  height: 200,
                  width: '70%',
                  color: colors.graphLight,
                  enableDataLabels: false,
                  columnWidth: '50%'
                }}
              />
            </>
          </Collapse>
        </TableCell>
      </Root>
    </>)
  );
}
