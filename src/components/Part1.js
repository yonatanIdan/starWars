import React, { useState, useEffect } from "react";
import "../App.css";

const NewFile = (props) => {
  const [list, setList] = useState([]);
  const [mostPopulation, setMostPopulation] = useState();
  const [popList, setPopList] = useState([])

  const fatchPage = async (page) => {
    let {results:vehicle, next} = await (await fetch(`${props.api}vehicles/?page=${page}`)).json();
    for (let i = 0; i < vehicle.length; i++) {
      if (vehicle[i].pilots.length > 0) {
        for (let j = 0; j < vehicle[i].pilots.length; j++) {
          const pilot = {};
          pilot.vehicle = vehicle[i].name;
          let pilots = await (await fetch(vehicle[i].pilots[j])).json();
          pilot.pilot = pilots.name;
          let homeworld = await (await fetch(pilots.homeworld)).json();
          pilot.homeworld = {
            name: homeworld.name,
            population: Number(homeworld.population),
          };
          setList(arr => [...arr, pilot]);
        }
      }
    }
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
    let data = {};
    let popList = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].homeworld.population){
        data[list[i].vehicle] = list[i].homeworld.population + (data[list[i].vehicle]?data[list[i].vehicle]:0);
      }
    }
    for (const [vehicle, population] of Object.entries(data)) {
      popList.push({vehicle, population});
    }
    if(popList.length > 2){
      setMostPopulation(popList.reduce((prev,next)=>prev.population>next.population?prev:next));
    }
  },[list]);
  
  return (
    <div className="part1">
      <h1>Part 1</h1>
      {(mostPopulation != undefined) && (
        <table>
          <tbody>
            <tr>
              <th>Star Wars</th>
            </tr>
            <tr>
              <td>
                Vehicle name with the largest sum is {mostPopulation.vehicle}.
              </td>
            </tr>
            <tr>
              <td>
                Related home planets and their respective population.
                {list.map((item, index) => {
                  if (item.vehicle === mostPopulation.vehicle) {
                    return (
                      <li key={index}>
                        homeworld name: {item.homeworld.name}, population: {item.homeworld.population}
                      </li>
                    );
                  }
                })}
              </td>
            </tr>
            <tr>
              <td>
                Related pilot names:
                {list.map((item, index) => {
                  if (item.vehicle === mostPopulation.vehicle) {
                    return <li key={index}>{item.pilot}</li>;
                  }
                })}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewFile;
