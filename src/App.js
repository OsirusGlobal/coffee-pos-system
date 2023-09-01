import React, { useState } from 'react';
import './App.css'; // Import your CSS file for styling

function App() {
  // Define the initial state for the cart
  const [cart, setCart] = useState([]);
  // Define state to keep track of the currently selected coffee item
  const [selectedCoffeeItem, setSelectedCoffeeItem] = useState(null);

  // Define the menu items with updated coffee option names and variants
  const menu = [
    { id: 1, category: 'Coffee', name: 'Espresso', variants: [
        { name: 'Single', price: 2.5 },
        { name: 'Double', price: 3.0 }
      ] },
    { id: 2, category: 'Coffee', name: 'Latte', variants: [
        { name: 'Small', price: 3.4 },
        { name: 'Large', price: 3.8 },
        { name: 'Takeout', price: 2.8 }
      ] },
    { id: 3, category: 'Coffee', name: 'Cortado', variants: [
        { name: 'In', price: 2.7 },
        { name: 'Takeout', price: 2.3 }
      ] },
    { id: 4, category: 'Coffee', name: 'Flat White', variants: [
        { name: 'In', price: 2.7 },
        { name: 'Out', price: 2.3 }
      ] },
    { id: 5, category: 'Coffee', name: 'Tea', variants: [
        { name: 'In', price: 2.5 },
        { name: 'Out', price: 2.0 }
      ] },
    { id: 6, category: 'Coffee', name: 'Flavoured Tea', variants: [
        { name: 'In', price: 3.0 },
        { name: 'Takeout', price: 2.7 }
      ] },
    // ... (other coffee items)
    { id: 7, category: 'Soft Drinks', name: 'Coca-Cola', price: 1.5 },
    { id: 8, category: 'Soft Drinks', name: 'Pepsi', price: 1.5 },
    // ... (other soft drink items)
  ];

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Function to remove items from the cart
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  // Function to handle the payment and reset the cart
  const handlePayment = () => {
    // Implement your payment logic here (e.g., connect to a payment gateway).
    // After a successful payment, reset the cart.
    setCart([]);
  };

  // Function to handle clicking on a coffee item
  const handleCoffeeItemClick = (coffeeItem) => {
    setSelectedCoffeeItem(coffeeItem);
  };

  // Function to handle the selection of coffee variants
  const handleCoffeeVariant = (variant) => {
    if (selectedCoffeeItem) {
      const selectedVariant = selectedCoffeeItem.variants.find(v => v.name === variant);
      if (selectedVariant) {
        // Add the selected item with its price to the cart
        addToCart({ ...selectedCoffeeItem, price: selectedVariant.price });
        // Reset the selected coffee item
        setSelectedCoffeeItem(null);
      }
    }
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>thegarage</h1>
      <div className="menu">
        <h2>Coffee</h2>
        <ul>
          {menu
            .filter(item => item.category === 'Coffee')
            .map(item => (
              <li key={item.id}>
                <div
                  className={`coffee-item ${selectedCoffeeItem && selectedCoffeeItem.id === item.id ? 'active' : ''}`}
                  onClick={() => handleCoffeeItemClick(item)}
                >
                  <div className="coffee-title">{item.name}</div>
                </div>
                {item.variants && selectedCoffeeItem && selectedCoffeeItem.id === item.id && (
                  <div className="coffee-options">
                    {item.variants.map(variant => (
                      <button
                        key={variant.name}
                        onClick={() => handleCoffeeVariant(variant.name)}
                      >
                        {variant.name} - ${variant.price}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
        </ul>
        <h2>Soft Drinks</h2>
        {/* ... (other soft drink items) */}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="total">
          <strong>Total: ${calculateTotal()}</strong>
        </div>
        <button onClick={handlePayment}>Pay</button>
      </div>
    </div>
  );
}

export default App;