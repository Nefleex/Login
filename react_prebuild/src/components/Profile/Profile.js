import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  withStyles,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button
} from "@material-ui/core";
import { Edit, Save, Cancel } from "@material-ui/icons/";
import AppBar from "../Home/AppBar";
import { Prompt } from "react-router";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minWidth: 350
  },
  FormControl: {
    width: "100%"
  },
  container: {
    width: 300,
    marginTop: 30
  },

  buttons: {
    display: "inline-flex",
    justifyContent: "space-between"
  }
});

export default withStyles(styles)(
  class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fromDB: {
          ...props.data
        },
        ...props.data,
        errorMsg: null,
        isEditMode: false
      };
      this.fieldsHaveChanged = this.fieldsHaveChanged.bind(this);
      this.handleLeavePage = this.handleLeavePage.bind(this);
    }

    componentDidMount() {
      window.addEventListener("beforeunload", this.handleLeavePage);
    }

    componentWillUnmount() {
      window.removeEventListener("beforeunload", this.handleLeavePage);
    }

    handleLeavePage(e) {
      let changed = this.fieldsHaveChanged();
      if (changed) {
        const confirmationMessage = "Hello";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
      return;
    }

    // OnChangeHandler for inputs, uses elements name to determine which state field to change
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    // handleEdit = item => {
    //   this.setState({ item: !this.state.item });
    // };

    ErrorDisplay = () => {
      if (this.state.errorMsg) {
        return <Fragment>{this.state.errorMsg}</Fragment>;
      } else {
        return null;
      }
    };

    fieldsHaveChanged = () => {
      if (
        this.state.fromDB.userName !== this.state.userName ||
        this.state.fromDB.address !== this.state.address ||
        this.state.fromDB.city !== this.state.city ||
        this.state.fromDB.phoneNumber !== this.state.phoneNumber ||
        this.state.fromDB.postalCode !== this.state.postalCode
      ) {
        return true;
      } else {
        return false;
      }
    };
    saveChanges = () => {
      if (this.state.errorMsg !== null) this.setState({ errorMsg: null });
      if (this.fieldsHaveChanged()) {
        let json = {
          email: this.state.email,
          address: this.state.address,
          city: this.state.city,
          postalCode: this.state.postalCode,
          userName: this.state.userName,
          phoneNumber: this.state.phoneNumber
        };
        // if (this.state.errorMsg === []) {
        fetch("http://100.26.100.211:3000/api/users/save", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("token") ||
              sessionStorage.getItem("token"),
            "x-access-token":
              localStorage.getItem("token") || sessionStorage.getItem("token")
          },
          body: JSON.stringify(json)
        })
          .then(res => {
            if (res.status === 200) {
              // If save was successful, fromDB state from fields so that subsequent save attempts won't go through unless the fields have actually changed.
              this.setState(
                {
                  fromDB: {
                    city: this.state.city,
                    address: this.state.address,
                    postalCode: this.state.postalCode,
                    userName: this.state.userName,
                    phoneNumber: this.state.phoneNumber
                  }
                },
                () => {
                  this.setState({ isEditMode: false });
                }
              );
              return res.json();
            }
            if (res.status === 400) {
              return res.json();
            } else {
              localStorage.clear();
              sessionStorage.clear();
              this.props.history.push("/");
            }
          })
          .then(data => {
            console.log(data.msg);
            this.setState({ errorMsg: data.msg });
          })
          .catch(err => console.log(err));
      }
    };

    // setOriginalValues = () => {
    //   this.setState({fromDB:this.state.fromDB, ...this.state.fromDb, isEditMode: false });
    // };
    toggleEditMode = () => {
      this.setState({ isEditMode: !this.state.isEditMode });
    };
    cancelEdit = () => {
      if (this.fieldsHaveChanged) {
        // if (window.confirm("Are you sure you want to discard changes?")) {
        this.setState(
          {
            userName: this.state.fromDB.userName,
            address: this.state.fromDB.address,
            city: this.state.fromDB.city,
            phoneNumber: this.state.fromDB.phoneNumber,
            postalCode: this.state.fromDB.postalCode
          },
          () => {
            this.toggleEditMode();
          }
        );
      }
      // }
    };

    render() {
      const { classes } = this.props;
      window.onbeforeunload = function(e) {};
      return (
        <Fragment>
          <Prompt
            when={this.fieldsHaveChanged()}
            message="You have unsaved changes. Are you sure you want to discard the changes?"
          />
          <AppBar history={this.props.history} />
          <div className={classes.root}>
            <div className={classes.container}>
              <FormControl className={classes.FormControl}>
                <UsernameField
                  change={this.onChange}
                  username={this.state.userName}
                  editMode={this.state.isEditMode}
                />

                <CityField
                  change={this.onChange}
                  city={this.state.city}
                  editMode={this.state.isEditMode}
                />
                <AddressField
                  change={this.onChange}
                  address={this.state.address}
                  editMode={this.state.isEditMode}
                />
                <PostalField
                  change={this.onChange}
                  postalCode={this.state.postalCode}
                  editMode={this.state.isEditMode}
                />
                <PhoneNumberField
                  change={this.onChange}
                  phonenumber={this.state.phoneNumber}
                  editMode={this.state.isEditMode}
                />
                <br />
                <div className={classes.buttons}>
                  <Button onClick={this.saveChanges} className={classes.button}>
                    <Save />
                    Save Changes
                  </Button>

                  <EditButton
                    editMode={this.state.isEditMode}
                    toggle={this.toggleEditMode}
                    cancel={this.cancelEdit}
                    classes={classes}
                  />
                </div>
                {this.ErrorDisplay()}
              </FormControl>
            </div>
          </div>
        </Fragment>
      );
    }
  }
);

const EditButton = props => {
  return (
    <Fragment>
      {!props.editMode ? (
        <Button onClick={props.toggle} className={props.classes.button}>
          <Edit /> EDIT
        </Button>
      ) : (
        <Button onClick={props.cancel} className={props.classes.button}>
          <Cancel /> CANCEL
        </Button>
      )}
    </Fragment>
  );
};

const UsernameField = props => {
  if (!props.editMode) {
    return (
      <Fragment>
        <Typography variant="subtitle1">Username</Typography>
        <TextField
          type="text"
          name="userName"
          id="userName"
          onChange={props.change}
          value={props.username}
          disabled
        />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Typography variant="subtitle1">Username</Typography>
        <TextField
          type="text"
          name="userName"
          id="userName"
          onChange={props.change}
          value={props.username}
        />
      </Fragment>
    );
  }
};

const PhoneNumberField = props => {
  if (!props.editMode) {
    return (
      <Fragment>
        <Typography variant="subtitle1">Phone Number</Typography>
        <TextField
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          onChange={props.change}
          value={props.phonenumber}
          disabled
        />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Typography variant="subtitle1">Username</Typography>
        <TextField
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          onChange={props.change}
          value={props.phonenumber}
        />
      </Fragment>
    );
  }
};

const PostalField = props => {
  if (!props.editMode) {
    return (
      <Fragment>
        <Typography variant="subtitle1">Postal Code</Typography>
        <TextField
          type="text"
          name="postalCode"
          id="postalCode"
          onChange={props.change}
          value={props.postalCode}
          disabled
        />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Typography variant="subtitle1">Postal Code</Typography>
        <TextField
          type="text"
          name="postalCode"
          id="postalCode"
          onChange={props.change}
          value={props.postalCode}
        />
      </Fragment>
    );
  }
};

const CityField = props => {
  if (!props.editMode) {
    return (
      <Fragment>
        <Typography variant="subtitle1">City</Typography>
        <TextField
          type="text"
          name="city"
          id="city"
          onChange={props.change}
          value={props.city}
          disabled
        />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Typography variant="subtitle1">City</Typography>
        <TextField
          type="text"
          name="city"
          id="city"
          onChange={props.change}
          value={props.city}
        />
      </Fragment>
    );
  }
};

const AddressField = props => {
  if (!props.editMode) {
    return (
      <Fragment>
        <Typography variant="subtitle1">Address</Typography>
        <TextField
          type="text"
          name="address"
          id="address"
          onChange={props.change}
          value={props.address}
          disabled
        />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Typography variant="subtitle1">Address</Typography>
        <TextField
          type="text"
          name="address"
          id="address"
          onChange={props.change}
          value={props.address}
        />
      </Fragment>
    );
  }
};
