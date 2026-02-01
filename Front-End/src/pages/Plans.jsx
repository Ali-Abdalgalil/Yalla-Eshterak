import { useCountry } from '../hooks/useCountry'
import { useSelectedPlan } from '../hooks/useSelectedPlan'
import { Link } from 'react-router-dom'

export default function Plans() {
  const { country, countryCode, setCountryCode, countries } = useCountry()
  const { plans, selectedPlan, planId, setPlanId, cycle, setCycle } = useSelectedPlan()

  return (
    <div className="min-h-screen py-12 lg:py-20 px-4 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-4">Choose your plan</h1>
        <p className="text-gray-400 text-center mb-8">
          Watch on any device. Cancel anytime.
        </p>

        {/* Country selector */}
        <div className="flex justify-center mb-8">
          <label className="flex flex-col sm:flex-row items-center gap-2 text-sm">
            <span className="text-gray-400">Country:</span>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="bg-stream-card border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-stream-red focus:border-transparent"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code} className="bg-stream-card">
                  {c.name} ({c.currency})
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setCycle('monthly')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              cycle === 'monthly'
                ? 'bg-stream-red text-white'
                : 'bg-stream-card text-gray-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setCycle('yearly')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              cycle === 'yearly'
                ? 'bg-stream-red text-white'
                : 'bg-stream-card text-gray-400 hover:text-white'
            }`}
          >
            Yearly
            <span className="ml-2 text-green-400 text-sm">Save 17%</span>
          </button>
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setPlanId(plan.id)}
              className={`text-left p-6 rounded-xl border-2 transition ${
                planId === plan.id
                  ? 'border-stream-red bg-stream-card'
                  : 'border-white/10 bg-stream-card/50 hover:border-white/30'
              }`}
            >
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-4">
                {plan.screens} screen(s) · {plan.resolution}
              </p>
              <p className="text-3xl font-bold text-white">
                {plan.symbol}{plan.price}
                <span className="text-base font-normal text-gray-400">/{plan.cycle === 'yearly' ? 'year' : 'month'}</span>
              </p>
            </button>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/payment"
            className="inline-block px-8 py-3 bg-stream-red text-white font-semibold rounded-lg hover:bg-stream-red-hover transition"
          >
            Subscribe now — {selectedPlan.symbol}{selectedPlan.price}/{selectedPlan.cycle === 'yearly' ? 'year' : 'month'}
          </Link>
        </div>
      </div>
    </div>
  )
}
