import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// Delivery options shared with the Budget Tracker
export const DELIVERY_OPTIONS = [
  { id: "pickup", label: "Store pickup — Free", rate: 0 },
  { id: "colombo", label: "Inside Colombo — Rs. 100/km", rate: 100 },
  { id: "outside", label: "Outside Colombo — Rs. 200/km", rate: 200 },
];

const BUDGET_KEY = "mjmart-budget";
const loadBudget = () => {
  try {
    return JSON.parse(localStorage.getItem(BUDGET_KEY)) || {};
  } catch {
    return {};
  }
};


export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate(); 
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(true)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])

    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})

    const [budgetSettings, setBudgetSettings] = useState(() => ({
    budget: 5000,
    unlimited: false,
    deliveryId: "outside",
    distance: 1,
    includeDelivery: true,
    ...loadBudget(),
}))

useEffect(() => {
    try {
        localStorage.setItem(BUDGET_KEY, JSON.stringify(budgetSettings))
    } catch {}
}, [budgetSettings])

    // Fetch Seller Status
    const fetchSeller = async ()=>{
        try {
            const {data} = await axios.get('/api/seller/is-auth')
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

      // Fetch All Products
    const fetchProducts = async ()=>{
        setProducts(dummyProducts)
    }

    //Add Product to Cart

    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;

        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    //Update Cart Items Quantity
    const updateCartItem = (itemId, Quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = Quantity
        setCartItems(cartData)
        toast.success("Cart Updated")

    }

    //Remove Products from Cart
    const removeFromCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0 ) {
                delete cartData[itemId];
                
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData)

    }

    // Get Cart Item Count
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
    return totalCount;
    }

    // Get Cart Total Amount

    const getCartAmount = ()=>{
        let totalAmount = 0;
        for (const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            if(cartItems[items] > 0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100 ) / 100;
    }


    useEffect(()=>{
        fetchSeller()
        fetchProducts()

    },[])


    const value = { navigate, user, setUser, setIsSeller, isSeller,
        showUserLogin, setShowUserLogin , products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios
    }

     return <AppContext.Provider value={value}>{children}</AppContext.Provider>

    

    
}

export const useAppContext = () => {
    return useContext(AppContext);



}


