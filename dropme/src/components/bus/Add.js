import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
 radius:0.5,
  boxShadow: 24,
    p: 4,

};
const textFieldStyle = {
    margin: 2,
    width:300
}
const statuses = [
    {
        value: 'Runing',
        label:'Runing'
    },
    {
        value: 'Not Runing',
        label:'Not Runing'
    }
]


export default function Add(modelOpen) {

    

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [busNo, setBusNo] = React.useState('')
    const [busName, setBusName] = React.useState('');
    const [model, setbusmodel] = React.useState('');
    const [capacity, setCapacity] = React.useState('');

    const onSubmit = () => {
        handleClose()
        const bus = {
            BusNo: busNo,
            BusName: busName,
            Model: model,
            Capacity: capacity,
            Status: status
        };

        axios.post('http://localhost:5000/bus/add', bus)
            .then(() => alert('Added successfully'))
        .catch((err)=>console.log(err))
}
    
const [status,setStatus] = React.useState()
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" >Add Bus</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Add Bus
          </Typography>
                  <TextField onChange={(e)=>{setBusNo(e.target.value)}} sx ={textFieldStyle} id="filled-basic" label="Bus Number" variant="filled" />
                  <TextField onChange={(e)=>{setBusName(e.target.value)}} sx ={textFieldStyle} id="filled-basic" label="Bus Name" variant="filled" />
                  <TextField onChange={(e)=>{setbusmodel(e.target.value)}} sx ={textFieldStyle} id="filled-basic" label="Bus Model" variant="filled" />
                  <TextField onChange={(e)=>{setCapacity(e.target.value)}} sx={textFieldStyle} id="filled-basic" label="Bus Capacity" variant="filled" />
                  <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={status}
          onChange={(e)=>{setStatus(e.target.value)}}
                      helperText="Please select bus status"
                      sx={textFieldStyle}
        >
          {statuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
                  </TextField>
                  <Button variant='contained' sx={textFieldStyle} onClick={onSubmit}>Submit</Button>
        </Box>
        
      </Modal>
    </div>
  );
}