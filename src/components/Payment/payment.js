import React, { useState } from 'react';
import './payment.css';

const PaymentSelection = ({ onPaymentSelect = () => {} }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentMethod === 'card') {
            setConfirmationMessage({
                title: "Paiement validé",
                description: "Votre paiement par carte d'abonnement a été effectué avec succès.",
                type: "success"
            });
        } else if (paymentMethod === 'onsite') {
            setConfirmationMessage({
                title: "Paiement en attente",
                description: "Votre paiement sera à effectuer sur place lors de votre visite au restaurant.",
                type: "info"
            });
        }
        
        setShowConfirmation(true);
        onPaymentSelect(paymentMethod);
    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="payment-header">
                    <h2 className="payment-title">Mode de Paiement</h2>
                </div>
                <div className="payment-content">
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
                {showConfirmation && (
                                        <div className={`confirmation-message ${confirmationMessage.type}`}>
                                        <h3>{confirmationMessage.title}</h3>
                                        <p>{confirmationMessage.description}</p>
                                    </div>
                                )}
                
            </div>
        </div>
    );
};

export default PaymentSelection;