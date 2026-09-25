import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets'

const Orders = () => {

  const {currency} = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () =>{
    setOrders(dummyOrders)
  };

  useEffect(()=>{
    fetchOrders();

  },[])


  return (

    <div className='no-scollbar flex-1 h-[95vh] overflow-y-scroll'>
    
     <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="flex flex-col md:items-center md:flex-row gap-5 p-5 max-w-4xl rounded-md border border-gray-300 ">
                    <div className="flex gap-5 md:w-80">
                      <div className='bg-emerald-50 border border-emerald-100 rounded-md p-2 w-12 h-12 flex items-center justify-center flex-shrink-0'>
                        <img className="w-full h-full object-contain" src={assets.box_icon} alt="boxIcon" />
                        </div>
                        <div>
                            {order.items.map((item, index) => (
                                <div key={index} className="flex flex-col gap-1 ">
                                    <p className="font-medium">
                                        {item.product.name}{" "} <span className="text-indigo-500" >x {item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-sm md:text-base text-black/60 md:w-60 ">
                        <p className='text-black/80'>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}</p>
                        <p> {order.address.province}, {order.address.zipcode}, {order.address.country}</p>
                        
                        <p>{order.address.phone}</p>
                    </div>

                    <p className="font-medium text-lg md:w-25">{currency}{order.amount}</p>

                    <div className="flex flex-col text-sm md:text-base text-black/60  md:w-40">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
  )
}

export default Orders