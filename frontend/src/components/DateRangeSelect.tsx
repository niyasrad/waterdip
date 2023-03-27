import React, { useState, useEffect } from 'react';
import { Select, MenuItem, TextField, Typography, Chip, Box, SelectChangeEvent } from '@mui/material';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { formatDateTime, computeDateRange } from '../utils/date';
import { setDateRange } from '../redux/slices/dateRangeFilter';
import { useDispatch } from '../redux/store';
import calendarFill from '@iconify/icons-eva/calendar-fill';
import { Icon } from '@iconify/react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const timeDuration: Record<string, number> = {
  last5hours: 5 * 60 * 60 * 1000,
  last1day: 24 * 60 * 60 * 1000,
  last10days: 10 * 24 * 60 * 60 * 1000,
  lastmonth: 30 * 24 * 60 * 60 * 1000
};

const DateTimePickerDropdown = () => {
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState<string>('last10days');
  const [dRValue, setDRValue] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleClickAway = () => {
    setShowDatePicker(false);
  };
  useEffect(() => {
    if (selectValue === 'showpicker' && dRValue[0].startDate && dRValue[0].endDate)
      dispatch(setDateRange({ fromDate: dRValue[0].startDate, toDate: dRValue[0].endDate }));
      if (dRValue[0].startDate !== dRValue[0].endDate) {
        setShowDatePicker(false)
      }
    else if (selectValue !== 'showpicker') {
      dispatch(
        setDateRange({
          fromDate: new Date(new Date().getTime() - timeDuration[selectValue]),
          toDate: new Date()
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dRValue, selectValue]);

  const getDisplayDateTimeRange = (value: string) => {
    let dateTimeString;
    let dateRange;
    const now = new Date();

    if (value !== 'showpicker' && dRValue[0] && dRValue[1]) {
      // when some other option selected from dropdown other showpicker,
      // reset the daterangevalue state
      setDRValue([{ startDate: null, endDate: null, key: 'selection'}]);
    }

    if (value === 'last5hours') {
      dateTimeString = `${formatDateTime(
        new Date(now.getTime() - timeDuration.last5hours)
      )} to ${formatDateTime(now)}`;
      dateRange = '5h';
    } else if (value === 'last1day') {
      dateTimeString = `${formatDateTime(
        new Date(now.getTime() - timeDuration.last1day)
      )} to ${formatDateTime(now)}`;
      dateRange = '1D';
    } else if (value === 'last10days') {
      dateTimeString = `${formatDateTime(
        new Date(now.getTime() - timeDuration.last10days)
      )} to ${formatDateTime(now)}`;
      dateRange = '10D';
    } else if (value === 'lastmonth') {
      dateTimeString = `${formatDateTime(
        new Date(now.getTime() - timeDuration.lastmonth)
      )} to ${formatDateTime(now)} `;
      dateRange = '1M';
    } else if (value === 'showpicker') {
      if (dRValue[0].startDate && dRValue[0].endDate) {
        dateTimeString = `${formatDateTime(dRValue[0].startDate!)} to ${formatDateTime(dRValue[0].endDate!)} `;
        dateRange = computeDateRange(dRValue[0].startDate, dRValue[0].endDate);
      } else dateTimeString = 'Custom Date';
    }
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '250px',
          height: '32px',
          background: '#F5F6F8',
          borderRadius: '4px'
        }}
      >
        {/*{dateRange && (*/}
        {/*  <>*/}
        {/*    <Chip color="primary" size="small" label={dateRange} /> &nbsp;&nbsp;*/}
        {/*  </>*/}
        {/*)}*/}
        <Icon icon={calendarFill} width={20} height={20} />
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '13px',
            letterSpacing: '0.25px',
            marginLeft: '15px'
          }}
        >
          {dateTimeString}
        </Typography>
      </Box>
    );
  };

  

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ display: 'flex', height: '60px', alignItems: 'center' }}>
        <Select
          id="date-range-select"
          value={selectValue}
          onChange={(e: SelectChangeEvent<string>) => {
            setSelectValue(e.target.value as string);
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            }
          }}
          native={false}
          sx={{
            width: '266px',
            height: '32px',
            background: '#F5F6F8',
            borderRadius: '4px',
            border: 'none'
          }}
          renderValue={(value) => getDisplayDateTimeRange(value)}
          onClose={(event: React.SyntheticEvent<Element, Event>) => {
            if (Object.values(event.currentTarget)[1]['data-value'] === 'showpicker')
              setShowDatePicker(true);
          }}
        >
          <MenuItem value="last5hours">Last 5 hours</MenuItem>
          <MenuItem value="last1day">Last 1 day</MenuItem>
          <MenuItem value="last10days">Last 10 days</MenuItem>
          <MenuItem value="lastmonth">Last month</MenuItem>
          <MenuItem value="showpicker">Custom Date</MenuItem>
        </Select>
        {
          showDatePicker ?
          <Box
            sx={{ position: 'absolute', bottom: 0, top: 60 }}
          >

          <DateRange

          ranges={dRValue}
          onChange={(item: any) => {
            setDRValue([item.selection])
          }}
        />
          </Box> : null
        }
        
      </Box>
    </ClickAwayListener>
  );
};

export default DateTimePickerDropdown;
