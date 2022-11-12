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
import Add from './Add';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import EditBus from './EditBus';
import BusDeleteDialog from './BusDeleteDialog';

const View = () => {

  const [open, setOpen] = useState(false)

  const [toggle, setToggle] = useState(false)
  const [buses, setBuses] = useState([])


  const handleOpen = (row) => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false);
  const [searchTerm, setSearchTerm] = useState("");

  const findEvents = (busName) => {
    if (busName) {
      axios.get(`http://localhost:5000/bus/search/${busName}`)

        .then((res) => {
          let arr = res.data;
          let i;
          let list = [];
          for (i = 0; i < arr.length; i++) {
            list.push(arr[i]);
          }
          setBuses(list)
        })
        .catch((err) => {
          console.log(err);
        });

    }
  };

  const handleChange = (e) => {
    findEvents(e.target.value)
    setSearchTerm(e.target.value);
  }

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

  useEffect(() => {
    if (!searchTerm) {
      axios.get('https://dropmebackend.herokuapp.com/bus/')
        .then((res) => { setBuses(res.data) })
        .catch((err) => console.log(err))
    }
  }, [toggle,searchTerm])

  return (
    <div style={{ marginTop: '20px' }}>
      <Typography sx={{ color: 'blue' }} variant='h4' align='center'>Dashboard - Manage Buses</Typography>
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
        <Add handleOpen={handleOpen} handleClose={handleClose} setToggle={setToggle} toggle={toggle} setOpen={setOpen} open={open} />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ width: '95%', marginTop: 5, marginLeft: 5 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Bus Number</StyledTableCell>
              <StyledTableCell>Route No</StyledTableCell>
              <StyledTableCell>Bus Name</StyledTableCell>
              <StyledTableCell >Model</StyledTableCell>
              <StyledTableCell >Capacity</StyledTableCell>
              <StyledTableCell >Status</StyledTableCell>
              <StyledTableCell >Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buses.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell >
                  {row.BusNo}
                </StyledTableCell>
                <StyledTableCell >{row.routeNo}</StyledTableCell>
                <StyledTableCell >{row.BusName}</StyledTableCell>
                <StyledTableCell >{row.Model}</StyledTableCell>
                <StyledTableCell>{row.Capacity}</StyledTableCell>
                <StyledTableCell >{row.Status}</StyledTableCell>
                <StyledTableCell >
                  <Box display='flex' >
                    <EditBus setToggle={setToggle} toggle={toggle} data={row} />
                    <BusDeleteDialog id={row._id} setToggle={setToggle} toggle={toggle} />
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

export default View