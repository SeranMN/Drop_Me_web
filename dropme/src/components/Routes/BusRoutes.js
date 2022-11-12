import { React, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { margin } from '@mui/system';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddBusRoute from './AddBusRoute';
import EditRoute from './EditRoute';
import RouteDeleteDialog from './RouteDeleteDialog';

const BusRoutes = () => {

  const [busRoutes, setBusRoutes] = useState([])
  const [toggle, setToggle] = useState(false)

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const [searchTerm, setSearchTerm] = useState("");

  const findRoutes = (route) => {
    if (route) {
      axios.get(`http://localhost:5000/route/search/${route}`)

        .then((res) => {
          let arr = res.data;
          let i;
          let list = [];
          for (i = 0; i < arr.length; i++) {
            list.push(arr[i]);
          }
          console.log('list', list)
          setBusRoutes(list)
        })
        .catch((err) => {
          console.log(err);
        });

    }
  };

  const handleChange = (e) => {
    findRoutes(e.target.value)
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    if (!searchTerm) {
      axios.get('https://dropmebackend.herokuapp.com/route/')
        .then((res) => {
          setBusRoutes(res.data)
          console.log('res.data', res.data)
        })
        .catch((err) => console.log(err))
    }
  }, [toggle,searchTerm])

  return (
    <div style={{ marginTop: '20px' }}>
      <Typography sx={{ color: 'blue' }} variant='h4' align='center'>Dashboard - Manage Route</Typography>
      <Paper
        component="form"
        sx={{ p: '1px 1px', m: 'auto', width: 400, borderRadius: '24px' }}
        variant="outlined"
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search by bus Name"
          inputProps={{ 'aria-label': 'search Events' }}
          value={searchTerm}
          onChange={handleChange}
        />
      </Paper>
      <Box sx={{ mx: '25px', display: 'flex', justifyContent: 'flex-end' }}>
        <AddBusRoute setToggle={setToggle} toggle={toggle} />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ width: '95%', marginTop: 5, marginLeft: 5 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Route No</StyledTableCell>
              <StyledTableCell >Departure from</StyledTableCell>
              <StyledTableCell >Arrival to</StyledTableCell>
              <StyledTableCell >Cost</StyledTableCell>
              <StyledTableCell >Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {busRoutes.map((busRoute) => (
              <StyledTableRow key={busRoute._id}>
                <StyledTableCell >
                  {busRoute.routeNo}
                </StyledTableCell>
                <StyledTableCell >{busRoute.Town1}</StyledTableCell>
                <StyledTableCell >{busRoute.Town2}</StyledTableCell>
                <StyledTableCell >{busRoute.cost}</StyledTableCell>
                {/* <StyledTableCell >{busRoute.Status}</StyledTableCell> */}
                <StyledTableCell >
                  <Box display='flex' >
                    <EditRoute setToggle={setToggle} toggle={toggle} data={busRoute} />
                    <RouteDeleteDialog id={busRoute._id} setToggle={setToggle} toggle={toggle} />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </div>

  )
}

export default BusRoutes