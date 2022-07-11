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
    seat_id: "a",
    start: "2022-07-14T12:00:00+02:00",
    duration: 1,
  },
  {
    id: 2,
    user_id: 2,
    seat_id: "b",
    start: "2022-07-15T08:00:00+02:00",
    duration: 3,
  },
  {
    id: 3,
    user_id: 2,
    seat_id: "a",
    start: "2022-07-15T14:00:00+02:00",
    duration: 2,
  },
  {
    id: 4,
    user_id: 1,
    seat_id: "c",
    start: "2022-07-16T11:00:00+02:00",
    duration: 4,
  },
  {
    id: 5,
    user_id: 2,
    seat_id: "c",
    start: "2022-07-16T11:00:00+02:00",
    duration: 6,
  },
  {
    id: 6,
    user_id: 1,
    seat_id: "c",
    start: "2022-07-17T12:00:00+02:00",
    duration: 4,
  },
];

let workspaces = [{name:"1"}, {name:"2"}, {name:"3"}, {name:"4"}, {name:"5"}, {name:"6"}];

let groups = [{name:"a"}, {name:"b"}, {name:"c"}];

function getWorkspaces() {
  console.log("get workplaces");
  const url = "http://localhost:8000/workspace/";
  const request = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
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

function getGroups(){
  console.log("get reservations");
  const url = "http://localhost:8000/workspace/groups";
  const request = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
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



function Reservation() {
  /*const [workspaces, setWorkspaces] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const setInitialValuses = async () => {
      console.log("set initial values");
      setWorkspaces(await getWorkspaces());
      setReservations(await getReservations());
      setGroups(await getGroups());
    };
    setInitialValuses();
  }, []);*/

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
    <div className="reviewTextForm">
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

  function starRating(star, index, indexStar){
    return (
      <span className="star" id={r+"_"+indexStar} onClick={(e)=>{console.log(e)}}><i class="fa fa-star"></i> </span>
    )
  }

  var counter = 0;

  var col = groups.length;

  var selectedRoom = 0;

  const seats = (
    <>
      <tr id="seats-row" class="div-hidden">
        <th scope="col" class="sidebar">
          Seats:
        </th>
        {days &&
          days.map(
            (day, i) =>
              workspaces &&
              workspaces.map((workspace, index) => (
                <th
                  class="cell-selected"
                  id={i + "_seat_" + index}
                >
                  {workspace.name}
                </th>
              ))
          )}
      </tr>
    </>
  );

  const table = (
    <>
      <table class="table">
        <thead>
          <tr class="t-row">
            <th scope="col" class="sidebar"></th>
            {days &&
              days.map((e, index) => (
                <th id={"day_" + index} class="t-head" colSpan={col}>
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
                (day, i) =>
                  groups &&
                  groups.map((group, index) => (
                    <th
                      class="t-head"
                      id={i + "_room_" + index}
                      onClick={(e) => buttonRoom(i + "_room_" + index)}
                    >
                      {group.name}
                    </th>
                  ))
              )}
          </tr>
          {seats}
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
                    groups &&
                    groups.map((group) =>
                      checkBooked(reservations, group.name, day, time)
                    )
                )}
            </tr>
          ))}
        </tbody>
      </table>
      {saveButton}
    </>
  );

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

function buttonRoom(id) {
  console.log(id);
  var element = document.getElementById(id);
  var row = document.getElementById("seats-row");
  if (element.className === "cell-selected" && selectedRoom==id) {
    element.className = "t-head";
    row.className = "div-hidden";
    selectedRoom = null;
    changeCellWidth(groups.length);
  } else if (selectedRoom==null){
    element.className = "cell-selected";
    row.className = "t-row";
    selectedRoom = id;
    changeCellWidth(6); //todo: zugehörige Workspaces pro Gruppe auslesen
  }
}

function changeCellWidth(width) {
  for(let i = 0; i<amountShownDays; i++){
    var day = document.getElementById("day_"+i);
    day.colSpan = width;
    for(let k = 0; k<3; k++){
      var group = document.getElementById(i+"_room_"+k);
      group.colSpan = width/3;
    }
  }
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
  console.log("Selected Slots: " + selectedSlots_ID);
}

function editSlot(workplace, date, time, id) {
  var e = document.getElementById(id);
  e.className = "cell-selected";
}

function saveChanges() {
  /*var cutWorkplace = selectedSlots_ID.map(id => (id.split('_')[0] +"_"+ id.split('_')[1]))
  var findDuplicates = cutWorkplace => cutWorkplace.filter((item, index) => cutWorkplace.indexOf(item) !== index)
  var c = 0;
  var duplicats = [];
  selectedSlots_ID.map(id => findDuplicates(cutWorkplace).filter(d => d===id.split('_')[0] +"_"+ id.split('_')[1])).map(item => {
    if(item.length!=0){
      item = selectedSlots_ID[c]
      duplicats.push(item)
    }
    c++;
  })
  var resWithoutDuplicats = selectedSlots_ID
  console.log(duplicats)*/

  var slotsInt = selectedSlots_ID.map((e) => [
    parseInt(e.split("_")[0]),
    parseInt(e.split("_")[1]),
    parseInt(e.split("_")[2]),
  ]);
  var duplicates = slotsInt.map((i) => {
    var later = [i[0], i[1], i[2] + 1];
    if (
      slotsInt.filter(
        (f) => later[0] == f[0] && later[1] == f[1] && later[2] == f[2]
      ).length != 0
    ) {
      console.log("earlier(i): " + i + ", later: " + later);
      return i;
    }
  });
  console.log(slotsInt);
  console.log(duplicates);
  // for loop über alle slots, counter für einen slot (auf platz 0 und 1), add to array[id, duration]
  var reservations = [];
  slotsInt.map((e) => {
    var duration = 1;
    for (let i = 0; i < duplicates.length; i++) {
      if (
        duplicates[i] != undefined &&
        e[0] == duplicates[i][0] &&
        e[1] == duplicates[i][1]
      ) {
        duplicates[i] = undefined;
        duration++;
      }
    }
    reservations.push([e, duration]);
  });
  console.log(reservations);
  var fil = reservations.filter((a) => a[1] != 1);
  console.log(fil);

  // einzelne Slots werden zu längeren hinzugefügt
  // ursprüngliche Liste wird durchgegangen, wenn element[0 und 1] gleich und [2]>=res[2] und [2]<res[2]+duration
  var allRes = slotsInt.map((e) => {
    if (e[0]) {
    }
  });
  // remove duplicates from slots
  // add other slots as duration 1 (for loop oder map mit push funktion)
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
