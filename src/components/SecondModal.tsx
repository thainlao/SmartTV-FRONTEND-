import '../styles/secondmodal.css';
import React, { useState, useEffect } from 'react';

type SecondModalProps = {
    handleModalMouseEnter: () => void;
    handleModalMouseLeave: () => void;
};

const SecondModal: React.FC<SecondModalProps> = ({ handleModalMouseEnter, handleModalMouseLeave }) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('+7 (___) - ___ - __ - __');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
    const [activeButtonIndex, setActiveButtonIndex] = useState<number>(-1);
    
    const buttonsPerRow = 3;

    const handleButtonClick = (value: string) => {
        setPhoneNumber((prevPhoneNumber) => {
          if (prevPhoneNumber.indexOf('_') >= 0) {
            return prevPhoneNumber.replace('_', value);
          }
          return prevPhoneNumber;
        });
      };

    const handleClear = () => {
        setPhoneNumber('+7 (___) - ___ - __ - __');
    };

    const handleCheckboxChange = (event: any) => {
      if (event.key === 'Enter') {
        setIsCheckboxChecked(!isCheckboxChecked);
    } else {
        setIsCheckboxChecked(event.target.checked);
    }
    };

    const numericPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    const isConfirmButtonDisabled = !isCheckboxChecked || numericPhoneNumber.length !== 11;
    const isNumLength = numericPhoneNumber.length !== 11;

    const handleConfirm = () => {
        if (!isConfirmButtonDisabled) {
            setIsConfirmed(true);
        }
    };

    useEffect(() => {
      const handleKeyPress = (event: any) => {
          if (!isConfirmed) {
              switch (event.key) {
                  case 'ArrowLeft':
                    if (activeButtonIndex === 0 && isNumLength) {
                      setActiveButtonIndex(10)
                    }
                      else if (activeButtonIndex === 10) {
                          setActiveButtonIndex(9);
                      } else if (activeButtonIndex === 9) {
                          setActiveButtonIndex(8);
                      } else if (activeButtonIndex === 0) {
                          setActiveButtonIndex(12);
                      } else {
                          setActiveButtonIndex(activeButtonIndex - 1);
                      }
                      break;
                  case 'ArrowRight':
                    if (activeButtonIndex === 10 && isNumLength) {
                      setActiveButtonIndex(0)
                    } else
                       if (activeButtonIndex === 12) {
                          setActiveButtonIndex(0);
                      } else {
                          setActiveButtonIndex(activeButtonIndex + 1);
                      }
                      break;
                  case 'ArrowUp':
                      if (activeButtonIndex === 10) {
                        setActiveButtonIndex(8)
                      }
                      else if (activeButtonIndex === 12) {
                        setActiveButtonIndex(11)
                      } else if (activeButtonIndex === 11) {
                        setActiveButtonIndex(9)
                      }
                      else if (activeButtonIndex >= buttonsPerRow) {
                          setActiveButtonIndex(activeButtonIndex - buttonsPerRow);
                      } 
                      break;
                  case 'ArrowDown':
                      if (activeButtonIndex === 10 && isNumLength) {
                        setActiveButtonIndex(0)
                      } else if (
                        (activeButtonIndex === 9 && isNumLength)
                      ) {setActiveButtonIndex(0)}
                      else if (activeButtonIndex === 8) {
                        setActiveButtonIndex(10)
                      }
                       else if (activeButtonIndex === 6 || activeButtonIndex === 7) {
                          setActiveButtonIndex(9);
                      } else if (activeButtonIndex < 7) {
                          setActiveButtonIndex(activeButtonIndex + buttonsPerRow);
                      } else if (activeButtonIndex === 9 || activeButtonIndex === 10) {
                        setActiveButtonIndex(11);
                      } else if (activeButtonIndex === 11) {
                        setActiveButtonIndex(12)
                      }
                      break;
                  case 'Backspace':
                      handleClear()
                      break;
                  case 'Enter':
                      if (activeButtonIndex === 9) {
                        handleClear()
                      } else if (activeButtonIndex === 11) {
                        setIsCheckboxChecked(!isCheckboxChecked)
                      }
                      else if (!isConfirmButtonDisabled) {
                          setIsConfirmed(true);
                      } else if (activeButtonIndex === 10) {
                        handleButtonClick('0')
                      } else if (activeButtonIndex >= 0) {
                        handleButtonClick((activeButtonIndex + 1).toString());
                      }
                      break;

                  default:
                      if (/^\d$/.test(event.key) && activeButtonIndex >= 0) {
                          handleButtonClick(event.key);
                      }
                      break;
              }
          }
      };
  
      document.addEventListener('keydown', handleKeyPress);
  
      return () => {
          document.removeEventListener('keydown', handleKeyPress);
      };
  }, [activeButtonIndex, isConfirmed]);

    return (
        <div onMouseEnter={handleModalMouseEnter} onMouseLeave={handleModalMouseLeave} className='secondmodal'>
            {isConfirmed ? (
                <div className='secondmodal_overlay'>
                    <div className='approve_sec'>
                        <h4 className='approve'>ЗАЯВКА</h4>
                        <h4 className='approve'>ПРИНЯТА</h4>
                    </div>

                    <div className='approve_sec'>
                        <h4 className='approve_p'>Держите телефон под рукой.</h4>
                        <h4 className='approve_p'>Скоро с Вами свяжется наш мененджер</h4>
                    </div>
                </div>
            ) : (
                <div className='secondmodal_overlay'>
                <h2>Введите ваш номер мобильного телефона</h2>
                {isNumLength ? <div className="number_wrong">{phoneNumber}</div> :<div className="number">{phoneNumber}</div>}

                <p>и с Вами свяжется наш мененджер для дальнейшей консультации</p>

                <div className='number_input_section'>
                    <div className='number_input_section_part'>
                        {[1,2,3].map((number, index) => (
                            <button key={number}
                            onClick={() => handleButtonClick(number.toString())}
                            className={activeButtonIndex === index ? 'selected' : ''}>
                            {number}
                            </button>
                        ))}
                    </div>

                    <div className='number_input_section_part'>
                        {[4,5,6].map((number, index) => (
                            <button key={number}
                            onClick={() => handleButtonClick(number.toString())}
                            className={activeButtonIndex === index + 3 ? 'selected' : ''}>
                            {number}
                            </button>
                        ))}
                    </div>

                    <div className='number_input_section_part'>
                        {[7,8,9].map((number, index) => (
                            <button key={number}
                            onClick={() => handleButtonClick(number.toString())}
                            className={activeButtonIndex === index + 6 ? 'selected' : ''}>
                            {number}
                            </button>
                        ))}
                    </div>

                    <div className="number_input_section_last">
                        <button className={`clear ${activeButtonIndex === 9 ? 'selected' : ''}`} onClick={handleClear}>
                            СТЕРЕТЬ
                        </button>
                        <button
                            onClick={() => handleButtonClick('0')}
                            className={`button_0 ${activeButtonIndex === 10 ? 'selected' : ''}`}
                        >
                            0
                        </button>
                    </div>

                </div>

                {isNumLength ? 
                <p className='wrong'>НЕВЕРНО ВВЕДЁН НОМЕР</p>
                :
                <div className='number_input_checkbox'>
                    <input 
                    className={`${activeButtonIndex === 11 ? 'checkedinput selected' : 'checkedinput'}`} 
                    type='checkbox' 
                    onChange={handleCheckboxChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        setIsCheckboxChecked(!isCheckboxChecked)
                      }
                    }}
                    checked={isCheckboxChecked}
                    tabIndex={activeButtonIndex === 11 ? 0 : -1}
                    />
                    <span>Согласие на обработку персональных данных</span>
                </div>
                }

                <div className={`${activeButtonIndex === 12 ? 'selected_but' : ''}`}>
                  <button className={isConfirmButtonDisabled 
                      ? 'confirm_but_enable' : 'confirm_but'} 
                      disabled={isConfirmButtonDisabled} 
                      onClick={handleConfirm}>
                      ПОДТВЕРДИТЬ НОМЕР
                  </button>
                </div>

                </div>
            )}
        </div>
    );
};

export default SecondModal;