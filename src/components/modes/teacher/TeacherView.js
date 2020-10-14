import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ReactMomentProptypes from 'react-moment-proptypes';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import { extendMoment } from 'moment-range';
import { DateRangePicker } from 'react-dates';
import { Line } from '@nivo/line';
import './TeacherView.css';
import {
  deleteAppInstanceResource,
  openSettings,
  patchAppInstanceResource,
  postAppInstanceResource,
} from '../../../actions';
import { getUsers } from '../../../actions/users';
import Settings from './Settings';
import { MATERIAL_UI_THEME_TYPE } from '../../../config/propTypes';
import { NIVO_LINE_MARGIN } from '../../../config/styles';
import { DATE_FROMAT } from '../../../config/formats';

export class TeacherView extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchOpenSettings: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      root: PropTypes.string,
      table: PropTypes.string,
      main: PropTypes.string,
      button: PropTypes.string,
      message: PropTypes.string,
      fab: PropTypes.string,
      chartTitle: PropTypes.string,
    }).isRequired,
    dispatchGetUsers: PropTypes.func.isRequired,
    // eslint-disable-next-line react/require-default-props
    theme: MATERIAL_UI_THEME_TYPE,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        date: ReactMomentProptypes.momentObj,
        count: PropTypes.number,
      }),
    ),
    minDate: ReactMomentProptypes.momentObj,
    maxDate: ReactMomentProptypes.momentObj,
  };

  static defaultProps = {
    actions: [],
    minDate: moment.utc(),
    maxDate: moment.utc(),
  };

  static styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    main: {
      textAlign: 'center',
      margin: theme.spacing(),
    },
    button: {
      marginTop: theme.spacing(3),
    },
    table: {
      minWidth: 700,
    },
    message: {
      padding: theme.spacing(),
      backgroundColor: theme.status.danger.background[500],
      color: theme.status.danger.color,
      marginBottom: theme.spacing(2),
    },
    fab: {
      margin: theme.spacing(),
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    chartTitle: {
      marginBottom: theme.spacing(2),
    },
  });

  state = {
    fromDate: moment.utc(),
    toDate: moment.utc(),
  };

  constructor(props) {
    super(props);
    const { dispatchGetUsers } = this.props;
    dispatchGetUsers();
  }

  componentDidUpdate({ minDate: oldMinDate, maxDate: oldMaxDate }) {
    const { minDate, maxDate } = this.props;
    if (minDate !== oldMinDate) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        fromDate: minDate,
      });
    }
    if (maxDate !== oldMaxDate) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        toDate: maxDate,
      });
    }
  }

  handleActionsDateRange = () => {
    const { fromDate, toDate } = this.state;
    const { actions } = this.props;
    const rangedMoment = extendMoment(moment);
    const start = rangedMoment.utc(fromDate);
    const end = rangedMoment.utc(toDate);
    const range = rangedMoment.range(start, end);
    return Array.from(range.by('days')).map(day => ({
      x: day.format(DATE_FROMAT),
      y: actions.find(({ date }) => date.isSame(day, 'days'))?.count ?? 0,
    }));
  };

  render() {
    // extract properties from the props object
    const {
      // this property allows us to do styling and is injected by withStyles
      classes,
      // this property allows us to do translations and is injected by i18next
      t,
      dispatchOpenSettings,
      theme,
    } = this.props;
    const { fromDate, toDate, focusedInput } = this.state;
    const actionsDateRange = this.handleActionsDateRange();
    return (
      <>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.main}>
            <Paper className={classes.root}>
              <Typography
                variant="h5"
                color="inherit"
                className={classes.chartTitle}
              >
                {t('Number of Daily Actions')}
              </Typography>
              <DateRangePicker
                startDate={fromDate}
                startDateId="1"
                endDate={toDate}
                endDateId="2"
                onDatesChange={({ startDate, endDate }) => {
                  this.handleActionsDateRange();
                  this.setState({ fromDate: startDate, toDate: endDate });
                }}
                focusedInput={focusedInput}
                onFocusChange={input => this.setState({ focusedInput: input })}
                isOutsideRange={() => false}
                small
              />
              <Line
                data={[
                  {
                    id: 1,
                    data: actionsDateRange,
                  },
                ]}
                xScale={{
                  type: 'time',
                  format: '%d/%m/%Y',
                  useUTC: true,
                  precision: 'day',
                }}
                yScale={{
                  type: 'linear',
                  stacked: false,
                }}
                axisLeft={{
                  orient: 'left',
                  legendPosition: 'middle',
                  legend: t('Number of Actions'),
                  legendOffset: -35,
                }}
                curve="linear"
                axisBottom={{
                  orient: 'bottom',
                  format: '%d/%m/%y',
                  legend: 'Time',
                  legendOffset: 40,
                  tickRotation: -25,
                  legendPosition: 'middle',
                }}
                colors={theme.palette.primary.main}
                enablePoints={false}
                xFormat="time:%d/%m/%Y"
                enableSlices="x"
                sliceTooltip={({ slice }) => {
                  return (
                    <div
                      style={{
                        background: 'white',
                        padding: '9px 12px',
                        border: '1px solid #ccc',
                      }}
                    >
                      {slice.points.map(
                        ({
                          data: { xFormatted, yFormatted },
                          serieColor,
                          id,
                        }) => (
                          <>
                            <div>
                              {`${t('Date')}`}
                              :&nbsp;
                              {xFormatted}
                            </div>
                            <div>
                              {`${t('Number of Actions')}`}
                              :&nbsp;
                              <span
                                key={id}
                                style={{
                                  color: serieColor,
                                }}
                              >
                                {yFormatted}
                              </span>
                            </div>
                          </>
                        ),
                      )}
                    </div>
                  );
                }}
                margin={NIVO_LINE_MARGIN}
                width={900}
                height={400}
              />
            </Paper>
          </Grid>
        </Grid>
        <Settings />
        <Fab
          color="primary"
          aria-label={t('Settings')}
          className={classes.fab}
          onClick={dispatchOpenSettings}
        >
          <SettingsIcon />
        </Fab>
      </>
    );
  }
}

// get the app instance resources that are saved in the redux store
const mapStateToProps = ({ appInstanceResources, action }) => {
  const actionsPerDay = action.content.reduce((acc, obj) => {
    const spaceDate = moment(obj.createdAt);
    const index = acc.findIndex(({ date }) => spaceDate.isSame(date, 'day'));
    if (index > 0) {
      acc[index] = {
        date: spaceDate,
        count: acc[index].count + 1,
      };
    } else {
      acc.push({
        date: spaceDate,
        count: 1,
      });
    }
    return acc;
  }, []);
  const sortedActions = actionsPerDay.sort(({ date: dateA }, { date: dateB }) =>
    moment(dateA).isBefore(dateB),
  );
  const {
    0: minDateAction,
    [actionsPerDay.length - 1]: maxDateAction,
  } = actionsPerDay;
  return {
    appInstanceResources: appInstanceResources.content,
    actions: sortedActions,
    minDate: minDateAction?.date,
    maxDate: maxDateAction?.date,
  };
};

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  dispatchGetUsers: getUsers,
  dispatchPostAppInstanceResource: postAppInstanceResource,
  dispatchPatchAppInstanceResource: patchAppInstanceResource,
  dispatchDeleteAppInstanceResource: deleteAppInstanceResource,
  dispatchOpenSettings: openSettings,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherView);

const StyledComponent = withStyles(TeacherView.styles)(ConnectedComponent);
const ThemedComponent = withTheme(StyledComponent);

export default withTranslation()(ThemedComponent);
