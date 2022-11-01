import {React,useEffect,useState} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { margin } from '@mui/system';
import Add from './Add';
const View = () => {

const [open,setOpen] = useState(false)
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

    const [buses,setBuses] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/bus/')
            .then((res) => { setBuses(res.data) })
        .catch((err)=>console.log(err))
    },[])
    
  return (
      <div>
            <Add modelOpen = {open} />
           <TableContainer component={Paper}>
      <Table sx={{ width: '95%', marginTop:5, marginLeft:5 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Bus Number</StyledTableCell>
            <StyledTableCell>Bus Name</StyledTableCell>
            <StyledTableCell >Model</StyledTableCell>
            <StyledTableCell >Capacity</StyledTableCell>
            <StyledTableCell >Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buses.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell >
                {row.BusNo}
              </StyledTableCell>
              <StyledTableCell >{row.BusName}</StyledTableCell>
              <StyledTableCell >{row.Model}</StyledTableCell>
              <StyledTableCell>{row.Capacity}</StyledTableCell>
              <StyledTableCell >{row.Status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
          </TableContainer>
          
        
    </div>
  )
}

export default View