import React, { useState } from 'react'
import ArrowCircleDown from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUp from '@mui/icons-material/ArrowCircleUp';
import { Link, NavLink } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Updatecard from './UpdateCard';
import './main.css'
import { useEffect } from 'react';

import { getAllClients } from '../service/Api';
import { useSpring, animated, config } from 'react-spring';


const HomePage = ({notify}) => {

    const [Itemdata, setItemdata] = useState([]);
    const [count, setcount] = useState(10);
    const [checkFactor, setcheckFactor] = useState(0);
    const [divvisibility, setdivvisibility] = useState('');
    const [divvisibility2, setdivvisibility2] = useState('none');
    const [changestate, setchangestate] = useState(-1);
    useEffect(() => {
        const getData = async () => {
            const res = await getAllClients();
            setItemdata(res);
            
        }
        getData();
    }, [checkFactor])



    return (
        <>
            <div className='AddItem_main_div'>
                <div className="container">
                    <div >

                        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1vh 1vw', alignItems: 'center' }}>
                            <div style={{ fontSize: ' calc(2vw + 2vh + 1vmin)', fontWeight: 'bold' }}>FitTrac</div>
                            <Link to='/Calendar' style={{ fontSize: ' calc(1vw + 1vh + 0.5vmin)', color: 'whitesmoke', textDecoration: 'none' }}>Your Calendar</Link>
                        </header>
                    </div>

                    <main>
                        <section className="hero-section">
                            <div className="hero-content">
                                <h2>Your Fitness. Our Priority.</h2>
                                <p>Effortlessly manage your training sessions and appointments.</p>
                            </div>
                        </section>
                        <section className="about-section">
                            <h2>All clients</h2>
                            <div className="appointment-list">

                                <div className='Update_card_map'>
                                    {Itemdata && Itemdata.length === 0 && changestate === -1 && <CircularProgress color="inherit" />}
                                    {Itemdata && Itemdata.map((data, index) =>
                                        <>

                                            {index <= count &&
                                                <>

                                                    <Updatecard state={'true'}
                                                        id={index+1}
                                                        FirstName={data.FirstName}
                                                        LastName={data.LastName}
                                                        Location={data.Location}
                                                        Appointments={data.Appointments}
                                                        setcheckFactor={setcheckFactor}
                                                        checkFactor={checkFactor}
                                                        notify={notify} />
                                                    {/* <div className='line_update' ></div> */}

                                                </>
                                            }



                                        </>
                                    )}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ display: `${divvisibility}` }}><ArrowCircleDown style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => { setcount(count + 10); count > Itemdata.length && setdivvisibility('none'); setdivvisibility2('') }} /></div>


                                    <div style={{ display: `${divvisibility2}` }}><ArrowCircleUp style={{ fontSize: '50px', cursor: 'pointer' }} onClick={() => { setcount(9); setdivvisibility2('none'); setdivvisibility('') }} /></div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <footer>
                        <p>&copy; 2023 FitTrac</p>
                    </footer>
                </div>

                {/* 
                    <div className='fitness_image1'></div>
                    <div className='fitness_image2'></div>
                */}



            </div>
        </>
    )
}

export default HomePage