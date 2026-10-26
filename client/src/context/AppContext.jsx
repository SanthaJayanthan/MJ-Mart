import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

// baseURL and withCredentials are set in main.jsx

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
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])

    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState("")

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

    // Fetch User Auth Status , User Data and Cart Items
    const fetchUser = async ()=>{
        try {
            const { data } = await axios.get('/api/user/is-auth');
            if (data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }
        } catch (error) {
            setUser(null)
        }
    }

    // Fetch All Products
    const fetchProducts = async ()=>{
        try {
            const { data } = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
           toast.error(error.message) 
        }
    }

    // Total (items + delivery if included) for a given cart, same maths as the tracker
    const getBudgetTotal = (cartData) => {
        let spent = 0;
        for (const id in cartData) {
            const p = products.find((item) => item._id === id);
            if (p && cartData[id] > 0) spent += p.offerPrice * cartData[id];
        }
        const { deliveryId, distance, includeDelivery } = budgetSettings;
        const rate = DELIVERY_OPTIONS.find((o) => o.id === deliveryId)?.rate ?? 0;
        const fee = rate * Math.max(Number(distance) || 0, 0);
        return includeDelivery && spent > 0 ? spent + fee : spent;
    }

    // Returns true (and shows an error) if this cart would pass the budget
    const exceedsBudget = (cartData) => {
        if (!user || budgetSettings.unlimited) return false;
        const total = getBudgetTotal(cartData);
        if (total > budgetSettings.budget) {
            toast.error(
                `You are over your budget limit! This would bring you to ${currency}${total.toLocaleString()}, but your budget is ${currency}${Number(budgetSettings.budget).toLocaleString()}.`
            )
            return true;
        }
        return false;
    }

    // Add Product to Cart
    const addToCart = (itemId)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        if (exceedsBudget(cartData)) return;

        setCartItems(cartData);
        toast.success("Added to Cart")
    }

    // Update Cart Items Quantity
    const updateCartItem = (itemId, Quantity)=>{
        let cartData = structuredClone(cartItems);
        const increasing = Quantity > (cartData[itemId] || 0);
        cartData[itemId] = Quantity

        if (increasing && exceedsBudget(cartData)) return;

        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    // Remove Products from Cart
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
            if(itemInfo && cartItems[items] > 0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100 ) / 100;
    }

    useEffect(()=>{
        fetchUser()
        fetchSeller()
        fetchProducts()
    },[])

    // Update Database Cart Items
    useEffect(()=>{
        const updateCart = async ()=>{
            try {
                const { data } = await axios.post('/api/cart/update', {cartItems})
                if (!data.success){
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }

        if(user){
            updateCart()
        }

    },[cartItems])

    const value = { navigate, user, setUser, setIsSeller, isSeller,
        showUserLogin, setShowUserLogin, products, currency, addToCart,
        updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery,
        getCartAmount, getCartCount, axios, fetchProducts, setCartItems,
        budgetSettings, setBudgetSettings
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext);
}