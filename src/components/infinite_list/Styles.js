const Styles = theme => ({
  appBar: {
    backgroundColor: '#282c34'
  },
  grow: {
    flexGrow: 1,
  },
  errorText: {
    fontSize: 14,
    textAlign: "centre",
    color: 'red'
  },
  linkButton: {
    fontSize: 14,
    textAlign: "centre",
    color: 'white'
  },
  loginButton: {
    fontSize: 14,
    textAlign: "right",
    margin: 10,
    right: 0,
    top: 12,
    color: 'white'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    cursor: 'pointer'
  },
  search: {
    position: 'relative',
    borderBottomLeftRadius: '20px',
    borderTopLeftRadius: '20px',
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
    marginRight: "-25px",
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    marginTop: '3px',
    color: '#0000008F',
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    marginLeft: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
});

export default Styles;
