import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3200/");
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
          <img src="" alt="" />
        </div>
      </header>
      <div className="restInfos">
        <div className="container">
          <div>
            <h2>{data.restaurant.name}</h2>
            <p>{data.restaurant.description}</p>
          </div>
          <img src="./" alt="" />
        </div>
      </div>
      <main>
        <div className="container">
          <div className="menus">
            {data.categories.map((categories, index) => {
              return (
                <div className="categories">
                  {categories.meals.length !== 0 && (
                    <h2 key={index}>{categories.name}</h2>
                  )}

                  {console.log(categories.meals.length)}

                  {categories.meals.map((meals, index) => {
                    return (
                      <div className="cards">
                        <div className="card">
                          <div className="card-item">
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
        </div>
      </main>
    </>
  );
}

export default App;
