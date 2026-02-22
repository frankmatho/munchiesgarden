{/* You can also include credit card section here */}
<h3 className="text-xl font-semibold mt-4">Credit Card Info</h3>
<input name="cardNumber" value={formData.cardNumber} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Card Number" />
<div className="flex gap-2">
  <input name="expiry" value={formData.expiry} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="MM/YY" />
  <input name="cvv" value={formData.cvv} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="CVV" />
</div>
<button type="submit" onClick={handleDeliveryClick} className="bg-black text-white px-4 py-2 rounded w-full">Confirm Payment</button>

