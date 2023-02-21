import React from 'react';
import './App.css';

interface TemperatureProps {
  temp: number;
}

function LiveValue({ temp } : TemperatureProps) {
  let valueColour = '#4a7c47';
  if (temp < 20 || temp > 80) {
    valueColour = '#c23b22';
  }
  
  return (
      <header className="live-value" style={{ color : valueColour }}>
        {`${temp.toString()}°C`}
      </header>
  );
}

export default LiveValue;