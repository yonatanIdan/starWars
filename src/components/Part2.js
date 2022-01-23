import React, { useState, useEffect } from "react";

const Part2 = (props) => {
  const [planets, setPlanets] = useState([]);
  const [maxPopulation, setMaxPopulation] = useState();
  const planetsSearch = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

  const fatchPage = async (page) => {
    let {results, next} = await (await fetch(`${props.api}planets/?page=${page}`)).json();
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < planetsSearch.length; j++) {
        if (results[i].name === planetsSearch[j]) {
          results[i].population = Number(results[i].population);
          setPlanets((arr) => [...arr, results[i]]);
        }
      }
    };
    return next;
  };

  useEffect(async () => {
    let page = 1;
    while (true) {
      if(await fatchPage(page)){
        page++;
      } else break;
    }
  }, []);

  useEffect(() => {
    if (planets.length > 1) {
      setMaxPopulation(
        planets.reduce((max, obj) =>
          max.population > obj.population ? max : obj
        )
      );
    }
  }, [planets]);

  const backgroundColorBar = (width) => {
    switch (width) {
      case width > 50:
        return "#04AA6D";
      case width <= 50:
        return "#f44336";
      default:
        return "#f44336";
    }
  };
  const back = {
    backgroundColor: "#f44336",
    // width: '0%',
  };

  return (
    <div className="part2">
      <h1>Part 2</h1>
      <h3>based on max population value.</h3>
      {maxPopulation &&
        planets.map((data, index) => {
          let widthCal = (data.population * 100) / maxPopulation.population;
          if(widthCal > 60 )back.backgroundColor ="#04AA6D";
          if(widthCal > 40 && widthCal < 60)back.backgroundColor ="#2196F3";
          if(widthCal < 40)back.backgroundColor ="#f44336";
          return (
            <div key={index}>
              <p>{data.name}</p>
              <div className="container">
                <div
                  className="skills"
                  style={{ width: `${widthCal}%`, backgroundColor: back.backgroundColor }}
                >
                  {data.population}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Part2;
