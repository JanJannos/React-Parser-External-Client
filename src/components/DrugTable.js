import React, {useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import NoData from '../layout/notFound404.jpg';
import Loading from '../layout/loading.gif';
import Spinner from './spinner/Spinner';

const styles = (theme) => ({
  noData: {
    paddingTop: '10px',
  },
  table: {
    minWidth: 650,
    width: '50%',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  tableRow: {
    '&$selected, &$selected:hover': {
      backgroundColor: 'purple',
    },
  },
  tableCell: {
    '$selected &': {
      color: 'yellow',
    },
  },
  flexContainer: {
    height: '100%',
    padding: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexItem: {
    backgroundColor: 'lightblue',
    padding: '5px',
    width: '20px',
    height: '20px',
    margin: '10px',
    lineHeight: '20px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '2em',
    textAlign: 'center',
  },
});

const SimpleTable = ({term, classes}) => {
  const [drugs, setDrugs] = useState([]);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await fetchDrugs();
    }
    fetchData();
  }, [term]);

  const fetchDrugs = async () => {
    setFetching(true);
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
    setFetching(false);
  };

  return (
    <div>
      {drugs && drugs.length > 0 && !fetching && (
        <TableContainer component={Paper} className={classes.flexContainer}>
          <Table
            className={`${classes.table} ${classes.flexItem}`}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow hover className={classes.tableRow}>
                <TableCell className={classes.tableCell}>Term</TableCell>
                <TableCell className={classes.tableCell} align="right">
                  Count
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drugs.map((row) => (
                <TableRow key={row.term} hover className={classes.tableRow}>
                  <TableCell
                    className={classes.tableCell}
                    component="th"
                    scope="row"
                  >
                    {row.term}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="right">
                    {row.count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!drugs ||
        (drugs && drugs.length === 0 && !fetching && (
          <div className={classes.noData}>
            <div>
              {' '}
              <img src={NoData} alt="No Data" width="60%" height="60%" />
            </div>
          </div>
        ))}

      {fetching && <Spinner />}
    </div>
  );
};

export default withStyles(styles)(SimpleTable);
