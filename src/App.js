import React, { useState, useEffect } from "react";
import '../src/App.css'
const App = () => {
  const [hasError, setErrors] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [date5, setDate5] = useState([]);
  const [ziploccode, setZiploccode] = useState([]);
  const [locationCode, setLocationCode] = useState([]);
  function handleSubmit(e) {
    e.preventDefault();
    
    fetchplace();
    
    console.log("clicked");
  }
    var apikey = "QaoiwqaZbwWopvcTsmNvnNukjcUCHBId"
    async function fetchplace() {
      setErrors(true);
      const res = await fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apikey}&q=${zipcode}`);
      res
        .json()
        .then(res => setZiploccode(res))
        .catch(err => setErrors(err));
        console.log(ziploccode)
        setErrors(false);
    }
    async function fetchData(itemKey) {
      const res = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${itemKey}?apikey=${apikey}`);
      res
        .json()
        .then(res => setDate5(res.DailyForecasts))
        .catch(err => setErrors(err));
        console.log(date5)
    }
    useEffect(() => {
    // fetchData();
    // fetchplace();
    ;
  });
  

  return (
    
    <div className="mx-auto max-w-2xl border-none">
      <h2 className="text-xl font-bold text-center py-8">5-day Weather Forecasts</h2>
      <div className="flex justify-around my-20">
        <input className="bg-black text-white p-4 rounded border-gray-800 border" type="number" placeholder="enter zip code" onChange={e => setZipcode(e.target.value)}/>
        <button className="submit-button bg-green-200 p-4 rounded text-gray-900" onClick={handleSubmit}>
            {hasError ? "Searching..." : "Search"}
          </button>
      </div>
        {ziploccode.map((item, i) => {
          if(item.PrimaryPostalCode === zipcode){
            console.log(item)
          return <h1 className="text-2xl cursor-pointer" key={i} onClick = {() => fetchData(item.Key)}>{item.SupplementalAdminAreas[0].EnglishName}</h1>
        }
        })}
       {date5.map((date, i) => {
            console.log(date)
          return <li className="py-4" key={i}><b>Day {i} date {date.Date}</b> <br></br>Minimum Temp= {date.Temperature.Minimum.Value}℉ Maximum Temp= {date.Temperature.Maximum.Value}℉</li>
        })}
      <hr />
      {/* <span>Has error: {JSON.stringify(hasError)}</span> */}
    </div>
  );
};
export default App;