import React, { useEffect, useState } from "react";
import MercadoPago from '../MercadoPago/MercadoPago';
import MetaMask from '../MetaMask/MetaMask';
import Stripe from '../Stripe/Stripe';
import './payments.css';


// function Payments() {
//     // const pointer = document.querySelector('#icon');
//     // const boxCard = document.querySelector('#card')
//     // console.log(boxCard.className)
//     // console.log(boxCard.classList)
    
//     //     const calculatePositionBoxesCards = function (e) {
//     //         const ejeX = pointer.offsetLeft; // offsetLeft toma posición del elemento en pixeles respecto a la izquierda
//     //         const ejeY = pointer.offsetTop; // offsetTop toma posición del elemento en pixeles desde arriba
            
//     //         let widthCard = boxCard.clientWidth; // Toma su valor de ancho
//     //         let heightCard = boxCard.clientHeight; // Toma su valor de altura
        
//     //         // Cuenta matemática para ubicarlo
//     //         const positionLeft = (ejeX + 5); // En caso de que querer ubicarlo en otra parte, usar widthCard en lugar de number
//     //         const positionTop =  ejeY - (heightCard + 7);
        
//     //         // Edito el posicionamiento de CSS con JS
//     //         boxCard.style.left = `${positionLeft}px`;
//     //         boxCard.style.top = `${positionTop}px`;
    
        
//     //     pointer.addEventListener('click', () => {
//     //         if (boxCard.className.includes("active")) {
//     //                 boxCard.classList.remove('active'); // Se remueve la clase active y desaparece la card
//     //         } else {
//     //                 boxCard.classList.add('active'); // Se agrega la clase active y muestra la card
//     //         }
//     //     })
//     // };
//     return (
//         <div>
//             <button id="buy" >Comprar</button>
//             <div>
//             <Stripe/> <MercadoPago/> <MetaMask/>
//             </div>
//         </div>
//     )
// }


// import React, { useState } from 'react';

function Payments ()  {
  const [paymentOption, setPaymentOption] = useState(true);

  return (
    <div>
      <button className="payments" type="button" onClick={() => setPaymentOption(!paymentOption)} >
        {paymentOption ? 'Comprar' : 'Comprar'}
      </button>

      {paymentOption ? (
        <div >
        </div>
      ) : (
        
          
        <div className="paymentOption">
            <Stripe/>
            <MercadoPago/>  
            <MetaMask/>       
        </div>
      )}
    </div>
  );
};

export default Payments;