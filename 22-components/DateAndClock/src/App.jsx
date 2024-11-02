import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [clock, setClock] = useState(new Date());
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setClock(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 100);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const todaysDate = new Date();
  const time = todaysDate.toLocaleTimeString();
  const onlyHours = todaysDate.getHours();
  const onlyMin = todaysDate.getMinutes();
  const onlySec = todaysDate.getSeconds();
  const ampm = onlyHours >= 12 ? "PM" : "AM";
  const date = todaysDate.toLocaleDateString();
  const onlyDate = todaysDate.getDate();
  const onlyMonth = todaysDate.getMonth() + 1;
  const onlyYear = todaysDate.getFullYear();

  const string = 'Hello World';

  return (
    <div className="main-container">
      {/* Date and Time Section */}
      <div className="date-time-section">
        <div className="section-title">Date and Time Information</div>
        <div className="current-time">
          Current Time: {clock.toLocaleTimeString()}
        </div>
        <div>Date: {date}</div>
        <div>Time: {time}</div>
        <div>Date and Time (Together): {todaysDate.toLocaleString()}</div>
        <div>
          Date and Time (Individual): {onlyDate}/{onlyMonth}/{onlyYear}, {onlyHours}:{onlyMin}:{onlySec} {ampm}
        </div>
      </div>

      {/* Math Section */}
      <div className="math-section">
        <div className="section-title">Math Operations</div>

        <div className="math-floor">
          {/* rounds a number downward to the nearest integer */}
          Math Floor 2.7 = {Math.floor(2.7)}
        </div>

        <div className="math-ceil">
          {/* rounds a number upward to the nearest integer */}
          Math ceil 2.2 = {Math.ceil(2.2)}<br />
          Math ceil 2.5 = {Math.ceil(2.5)}<br />
          Math ceil 2.8 = {Math.ceil(2.8)}
        </div>

        <div className="math-round">
          Math Round 2.3 = {Math.round(2.3)}<br />
          Math Round 2.5 = {Math.round(2.5)}<br />
          Math Round 2.9 = {Math.round(2.9)}
        </div>

        <div className="math-random">
          Math Random = {Math.random()}<br />
          Math Random with Round = {Math.round(Math.random() * 10)}<br />
          Math Random with floor = {Math.floor(Math.random() * 10)}<br />
          Math Random with floor from 1 to 100 = {Math.floor(Math.random() * 100) + 1}<br />
          Math Random with floor from 1 to 10 = {Math.floor(Math.random() * 10) + 1}
        </div>

        <div className='math-max'>
          Math Max 10, 20, 30 = {Math.max(10, 20, 30)}<br />
          Math Min 10, 20, 30 = {Math.min(10, 20, 30)}
        </div>

        <div className='string-concept'>
          This is a string: {string} <br />
          String Length: {string.length} <br />
          String to Upper Case: {string.toUpperCase()} <br />
          String to Lower Case: {string.toLowerCase()} <br />
          String Slice 0 to 5: {string.slice(0, 5)} <br />
          String Split: {string.split(' ')} <br />
          String Split: {string.split('o')} <br />
          String Replace: {string.replace('World', 'Everyone')} <br />
          String Concat: {string.concat('!')} <br />
          String Join: {['Hello', 'World'].join(' ')} <br />
          String includes Hello: {string.includes('Hellow') ? 'yes' : 'no'} <br />
        </div>
      </div>
      {
        showScrollToTop && (
          <button
            onClick={scrollToTop}
          >
            /\
          </button>
        )
      }
    </div>
  );
};

export default App;