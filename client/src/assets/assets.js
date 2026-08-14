import Navbar from "../components/Navbar";
import MJ_Mart_logo_horizontal from "./MJ_Mart_logo_horizontal.jpg";
import cart_icon from "./cart_icon.svg"
import search_icon from "./search_icon.svg"
import menu_icon from "./menu_icon.svg"
import profile_icon from "./profile_icon.svg"
import MainBanner from "./MJ_Mart_logo_1.jpg"
import MJ_Mart_small_banner from "./MJ_Mart_small_banner.jpg"
import MJ_Banner_2 from "./MJ_Banner_2.jpg"
import Arrow_icon from "./Arrow_icon.svg"
import main_banner3 from "./main_banner3.png"
import MJ_vertical_banner from "./MJ_vertical_banner.png"
import organic_veggies_categories from "./organic_veggies_categories.png"
import Fresh_fruits_category from "./Fresh_fruits_category.png"
import cold_drinks_category from "./cold_drinks_category.png"
import Bakery_Bread_category from "./Bakery_Bread_category.png"
import Instant_food_category from "./Instant_food_category.png"
import Dairy_products_category from "./Dairy_products_category.png"
import Grains_ceriels_category from "./Grains_ceriels_category.png"
import potato_image1 from "./potato_image1.jpg"
import potato_image2 from "./potato_image2.jpg"
import potato_image3jpg from "./potato_image3jpg.jpg"
import potato_image4 from  "./potato_image4.jpg"
import star_icon1 from "./star_icon1.svg"
import Star_icon2 from "./Star_icon2.svg"
import star_dull_icon from "./star_dull_icon.svg"
import Tomato_image from "./Tomato_image.jpeg"
import carrot_image from "./carrot_image.jpg"
import spinach_image from "./spinach_image.jpg"
import onion_image from "./onion_image.jpg"
import bottom_banner_horizontal from "./bottom_banner_horizontal.png"
import bottom_banner_vertical from "./bottom_banner_vertical.png"
import leaf_icon from "./leaf_icon.png"
import delivery_truck_icon from "./delivery_truck_icon.png"
import coin_icon from "./coin_icon.png"
import blue_heart_icon from"./blue_heart_icon.png"
import bottom_banner_vertical2 from "./bottom_banner_vertical2.png"
import heart_icon2 from "./heart_icon2.jpg"
import delivery_truck_icon2 from "./delivery_truck_icon2.jpg"
import coin_icon2 from "./coin_icon2.jpg"
import leaf_icon2 from "./leaf_icon2.jpg"
import refresh_icon from "./refresh_icon.png"
import remove_icon from "./remove_icon.png"




export const assets = {

    MJ_Mart_logo_horizontal,
    cart_icon,
    search_icon,
    menu_icon,
    profile_icon,
    MainBanner,
    MJ_Mart_small_banner,
    MJ_Banner_2,
    Arrow_icon,
    main_banner3,
    MJ_vertical_banner,
    organic_veggies_categories,
    Fresh_fruits_category,
    cold_drinks_category,
    Bakery_Bread_category,
    Instant_food_category,
    Dairy_products_category,
    Grains_ceriels_category,
    potato_image1,
    potato_image2,
    potato_image3jpg,
    potato_image4,
    star_icon1,
    Star_icon2,
    star_dull_icon,
    Tomato_image,
    carrot_image,
    spinach_image,
    onion_image,
    bottom_banner_horizontal,
    bottom_banner_vertical,
    leaf_icon,
    delivery_truck_icon,
    coin_icon,
    blue_heart_icon,
    bottom_banner_vertical2,
    heart_icon2,
    delivery_truck_icon2,
    coin_icon2,
    leaf_icon2,
    refresh_icon,
    remove_icon,

    




};

export const categories = [
    {
        text: "Organic Veggies",
        path: "Vegetables",
        Image : organic_veggies_categories,
        bgcolor : "#FEF6DA",

    },

    {
        text: "Fresh Fruits",
        path: "Fruits",
        Image: Fresh_fruits_category,
        bgcolor: "#FEE0E0",
    },

    {
        text: "Drinks",
        path: "Drinks",
        Image: cold_drinks_category,
        bgcolor: "#b4d2fa",
    },

    {
        text: "Instant Food",
        path: "InstantFood",
        Image: Instant_food_category,
        bgcolor: "#e8e9ce",
    },

     {
        text: "Dairy Products",
        path: "DairyProducts",
        Image: Dairy_products_category,
        bgcolor: "#b4f6cd",
    },

     {
        text: "Bakery & Bread",
        path: "Bakery&Bread",
        Image: Bakery_Bread_category,
        bgcolor: "#f0d4d4",
    },

     {
        text: "Grains & Cereals",
        path: "Grains&Cereals",
        Image: Grains_ceriels_category,
        bgcolor: "#f2f3c9",
    },



];

export const dummyProducts = [
    //Vegetables
    {
        _id: "gd46g23h",
        name: "Potato 500g",
        category: "Vegetables",
        price:  205,
        offerPrice: 195,
        image:[potato_image1, potato_image2 , potato_image3jpg , potato_image4],
        description: [
            "Fresh and Organic",
            "Rich in Carbohydrates",
            "Ideal for Curries and Fries",

        ],
        createdAt: "2026-06-25T07:17:46.018Z",
        updatedAt: "2026-06-25T07:18:13.103Z",
        inStock: true,
        
    },

    {
        _id: "gd47g34h",
        name: "Tomato 1 kg",
        category: "Vegetables",
        price: 250,
        offerPrice: 230,
        image:[Tomato_image],
        description: [
            "Juicy and Ripe",
            "Rich in Vitamin C",
        ],
        createdAt:"2026-06-26T07:18:20.020Z",
        updatedAt:"2026-06-26T07:18:40.025Z",
        inStock: true,
    },

    {
        _id: "gd7g40h",
        name: "Carrot 1 kg",
        category: "Vegetables",
        price: 500,
        offerPrice: 480,
        image:[carrot_image],
        description: [
            "Fresh and Organic",
            "Rich in Vitamin A",
        ],
        createdAt:"2026-06-26T07:18:20.020Z",
        updatedAt:"2026-06-26T07:18:40.025Z",
        inStock: true,
    },

    {
           _id: "gd7g48h",
        name: "Spinach 500g",
        category: "Vegetables",
        price: 450,
        offerPrice: 430,
        image:[spinach_image],
        description: [
            "Fresh and Organic",
            "Rich in Vitamins A, C, and K1",
        ],
        createdAt:"2026-06-26T07:18:20.020Z",
        updatedAt:"2026-06-26T07:18:40.025Z",
        inStock: true,
    },

    {
            _id: "gd7g41h",
        name: "Onions 500g",
        category: "Vegetables",
        price: 300,
        offerPrice: 260,
        image:[onion_image],
        description: [
            "Fresh and Organic",
            "Rich in Vitamin C, Vitamin B6, and Potassium",
        ],
        createdAt:"2026-06-26T07:18:20.020Z",
        updatedAt:"2026-06-26T07:18:40.025Z",
        inStock: true,
    },
];

export const features = [
    {
        icon: delivery_truck_icon2,
        title: "Fastest Delivery",
        description: "Groceries delivered in under 30 minutes.",

    },

    {
        icon: leaf_icon2,
        title: "Freshness Guaranteed",
        description: "Fresh produce straight from the source.",

    },

    {
        icon: coin_icon2,
        title: "Affordable Prices",
        description: "Quality groceries at unbeatable prices.",

    },

    {
        icon: heart_icon2,
        title: "Trusted by Thousands",
        description: "Loved by 10,000+ happy customers.",
  
    },
];

export const footerLinks = [
    {
        title: "Quick Links",
        links:[
            { text: "Home", url: "#"},
            { text: "Best Sellers", url: "#"},
            { text: "Offers & Deals", url: "#"},
            { text: "Contact Us", url: "#"},
            { text: "FAQs", url: "#"},
        ],
    },
    {
        
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
    
];

export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    province: "Province",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];






