import React, {useEffect, useState} from 'react';
import '../css/intro.css';

const Home = () => {
    
    useEffect(() => {
        console.log(process.env.REACT_APP_URL_API);
        return () => {
            console.log("Intro");
        }
    }, [])

    return (
        <div className="intro-container">
            <div className="intro-wrapper">
                <div className="intro-title animate__animated animate__delay-1s animate__fadeIn">
                    <div>Chào bạn, Rất vui vì bạn đã có mặt ở đây</div>
                </div>
                <div className="intro-body">
                    <div className="intro-wrapper-left">
                        <div className="intro-content animate__animated animate__delay-1s animate__zoomIn">
                            
                            <div>
                                content 1
                            </div>
                            <div>
                                content 2
                            </div>
                            <div>
                                content 3
                            </div>
                            <div>
                                content 4
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>    
        </div>
    )
}

export default Home;
