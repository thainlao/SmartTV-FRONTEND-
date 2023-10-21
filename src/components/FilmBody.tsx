import video from '../assets/trailer1.mp4';
import '../styles/filmbody.css';
import FirstModal from './FirstModal';
import SecondModal from './SecondModal';
import { useState, useEffect, useRef } from 'react';
import qr from '../assets/qr.png';

const FilmBody = () => {
    const [showFirstModal, setShowFirstModal] = useState<boolean>(false);
    const [showSecondModal, setShowSecondModal] = useState<boolean>(false);
    const [isMouseOnModal, setIsMouseOnModal] = useState<boolean>(false);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const activityTimeoutRef = useRef<any>(null);

    const closeModalsAfterTimeout = () => {
        setShowFirstModal(false);
        setShowSecondModal(false);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowFirstModal(!showSecondModal);
        }, 5000);

        activityTimeoutRef.current = setTimeout(closeModalsAfterTimeout, 10000);

        return () => {
            clearTimeout(timeout);
            clearTimeout(activityTimeoutRef.current);
        };
    }, [showFirstModal, showSecondModal]);


    const handleFirstModalClose = () => {
        if (!showSecondModal) {
            setShowFirstModal(false);
            setShowSecondModal(true);
        }
    };

    const handleAllModalClose = () => {
        setShowFirstModal(false);
        setShowSecondModal(false);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handleModalMouseEnter = () => {
        setIsMouseOnModal(true);
        if (videoRef.current) {
          videoRef.current.pause();
        }
    };

    const handleModalMouseLeave = () => {
        setIsMouseOnModal(false);
        if (videoRef.current) {
          videoRef.current.play();
        }
    };

    const resetActivityTimeout = () => {
        clearTimeout(activityTimeoutRef.current);
        activityTimeoutRef.current = setTimeout(closeModalsAfterTimeout, 999999999);
    };

    const handleVideoMouseEnter = () => {
        if (!isMouseOnModal && videoRef.current) {
            videoRef.current.play();
            resetActivityTimeout();
        }
    };

    useEffect(() => {
        const handleKeyPress = () => {
            resetActivityTimeout();
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className='filmbody' onMouseMove={resetActivityTimeout}>
            <video
                width="100%"
                height="100%"
                autoPlay
                muted
                playsInline
                loop
                controls={false}
                ref={videoRef}
                onMouseEnter={handleVideoMouseEnter}
            >
                <source src={video} type="video/mp4" />
            </video>

            <div
            >
                {showFirstModal && 
                <FirstModal 
                    showFirstModal={showFirstModal}
                    onClose={handleFirstModalClose}
                    handleModalMouseEnter={handleModalMouseEnter}
                    handleModalMouseLeave={handleModalMouseLeave} 
                />}
            </div>

            <div
            >
                {showSecondModal && 
                <SecondModal 
                    handleModalMouseEnter={handleModalMouseEnter} 
                    handleModalMouseLeave={handleModalMouseLeave}
                />}
            </div>

            {showSecondModal && <button onClick={handleAllModalClose} className='close_button'></button>}
            {showSecondModal && 
            <div className='qr_section'>
                <p>СКАНИРУЙТЕ QR-КОД ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</p>
                <img src={qr} alt='qr' />
            </div>
            }
        </div>
    )
}

export default FilmBody