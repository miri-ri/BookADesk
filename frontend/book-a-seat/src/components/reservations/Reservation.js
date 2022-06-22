import React from "react";
import './Reservation.css'

const amountShownDays = 7;

let reservations = [
  {
    id: 1,
    user_id: 3,
    seat_id: 1,
    start: "2022-06-25T12:00:00+02:00",
    duration: 1,
  },
  {
    id: 2,
    user_id: 2,
    seat_id: 2,
    start: "2022-06-26T08:00:00+02:00",
    duration: 3,
  },
  {
    id: 3,
    user_id: 2,
    seat_id: 1,
    start: "2022-06-23T14:00:00+02:00",
    duration: 2,
  },
  {
    id: 4,
    user_id: 1,
    seat_id: 3,
    start: "2022-06-23T11:00:00+02:00",
    duration: 4,
  }
]

function Reservation() {
  var workplaces = ["1", "2", "3", "4", "5"];

  var currentTime = new Date()

  var days = [];
  for (let i = 0; i < amountShownDays; i++) {
      var day = currentTime.getDate()
      var month = currentTime.getMonth() + 1
      var year = currentTime.getFullYear()
      days.push(day + "." + month + "." + year);
      currentTime.setDate(currentTime.getDate() + 1);
  }

  var times = [];
  for (let i = 8; i < 18; i++) {
    times.push(i);
  }

  var counter = 0;


  const table = (
    <>
      <table class="table">
        <thead>
          <tr class="t-row">
            <th scope="col" class="sidebar" rowspan="2"></th>
            { days && days.map(e => <th class="t-head" colspan="5">{e}</th>) }
          </tr>
          <tr class="t-row">
          { days && days.map(day => (
            workplaces && workplaces.map(workplace => <th class="t-head">{workplace}</th>)
          )) }
          </tr>
        </thead>
        <tbody>
          {times.map(time => (
            <tr class="t-row">
              <td class="sidebar">{times[counter]}:00 - {times[counter++]+1}:00</td>
              { days && days.map(day => (
                workplaces && workplaces.map(workplace => checkBooked(workplace, day, time))
              )) }
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )


  return (
    <>
      <h2>Reservation:</h2>
        {table}
    </>
  );
}


function checkBooked(workplace, day, time) {
  var output = <td class="cell" onclick='log();'></td>;

  let datepieces = day.split('.');
  var date = new Date(datepieces[2]+"-"+datepieces[1]+"-"+datepieces[0]);

  reservations.forEach((r, i) => {
    if(r.seat_id==workplace){
      var r_date = new Date(r.start);
      if(date.getDate()==r_date.getDate() && date.getMonth()==r_date.getMonth() && date.getFullYear()==r_date.getFullYear()){
        var end = r_date.getHours() + r.duration;
        if(time>=r_date.getHours() && time<end){
          output = <td class="cell-booked" rowspan="1"></td>;
        }
      }
    }
  });
  return output;

  function log() {
    console.log("Test!");
  }
}

export default Reservation;
