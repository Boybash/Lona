import { useState } from "react";
import { Calculator, Percent, Calendar, Wallet } from "lucide-react";
import React from "react";
import checkmark from "../assets/check.png";
import { Fade } from "react-awesome-reveal";

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
    <Fade direction="up" delay={0} duration={1000} fraction={0.5} triggerOnce>
      <div className="bg-white flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 lg:gap-24 p-6 md:p-10 lg:p-20 overflow-hidden w-full font-montserat max-w-7xl mx-auto">
        <div className="w-full lg:w-1/2 max-w-[500px]">
          <h1 className="text-[#04684C] text-3xl md:text-4xl font-bold mt-2.5 leading-tight">
            Calculate Your Returns
          </h1>
          <p className="text-gray-700 font-semibold mt-4">
            Use our investment calculator to see potential returns based on
            different investment amounts and loan durations.
          </p>

          <ul className="mt-6 flex flex-col gap-4 font-semibold text-gray-700">
            <li className="flex gap-3 items-center">
              <div className="shrink-0">
                <img className="w-8 md:w-10" src={checkmark} alt="checkmark" />
              </div>
              <span className="text-sm md:text-base">
                Competitive interest rates from 7-12%.
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <div className="shrink-0">
                <img className="w-8 md:w-10" src={checkmark} alt="checkmark" />
              </div>
              <span className="text-sm md:text-base">
                Flexible durations: 6 - 24 months.
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <div className="shrink-0">
                <img className="w-8 md:w-10" src={checkmark} alt="checkmark" />
              </div>
              <span className="text-sm md:text-base">
                Monthly payments directly to your account.
              </span>
            </li>
          </ul>
        </div>

        <div className="w-full lg:w-1/2 max-w-[550px] shadow-2xl rounded-xl">
          <div className="bg-[#04684C] p-5 md:p-6 text-white rounded-t-xl">
            <div className="flex items-center gap-3">
              <Calculator className="h-6 w-6 text-emerald-200" />
              <h3 className="text-lg md:text-xl font-bold">
                Investment Calculator
              </h3>
            </div>
            <p className="text-emerald-100 text-xs md:text-sm mt-1 opacity-80">
              Calculate your returns in real-time
            </p>
          </div>

          <div className="p-5 md:p-8 space-y-8 border-x border-b border-gray-100 rounded-b-xl bg-white">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Wallet size={16} className="text-[#04684C]" />
                  Investment Amount
                </label>
                <input
                  type="text"
                  value={amount === 0 ? "" : amount.toLocaleString()}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, "");
                    const numValue = Number(rawValue);
                    setAmount(numValue);
                  }}
                  className="w-32 text-right font-bold text-[#04684C] border-b border-gray-200 focus:border-[#04684C] outline-none"
                  placeholder="0"
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
                max="100"
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                  <span className="text-xl md:text-2xl font-black text-[#04684C]">
                    {formatCurrency(totalReturn)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
