import React, { useState } from "react";
import DatePicker from "react-datepicker";
export default function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
    </div>
  );
}

// https://refine.dev/blog/react-date-picker/#select-range-within-one-component

import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div>
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        startDate={startDate}
      />
    </div>
  );
}

import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div>
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        startDate={startDate}
      />
      <DatePicker
        selectsEnd
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        endDate={endDate}
        startDate={startDate}
        minDate={startDate}
      />
    </div>
  );
}