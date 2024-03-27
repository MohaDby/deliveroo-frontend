import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/images/logo-teal.svg";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--backend-deliveroo--9x82jlrpnwgd.code.run/"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <>
      <span>En cours de chargement...</span>
    </>
  ) : (
    <>
      <header>
        <div className="container">
          <img className="logo" src={logo} alt="" />
        </div>
      </header>
      <div className="restInfos">
        <div className="container">
          <div className="restInfos-text">
            <h2>{data.restaurant.name}</h2>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="" />
        </div>
      </div>
      <main>
        <div className="container">
          <div className="menus">
            {data.categories.map((categories) => {
              return (
                <div className="categories" key={categories.name}>
                  {categories.meals.length !== 0 && <h2>{categories.name}</h2>}

                  {categories.meals.map((meals) => {
                    return (
                      <div
                        className="cards"
                        key={meals.id}
                        onClick={() => {
                          //je veux retrouver l'objet sur lequel j'ai cliquer et increment la valeur de mon objet
                          const newCart = [...cart];
                          const index = newCart.findIndex(
                            (objet) => objet.id === meals.id
                          );

                          if (newCart.find((objet) => objet.id === meals.id)) {
                            newCart[index].counter++;
                            setCart(newCart);
                          } else {
                            newCart.push({
                              id: meals.id,
                              title: meals.title,
                              price: meals.price,
                              counter: 1,
                            });
                            setCart(newCart);
                          }
                        }}
                      >
                        <div className="cards-items">
                          <div className="card">
                            <div className="card-text">
                              <h3>{meals.title}</h3>
                              <p>{meals.description}</p>
                              <div className="details">
                                <p>{meals.price}</p>
                                {meals.popular === true && (
                                  <div>
                                    <img src="" alt="" />
                                    <p>Populaire</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="card-picture">
                              {meals.picture && (
                                <img src={meals.picture} alt="" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="cart">
            <div>
              <button>valider mon panier</button>
              <div>
                {cart.length === 0 ? (
                  <p>Votre panier est vide</p>
                ) : (
                  cart.map((elem) => {
                    const newCart = [...cart];

                    const index = newCart.findIndex(
                      (objet) => objet.id === elem.id
                    );

                    return (
                      <div key={elem.id}>
                        {newCart[index].counter !== 0 && (
                          <div>
                            <button
                              onClick={() => {
                                newCart[index].counter--;
                                setCart(newCart);
                              }}
                            >
                              -
                            </button>

                            <p>{elem.counter}</p>
                            <button
                              onClick={() => {
                                newCart[index].counter++;
                                setCart(newCart);
                              }}
                            >
                              +
                            </button>

                            <div>
                              <p>{elem.title}</p>
                              <p>{elem.price}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
