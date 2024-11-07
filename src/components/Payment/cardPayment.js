import React, { useState } from 'react';

const SubscriptionPayment = ({ orderDetails, onPaymentComplete }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation simple du numéro de carte
        if (cardNumber.length < 8) {
            setError('Veuillez entrer un numéro de carte valide');
            return;
        }

        onPaymentComplete({
            method: 'subscription',
            cardNumber: cardNumber,
            status: 'success'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <Card className="max-w-2xl mx-auto bg-white">
                <CardHeader className="bg-red-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl font-bold">Paiement par Carte d'Abonnement</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {/* Résumé de la commande */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3">Détails de la commande</h3>
                        <div className="space-y-2">
                            <p>Plat: {orderDetails?.name}</p>
                            <p>Prix: {orderDetails?.price?.toFixed(2)} D</p>
                            <p>Catégorie: {orderDetails?.category}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                Numéro de carte d'abonnement
                            </label>
                            <input
                                type="text"
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                placeholder="Entrez votre numéro de carte"
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold 
                                hover:bg-red-700 transition-colors"
                        >
                            Confirmer le paiement
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        En confirmant le paiement, vous acceptez les conditions générales d'utilisation
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SubscriptionPayment;