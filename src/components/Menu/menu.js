import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';
import Menuservice from '../../Service/Menuservice';

const Menu = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [mealType, setMealType] = useState('Déjeuner');
    const [selectedItems, setSelectedItems] = useState([]);

    const [menuItems, setMenuItems] =useState( {
        "Petit déjeuner": [
            
            {
                id: 13,
                name: "Petit-déjeuner tunisien : ",
                price: 6,
                category: "Petit déjeuner",
                details: "Œufs, olives, fromage, pain frais",
                availableFor: ["Petit déjeuner"]
            },
            {
                id: 14,
                name: "petit-déjeuner continental : ",
                price: 5,
                category: "Petit déjeuner",
                details: "Croissant, confiture, beurre, café",
                availableFor: ["Petit déjeuner"]
            }
        ],
        "Plat Principal": [
            {
                id: 5,
                name: "Couscous Poulet : ",
                price: 8,
                category: "Plat principal",
                details: "Plat de couscous servi avec viande de poulet et légumes"
            },
            {
                id: 6,
                name: "Makrouna Poulet : ",
                price: 8,
                category: "Plat principal",
                details: "Pâtes tunisiennes épicées avec sauce tomate et poulet"
            }
        ],
        "Entrée": [
            {
                id: 7,
                name: "Salade Méchouia : ",
                price: 5,
                category: "Entrée",
                details: "Salade composée avec tomate, concombre, olives et œufs"
            },
            {
                id: 12,
                name: "Brick à l'œuf : ",
                price: 4.5,
                category: "Entrée",
                details: "Brick croustillante farcie avec pomme de terre, thon et œuf"
            }
        ],
        "Dessert": [
            {
                id: 8,
                name: "Zriga Tunisienne : ",
                price: 4,
                category: "Dessert",
                details: "Crème à base de lait, décorée avec des amandes"
            },
            {
                id: 11,
                name: "Outra (Gâteau tunisien)  : ",
                price: 3,
                category: "Dessert",
                details: "Outra est un gâteau tunisien traditionnel préparé"
            }
        ],
        "Boisson": [
            {
                id: 9,
                name: "Citronnade Tunisienne : ",
                price: 2.5,
                category: "Boisson",
                details: "Boisson rafraîchissante à base de jus de citron frais"
            },
            {
                id: 10,
                name: "Jus de Fraise : ",
                price: 2.5,
                category: "Boisson",
                details: "Jus de fraise rafraîchissant et nutritif"
            }
        ]
    });
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const items = await Menuservice.getAllMenuItems();
                // Organiser les items par catégorie
                const categorizedItems = {
                    "Petit déjeuner": [],
                    "Plat Principal": [],
                    "Entrée": [],
                    "Dessert": [],
                    "Boisson": []
                };

                items.forEach(item => {
                    if (categorizedItems[item.category]) {
                        categorizedItems[item.category].push(item);
                    }
                });

                setMenuItems(categorizedItems);
            } catch (error) {
                console.error('Erreur lors du chargement du menu:', error);
            }
        };

        fetchMenuItems();
    }, []);

    const allItems = Object.values(menuItems).flat();

    const filterItems = (items) => {
        return items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.details.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const displayedItems = selectedCategory === 'all'
        ? filterItems(allItems)
        : filterItems(menuItems[selectedCategory] || []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const getVisibleCategories = () => {
        if (mealType === 'Petit déjeuner') {
            return ['all', 'Petit déjeuner', 'Boisson'];
        }
        return ['all', 'Plat Principal', 'Entrée', 'Dessert', 'Boisson'];
    };

    const handleItemSelect = (item) => {
        if (selectedItems.includes(item.id)) {
            setSelectedItems(selectedItems.filter(id => id !== item.id));
        } else {
            setSelectedItems([...selectedItems, item.id]);
        }
    };

    const handleReservation = () => {
        const selectedMenuItems = allItems.filter(item => selectedItems.includes(item.id));
        navigate('/AddReservation', {
            state: {
                selectedItems: selectedMenuItems,
                mealType: mealType
            }
        });
    };

    const visibleCategories = getVisibleCategories();

    return (
        <div className="menu-container">
            <h1 className="menu-title"> Notre Menu : </h1>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Rechercher un plat..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <div className="meal-type-selector">
                <div className="meal-type-buttons">
                    <button 
                        className={`meal-type-button ${mealType === 'Petit déjeuner' ? 'active' : ''}`}
                        onClick={() => {
                            setMealType('Petit déjeuner');
                            setSelectedCategory('all');
                        }}
                    >
                        Petit déjeuner
                    </button>
                    <button
                        className={`meal-type-button ${mealType === 'Déjeuner' ? 'active' : ''}`}
                        onClick={() => {
                            setMealType('Déjeuner');
                            setSelectedCategory('all');
                        }}
                    >
                        Déjeuner
                    </button>
                    <button
                        className={`meal-type-button ${mealType === 'Dîner' ? 'active' : ''}`}
                        onClick={() => {
                            setMealType('Dîner');
                            setSelectedCategory('all');
                        }}
                    >
                        Dîner
                    </button>
                </div>
            </div>


            <div className="category-buttons">
                {visibleCategories.map(category => (
                    <button 
                        key={category}
                        className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category === 'all' ? 'Tous' : category}
                    </button>
                ))}
            </div>

            <div className="menu-grid">
                {displayedItems.map(item => (
                    <div
                        key={item.id}
                        className="menu-item"
                    >
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleItemSelect(item)}
                        />
                        <div className="item-details">
                            <h3 className="item-name">{item.name}</h3>
                            <p className="item-description">{item.details}</p>
                            <p className="item-prix">{item.price !== undefined && !isNaN(item.price) 
                        ? `${item.price.toFixed(2)} D`
                        : "Prix non disponible"}</p>
                            <span className="item-category">
                                {item.category}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="reservation-button" onClick={handleReservation}>
                Confirmer La Réservation
            </button>
        </div>
    );
};

export default Menu;
