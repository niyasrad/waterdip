import React from 'react';
import { styled } from '@mui/material/styles';
import { Tabs, Tab } from '@mui/material';
import './tab.css';
import { useState, useEffect } from 'react';
import { colors } from '../../../../theme/colors';

const PREFIX = 'PerformanceTabs';

const classes = {
  root: `${PREFIX}-root`,
  TabItem: `${PREFIX}-TabItem`
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    width: '150px',
    height: '100%',
    borderRight: `1px solid ${colors.tableHeadBack}`,
    marginTop: '.8rem',
    paddingTop: '.4rem'
  },
  [`& .${classes.TabItem}`]: {
    marginRight: '0 !important',
    minHeight: '32px',
    borderRadius: 0,
    fontWeight: 400,
    fontSize: '.75rem',
    color: colors.textLight,
    paddingLeft: '1rem'
  }
});

type Props = {
  onChange: Function;
  currentTab: string;
};

export default function TabsPerformance({ onChange, currentTab }: Props) {

  const [value, setValue] = React.useState(currentTab);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <Root className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        orientation="vertical"
        className="tabs-left"
      >
        <Tab className={classes.TabItem} value={'accuracy'} label="Accuracy" />
        <Tab className={classes.TabItem} value={'precision'} label="Precision" />
        <Tab className={classes.TabItem} value={'recall'} label="Recall" />
        <Tab className={classes.TabItem} value={'f1'} label="F1" />
        <Tab className={classes.TabItem} value={'sensitivity'} label="Sensitivity" />
        <Tab className={classes.TabItem} value={'specificity'} label="Specificity" />
      </Tabs>
    </Root>
  );
}
