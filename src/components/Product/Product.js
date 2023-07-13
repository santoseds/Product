import React, { useReducer} from 'react';

const produtos = [
  {
    emoji: '🍦',
    name: 'ice cream',
    price: 5
  },
  {
    emoji: '🍩',
    name: 'donuts',
    price: 2.5,
  },
  {
    emoji: '🍉',
    name: 'watermelon',
    price: 4
  }
];


const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}

function getTotal(cart) {
  const estado = [...cart];
  const total = estado.reduce((totalCost, item) => totalCost + item.price, 0);
  return total.toLocaleString(undefined, currencyOptions);
}

function cartReducer(cart, action){
  switch(action.type){
    case 'add':
      return [...cart, action.produto];
    case 'remove':
      const produtoIndex = cart.findIndex(item => item.name === action.produto.name);
      if(produtoIndex < 0) {
        return cart;
      }
      const update = [...cart];
      update.splice(produtoIndex, 1);
      return update;
    default:
      return cart;        
  } 
}

export default function Product() {

  const [cart, setCart] = useReducer(cartReducer, []);

  function add(produto){
    setCart({produto, type: 'add' });
  }  
 
  function remove(produto){
    setCart({produto, type:'remove'});
  }

  return(
    <div className="wrapper">
      <div>
        Shopping Cart: {cart.length} total items.
      </div>
      <div>Total: {getTotal(cart)}</div>
      <div>
      {produtos.map((produto)=> (
        <div key ={produto.name}>
      <div className="product"><span role="img" aria-label={produto.name}>{produto.emoji}</span></div>
      <button onClick={()=>add(produto)}>Add</button> <button onClick={()=>remove(produto)}>Remove</button>
      </div>))}</div></div>
  )
}