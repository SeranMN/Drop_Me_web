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
import AddTimetable from './AddTimetable';
import EditTimeTable from './EditTimeTable';
import EditRoute from '../Routes/EditRoute';
import RouteDeleteDialog from '../Routes/RouteDeleteDialog';
import TimeTableDeleteDialog from './TimeTableDeleteDialog';

const Timetable = () => {

    const [busRoutes, setBusRoutes] = useState([])
    const [toggle, setToggle] = useState(false)
    const [timetables, setTimeTables] = useState([])

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
        axios.get('https://dropmebackend.herokuapp.com/timetable/')
            .then((res) => {
                setTimeTables(res.data)
                console.log('res.data', res.data)
            })
            .catch((err) => console.log(err))
    }, [toggle])

    return (
        <>
            <div style={{marginTop:'20px'}}>
                <Typography sx={{ color: 'blue' }} variant='h4' align='center'>Dashboard - Manage Timetable</Typography>
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
                    <AddTimetable setToggle={setToggle} toggle={toggle}/>
                </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ width: '95%', marginTop: 5, marginLeft: 5 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Bus No</StyledTableCell>
                                <StyledTableCell>Route No</StyledTableCell>
                                <StyledTableCell>Start Time</StyledTableCell>
                                <StyledTableCell>End Time</StyledTableCell>
                                <StyledTableCell >Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timetables.map((timetable) => (
                                <StyledTableRow>
                                    <StyledTableCell >{timetable.busNo}</StyledTableCell>
                                    <StyledTableCell >{timetable.routeNo}</StyledTableCell>
                                    <StyledTableCell >{timetable.ArrivalTime}</StyledTableCell>
                                    <StyledTableCell >{timetable.Depaturetime}</StyledTableCell>
                                    {/* <StyledTableCell >{busRoute.Status}</StyledTableCell> */}
                                    <StyledTableCell >
                                        <Box display='flex' >
                                            <EditTimeTable setToggle={setToggle} toggle={toggle} data={timetable}/>
                                            <TimeTableDeleteDialog id={timetable._id} setToggle={setToggle} toggle={toggle} />
                                        </Box>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default Timetable