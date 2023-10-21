import '../styles/firstmodal.css';
import qr from '../assets/qr.png';

type SecondModalProps = {
    handleModalMouseEnter: () => void;
    handleModalMouseLeave: () => void;
    onClose: () => void;
    showFirstModal: boolean;
};

const FirstModal: React.FC<SecondModalProps> = ({ showFirstModal, onClose, handleModalMouseEnter, handleModalMouseLeave }) => {
    return (
        <div onMouseEnter={handleModalMouseEnter} onMouseLeave={handleModalMouseLeave} className="firstmodal">
            <div className={`firstmodal_overlay ${showFirstModal ? 'fade-in' : 'fade-out'}`}>
                <div className='firstmodal_text'>
                    <h2>Первое правило Бойцовского клуба</h2>
                    <h2>Никому не рассказывать о Бойцовском клубе.</h2>
                </div>

                <img src={qr} />

                <div>
                    <p>Сканируйте QR-код</p>
                    <p>или нажмите ОК</p>
                </div>

                <button onClick={onClose}>ОК</button>
            </div>
        </div>
    )
}

export default FirstModal