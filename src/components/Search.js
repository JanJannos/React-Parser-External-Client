import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '15px',
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Search = ({updateTerm}) => {
  const [label, setLabel] = useState('Search for anything ...');

  const classes = useStyles();

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onClick();
    }
  };

  const onClick = () => {
    updateTerm(label);
  };

  const changeLabel = (event) => {
    setLabel(event.target.value);
  };

  return (
    <div className={classes.root}>
      <TextField
        onChange={(e) => changeLabel(e)}
        label={label}
        onKeyDown={onKeyDown}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon>search</SearchIcon>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<SearchIcon />}
        onClick={onClick}
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
