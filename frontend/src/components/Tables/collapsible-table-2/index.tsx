// material
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Scrollbar from '../../Scrollbar';
//
import CollapsibleTableRow from './CollapsibleTableRow';
const PREFIX = 'index';

const classes = {
  containerTable: `${PREFIX}-containerTable`,
  tableHead: `${PREFIX}-tableHead`
};

const StyledScrollbar = styled(Scrollbar)(() => ({
  [`& .${classes.containerTable}`]: {
    marginTop: '10px',
    marginBottom: '50px'
  },

  [`& .${classes.tableHead}`]: {
    backgroundColor: '#E5E8EB',
    color: '#212B36',
    boxShadow: 'none !important',
    borderBottomLeftRadius: '0px !important',
    borderBottomRightRadius: '0px !important'
  }
}));

type Props = {
  dataValue: any;
  data_type: string;
};
export default function CollapsibleTable({ dataValue, data_type }: Props) {

  return (
    <StyledScrollbar>
      <TableContainer sx={{ minWidth: 1220, mt: 3 }} className={classes.containerTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} width="20">
                &nbsp;&nbsp;&nbsp;&nbsp;Name
              </TableCell>
              <TableCell className={classes.tableHead} align="center" width="14">
                Histogram
              </TableCell>
              {data_type === 'NUMERIC' && (
                <TableCell className={classes.tableHead} align="center" width="10">
                  Zeros
                </TableCell>
              )}
              <TableCell className={classes.tableHead} align="center" width="10">
                Missing Total
              </TableCell>
              {data_type === 'NUMERIC' ? (
                <>
                  <TableCell className={classes.tableHead} align="center" width="7">
                    Range
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center" width="7">
                    Mean
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center" width="7">
                    Variance
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center" width="7">
                    Std Dev
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell className={classes.tableHead} align="center" width="13">
                    Unique
                  </TableCell>
                  <TableCell className={classes.tableHead} align="center" width="12">
                    Top
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataValue?.map((row: any) => (
              <CollapsibleTableRow key={row.name} row={row} data_type={data_type} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledScrollbar>
  );
}
