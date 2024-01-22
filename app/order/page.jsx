"use client"

import Loader from "@components/Loader"
import Navbar from "@components/Navbar"
import "@styles/Order.scss"
import { useSession } from "next-auth/react"

const Order = () => {
  const { data: session } = useSession()

  const orders = session?.user?.orders

  return (
    <>
      <Navbar />
      <div className="orders">
        <h1>Your Order</h1>
        <div className="order-list">
          {orders?.map((order, index) => (
            <div className="order" key={index}>
              <div className="order-title">
                <h4>Order ID: {order.id}</h4>
                <h2>Total Paid: ${order.amountPaid}</h2>
              </div>

              <div className="order-items">
                {order.orderItems.map((item, index) => (
                  <div className="product" key={index}>
                    <div className="product-info">
                      <img src={item.image} alt={item.title}/>
                      <div className="orderItemInfo">
                        <h4>{item.title}</h4>
                        <p>Product ID: {item.productId}</p>
                      </div>
                    </div>

                    <div className="product-info2">
                      <h3>Price: ${item.price}</h3>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Order