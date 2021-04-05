// import * as React from 'react';
// import Paper from '@material-ui/core/Paper';
// import { ViewState } from '@devexpress/dx-react-scheduler';
// import {
//   Scheduler,
//   MonthView,
//   Appointments,
// } from '@devexpress/dx-react-scheduler-material-ui';
// import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

// const currentDate = new Date();
// const schedulerData = [
//   { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
//   { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
// ];

// export default () => (
//   <Paper>
//     <Scheduler
//       data={schedulerData}
//     >
//       <ViewState
//         currentDate={currentDate}
//       />
//       <MonthView
//         startDayHour={9}
//         endDayHour={14}
//       />
//       <Appointments />
//       <AppointmentForm
//         readOnly={false} />
//     </Scheduler>
//   </Paper>
// );

/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import LocationOn from "@material-ui/icons/LocationOn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Notes from "@material-ui/icons/Notes";
import Close from "@material-ui/icons/Close";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Create from "@material-ui/icons/Create";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Heading from "../ Heading";
import API from "../../utils/API";

import appointments from "./appointments";

const containerStyles = (theme) => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: "hidden",
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: "right",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
    width: "50%",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: "100%",
  },
});

class AppointmentFormContainerBasic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    this.setState({
      appointmentChanges: {},
    });
  }

  render() {
    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges } = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData.id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment("added")
      : () => this.commitAppointment("changed");

    const textEditorProps = (field) => ({
      variant: "outlined",
      onChange: ({ target: change }) =>
        this.changeAppointment({
          field: [field],
          changes: change.value,
        }),
      value: displayAppointmentData[field] || "",
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const pickerEditorProps = (field) => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: (date) =>
        this.changeAppointment({
          field: [field],
          changes: date
            ? date.toDate()
            : new Date(displayAppointmentData[field]),
        }),
      inputVariant: "outlined",
      format: "DD/MM/YYYY HH:mm",
      onError: () => null,
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
      });
      visibleChange();
      cancelAppointment();
    };

    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}
      >
        <div>
          <div className={classes.header}>
            <IconButton className={classes.closeButton} onClick={cancelChanges}>
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField {...textEditorProps("title")} />
            </div>
            {/* added cost */}
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField type="number" {...textEditorProps("cost")} />
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  label="Start Date"
                  {...pickerEditorProps("startDate")}
                />
                <KeyboardDateTimePicker
                  label="End Date"
                  {...pickerEditorProps("endDate")}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color="action" />
              <TextField {...textEditorProps("location")} />
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField {...textEditorProps("notes")} multiline rows="6" />
            </div>
          </div>
          <div className={classes.buttonGroup}>
            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment("deleted");
                }}
              >
                Delete
              </Button>
            )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
                // API.createActivity({
                //   acvtivity: formObject,
                // })
              }}
            >
              {isNewAppointment ? "Create" : "Save"}
            </Button>
          </div>
        </div>
      </AppointmentForm.Overlay>
    );
  }
}

const CommandButton = withStyles(containerStyles, {
  name: "CommandButton",
})(({ classes, ...restProps }) => {
  return (
    <AppointmentTooltip.CommandButton
      {...restProps}
      className={classes.commandButton}
    />
  );
});

const Content = withStyles(containerStyles, { name: "Content" })(
  ({ children, appointmentData, classes, ...restProps }) => {
    return (
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
      >
        <CheckboxesGroup
          classes={classes}
          {...appointmentData}
        ></CheckboxesGroup>
      </AppointmentTooltip.Content>
    );
  }
);

const AppointmentFormContainer = withStyles(containerStyles, {
  name: "AppointmentFormContainer",
})(AppointmentFormContainerBasic);

const styles = (theme) => ({
  addButton: {
    position: "absolute",
    bottom: theme.spacing(1) * 3,
    right: theme.spacing(1) * 4,
  },
});

function CheckboxesGroup({ classes, guests, id }) {
  //const classes = useStyles();

  const init = {};
  const names = {};

  guests.forEach((guest) => {
    let status = guest.activities.filter(({ _id }) => _id === id).length !== 0;

    init[guest._id] = status;
    names[guest._id] = `${guest.firstName} ${guest.lastName}`;
  });

  const [state, setState] = React.useState(init);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleSubmit = () => {
    let assigned = Object.entries(state)
      .filter((id) => {
        return id[1] !== init[id[0]];
      })
      .map((id) => {
        return { id: id[0], state: id[1] };
      });
    console.log(assigned);
    assigned.forEach((guest) =>
      API.addToGuest(guest.id, id, guest.state ? "Activity" : "RemoveA")
    );
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign guests to this activity</FormLabel>
        <FormGroup>
          {Object.entries(state).map((guest) => {
            return (
              <FormControlLabel
                key={guest[0]}
                control={
                  <Checkbox
                    checked={guest[1]}
                    onChange={handleChange}
                    name={guest[0]}
                  />
                }
                label={names[guest[0]]}
              />
            );
          })}
        </FormGroup>
        <IconButton
          /* eslint-disable-next-line no-alert */
          onClick={handleSubmit}
          className={classes.commandButton}
        >
          <AssignmentIcon />
        </IconButton>
      </FormControl>
    </div>
  );
}
// ================================================================================= Calendar
/* eslint-disable-next-line react/no-multi-comp */
class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: new Date(),
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 9,
      endDayHour: 19,
      isNewAppointment: false,
    };

    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(
      this
    );

    this.loadData = () => {
      API.getActivities().then((res) => {
        API.getGuests().then((guests) => {
          let data = res.data.map((activity) => {
            let filteredGuests = guests.data.filter((guest) => {
              return (
                new Date(guest.reservation.checkIn) <
                  new Date(activity.startDate) &&
                new Date(guest.reservation.checkOut) >
                  new Date(activity.endDate)
              );
            });
            console.log(filteredGuests);
            return {
              title: activity.title,
              cost: activity.cost,
              startDate: activity.startDate,
              endDate: activity.endDate,
              location: activity.location,
              notes: activity.notes,
              id: activity._id,
              guests: filteredGuests,
            };
          });
          console.log(data);
          this.setState({ ...this.state, data: data });
        });
      });
    };

    this.componentDidMount = () => {
      this.loadData();
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(
      this
    );
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment =
        data.filter(
          (appointment) =>
            editingAppointment && appointment.id === editingAppointment.id
        )[0] || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    const { data, deletedAppointmentId } = this.state;
    //console.log("Confirmed", deletedAppointmentId);

    API.deleteActivity(deletedAppointmentId).then(() => {
      this.setState({ ...this.state, deletedAppointmentId: null });
      this.loadData();
    });

    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    if (added) {
      //data = [...data, { id: startingAddedId, ...added }];
      //console.log(added);
      API.saveActivity({
        title: added.title,
        cost: added.cost,
        startDate: added.startDate,
        endDate: added.endDate,
        location: added.location,
        notes: added.notes,
      }).then(() => {
        this.setState({ ...this.state, addedAppointment: {} });
        this.loadData();
      });
    }
    if (changed) {
      //console.log("id:", changed[0], Object.keys(changed)[0]);
      API.updateActivity(changed[Object.keys(changed)[0]]).then(() =>
        this.loadData()
      );
    }

    if (deleted !== undefined) {
      this.setDeletedAppointmentId(deleted);
      //console.log(deleted);
      this.toggleConfirmationVisible();
    }
  }

  render() {
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;
    const { classes } = this.props;
    let end = new Date(currentDate);
    end.setDate(end.getDate() + 7);
    console.log("DATA::", data);

    return (
      <Paper>
        <Heading
          heading={`${currentDate.toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })} - ${end.toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`}
        />
        <Scheduler data={data} height={660}>
          <ViewState currentDate={currentDate} />
          <EditingState
            onCommitChanges={this.commitChanges}
            onEditingAppointmentChange={this.onEditingAppointmentChange}
            onAddedAppointmentChange={this.onAddedAppointmentChange}
          />
          <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
          <MonthView />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <Appointments />
          <AppointmentTooltip
            commandButtonComponent={CommandButton}
            contentComponent={Content}
            onVisibilityChange={(visible) => {
              if (!visible) {
                this.loadData();
              }
            }}
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <Toolbar />
          <ViewSwitcher />
          <AppointmentForm
            overlayComponent={this.appointmentForm}
            visible={editingFormVisible}
            onVisibilityChange={this.toggleEditingFormVisibility}
          />
          <DragDropProvider />
        </Scheduler>

        <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
          <DialogTitle>Delete Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.toggleConfirmationVisible}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={this.commitDeletedAppointment}
              color="secondary"
              variant="outlined"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Fab
          color="secondary"
          className={classes.addButton}
          onClick={() => {
            this.setState({ editingFormVisible: true });
            this.onEditingAppointmentChange(undefined);
            this.onAddedAppointmentChange({
              startDate: new Date(currentDate).setHours(startDayHour),
              endDate: new Date(currentDate).setHours(startDayHour + 1),
            });
          }}
        >
          <AddIcon />
        </Fab>
      </Paper>
    );
  }
}

export default withStyles(styles, { name: "EditingDemo" })(Demo);
