'use client';
import { useState } from 'react';
import { Calculator } from 'lucide-react';

function calcMonthly(price: number, downPct: number, ratePct: number, termYrs: number): number {
  const principal = price * (1 - downPct / 100);
  const r = ratePct / 100 / 12;
  const n = termYrs * 12;
  if (r === 0 || n === 0) return principal / (n || 1);
  return (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
}

export default function OwnerFinancingCalculator({ price }: { price: number }) {
  const [down, setDown] = useState(10);
  const [rate, setRate] = useState(8);
  const [term, setTerm] = useState(10);

  const downAmt    = Math.round(price * down / 100);
  const principal  = price - downAmt;
  const monthly    = calcMonthly(price, down, rate, term);
  const totalPaid  = monthly * term * 12;
  const totalInterest = totalPaid - principal;

  const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

  return (
    <div className="card">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Calculator size={17} className="text-green-700" />
        </div>
        <div>
          <h2 className="font-extrabold text-brand-900 text-lg leading-tight">Owner Financing Calculator</h2>
          <p className="text-xs text-brand-400">Estimate your monthly payment</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Down payment slider */}
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <label className="text-brand-600 font-medium">Down Payment</label>
            <span className="font-bold text-brand-800">{down}% &mdash; ${fmt(downAmt)}</span>
          </div>
          <input
            type="range" min={5} max={50} step={5} value={down}
            onChange={e => setDown(+e.target.value)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-green-500 bg-brand-100"
          />
          <div className="flex justify-between text-[11px] text-brand-300 mt-1">
            <span>5%</span><span>50%</span>
          </div>
        </div>

        {/* Interest rate slider */}
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <label className="text-brand-600 font-medium">Interest Rate</label>
            <span className="font-bold text-brand-800">{rate}% / year</span>
          </div>
          <input
            type="range" min={4} max={15} step={0.5} value={rate}
            onChange={e => setRate(+e.target.value)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-green-500 bg-brand-100"
          />
          <div className="flex justify-between text-[11px] text-brand-300 mt-1">
            <span>4%</span><span>15%</span>
          </div>
        </div>

        {/* Term buttons */}
        <div>
          <label className="text-brand-600 font-medium text-sm block mb-2">Loan Term</label>
          <div className="flex gap-2">
            {[3, 5, 10, 15, 20].map(y => (
              <button
                key={y}
                onClick={() => setTerm(y)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all
                  ${term === y
                    ? 'bg-green-600 text-white border-green-600 shadow'
                    : 'bg-brand-50 text-brand-600 border-brand-100 hover:border-green-300 hover:text-green-700'
                  }`}
              >
                {y}yr
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result box */}
      <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="text-center mb-4">
          <p className="text-[11px] text-green-600 uppercase tracking-widest font-bold mb-1">Estimated Monthly Payment</p>
          <p className="text-4xl font-extrabold text-green-700">
            ${fmt(monthly)}<span className="text-base font-semibold">/mo</span>
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-sm border-t border-green-200 pt-3">
          <div>
            <p className="text-[10px] text-green-600 uppercase tracking-wide mb-0.5">Down</p>
            <p className="font-bold text-green-800">${fmt(downAmt)}</p>
          </div>
          <div>
            <p className="text-[10px] text-green-600 uppercase tracking-wide mb-0.5">Loan</p>
            <p className="font-bold text-green-800">${fmt(principal)}</p>
          </div>
          <div>
            <p className="text-[10px] text-green-600 uppercase tracking-wide mb-0.5">Total Paid</p>
            <p className="font-bold text-green-800">${fmt(totalPaid)}</p>
          </div>
        </div>
        <p className="text-[10px] text-green-500 text-center mt-3">
          * Estimate only. Interest paid: ${fmt(totalInterest)}. Actual terms subject to seller agreement.
        </p>
      </div>
    </div>
  );
}
