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

const AddBusRoute = ({ setToggle, toggle }) => {

    const [open, setOpen] = useState(false)

    const handleOpen = (row) => {
        setOpen(true)
    }
    const handleClose = () => setOpen(false);

    const [route, setRoute] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [cost, setCost] = useState('')

    const onSubmit = (e) => {
        const dataRoute = {
            routeNo: route,
            Town1: from,
            Town2: to,
            cost: cost
        };
        console.log('dataRoute',dataRoute)

        axios.post('http://localhost:5000/route/add', dataRoute)
            .then(() => {
                alert('Added successfully')
                setToggle(!toggle)
                handleClose()
            })
            .catch((err) => console.log(err))
    }

    const handleClear = (e) => {
        e.preventDefault()
        setRoute('')
        setFrom('')
        setTo('')
        setCost('')
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" startIcon={<AddIcon />} >Add new</Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ color: 'blue' }} id="keep-mounted-modal-title" variant="h6" align='center' component="h2">
                        Add Routes
                    </Typography>
                    <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setRoute(e.target.value) }} margin="normal" label="Route" variant="outlined" value={route} />
                    <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setFrom(e.target.value) }} margin="normal" label="From" variant="outlined" value={from} />
                    <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setTo(e.target.value) }} margin="normal" label="To" variant="outlined" value={to} />
                    <TextField sx={{ width: '100%' }} InputProps={{ sx: { height: 40 } }} onChange={(e) => { setCost(e.target.value) }} margin="normal" label="Cost" variant="outlined" value={cost} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-around',mt:'30px' }}>
                        <Button color='secondary' variant='contained' onClick={handleClear}>Clear</Button>
                        <Button type='submit' variant='contained' onClick={onSubmit}>Add</Button>
                    </Box>
                </Box>

            </Modal>
        </div>
    )
}

export default AddBusRoute