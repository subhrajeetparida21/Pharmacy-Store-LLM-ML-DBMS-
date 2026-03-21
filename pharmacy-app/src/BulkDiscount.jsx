import React, { useState, useEffect } from 'react';
import './BulkDiscount.css';

export default function BulkDiscount() {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [minQuantity, setMinQuantity] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    // Load medicines
    const medicineList = [
      { id: 1, name: 'Paracetamol 500mg', price: 25, currentDiscount: 0 },
      { id: 2, name: 'Amoxicillin 250mg', price: 45, currentDiscount: 0 },
      { id: 3, name: 'Vitamin C Tablets', price: 120, currentDiscount: 0 },
      { id: 4, name: 'Ibuprofen 400mg', price: 35, currentDiscount: 0 },
      { id: 5, name: 'Cough Syrup', price: 85, currentDiscount: 0 },
      { id: 6, name: 'Antibiotic Cream', price: 65, currentDiscount: 0 },
      { id: 7, name: 'Insulin Pen', price: 450, currentDiscount: 0 },
      { id: 8, name: 'Blood Pressure Monitor', price: 1200, currentDiscount: 0 },
    ];
    setMedicines(medicineList);
  }, []);

  const toggleSelectMedicine = (id) => {
    if (selectedMedicines.includes(id)) {
      setSelectedMedicines(selectedMedicines.filter(mid => mid !== id));
    } else {
      setSelectedMedicines([...selectedMedicines, id]);
    }
  };

  const selectAll = () => {
    if (selectedMedicines.length === medicines.length) {
      setSelectedMedicines([]);
    } else {
      setSelectedMedicines(medicines.map(m => m.id));
    }
  };

  const applyDiscount = () => {
    if (selectedMedicines.length === 0) {
      alert('Please select at least one medicine');
      return;
    }
    if (!discountValue || discountValue <= 0) {
      alert('Please enter a valid discount value');
      return;
    }
    if (discountType === 'percentage' && discountValue > 100) {
      alert('Percentage discount cannot exceed 100%');
      return;
    }

    const updatedMedicines = medicines.map(medicine => {
      if (selectedMedicines.includes(medicine.id)) {
        let newPrice = medicine.price;
        if (discountType === 'percentage') {
          newPrice = medicine.price * (1 - discountValue / 100);
        } else {
          newPrice = medicine.price - discountValue;
        }
        return {
          ...medicine,
          currentDiscount: discountValue,
          discountedPrice: newPrice
        };
      }
      return medicine;
    });

    setMedicines(updatedMedicines);
    setDiscountApplied(true);
    
    setTimeout(() => {
      setDiscountApplied(false);
    }, 3000);
  };

  const calculateDiscountedPrice = (price) => {
    if (discountType === 'percentage') {
      return price * (1 - discountValue / 100);
    } else {
      return price - discountValue;
    }
  };

  return (
    <div className="bulk-discount-container">
      <div className="discount-header">
        <h1>🏷️ Bulk Discount Management</h1>
        <p>Apply bulk discounts to medicines and create promotional offers</p>
      </div>

      {discountApplied && (
        <div className="success-message">
          ✅ Discount applied successfully to selected medicines!
        </div>
      )}

      <div className="discount-content">
        <div className="discount-form-section">
          <h2>Discount Settings</h2>
          
          <div className="form-group">
            <label>Discount Type:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="percentage"
                  checked={discountType === 'percentage'}
                  onChange={(e) => setDiscountType(e.target.value)}
                />
                Percentage (%)
              </label>
              <label>
                <input
                  type="radio"
                  value="fixed"
                  checked={discountType === 'fixed'}
                  onChange={(e) => setDiscountType(e.target.value)}
                />
                Fixed Amount (₹)
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Discount Value:</label>
            <input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(parseFloat(e.target.value))}
              placeholder={discountType === 'percentage' ? 'Enter percentage (e.g., 20)' : 'Enter amount (e.g., 50)'}
              className="discount-input"
            />
          </div>

          <div className="form-group">
            <label>Minimum Quantity (Optional):</label>
            <input
              type="number"
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
              placeholder="Minimum quantity for discount"
              className="discount-input"
            />
          </div>

          <div className="form-group">
            <label>Valid Until:</label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="discount-input"
            />
          </div>

          <div className="form-group">
            <label>Promo Code (Optional):</label>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="discount-input"
            />
          </div>

          <button onClick={applyDiscount} className="apply-discount-btn">
            Apply Discount
          </button>
        </div>

        <div className="medicines-section">
          <div className="medicines-header">
            <h2>Select Medicines</h2>
            <button onClick={selectAll} className="select-all-btn">
              {selectedMedicines.length === medicines.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
          
          <div className="medicines-list">
            <table className="medicines-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Medicine</th>
                  <th>Original Price</th>
                  <th>Current Discount</th>
                  <th>Discounted Price</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map(medicine => (
                  <tr key={medicine.id} className={selectedMedicines.includes(medicine.id) ? 'selected' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedMedicines.includes(medicine.id)}
                        onChange={() => toggleSelectMedicine(medicine.id)}
                      />
                    </td>
                    <td className="medicine-name">{medicine.name}</td>
                    <td>₹{medicine.price}</td>
                    <td>
                      {medicine.currentDiscount > 0 && (
                        <span className="discount-badge">
                          {medicine.currentDiscount}% OFF
                        </span>
                      )}
                    </td>
                    <td className="discounted-price">
                      {medicine.discountedPrice ? (
                        <>
                          <span className="old-price">₹{medicine.price}</span>
                          <span className="new-price">₹{medicine.discountedPrice.toFixed(2)}</span>
                        </>
                      ) : (
                        <span>₹{medicine.price}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}