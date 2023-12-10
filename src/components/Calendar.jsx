import React, { useState } from 'react'
import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import { Link, NavLink } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Updatecard from './UpdateCard';
import './main.css'
import { useEffect } from 'react';

import { getAllAppointments, getAllClients } from '../service/Api';
import CalenderView from './CalenderView';



const Calendar = () => {

    const [Itemdata, setItemdata] = useState([]);
    const [count, setcount] = useState(4);
    const [checkFactor, setcheckFactor] = useState(0);
    const [divvisibility, setdivvisibility] = useState('');
    const [divvisibility2, setdivvisibility2] = useState('none');
    const [changestate, setchangestate] = useState(-1);
    let sortedData;
    useEffect(() => {
        const getData = async () => {
            const res = await getAllAppointments();
            setItemdata(res);
            sortedData = res.sort((a, b) => new Date(...a.date.split('/').reverse()) - new Date(...b.date.split('/').reverse()));
            setItemdata(sortedData)



        }
        getData();
    }, [checkFactor])



    return (
        <>
            <div className='AddItem_main_div'>
                <div className="container">
                    <div >

                        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1vh 1vw', alignItems: 'center' }}>

                            <Link to='/' style={{ cursor: 'pointer', fontSize: ' calc(1vw + 1vh + 0.5vmin)', color: 'whitesmoke', textDecoration: 'none' }}>Back to HomePage</Link>
                        </header>
                    </div>

                </div>
                <div className='heading_recent'>  All Scheduled Appointments</div>

                <div className='Update_card_map'>
                    {Itemdata.length === 0 && changestate === -1 && <CircularProgress color="inherit" />}
                    {Itemdata && Itemdata.map((data, index) =>
                        <>

                            {index <= count &&
                                <>

                                    <CalenderView state={'true'}
                                        id={index + 1}
                                        FirstName={data.FirstName}
                                        LastName={data.LastName}
                                        date={data.date}
                                        time={data.Time}
                                        setcheckFactor={setcheckFactor}
                                        checkFactor={checkFactor} />


                                </>
                            }



                        </>
                    )}
                </div>

           
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: `${divvisibility}` }}><ArrowCircleDown style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => { setcount(count + 10); count > Itemdata.length && setdivvisibility('none'); setdivvisibility2('') }} /></div>


                <div style={{ display: `${divvisibility2}` }}><ArrowCircleUp style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => { Itemdata.length<10?setcount(Itemdata.length)&& setdivvisibility2('none'):setcount(9); setdivvisibility2('none'); setdivvisibility('') }} /></div>
            </div>
      
            </div >
        </>
    )
}

export default Calendar