import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Amazon from './Components/Amazon';
import Cart from './Components/Cart';
import axios from 'axios';
import './App.css';


const App = () => {
    const [show, setShow] = useState(true);
    const [cart, setCart] = useState([]);
    const [warning, setWarning] = useState(false);
    const [dataList, setDataList] = useState([]);

    //run once when the initialized and inserted in the DOM(components mount)
    useEffect(() => { 
        // Fetch data from the server
        axios.get('http://localhost:5000/api/items')
            .then(response => setDataList(response.data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleClick = (item) => {
        let isPresent = false;
        cart.forEach((product) => {
            if (item.id === product.id)
                isPresent = true;
        })
        if (isPresent) {
            setWarning(true);
            setTimeout(() => {
                setWarning(false);
            }, 2000);
            return;
        }
        setCart([...cart, item]);
    }
    //adjust the quantity of an item in the cart
    const handleChange = (item, d) => {
		const ind = cart.findIndex(data => data.id === item.id);
		if (ind !== -1) {
			const tempArr = [...cart];
			tempArr[ind].amount = (tempArr[ind].amount || 0) + d;
			if (tempArr[ind].amount <= 1) {
				tempArr[ind].amount = 1;
			}
			setCart([...tempArr]);
		}
	};

    return (
        <React.Fragment>
            <Navbar size={cart.length} setShow={setShow} />
            {
                show ? <Amazon handleClick={handleClick} dataList={dataList} /> : <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
            }
            {
                warning && <div className='warning'>Item is already added to your cart</div>
            }
        </React.Fragment>
    )
}

export default App;
