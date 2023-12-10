import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteProduct, EditData, addData, deleteData, updateItems } from '../service/Api';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import { TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
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
import { alpha, styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DesktopDateTimePicker, MobileDatePicker, MobileDateTimePicker, StaticDateTimePicker } from '@mui/x-date-pickers';
const Updatecard = ({ FirstName, LastName, Location, state, id, Appointments, setcheckFactor, checkFactor, notify }) => {
    const [open1, setOpen1] = React.useState(false);

    const [addorEdit, setaddorEdit] = useState('')
    const [value, setValue] = React.useState(dayjs(new Date()));
    const [open, setOpen] = React.useState(false);
    const [toupdate, settoupdate] = React.useState(false);
    const [idtoupdate, setidtoupdate] = React.useState(false);
    const handleClickOpen = (data) => {
        setOpen(true);
        setaddorEdit(data)
        if (data === 'add') {
            setifAddNew(true)
        }
    };

    const handleClose = () => {
        setOpen(false);
        setifAddNew(false)
        settoupdate(false)
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

        await addData(id, date, time);
        setcheckFactor(checkFactor + 1)
        handleClose();
        setifAddNew(false);
        notify("Appointment added successfully")

    }
    const editAppointment = async (id, id_app, value) => {
        const date = value.$d.toLocaleDateString();
        const time = value.$d.toLocaleTimeString();
        setifAddNew(false);
        settoupdate(false);
        await EditData(id, id_app, date, time);
        setcheckFactor(checkFactor + 1)
        notify("Appointment Edited successfully")

    }
    const [open3, setOpen3] = React.useState(false);

    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };
    const _deleteAppointment = async (id, id_app) => {
        await deleteData(id, id_app);
        setcheckFactor(checkFactor + 1)
        notify("Appointment Deleted successfully")
        handleClose3()
    }
    const [confirm, setconfirm] = useState('');
    const deleteAppointment = async (id, id_app, confirm) => {

        setOpen3(true)
        setconfirm({ id, id_app })

    }

    return (

        <>

            <Dialog
                open={open3}
                onClose={handleClose3}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this appointment?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        As you are deleting ,it is irreversible task to get this appointment details back.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose3}>No</Button>
                    <Button onClick={() => _deleteAppointment(confirm.id, confirm.id_app)} autoFocus>
                        Yes,Delete it
                    </Button>
                </DialogActions>
            </Dialog>
            <div className='updatecard'>

                {select === 'false' && <>

                    <div className='Item_details Inputs_update_textfield'>  <input className='update_input' name="id" id="standard-basic" label="id" variant="standard" color="success" value={product.id} onChange={handlechange} /></div>
                    <div className='Item_details Inputs_update_textfield'> <input className='update_input' name="FirstName" id="standard-basic" label="FirstName" variant="standard" color="success" value={product.FirstName} onChange={handlechange} /></div>
                    <div className='Item_details Inputs_update_textfield'><input className='update_input' name="LastName" id="standard-basic" label="LastName" variant="standard" color="success" value={product.LastName} onChange={handlechange} /></div>

                    <div className='Item_details Inputs_update_textfield'>  <input className='update_input' name="Location" id="standard-basic" label="Location" variant="standard" color="success" value={product.Location} onChange={handlechange} /></div>

                    <div className='  Item_details_icons_update' style={{ marginRight: '1vw' }}> <ClearIcon onClick={() => { select === 'true' ? setselect('false') : setselect('true') }}
                        style={{ cursor: 'pointer', border: 'none' }}>
                    </ClearIcon></div>
                    <div className=' Item_details_icons_update' onClick={postDetails}>

                        <UpgradeIcon onClick={() => { select === 'true' ? setselect('false') : setselect('true') }}
                            style={{ cursor: 'pointer', border: 'none' }}>
                        </UpgradeIcon>

                    </div>



                </>}
                {select === 'true' && <>

                    <div className='Item_details' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{id}</div>
                    <div className='Item_details' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{FirstName}</div>
                    <div className='Item_details' style={{ fontWeight: 'bold' }}>{LastName}</div>
                    <div className='Item_details' style={{ fontWeight: 'bold' }}>{Location} </div>



                    <div className='Item_details_icons'>   <CreateSharpIcon onClick={() => { select === 'true' ? setselect('false') : setselect('true') }} style={{ cursor: 'pointer', border: 'none' }}>Details</CreateSharpIcon>   </div>
                    <div className='Item_details_icons' style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handleClickOpen('edit')}>Show Appointments </div>
                    <div className='Item_details_icons' style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handleClickOpen('add')}>Add Appointment </div>
                </>}
                {/* <Button variant="outlined" >
                    All appointments
                </Button> */}
                <Dialog
                    maxWidth={500}

                    sx={{ overflowX: 'hidden', paddingBottom: `${addorEdit == 'add' ? '50vh' : toupdate ? '50vh' : '10vh'}` }}

                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogContent sx={{ width: `${addorEdit == 'add' ? '50vh' : '40vw'}` }} >
                        {addorEdit == 'add' && ifAddNew ?
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: '', flexDirection: 'column' }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateTimePicker', 'StaticDateTimePicker']}>
                                            <DemoItem label="Choose date and time for appointment">
                                                <DateTimePicker
                                                    value={value}
                                                    onChange={(newValue) => setValue(newValue)} />
                                            </DemoItem>


                                        </DemoContainer>
                                    </LocalizationProvider>

                                    {toupdate ? <button onClick={() => editAppointment(id, idtoupdate, value)}>Edit Appointment</button> :
                                        <button onClick={() => addAppointment(id, value)}>Set Appointment</button>
                                    }</div>
                            </>
                            :
                            <>
                                {toupdate ?
                                    <>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateTimePicker']}>
                                                <DateTimePicker
                                                    label="Controlled picker"
                                                    value={value}
                                                    onChange={(newValue) => setValue(newValue)}
                                                />


                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <button onClick={() => editAppointment(id, idtoupdate, value)}>Edit Appointment</button>
                                    </> : <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: ' calc(1vw + 0.75vh + 0.5vmin)', paddingBottom: '5vh' }}>All Appointments</div>}
                            </>}
                        <DialogContentText  id="alert-dialog-description">

                            <>
                            
                                {addorEdit == 'edit' && Appointments.length == 0 && <div style={{ textAlign: 'center', fontSize: ' calc(0.5vw + 0.75vh + 0.5vmin)', paddingBottom: '5vh' }}>No appointments were scheduled till now</div>}
                                {addorEdit == 'edit' && toupdate === false && Appointments && Appointments.map((data, index) =>
                                    <>
                                    <div className='Small_screen_dialog'  >
                                     
                                            <div>{index + 1}</div>
                                            <div>
                                                {data.date}

                                            </div>
                                            <div>{data.time}</div>
                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => { setifAddNew(true); setidtoupdate(data.id); settoupdate(true) }}> Edit appointment</EditIcon>
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => { setconfirm(0); deleteAppointment(id, data.id) }}> Delete appointment</DeleteIcon>

                                        </div>
                                       
                                    </>
                                   

                                )}
                               
                            </>
                            {/* <div>
                            {addorEdit=='edit' &&
                                <button onClick={() => setifAddNew(true)}> Schedule new appointment</button>}
                            </div> */}



                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>

            </div >





        </>
    );
};

export default Updatecard;
