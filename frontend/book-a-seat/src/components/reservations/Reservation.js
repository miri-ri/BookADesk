import React from "react";
import './Reservation.css'

function Reservation() {
  const reservations = [
      {
        id: 1,
        user_id: 3,
        seat_id: 1,
        start: "2022-06-10T12:00:00Z",
        duration: 60,
      },
      {
        id: 2,
        user_id: 2,
        seat_id: 2,
        start: "2022-06-09T08:00:00Z",
        duration: 90,
      },
      {
        id: 3,
        user_id: 2,
        seat_id: 1,
        start: "2022-06-10T14:00:00Z",
        duration: 120,
      }
  ]

  var currentTime = new Date()

  var days = [];
  for (let i = 0; i < 7; i++) {
      currentTime.setDate(currentTime.getDate() + 1)
      var day = currentTime.getDate()
      var month = currentTime.getMonth() + 1
      var year = currentTime.getFullYear()
      days.push(day + "." + month + "." + year);
  }

  var times = [];
  times.push("");
  for (let i = 8; i < 18; i++) {
    times.push(i + ":00 - " + (i+1) + ":00");
  }


  return (
    <>
      <h2>Reservation:</h2>
      <div class="res-table">
        <div class="res-sidebar">
          <div class="res-col">Times:</div>  
          { times && times.map(e => <div class="res-col">{e}</div>) }
        </div>
        <div class="res-header">
          { days && days.map(e => <div class="res-header-col">{e}</div>) }
        </div>
        <div class="res-content">
          { days.map(item => <div class="res-content-col">{col(times)}</div>) }
        </div>
      </div>
    </>
  );
}

function col(times) {
  var c=0;
  return ( times.map(e => <div class="res-content-cell" id={c++}>{e}</div>) );
}

export default Reservation;
