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
import EditRoute from '../Routes/EditRoute';
import RouteDeleteDialog from '../Routes/RouteDeleteDialog';

const Journey = () => {

    const [trips, setTrips] = useState([])
    const [toggle, setToggle] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    const findEvents = (NIC) => {
        if (NIC) {
            axios.get(`http://localhost:5000/trip/search/${NIC}`)

                .then((res) => {
                    let arr = res.data;
                    let i;
                    let list = [];
                    for (i = 0; i < arr.length; i++) {
                        list.push(arr[i]);
                    }
                    setTrips(list)
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
            axios.get('https://dropmebackend.herokuapp.com/trip/')
                .then((res) => {
                    setTrips(res.data)
                    console.log('res.data', res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [])

    const formatTime = (time) => {
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    return (
        <>
            <div style={{ marginTop: '20px' }}>
                <Typography sx={{ color: 'blue' }} variant='h4' align='center'>Dashboard - All journeys</Typography>
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
                        placeholder="Search by NIC"
                        inputProps={{ 'aria-label': 'search Events' }}
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </Paper>

                <TableContainer component={Paper}>
                    <Table sx={{ width: '95%', marginTop: 5, marginLeft: 5 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Bus No</StyledTableCell>
                                <StyledTableCell>Route No</StyledTableCell>
                                <StyledTableCell>Passenger NIC</StyledTableCell>
                                <StyledTableCell>Cost</StyledTableCell>
                                <StyledTableCell >Date</StyledTableCell>
                                <StyledTableCell >Time</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trips.map((trip, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell >
                                        {trip.BusNo}
                                    </StyledTableCell>
                                    <StyledTableCell >{trip.Route}</StyledTableCell>
                                    <StyledTableCell >{trip.NIC}</StyledTableCell>
                                    <StyledTableCell >{trip.Cost}</StyledTableCell>
                                    <StyledTableCell >{(new Date(trip.Date).getDate()) + '/' + (new Date(trip.Date).getMonth() + 1) + '/' +
                                        (new Date(trip.Date).getFullYear())}</StyledTableCell>
                                    <StyledTableCell >{formatTime(new Date(trip.Date))}</StyledTableCell>

                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default Journey