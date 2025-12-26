import { useState } from "react";
import { Calculator, Percent, Calendar, Wallet } from "lucide-react";
import React from "react";
import checkmark from "../assets/check.png";

export default function InterestCalculator() {
  const [amount, setAmount] = useState(50000);
  const [rate, setRate] = useState(8.5);
  const [duration, setDuration] = useState(12);

  const totalInterest = (amount * (rate / 100) * duration) / 12;
  const totalReturn = amount + totalInterest;
  const monthlyPayment = totalReturn / duration;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white flex justify-center gap-52 items-center  overflow-hidden w-full font-montserat  mx-auto">
      <div className="w-[450px]">
        <h1 className=" text-[#04684C] text-4xl font-bold mt-2.5 ">
          Calculate Your Returns
        </h1>
        <span className="text-gray-700 font-semibold">
          Use our investment calculator to see potential returns based on
          different investment amounts and loan durations.
        </span>
        <ul className="mt-3 flex flex-col gap-3.5 font-semibold text-gray-700">
          <li className="flex gap-1 items-center">
            <span>
              <img className="w-10" src={checkmark} alt="checkmack" />
            </span>{" "}
            Competitive interest rates from 7-12%.
          </li>
          <li className="flex gap-1 items-center">
            <span>
              <img className="w-10" src={checkmark} alt="checkmack" />
            </span>{" "}
            Flexible durations: 6 - 24 months.
          </li>
          <li className="flex gap-1 items-center">
            <span>
              <img className="w-10" src={checkmark} alt="checkmack" />
            </span>{" "}
            Monthly payments directly to your account.
          </li>
        </ul>
      </div>

      <div className="w-[600px]">
        <div className="bg-[#04684C] p-6 text-white rounded-t-md">
          <div className="flex items-center gap-3">
            <Calculator className="h-6 w-6 text-emerald-200" />
            <h3 className="text-xl font-bold">Investment Calculator</h3>
          </div>
          <p className="text-emerald-100 text-sm mt-1 opacity-80">
            Calculate your returns in real-time
          </p>
        </div>

        <div className="p-6 space-y-8 border border-[#04684C] rounded-b-md">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Wallet size={16} className="text-[#04684C]" />
                Investment Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-24 text-right font-bold text-[#04684C] border-b border-gray-200 focus:border-[#04684C] outline-none"
              />
            </div>
            <input
              type="range"
              min="5000"
              max="10000000"
              step="5000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#04684C]"
            />
            <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400">
              <span>{formatCurrency(5000)}</span>
              <span>{formatCurrency(10000000)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Percent size={16} className="text-[#04684C]" />
                Annual Interest Rate
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-12 text-right font-bold text-[#04684C] border-b border-gray-200 focus:border-[#04684C] outline-none"
                />
                <span className="font-bold text-[#04684C]">%</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#04684C]"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar size={16} className="text-[#04684C]" />
              Investment Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[3, 6, 12, 24].map((m) => (
                <button
                  key={m}
                  onClick={() => setDuration(m)}
                  className={`py-2 text-sm rounded-xl border-2 transition-all font-bold ${
                    duration === m
                      ? "border-[#04684C] bg-[#04684C] text-white"
                      : "border-gray-100 bg-gray-50 text-gray-500 hover:border-emerald-200"
                  }`}
                >
                  {m} Mo
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Total Interest earned
              </span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                +{formatCurrency(totalInterest)}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Monthly Payout</span>
                <span className="font-bold text-gray-800">
                  {formatCurrency(monthlyPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="font-bold text-gray-800">Total Return</span>
                <span className="text-xl font-black text-[#04684C]">
                  {formatCurrency(totalReturn)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
