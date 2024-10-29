import { useEffect, useState } from 'react'


const App = () => {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  });

  const todaysDate = new Date();
  // console.log(todaysDate); // "2024-10-29T08:07:31.334Z"
  // console.log(todaysDate.toLocaleString()); // "29/10/2024, 13:37:31"

  const time = todaysDate.toLocaleTimeString();
  // console.log(time);
  const onlyHours = todaysDate.getHours();
  //console.log(onlyHours);
  const onlyMin = todaysDate.getMinutes();
  //console.log(onlyMin);
  const onlySec = todaysDate.getSeconds();
 // console.log(onlySec);
  const ampm = onlyHours >= 12 ? "PM" : "AM";
  //console.log(ampm);

  const date = todaysDate.toLocaleDateString();
  //console.log(date);
  const onlyDate = todaysDate.getDate();
  //console.log(onlyDate);
  const onlyMonth = todaysDate.getMonth() + 1;
  //console.log(onlyMonth);
  const onlyYear = todaysDate.getFullYear();
  //console.log(onlyYear);

  return (
    <div>
      <div>Date: {date}</div>
      <div>Time: {time}</div>
      <div>Date and Time (Togather): {todaysDate.toLocaleString()}</div>
      <div>
        Date and Time (individual): {onlyDate}/{onlyMonth},{onlyYear},{" "}
        {onlyHours}:{onlyMin}:{onlySec}
      </div>
      <div>Current Time: {clock.toLocaleTimeString()}</div>
    </div>
  );
};

export default App
