import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SimpleTable = ({term}) => {
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetchDrugs();
    }
    fetchData();
  }, [term]);

  const fetchDrugs = async () => {
    const res = await axios.get('https://localhost:44344/api/fda', {
      params: {
        reaction: term,
      },
    });
    const {data} = await res;
    if (data) {
      setDrugs(data);
    } else {
      setDrugs([]);
    }
  };

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Term</TableCell>
            <TableCell align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drugs.map((row) => (
            <TableRow key={row.term}>
              <TableCell component="th" scope="row">
                {row.term}
              </TableCell>
              <TableCell align="right">{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
