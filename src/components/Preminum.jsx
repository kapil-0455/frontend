import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Preminum = () => {

  const [isUserPremium, setIsUserPremium] = useState(false) ;
  useEffect( () => {
      verifyPremiumUser()
    },[])

    const verifyPremiumUser = async () =>{
        try {
            const res = await axios.get(BASE_URL + "/premium/verify" , {withCredentials:true} );
            if(res.data.isPremium){
                setIsUserPremium(true);
            }
        } catch (error) {
            console.error(error);
        }
    }


  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { memberShipType: type },
      { withCredentials: true },
    );

    

    const options = {
      key: order.data.keyId,
      amount: order.data.amount,
      currency: order.data.currency,
      name: "DevTinder",
      description: "Membership Purchase",
      prefill: {
        name: order.data.notes.firstName + " " + order.data.notes.lastName,
        email: order.data.notes.email,
      },
      order_id: order.data.orderId,
      notes: order.data.notes,
      theme: {
        color: "#1e293b",
      },
      handler : async function(response) {
          await verifyPremiumUser();
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <div>
      <h1 className="text-5xl font-black mb-6 leading-tight">
          You are a Premium User
        </h1>
    </div>
  ) : 
  (
    <div className="min-h-screen py-20 px-4 flex flex-col items-center">
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-5xl font-black mb-6 leading-tight">
          Choose Your <span className="gradient-text">Power Level</span>
        </h1>
        <p className="text-xl opacity-70">
          Elevate your developer networking experience with our premium
          membership tiers.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl w-full justify-center">
        {/* Silver Membership */}
        <div className="flex-1 glass-card rounded-[2rem] overflow-hidden border border-white/10 flex flex-col group hover:scale-[1.02] transition-all duration-500 shadow-xl">
          <div className="p-8 bg-gradient-to-br from-slate-400/10 to-slate-500/10 border-b border-white/5">
            <div className="flex justify-between items-start mb-4">
              <span className="px-4 py-1 rounded-full bg-slate-500/20 text-slate-300 text-xs font-bold tracking-widest uppercase">
                Silver Tier
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Silver</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">$9</span>
              <span className="opacity-50 text-sm">/month</span>
            </div>
          </div>

          <div className="p-8 flex-1 flex flex-col">
            <ul className="space-y-4 mb-8 flex-1">
              {[
                { text: "Chat with other people", icon: "💬" },
                { text: "100 connection requests per day", icon: "🤝" },
                { text: "Verified Blue Tick", icon: "✔️" },
                { text: "Standard Profile Visibility", icon: "👁️" },
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-xl">{feature.icon}</span>
                  <span className="font-medium opacity-90">{feature.text}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBuyClick("silver")}
              className="btn btn-block bg-slate-500/20 hover:bg-slate-500/40 border-none text-white rounded-2xl py-4 font-bold transition-all shadow-lg shadow-slate-500/10"
            >
              Buy Silver
            </button>
          </div>
        </div>

        {/* Gold Membership */}
        <div className="flex-1 glass-card rounded-[2rem] overflow-hidden border-2 border-yellow-500/30 flex flex-col group hover:scale-[1.05] transition-all duration-500 shadow-[0_0_50px_-12px_rgba(234,179,8,0.3)] relative">
          <div className="absolute top-0 right-0 p-4">
            <span className="px-4 py-1 rounded-full bg-yellow-500 text-black text-[10px] font-black tracking-widest uppercase shadow-lg">
              Best Value
            </span>
          </div>

          <div className="p-8 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-b border-white/5">
            <div className="flex justify-between items-start mb-4">
              <span className="px-4 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-bold tracking-widest uppercase">
                Gold Tier
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Gold</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">$49</span>
              <span className="opacity-50 text-sm">/6 months</span>
            </div>
          </div>

          <div className="p-8 flex-1 flex flex-col">
            <ul className="space-y-4 mb-8 flex-1">
              {[
                { text: "Infinite connection requests", icon: "♾️" },
                { text: "Unlimited chat (6 Months)", icon: "🔥" },
                { text: "Everything in Silver", icon: "⭐" },
                { text: "Priority Feed Placement", icon: "🚀" },
                { text: "Advanced AI Matching", icon: "🤖" },
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-xl">{feature.icon}</span>
                  <span className="font-medium opacity-90">{feature.text}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBuyClick("gold")}
              className="btn btn-block bg-yellow-500 hover:bg-yellow-600 border-none text-black rounded-2xl py-4 font-bold transition-all shadow-xl shadow-yellow-500/20"
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>

      <p className="mt-12 text-sm opacity-50 max-w-md text-center">
        Secure checkout via Stripe. All memberships are non-refundable. Prices
        are in USD and exclude applicable taxes.
      </p>
    </div>
  );
};

export default Preminum;
