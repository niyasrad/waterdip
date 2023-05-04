import { Box, ButtonBase, Grow, Container, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Page from "components/Page";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_mysql from '../../assets/integrations/mysql.svg'
import logo_bigquery from '../../assets/integrations/bigquery.svg'
import logo_teams from '../../assets/integrations/teams.svg'
import logo_slack from '../../assets/integrations/slack.svg'
import IntegrationSlack from "./IntegrationMonitoring/IntegrationSlack";
import IntegrationTeams from './IntegrationMonitoring/IntegrationTeams';

const PREFIX = 'IntegrationDashboard';

const classes = {
    root: `${PREFIX}-root`,
    list: `${PREFIX}-list`,
    card: `${PREFIX}-card`,
    selectedCard: `${PREFIX}-selectedCard`,
    cardImg: `${PREFIX}-cardImg`
};

const StyledRoot = styled('div')({
    [`&.${classes.root}`]: {
      minHeight: "80vh",
      width: "100%",
      padding: "20px",
      backgroundColor: "white"
    },
    [`& .${classes.list}`]: {
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
    },
    [`& .${classes.card}`]: {
      margin: "10px",
      padding: "10px",
      paddingTop: "5px",
      paddingBottom: "5px",
      minWidth: "150px",
      display: "flex",
      justifyContent: "unset",
      gap: "15px",
      fontWeight: "600",
      borderRadius: "8px",
      transition: "all 0.1s ease-in-out"
    },
    [`& .${classes.selectedCard}`]: {
        backgroundColor: "rgba(80, 117, 255, 0.2)"
    },
    [`& .${classes.cardImg}`]: {
        width: "40px",
        height: "40px",
        objectFit: "contain",
        backgroundColor: "white",
        border: "1px solid #D9D9D9",
        borderRadius: "4px",
        padding: "5px",
        boxSizing: "border-box"
    }
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

interface IntegrationArray {
    name: string,
    method: string,
    img: string
}

const DATA_SOURCES = [
    {
        name: "Big Query",
        method: "bigquery",
        img: logo_bigquery
    },
    {
        name: "MySQL",
        method: "mysql",
        img: logo_mysql
    },
];

const MONITORING = [
    {
        name: "Slack",
        method: "slack",
        img: logo_slack
    },
    {
        name: "Teams",
        method: "teams",
        img: logo_teams
    }
];


const IntegrationSettings = ({ props }: { props: any }) => {
    if (!props.method) {
        return null
    } else {
        if (props.method === "teams") {
            return (
                <Grow
                    in={true}
                    timeout={500}
                >
                    <div>
                        <IntegrationTeams done={props} />
                    </div>
                </Grow>
            )
        } else if (props.method === "slack") {
            return (
                <Grow
                    in={true}
                    timeout={500}
                >
                    <div>
                        <IntegrationSlack done={props} />
                    </div>
                </Grow>
            )
        } else {
            return null
        }
    }
}

const IntegrationMethods = ({ IntegrationList }: { IntegrationList: Array<IntegrationArray> }) => {
    const [selectedMethod, setSelectedMethod] = useState<null | string>(null)

    const handleSelect = (method: string) => {
        setSelectedMethod(method)
    }



    return (
        <StyledRoot className={classes.root}>
            <div className={classes.list}>
                {IntegrationList.map((source) => (
                    <ButtonBase className={`${classes.card} ${(selectedMethod === source.method) && classes.selectedCard}`} key={source.name} onClick={() => handleSelect(source.method)}>
                        <img src={source.img} alt={source.name} className={classes.cardImg} />
                        <span>{source.name}</span>
                    </ButtonBase>
                ))}
            </div>
            <IntegrationSettings props={{method: selectedMethod, update: setSelectedMethod}} />
        </StyledRoot>
    )
}




export default function IntegrationDashboard () {

    const [currentTab, setCurrentTab] = useState('monitoring');
    const navigate = useNavigate()

    const INTEGRATION_TABS = [
        {
            value: 'monitoring',
            label: 'Monitoring',
            component: <IntegrationMethods IntegrationList={MONITORING} />,
            isDisabled: false
        },
        {
            value: 'source',
            label: 'Data Source (Coming Soon)',
            component: <IntegrationMethods IntegrationList={DATA_SOURCES} />,
            isDisabled: true
        }
    ];

      
    const handleOnChange = (value: string) => {
        setCurrentTab(value);
    };

    const headerBody = () => (
        <>
          <Box sx={{ width: '100%', height: '54px', borderBottom: '0.5px solid #90A0B7' }}>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleOnChange(value)}
              sx={{ height: '54px', width: '100%' }}
              textColor="primary"
              indicatorColor="primary"
            >
                {
                    INTEGRATION_TABS.map((tab) => (
                        <Tab
                            disableRipple
                            key={tab.value}
                            label={tab.label}
                            value={tab.value}
                            disabled={tab.isDisabled}
                            sx={{
                                height: '54px',
                                fontFamily: 'Poppins',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                fontSize: '14px',
                                textAlign: 'center',
                                letterSpacing: '0.01em',
                                color: '#90A0B7',
                                paddingTop: '15px'
                            }}
                        />
                    ))
                }
            </Tabs>
          </Box>
        </>
    );

    return (
        <Page title="Integration Dashboard | Waterdip">
            <Box 
                sx={{
                    background: '#FFFFFF',
                    boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.02)'
                  }}
            >
                <HeaderBreadcrumbs 
                    heading="Integrations"
                    links={[]}
                    action={''}
                />
                <Container
                    sx={{
                        minWidth: '100%'
                    }}
                >
                     { headerBody() }
                </Container>
                <Container
                    maxWidth={false} 
                    style={{ marginTop: '30px' }}
                >   
                    {
                        INTEGRATION_TABS.map((tab) => (
                            <TabPanel value={currentTab} index={tab.value} key={tab.value}>
                                {tab.component}
                            </TabPanel>
                        ))
                    }
                </Container>
            </Box>
        </Page>
    );
}