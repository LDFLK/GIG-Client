import React, {Component} from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import FormattedContent from "./formattedContent";

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

class ViewResult extends Component {

  componentDidMount() {
    this.props.getEntity(this.props.match.params.title + this.props.location.search);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.title !== this.props.match.params.title) {
      this.props.getEntity(this.props.match.params.title + this.props.location.search);
    }
  }

  render() {
    const {classes, loadedEntity} = this.props;
    return (
      <div className="content">
        <div className={classes.container}>
          <Paper className={classes.searchResult} elevation={1}>
            {loadedEntity ?
              <div>
                <Typography variant="h4" component="h4">
                  {loadedEntity.title}
                </Typography><br/>
                <table>
                  <tbody>
                  {loadedEntity.attributes ? Object.entries(loadedEntity.attributes).map((attribute) => (
                    <FormattedContent key={attribute[1].name} content={attribute[1]}/>
                  )) : null}
                  </tbody>
                </table>
                <br/>
                <Typography component="p">
                  Links:
                  {loadedEntity.links ? Object.entries(loadedEntity.links).map((link) => (
                    <Link className={classes.link} key={link[0]}
                          to={'/content/' + link[1].title + "?date=" + link[1].dates[0]}>
                      {link[0]}
                    </Link>
                  )) : null}
                </Typography>
                <br/>
                <Typography component="p">
                  Categories:
                  {loadedEntity.categories ? loadedEntity.categories.map((title) => (
                    <Link className={classes.link} key={loadedEntity.title + title} to={'/search/' + title + ':'}>
                      {title}
                    </Link>
                  )) : null}
                </Typography>
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

ViewResult.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewResult);
