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

  const handleOpen = (row) =>{ 
    setOpen(true)
  }
  const handleClose = () => setOpen(false);

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

  const [buses, setBuses] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/bus/')
      .then((res) => { setBuses(res.data) })
      .catch((err) => console.log(err))
  }, [toggle])

  return (
    <div>
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
                <StyledTableCell >{row.BusName}</StyledTableCell>
                <StyledTableCell >{row.Model}</StyledTableCell>
                <StyledTableCell>{row.Capacity}</StyledTableCell>
                <StyledTableCell >{row.Status}</StyledTableCell>
                <StyledTableCell >
                  <Box display='flex' >
                    <EditBus setToggle={setToggle} toggle={toggle} data={row}/>
                    <BusDeleteDialog id={row._id}/>
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