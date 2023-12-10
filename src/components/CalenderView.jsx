import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteProduct, addData, deleteData, updateItems } from '../service/Api';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import { TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CalenderView = ({ FirstName, LastName, Location, state, id, date,time, setcheckFactor, checkFactor }) => {
    const [open1, setOpen1] = React.useState(false);
    const [value, setValue] = React.useState(dayjs(new Date()));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };



    const [select, setselect] = useState(`${state}`)
    const [ifAddNew, setifAddNew] = useState(false)
    const navigate = useNavigate();
    const goToProduct = (id) => {
        navigate(`/ItemPreview/${id}`)
    }

    const [product, setProduct] = useState({
        id: `${id}`,
        FirstName: `${FirstName}`,
        LastName: `${LastName}`,
        Location: `${Location}`,


    });

    const ifupdated = () => {
        setselect('true')
    }

    const postDetails = async (e) => {

        e.preventDefault();
        await updateItems(product)

    }

    const addDetails = async (e) => {
        await addData(id)
    }
    let Name, value2
    var time = value.$d.toLocaleTimeString()
    const handlechange = (e) => {
        Name = e.target.name;
        value2 = e.target.value;

        setProduct({ ...product, [Name]: value2 })





    }

    const addAppointment = async (id, value) => {
        const date = value.$d.toLocaleDateString();
        const time = value.$d.toLocaleTimeString();
        setifAddNew(false);
        await addData(id, date, time);
        setcheckFactor(checkFactor + 1)

    }


    return (

        <>


            <div className='updatecard'>

                {select === 'false' && <>
                    <div className='Inputs_update'>

                    </div>
                    <div className='Item_details Inputs_update_textfield'>  <TextField style={{ width: '5vw' }} name="id" id="standard-basic" label="id" variant="standard" color="success" value={product.id} onChange={handlechange} /></div>
                    <div className='Item_details Inputs_update_textfield'> <TextField style={{ width: '5vw' }} name="FirstName" id="standard-basic" label="FirstName" variant="standard" color="success" value={product.FirstName} onChange={handlechange} /></div>
                    <div className='Item_details Inputs_update_textfield'><TextField style={{ width: '5vw' }} name="LastName" id="standard-basic" label="LastName" variant="standard" color="success" value={product.LastName} onChange={handlechange} /></div>

                    <div className='Item_details Inputs_update_textfield'>  <TextField style={{ width: '5vw' }} name="Location" id="standard-basic" label="Location" variant="standard" color="success" value={product.Location} onChange={handlechange} /></div>

                    <div className='Item_details_icons_update' style={{ width: '4vw', marginRight: '1vw' }}> <ClearIcon onClick={() => { select === 'true' ? setselect('false') : setselect('true') }}
                        style={{ cursor: 'pointer', border: 'none' }}>
                    </ClearIcon></div>
                    <div className='Item_details_icons_update' onClick={postDetails}>

                        <UpgradeIcon onClick={() => { select === 'true' ? setselect('false') : setselect('true') }}
                            style={{ cursor: 'pointer', border: 'none' }}>
                        </UpgradeIcon>

                    </div>



                </>}
                {select === 'true' && <>

                    <div className='Item_details' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{id}</div>
                    <div className='Item_details' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{FirstName}</div>
                    <div className='Item_details' style={{ fontWeight: 'bold' }}>{LastName}</div>
                    <div className='Item_details' style={{ fontWeight: 'bold' }}>{date} </div>
                    <div className='Item_details' style={{ fontWeight: 'bold' }}>{time} </div>

                    

                    <div></div>

                    </>}


            </div >





        </>
    );
};

export default CalenderView;
