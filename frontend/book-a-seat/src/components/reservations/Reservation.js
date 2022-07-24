import React, { useEffect, useState } from "react";
import "./Reservation.css";

const amountShownDays = 7;
const testUserID = 2;

var selectedRoom = null;

const saveButton = (
  <>
    <div id="saveButtonDiv" class="div-hidden">
      <button id="saveButton" class="saveButton" onClick={saveChanges}>
        Save Changes
      </button>
      <br></br>
    </div>
  </>
);

const sendRatingButton = (
  <>
    <div id="sendRatingButton">
      <button id="ratingButton" class="ratingButton" onClick={console.log("save")}>
        Send Review
      </button>
      <br></br>
    </div>
  </>
);

let reservations = [
  {
    id: 1,
    user_id: 3,
    seat_id: "A",
    start: "2022-07-24T12:00:00+02:00",
    duration: 1,
  },
  {
    id: 2,
    user_id: 2,
    seat_id: "B",
    start: "2022-07-25T08:00:00+02:00",
    duration: 3,
  },
  {
    id: 3,
    user_id: 2,
    seat_id: "C",
    start: "2022-07-25T14:00:00+02:00",
    duration: 2,
  },
  {
    id: 4,
    user_id: 1,
    seat_id: "C",
    start: "2022-07-26T11:00:00+02:00",
    duration: 4,
  },
  {
    id: 5,
    user_id: 2,
    seat_id: "C",
    start: "2022-07-26T11:00:00+02:00",
    duration: 6,
  },
  {
    id: 6,
    user_id: 1,
    seat_id: "C",
    start: "2022-07-27T12:00:00+02:00",
    duration: 4,
  },
];

let workspaces = [{name:"1"}, {name:"2"}, {name:"3"}, {name:"4"}, {name:"5"}, {name:"6"}];

let groups = [{name:"a"}, {name:"b"}, {name:"c"}];

function Reservation({token}) {
  console.log(groups1)
  function getWorkspaces() {
    console.log("get workplaces");
    const url = "http://localhost:8000/workspace/";
    const request = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      mode: "cors",
    };
    const sendGet = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      console.log(response);
      if (response.status === 200) {
        console.log("success");
        return await response.json();
      }
    };
    return sendGet();
  }
  
  function getReservations() {
    console.log("get reservations");
    const url = "http://localhost:8000/reservations/";
    const request = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      mode: "cors",
    };
    const sendGet = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      console.log(response);
      if (response.status === 200) {
        console.log("success");
        return await response.json();
      }
    };
    return sendGet();
  }
  
  const getGroups = () => {
    console.log("get groups");
    console.log(token);
    const url = "http://localhost:8000/workspace/group";
    const request = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      mode: "cors",
    };
    const sendGet = async () => {
      const response = await fetch(url, request).catch((error) =>
        console.error("There was an error!", error)
      );
      console.log(response);
      if (response.status === 200) {
        console.log("success");
        return await response.json();
      }
    };
    return sendGet();
  };

  const [workspaces1, setWorkspaces] = useState([]);
  const [reservations1, setReservations] = useState([]);
  const [groups1, setGroups] = useState([]);

  useEffect(() => {
    const setInitialValuses = async () => {
      console.log("set initial values");
      setWorkspaces(await getWorkspaces());
      setReservations(await getReservations());
      setGroups(await getGroups());
    };
    setInitialValuses();
  }, []);

  var currentTime = new Date();

  var days = [];
  for (let i = 0; i < amountShownDays; i++) {
    days.push(getDateFormat(currentTime));
    currentTime.setDate(currentTime.getDate() + 1);
  }

  var times = [];
  for (let i = 8; i < 18; i++) {
    times.push(i);
  }

  const rating_form = (
    <>
    <div id="ratingFormDiv" className="div-hidden">
        <h2 style={{marginTop:"2%", marginBottom:"-2%"}}>Write a review:</h2>
        <form>
        <textarea class="textfield" id="reviewText" rows="3"></textarea>
        {sendRatingButton}
        </form>
        <br></br>
      </div>
    </>
  )
  const r = reservations.filter(checkUser);

  const myReservations = (
    <>
      <br></br>
      <h2>My Reservations:</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Seat</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scape="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {r.map((r, index) => (
            <>
            <tr>
              <td>{r.seat_id}</td>
              <td>{getDateFormat(new Date(r.start))}</td>
              <td>
                {new Date(r.start).getHours() +
                  ":00 - " +
                  (new Date(r.start).getHours() + r.duration) +
                  ":00"}
              </td>
              <td>
                {[...Array(5)].map((star, indexStar) => starRating(star, index, indexStar))}
              </td>
            </tr>
            </>
          ))}
        </tbody>
      </table>

      {rating_form}
    </>
  );

  function starRating(_star, index, indexStar){
    return (
      <span className="star" id={index+"_"+indexStar} onClick={(_e)=>{
        if(document.getElementById(index+"_"+indexStar).className==="star-clicked"){
          for(let i = 0; i<5; i++){
            var element = document.getElementById(index+"_"+i)
            element.className="star"
          }
        } else {
          for(let i = 0; i<5; i++){
            var element = document.getElementById(index+"_"+i)
            element.className="star-clicked"
            if(i>indexStar){
              element.className="star"
            }
          }
          var counter = 0;
          while(document.getElementById(counter+"_"+0)!=null){
            if(counter!=index){
              for(let i = 0; i<5; i++){
                var element = document.getElementById(counter+"_"+i)
                element.className="star"
              }
            }
            counter++;
          }
          var reviewForm = document.getElementById("ratingFormDiv");
          reviewForm.className = "reviewTextForm"
        }
      }}><i class="fa fa-star"></i> </span>
    )
  }
  var counter = 0;

  function seatsInGroup(groupname){
    var showSeats = [];
    for(let i = 0; i<workspaces1.length; i++){
      if(workspaces1[i].group===groupname){
        showSeats.push(workspaces1[i]);
      }
    }
    changeCellWidth(workspaces1.length, groupname, showSeats.length)
    return showSeats;
  }
  

  const table = (
    <>
      <table class="table">
        <thead>
          <tr class="t-row">
            <th scope="col" class="sidebar"></th>
            {days &&
              days.map((e, index) => (
                <th id={"day_" + index} class="t-head" colSpan={groups1.length}>
                  {e}
                </th>
              ))}
          </tr>
          <tr class="t-row">
            <th scope="col" class="sidebar">
              Rooms:
            </th>
            {days &&
              days.map(
                (_day, i) =>
                  groups1 &&
                  groups1.map((group, index) => (
                    <th
                      class="t-head"
                      id={i + "_room_" + index}//buttonRoom(i + "_room_" + index)}
                    >
                      {group.name}
                    </th>
                  ))
              )}
          </tr>
          <tr id="seats-row" class="t-row">
            <th scope="col" class="sidebar">
              Seats:
            </th>
            {days &&
              days.map(
                (_day, i) =>
                  groups1 &&
                  groups1.map((group) => 
                    seatsInGroup(group.name).map((seat) => (
                      <th
                        class="cell-selected"
                        id={i + "_seat_" + 1}
                      >
                        {seat.name}
                      </th>
                    ))
                  )
              )}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr class="t-row">
              <td class="sidebar">
                {times[counter]}:00 - {times[counter++] + 1}:00
              </td>
              {days &&
                days.map(
                  (day) =>
                    groups1 &&
                    groups1.map((group) =>
                      //checkBooked(reservations, group.name, day, time)
                      seatsInGroup(group.name).map((seat) => /*(
                        <th
                          class="cell"
                          id={1 + "_seat_" + 1}
                        >
                        </th>
                      )*/
                      checkBooked(reservations, seat.name, day, time)
                      )
                    )
                )}
            </tr>
          ))}
        </tbody>
      </table>
      {saveButton}
    </>
  );

  /*function buttonRoom(day, index) {
    const id = day + "_room_" + index;
    console.log(id);
    showSeats=workspaces1.filter(function (e) {
        console.log(groups1[selectedGroup].name)
        return e.group==groups1[selectedGroup].name;
    })
    console.log(showSeats)
    var element = document.getElementById(id);
    var row = document.getElementById("seats-row");
    if (element.className === "cell-selected" && selectedRoom==id) {
      for(let i=0; i<amountShownDays; i++){
        var element = document.getElementById(i + "_room_" + index);
        element.className = "t-head";
      }
      row.className = "div-hidden";
      selectedRoom = null;
      changeCellWidth(groups1.length);
    } else if (selectedRoom==null){
      for(let i=0; i<amountShownDays; i++){
        var element = document.getElementById(i + "_room_" + index);
        element.className = "cell-selected";
      }
      row.className = "t-row";
      selectedRoom = id;
      changeCellWidth(workspaces1.length);
    }
  }*/
  

  function changeCellWidth(widthDays, groupname, widthGroup) {
    for(let i = 0; i<amountShownDays; i++){
      var day = document.getElementById("day_"+i);
      day.colSpan = widthDays;
      for(let k = 0; k<groups1.length; k++){
        var group = document.getElementById(i+"_room_"+k);
        if(group!==null && groups1[k].name===groupname){
          group.colSpan = widthGroup;
        }
      }
    }
  }
  

  return (
    <>
      <div className="body">
        <h2>Reservation:</h2>
        {table}
        {myReservations}
      </div>
    </>
  );
}








var selectedSlots_ID = [];

function selectSlotToAdd(id) {
  var e = document.getElementById(id);
  var button = document.getElementById("saveButtonDiv");
  if (e.className === "cell-selected") {
    e.className = "cell";
    selectedSlots_ID = selectedSlots_ID.filter((i) => i !== id);
    if (selectedSlots_ID.length === 0) {
      button.className = "div-hidden";
    }
  } else {
    e.className = "cell-selected";
    selectedSlots_ID.push(id);
    button.className = "div";
  }
}

function editSlot(_workplace, _date, _time, id) {
  var e = document.getElementById(id);
  e.className = "cell-selected";
}

function saveChanges() {
  console.log("Selected Slots: " + selectedSlots_ID);

  // ID strings are being sorted
  var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
  selectedSlots_ID.sort(collator.compare);

  // saving ID strings in int array slotsInt
  var slotsInt = selectedSlots_ID.map((e) => [
    parseInt(e.split("_")[0]),
    e.split("_")[1],
    parseInt(e.split("_")[2]),
  ]);

  // removing all slots that arent the starting time
  var idResStart = []
  slotsInt.map(e => {
    var before = e[0] + "_" + e[1] + "_" + (e[2]-1)
    if(selectedSlots_ID.filter(str => {
      if(str.indexOf(before) !== -1) {
        return true;
      }
    }).length===0){
      idResStart.push(e)
    }
  })

  // figuring out the duration of the reservations
  var lengths = []
  idResStart.map(e => {
    var counter = 1;
    while(slotsInt.some(element => {
      if (element[0] === e[0] && element[1] === e[1] && element[2] === e[2]+counter) {
        return true;
      }
      return false;
    })){
      counter++;
    }
    lengths.push(counter)
  })

  console.log("idResStart")
  console.log(idResStart);
  console.log("lengths " + lengths)

  // add new reservations to database
  // todo: !
}

var diffDays = 0;
var startDay = "";

function checkBooked(reservations, workplace, day, time) {
  let datepieces = day.split(".");
  var date = new Date(
    datepieces[2] + "-" + datepieces[1] + "-" + datepieces[0]
  );

  if (startDay === "") {
    startDay = date;
  }
  diffDays = (date - startDay) / (1000 * 60 * 60 * 24);

  var id = diffDays + "_" + workplace + "_" + time;
  var output = (
    <td id={id} class="cell" onClick={() => selectSlotToAdd(id)}></td>
  );

  console.log(id);

  reservations.forEach((r) => {
    var classCellBooked = "cell-booked";
    if (r.user_id === testUserID) {
      classCellBooked = "cell-booked-user";
    }
    var r_date = new Date(r.start);
    if (r.seat_id == workplace) {
      if (
        date.getDate() === r_date.getDate() &&
        date.getMonth() === r_date.getMonth() &&
        date.getFullYear() === r_date.getFullYear()
      ) {
        if (r_date.getHours() === time) {
          var end = r_date.getHours() + r.duration;
          id =
            diffDays +
            "_" +
            workplace +
            "_" +
            time +
            "-" +
            (time + r.duration - 1);
          if (time >= r_date.getHours() && time < end) {
            output = (
              <td
                id={id}
                class={classCellBooked}
                rowSpan={r.duration}
                onClick={() => editSlot(workplace, date, time, id)}
              ></td>
            );
          }
        } else if (
          time >= r_date.getHours() &&
          r_date.getHours() + r.duration > time
        ) {
          output = "";
        }
      }
    }
  });
  return output;
}

function getDateFormat(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return day + "." + month + "." + year;
}

function checkUser(res) {
  return res.user_id === testUserID;
}

export default Reservation;
