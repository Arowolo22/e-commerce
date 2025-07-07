// import React, {useState,useEffect} from "react"
// import axios from "axios"
// import {useCart} from "../CartContext"

// const Cart =  ()=>{
//     const {cartItems, setCartItems} = useState([]);
//     const {total,setTotal} = useState(0);
//     const {loading, setLoading} = useState(true);
//     const {fetchCartCount} =useCart();

//     const fetchCart = async ()=>{
//         setLoading(true)
//         try{
//             const res = await axios.get("http://localhost:5000/api/cart")
//             setCartItems(res.data.cartItems)
//             setTotal(res.data.total)
//             await fetchCartCount();
//         } catch (err){
//             console.error("Cart not Found", err)
//         }finally {
//             setLoading(false)
            
//         }
       
//     }
//     useEffect(()=>{
//         fetchCart()
    
//     })

//     const updateQuantity = async (id,quantity,selectedSize)=>{
//         if(quantity < 1) return;
//         try{
//             await axios.put(`http://localhost:5000/api/cart ${id}`,{
//                 selectedSize,
//                 quantity,
//             })
//             fetchCart()
//             await fetchCartCount()
//         } catch (err){
//             console.error('Failed to update cart items', err)
//         }
//     }

//     const deleteItems = async (id) =>{
//         try{
//             await axios.delete(`http://localhost:5000/api/cart/delete ${id}`)
//             fetchCart()
//             await fetchCartCount()
//         } catch(err){
//             console.error('Cart deleted successfully', err)
//         }
//     };

//     const clearItems = async ()=>{
//         try{
//             await axios.post('http://localhost:5000/api/cart/clear')
//             fetchCart()
//             await fetchCartCount()
//         } catch (err){
//             console.error('Cart has been cleared', err)
//         }
//     }
//     if(loading) return
//     <div className="p-8 text-center">Loading..</div>

//     return(

//     )
// }