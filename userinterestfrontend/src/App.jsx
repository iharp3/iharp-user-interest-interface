import { useState, useEffect, useContext } from 'react'
import { BoundsContext } from './util/context/BoundsContext'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MyMap from "./components/Map"
import dayjs from 'dayjs'
import './App.css'


function App() {

  const [variable, setVariable] = useState("2m_temperature");
  const [startDate, setStartDate] = useState(dayjs("2023-01-01T00:00Z"));
  const [endDate, setEndDate] = useState(dayjs("2023-12-31T23:00Z"));
  const [isLoading, setIsLoading] = useState(false);
  const [queryResponse, setQueryResponse] = useState("");

  const { drawnShapeBounds, setDrawnShapeBounds } = useContext(BoundsContext);

  const [formData, setFormData] = useState({
    requestType: "",
    variable: variable,
    startDateTime: startDate,
    endDateTime: endDate,
    temporalResolution: "year",
    max_lat: 84,
    min_lat: 59,
    max_lon: -10,
    min_lon: -74,
    spatialResolution: 1,
    // temporalAggregation: "mean",
    // spatialAggregation: "mean",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      variable: variable,
      startDateTime: startDate,
      endDateTime: endDate,
    }))
  }, [variable, startDate, endDate]);

  const handleChange = (e) => {
    // console.log(e);
    console.log(formData);
    let myValue;
    const { name, value } = e.target;
    // Convert the input value to a number
    if (
      name === "north" ||
      name === "south" ||
      name === "east" ||
      name === "west"
    ) {
      let numericValue = parseFloat(value);

      // Define the range boundaries based on the input name
      let min, max;
      if (name === "north" || name === "south") {
        min = -90;
        max = 90;
      } else if (name === "east" || name === "west") {
        min = -180;
        max = 180;
      }

      // Clamp the value to the range
      numericValue = Math.min(Math.max(numericValue, min), max);
      myValue = numericValue;
      // Update the form data with the clamped value

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: numericValue,
      }));
    } else {
      // For other inputs, update the form data as usual
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
      // settemporalResolutionSelected(value !== "");
    }
    if (drawnShapeBounds) {
      setDrawnShapeBounds((prevBounds) => ({
        _southWest: {
          lat: name === "south" ? myValue : prevBounds._southWest.lat,
          lng: name === "west" ? myValue : prevBounds._southWest.lng,
        },
        _northEast: {
          lat: name === "north" ? myValue : prevBounds._northEast.lat,
          lng: name === "east" ? myValue : prevBounds._northEast.lng,
        },
      }));
    } else {
      if (formData.min_lat && formData.max_lat && formData.max_lon && formData.min_lon) {
        console.log(formData);
        setDrawnShapeBounds(() => ({
          _southWest: {
            lat: formData.min_lat,
            lng: formData.min_lon,
          },
          _northEast: {
            lat: formData.max_lat,
            lng: formData.max_lon,
          },
        }));
      }
    }
  };

  const getTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  const handleQueryResponse = (msg) => {
    const time = getTime();
    setQueryResponse(`${msg} (${time})`)
    console.log(`${msg} (${time})`);
    setTimeout(() => {
      setQueryResponse("")
    }, 10000)
  }

  const queryData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/query/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        handleQueryResponse("Successfully Queried Data");
      }
      else {
        handleQueryResponse("Failed to Query Data");
        const errorResponse = await response.json();
        console.error(
          "Failed to fetch areas. HTTP status:",
          response.status,
          "Error message:",
          errorResponse.error
        );
      }
    } catch (error) {
      console.error("Error fetching data", error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (drawnShapeBounds) {
      const north_val = drawnShapeBounds._northEast.lat;
      const east_val = drawnShapeBounds._northEast.lng;
      const south_val = drawnShapeBounds._southWest.lat;
      const west_val = drawnShapeBounds._southWest.lng;

      setFormData((prevFormData) => ({
        ...prevFormData,
        max_lat: north_val,
        max_lon: east_val,
        min_lat: south_val,
        min_lon: west_val,
      }));
    }
  }, [drawnShapeBounds]);

  return (
    <>
      <Header />
      <div className="main_wrapper">
        <Sidebar
          variable={formData.variable}
          setVariable={setVariable}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          formData={formData}
          handleChange={handleChange}
          queryData={queryData}
          isLoading={isLoading} 
          queryResponse={queryResponse}/>
        <div className="main_content">
          <MyMap/>
        </div>
      </div>
    </>
  )
}

export default App;