import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    radius: 0.5,
    boxShadow: 24,
    p: 3,

};
const textFieldStyle = {
    margin: 2,
    width: 300,
}

const AddTimetable = ({ setToggle, toggle }) => {

    const [open, setOpen] = useState(false)

    const handleOpen = (row) => {
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

    const [route, setRoute] = useState('');
    const [busNo, setBusNo] = useState('');
    const [busName, setBusName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [busRoute, setBusRoute] = React.useState([])
    const [bus, setBus] = React.useState([])



    React.useEffect(() => {
        axios.get('https://dropmebackend.herokuapp.com/route/')
            .then((res) => {
                let arr = res.data;
                let i;
                let list = [];
                for (i = 0; i < arr.length; i++) {
                    list.push({ label: arr[i].routeNo, value: arr[i].routeNo });
                }
                setBusRoute(list)
            })
            .catch((err) => console.log(err))
    }, [])

    React.useEffect(() => {
        axios.get('https://dropmebackend.herokuapp.com/bus/')
            .then((res) => {
                let arr = res.data;
                let i;
                let list = [];
                for (i = 0; i < arr.length; i++) {
                    list.push({ label: arr[i].routeNo, value: arr[i].routeNo });
                }
                setBus(list)
            })
            .catch((err) => console.log(err))
    }, [])

    const onSubmit = (e) => {
        const timetable = {
            ArrivalTime: start,
            Depaturetime: end,
            busNo: busNo,
            routeNo: route,
        };

        axios.post('https://dropmebackend.herokuapp.com/timetable/add', timetable)
            .then(() => {
                alert('Added successfully')
                setToggle(!toggle)
                handleClose()
            })
            .catch((err) => console.log(err))
    }

    const handleClear = (e) => {
        e.preventDefault()

    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon />} >Add Timetable</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ color: 'blue' }} id="keep-mounted-modal-title" variant="h6" align='center' component="h2">
                        Add Timetable
                    </Typography>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        value={busNo}
                        defaultValue=''
                        onChange={(e) => { setBusNo(e.target.value) }}
                        helperText="Please select bus No"
                        sx={{ width: '100%' }}
                        InputProps={{ sx: { height: 40 } }}
                        margin="normal"
                    >
                        {bus.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        value={route}
                        defaultValue=''
                        onChange={(e) => { setRoute(e.target.value) }}
                        helperText="Please select bus route No"
                        sx={{ width: '100%' }}
                        InputProps={{ sx: { height: 40 } }}
                        margin="normal"
                    >
                        {busRoute.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setStart(e.target.value) }} margin="normal" label="Start Time" variant="outlined" value={start} />
                    <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setEnd(e.target.value) }} margin="normal" label="End Time" variant="outlined" value={end} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-around',mt:'30px'  }}>
                        <Button color='secondary' variant='contained' onClick={handleClear}>Clear</Button>
                        <Button type='submit' variant='contained' onClick={onSubmit}>Add</Button>
                    </Box>
                </Box>

            </Modal>
        </div>
    )
}

export default AddTimetable