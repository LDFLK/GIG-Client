import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import FormattedContent from "./formattedContent";
import {Redirect} from 'react-router-dom';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
  container: {
    minHeight: '100vh',
    backgroundColor: '#eeeeee',
    padding: '10px'
  },
  searchResult: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    color: 'black',
    textAlign: 'left',
    margin: '10px',
  },
  paragraph: {
    margin: '15px 0'
  },
  link: {
    paddingRight: '10px'
  }
});

class EditEntity extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modifiedEntity: {},
      originalTitle: ""
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSave() {
    console.log(this.state.originalTitle);
    console.log(this.state.modifiedEntity);
  }

  handleChange(key, value) {
    this.setState({[key]: value.jsObject});
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.title + this.props.location.search);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.getEntity(this.props.match.params.title + this.props.location.search);
    }
    if (this.props.loadedEntity.title && this.state.originalTitle === "") {
      this.setState({originalTitle: this.props.loadedEntity.title, modifiedEntity: this.props.loadedEntity})
    }
  }

  render() {
    const {classes, loadedEntity, user} = this.props;
    if (!user) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{pathname: '/login?redirect=' + loadedEntity.title, state: {from: this.props.location}}}/>
    }
    return (
      <div className="content">
        <div className={classes.container}>
          <Paper className={classes.searchResult} elevation={1}>
            {loadedEntity ?
              <div>
                <JSONInput
                  id='entity_editor'
                  placeholder={this.state.modifiedEntity}
                  // colors      = { darktheme }
                  locale={locale}
                  height
                  width
                  onChange={(e) => this.handleChange("modifiedEntity", e)}
                />
                <Button variant="contained" color="primary" type="button" onClick={this.handleSave}>
                  Save
                </Button>
              </div>
              :
              <Typography component="p">
                Document not found
              </Typography>
            }
          </Paper>
        </div>
      </div>
    );
  }
}

EditEntity.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditEntity);
