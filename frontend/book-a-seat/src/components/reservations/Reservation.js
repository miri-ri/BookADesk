import React from "react";
import './Reservation.css'

const amountShownDays = 7;
const testUserID = 2;

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
    start: "2022-06-24T14:00:00+02:00",
    duration: 2,
  },
  {
    id: 4,
    user_id: 1,
    seat_id: 3,
    start: "2022-06-24T11:00:00+02:00",
    duration: 4,
  },
  {
    id: 5,
    user_id: 2,
    seat_id: 3,
    start: "2022-06-27T11:00:00+02:00",
    duration: 6,
  }
]

let workplaces = ["1", "2", "3", "4", "5"];

function Reservation() {

  var currentTime = new Date()

  var days = [];
  for (let i = 0; i < amountShownDays; i++) {
      days.push(getDateFormat(currentTime));
      currentTime.setDate(currentTime.getDate() + 1);
  }

  var times = [];
  for (let i = 8; i < 18; i++) {
    times.push(i);
  }

  var counter = 0;

  var col = workplaces.length;

  const table = (
    <>
      <table class="table">
        <thead>
          <tr class="t-row">
            <th scope="col" class="sidebar" rowSpan="2"></th>
            { days && days.map(e => <th id="dynAmountSeats" class="t-head" colSpan={col}>{e}</th>) }
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
      <h2>My Reservations:</h2>
        {myReservations}
    </>
  );
}

function doSmth(text) {
  console.log(text)  
  return (
    <div class="popup">
      <p>Hello!</p>
      <button>Close Popup</button>
    </div>
  );
}

var diffDays = 0;
var startDay = "";

function checkBooked(workplace, day, time) {

  let datepieces = day.split('.');
  var date = new Date(datepieces[2]+"-"+datepieces[1]+"-"+datepieces[0]);

  if(startDay==""){
    startDay=date;
  } 
  diffDays=(date-startDay)/(1000*60*60*24);
  

  var id = diffDays + "_" + workplace + "_" + time;
  var output = <td id={id} class="cell" onClick={() => doSmth("Hello World!")}></td>;

  reservations.forEach((r) => {
    var classCellBooked = "cell-booked"
    if(r.user_id==testUserID){
      classCellBooked = "cell-booked-user"
    }
    var r_date = new Date(r.start);
    if(r.seat_id==workplace){
      if(date.getDate()==r_date.getDate() && date.getMonth()==r_date.getMonth() && date.getFullYear()==r_date.getFullYear()){
        if(r_date.getHours()==time){
          var end = r_date.getHours() + r.duration;
          id = diffDays + "_" + workplace + "_" + time + "-" + (time+r.duration-1);
          if(time>=r_date.getHours() && time<end){
            output = <td id={id} class={classCellBooked} rowSpan={r.duration}></td>;
          }
        } else if (time>=r_date.getHours() && r_date.getHours()+r.duration>time){
          output = "";
        }
      } 
    }
  });
  return output;
}

const r = reservations.filter(checkUser)

const myReservations = (
  <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Seat</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {r.map((r) => (
            <tr>
              <td>{r.seat_id}</td>
              <td>{getDateFormat(new Date(r.start))}</td>
              <td>{new Date(r.start).getHours()+":00 - " + (new Date(r.start).getHours()+r.duration) + ":00"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
)

function getDateFormat(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return day + "." + month + "." + year;
}

function checkUser(res){
  return res.user_id==testUserID;
}


export default Reservation;
