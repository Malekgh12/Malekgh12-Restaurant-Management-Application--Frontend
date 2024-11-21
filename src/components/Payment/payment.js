import React, { useState } from 'react';
import './payment.css';

const PaymentSelection = ({ orderDetails, onPaymentSelect }) => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onPaymentSelect(paymentMethod);
    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="payment-header">
                    <h2 className="payment-title">Mode de Paiement</h2>
                </div>
                <div className="payment-content">
                    <div className="order-summary">
                        <h3 className="summary-title">Résumé de votre commande</h3>
                        <div className="summary-details">
                            <p>Plat: {orderDetails?.name}</p>
                            <p>Prix: {orderDetails?.price?.toFixed(2)} D</p>
                            <p>Catégorie: {orderDetails?.category}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="payment-options">
                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="payment-radio"
                                />
                                <div>
                                    <div className="option-title">Carte d'abonnement</div>
                                    <div className="option-description">Payer avec votre carte d'abonnement</div>
                                </div>
                            </label>

                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="onsite"
                                    checked={paymentMethod === 'onsite'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="payment-radio"
                                />
                                <div>
                                    <div className="option-title">Paiement sur place</div>
                                    <div className="option-description">Payer lors de votre visite au restaurant</div>
                                </div>
                            </label>
                        </div>

                        <div className="submit-container">
                            <button
                                type="submit"
                                disabled={!paymentMethod}
                                className={`submit-button ${!paymentMethod ? 'disabled' : ''}`}
                            >
                                Continuer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentSelection;