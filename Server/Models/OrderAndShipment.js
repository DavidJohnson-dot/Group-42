const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema= new Schema({

    //Linking the users table to the order table
        customer_id: {type:Schema.Types.ObjectId,ref:"User"},  
        cbm: Number,
        qty: Number,
        totalAmount: Number,
        shipmentId: {type:Schema.Types.ObjectId, ref:"Shipment"},
        tracking_no: {type:String, required:true},
              
        Status:{
          type:String,
            enum: ["Pending","in-Transit","Delivered"],
            default:"Pending"
        }
        ,
        suppliersNumber: Number,
        description: String,
        location: String,
        updateAt:{
          type: Date,
          default: Date.now
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
        
    })

const shipmentSchema= new Schema({
  userId:{ type: mongoose.Types.ObjectId, ref: "User" },
  containerNumber: { type: Number, required: true, unique: true },
  loadingDate: { type: Date },  // Date when the shipment is loaded
  eta: { type: Date, required: true },
  status:{type:String, enum:["Pending","In Transit", "Delivered"],default:"Pending..."},
  route: { type: String, required: true },     // Route description (e.g., "Shanghai -> New York")
  country: { type: String, required: true },
  port: { type: String, required: true },      // Port of destination
  cbmRate: { type: Number, required: true },   // Cost per CBM (Cubic Meter)
  assignedOrders: [
    {
      orderId: { type: mongoose.Types.ObjectId, ref: "Order" },
      userId: { type: mongoose.Types.ObjectId, ref: "User"},
    }
  ],
}, { timestamps: true });


const Order= mongoose.model('Order', orderSchema)
const Shipment= mongoose.model("Shipment",shipmentSchema)

module.exports= {Order,Shipment}