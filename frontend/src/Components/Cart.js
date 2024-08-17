// import React, { useState, useEffect } from 'react';
// import "../Styles/Cart.css";

// const Cart = ({ cart, setCart }) => {
//     const [price, setPrice] = useState(0);

//     const handlePrice = () => {
//         let total = cart.reduce((acc, item) => acc + item.amount * item.price, 0);
//         setPrice(total);
//     };

    
    
//     const handleRemove = async (item_id) => {
//         try {
//             await fetch(`http://localhost:5000/api/cart/${item_id}`, {
//                 method: 'DELETE',
//             });

//             const updatedCart = cart.filter((item) => item.id !== item_id);
//             setCart(updatedCart);

//             handlePrice();
//         } catch (error) {
//             console.error('Failed to remove item:', error);
//         }
//     };

//     useEffect(() => {
//         handlePrice();
//     }, [cart]);

//     const handleChange = async (item, change) => {
//         const newAmount = item.amount + change;
        
//         // Ensure the new amount is valid
//         if (newAmount < 0) return; // Prevent negative quantities
    
//         try {
//             // Update the item amount in the database
//             await fetch(`http://localhost:5000/api/cart/${item.id}`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ amount: newAmount }),
//             });
    
//             // Update the cart state with the new amount
//             const updatedCart = cart.map(cartItem =>
//                 cartItem.id === item.id
//                     ? { ...cartItem, amount: newAmount }
//                     : cartItem
//             );
//             setCart(updatedCart);
    
//             handlePrice();
//         } catch (error) {
//             console.error('Failed to update item:', error);
//         }
//     };
    


//     return (
//         <article>
//             {cart?.map((item) => (
//                 <div className="cart_box" key={item.id}>
//                     <div className="cart_img">
//                         <img src={item.img} alt={item.title} />
//                         <p>{item.title}</p>
//                     </div>
//                     <div>
//                         <button className='button2' onClick={() => handleChange(item, -1)}> -</button>
//                         <button className='button3' >{item.amount}</button>
//                         <button className='button2' onClick={() => handleChange(item, +1)}> + </button>
//                     </div>
//                     <div>
//                         <span className='price1'>{item.price}</span>
//                         <button className='button4' onClick={() => handleRemove(item.item_id)}>Remove</button>
//                     </div>
//                 </div>
//             ))}
//             <div className='total'>
//                 <span>Total Price of your Cart</span>
//                 <span className='price2'>Rs-{price}</span>
//             </div>
//         </article>
//     );
// };

// export default Cart;

import React, { useState, useEffect } from 'react';
import "../Styles/Cart.css";

const Cart = ({ cart, setCart }) => {
    const [price, setPrice] = useState(0);

    const handlePrice = () => {
        let total = cart.reduce((acc, item) => acc + item.amount * item.price, 0);
        setPrice(total);

        // let ans = 0;
        // cart.map((item)=>(
        //     ans += item.amount * item.price
        // ))
        // setPrice(ans);
    };

    const handleRemove = async (item_id) => {
        try {
            await fetch(`http://localhost:5000/api/cart/${item_id}`, {
                method: 'DELETE',
            });

            // const updatedCart = cart.filter((item) => item.id !== item_id);
            // setCart(updatedCart);

            const arr = cart.filter((item)=>item.id !== item_id);
            setCart(arr);

            handlePrice();
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    useEffect(() => {
        handlePrice();
    }, [cart]);

    const handleChange = async (item, change) => {
        const newAmount = item.amount + change;
       // item.amount=1;
        
        if (newAmount < 0 ) return; // Prevent negative quantities
    
        try {
            await fetch(`http://localhost:5000/api/cart/${item.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: newAmount }),
            });
    
            const updatedCart = cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, amount: newAmount }
                    : cartItem
            );
            setCart(updatedCart);
    
            handlePrice();
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };
    

    return (
        <article>
            {cart?.map((item) => (
                <div className="cart_box" key={item.id}>
                    <div className="cart_img">
                        <img src={item.img} alt={item.title} />
                        <p>{item.title}</p>
                    </div>
                    <div>
                        <button className='button2' onClick={() => handleChange(item, -1)}> -</button>
                        <button>{item.amount}</button>
                        <button className='button2' onClick={() => handleChange(item, +1)}> + </button>
                    </div>
                    <div>
                        <span className='price1'>{item.price}</span>
                        <button className='button4' onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                </div>
            ))}
            <div className='total'>
                <span>Total Price of your Cart</span>
                <span className='price2'>Rs-{price}</span>
            </div>
        </article>
    );
};

export default Cart;
