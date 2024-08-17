import axios from 'axios';
import '../Styles/Cards.css';

const Cards = ({ item, handleClick }) => {
  const { item_id,title, price, img } = item;

  const handleAddToCart = async () => {
    try {
      await axios.post('http://localhost:5000/api/cart', {
        item_id:item.item_id,
        title: item.title,
        price: item.price,
        img: item.img,
        amount: 1, // Default amount to 1 when adding to cart
      });
      handleClick(item); 
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className="cards">
      <div className="image_box">
        <img src={img} alt="Image" />
      </div>
      <div className="details">
        <p>{title}</p>
        <p>Price - {price}Rs</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Cards;