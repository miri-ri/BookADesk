import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import "./Reservation.css";

const amountShownDays = 7;
var testUserID = 2;

var selectedRoom = null;

function Reservation({ token }) {
  testUserID = jwtDecode(token.access).username;

  function getWorkspaces() {
    console.log("get workplaces");
    const url = "http://34.141.109.26:8000/workspace/";
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
    const url = "http://34.141.109.26:8000/reservations/";
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

  var review_res;
  var review_stars;
  var review_text;
  const sendRatingButton = (
    <>
      <div id="sendRatingButton">
        <button
          id="ratingButton"
          class="ratingButton"
          onClick={() => {
            sendReview(review_res, review_stars, review_text, token);
            window.location.reload(false);
          }}
        >
          Send Review
        </button>
        <br></br>
      </div>
    </>
  );

  const saveButton = (
    <>
      <div id="saveButtonDiv" class="div-hidden">
        <button
          id="saveButton"
          class="saveButton"
          onClick={() => {
            saveChanges(token, reservations, workspaces1);
            window.location.reload(false);
          }}
        >
          Save Changes
        </button>
        <br></br>
      </div>
    </>
  );

  const getGroups = () => {
    console.log("get groups");
    console.log(token);
    const url = "http://34.141.109.26:8000/workspace/group";
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
  const [reservations, setReservations] = useState([]);
  const [groups1, setGroups] = useState([]);

  const [overlayWorkspace, setOverlayWorkspace] = useState();

  const overlayDiv = (
    <>
      <div id="overlay-module" className="div-hidden">
        <div className="overlay"></div>
        <div className="overlay-content">
          <h2>Workspace {overlayWorkspace ? overlayWorkspace.name : ""}</h2>
          <p>Rating: <span className="star-clicked"><i class="fa fa-star"></i></span> {overlayWorkspace ? overlayWorkspace.workspace_rating : "-"}</p>
          {overlayWorkspace ? (overlayWorkspace.is_barrier_free ? <p><span className="check"><i class="fa fa-check"></i></span>  is barrier free</p> : "") : ""}
          {overlayWorkspace ? (overlayWorkspace.has_computer ? <p><span className="check"><i class="fa fa-check"></i></span>  has computer</p> : "") : ""}
          <button onClick={() => {
            var div = document.getElementById("overlay-module");
            div.className = "div-hidden"
          }}>Close</button>
        </div>
      </div>
    </>
  )
  

  useEffect(() => {
    const setInitialValuses = async () => {
      console.log("set initial values");
      setWorkspaces(await getWorkspaces());
      const temp = await getReservations();
      console.log(temp);
      setReservations(temp);
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
        <h2 style={{ marginTop: "2%", marginBottom: "-2%" }}>
          Write a review:
        </h2>
        <form>
          <textarea
            class="textfield"
            id="reviewText"
            rows="3"
            onChange={(e) => (review_text = e.target.value)}
          ></textarea>
        </form>
        {sendRatingButton}
        <br></br>
      </div>
    </>
  );
  const r = reservations.filter(checkUser);

  const myReservations = (
    <>
      {overlayDiv}
      <br></br>
      <h2>My Reservations:</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Group</th>
            <th scope="col">Workspace</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scape="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {r.map((r, index) => (
            <>
              <tr>
                <td className="res-cell">{r.group_id}</td>
                <td className="res-cell">{r.seat_id}</td>
                <td className="res-cell">{getDateFormat(new Date(r.start))}</td>
                <td className="res-cell">
                  {new Date(r.start).getHours() +
                    ":00 - " +
                    (new Date(r.start).getHours() + r.duration) +
                    ":00"}
                </td>
                <td className="res-cell">
                  {r.is_rated ? <span className="check"><i class="fa fa-check"></i></span> : [...Array(5)].map((star, indexStar) =>
                    starRating(star, index, indexStar, r)
                  )}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>

      {rating_form}
    </>
  );

  function starRating(_star, index, indexStar, res) {
    if(new Date(res.start)>new Date()){return null;}
    return (
      <span
        className="star"
        id={index + "_" + indexStar}
        onClick={(_e) => {
          if (
            document.getElementById(index + "_" + indexStar).className ===
            "star-clicked"
          ) {
            for (let i = 0; i < 5; i++) {
              var element = document.getElementById(index + "_" + i);
              element.className = "star";
            }
          } else {
            review_stars = indexStar + 1;
            review_res = res;
            for (let i = 0; i < 5; i++) {
              var element = document.getElementById(index + "_" + i);
              element.className = "star-clicked";
              if (i > indexStar) {
                element.className = "star";
              }
            }
            var counter = 0;
            while (document.getElementById(counter + "_" + 0) != null) {
              if (counter != index) {
                for (let i = 0; i < 5; i++) {
                  var element = document.getElementById(counter + "_" + i);
                  element.className = "star";
                }
              }
              counter++;
            }
            var reviewForm = document.getElementById("ratingFormDiv");
            reviewForm.className = "rewieTextForm";
          }
        }}
      >
        <i class="fa fa-star"></i>{" "}
      </span>
    );
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
              Groups:
            </th>
            {days &&
              days.map(
                (_day, i) =>
                  groups1 &&
                  groups1.map((group, index) => (
                    <th
                      class="t-head"
                      id={i + "_room_" + index}
                    >
                      {group.name}
                    </th>
                  ))
              )}
          </tr>
          <tr id="seats-row" class="t-row">
            <th scope="col" class="sidebar">
              Workspaces:
            </th>
            {days &&
              days.map(
                (_day, i) =>
                  groups1 &&
                  groups1.map((group) => 
                    seatsInGroup(group.name).map((seat) => (
                      <th
                        class="t-head"
                        id={i + "_seat_" + 1}
                        onClick={()=>{
                          var div = document.getElementById("overlay-module");
                          div.className = "overlay-module"
                          setOverlayWorkspace(seat);
                        }}
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
                      seatsInGroup(group.name).map((seat) => 
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
  } else if(e.className === "cell"){
    e.className = "cell-selected";
    selectedSlots_ID.push(id);
    button.className = "div";
  }
}

function editSlot(_workplace, _date, _time, id) {
  var e = document.getElementById(id);
  e.className = "cell-selected";
}

function saveChanges(token, reservations, workspaces) {
  console.log("Selected Slots: " + selectedSlots_ID);

  // ID strings are being sorted
  var collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  selectedSlots_ID.sort(collator.compare);

  // saving ID strings in int array slotsInt
  var slotsInt = selectedSlots_ID.map((e) => [
    parseInt(e.split("_")[0]),
    e.split("_")[1],
    parseInt(e.split("_")[2]),
  ]);

  // removing all slots that arent the starting time
  var idResStart = [];
  slotsInt.map((e) => {
    var before = e[0] + "_" + e[1] + "_" + (e[2] - 1);
    if (
      selectedSlots_ID.filter((str) => {
        if (str.indexOf(before) !== -1) {
          return true;
        }
      }).length === 0
    ) {
      idResStart.push(e);
    }
  });

  // figuring out the duration of the reservations
  var lengths = [];
  idResStart.map((e) => {
    var counter = 1;
    while (
      slotsInt.some((element) => {
        if (
          element[0] === e[0] &&
          element[1] === e[1] &&
          element[2] === e[2] + counter
        ) {
          return true;
        }
        return false;
      })
    ) {
      counter++;
    }
    lengths.push(counter);
  });

  console.log("idResStart");
  console.log(idResStart);
  console.log("lengths " + lengths);

  // add new reservations to database
  sendSaveRequest(token, reservations, idResStart, lengths, workspaces);
}

function sendReview(res, stars, text, token) {
  const review = {
    workspace: res.seat_id,
    reservation: res.res_id,
    review: text,
    star_rating: stars,
  };
  console.log(review);
  const url = "http://34.141.109.26:8000/workspace/rating/add/";
  const request = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token.access}`,
    },
    mode: "cors",
    body: JSON.stringify(review),
  };
  const sendGet = async () => {
    const response = await fetch(url, request).catch((error) =>
      console.error("There was an error!", error)
    );
    console.log(response);
    if (response.status === 200 || response.status === 201) {
      console.log("success");
      return await response.json();
    }
  };
  sendGet();
}

function sendSaveRequest(token, reservations, idResStart, lengths, workspaces) {
  const url = "http://34.141.109.26:8000/reservations/";
  for (let i = 0; i < idResStart.length; i++) {
    let id = (reservations ? reservations.length + i : 0 + i).toString();
    var startDate = new Date();
    startDate.setDate(startDate.getDate() + idResStart[i][0]);
    startDate.setHours(idResStart[i][2], 0, 0);
    var data = workspaces.find(
      (workspace) => workspace.name === idResStart[i][1]
    );
    console.log(data);
    console.log(new Date(startDate.toString()));
    const new_reservation = {
      id,
      res_id: id,
      username: jwtDecode(token.access).username,
      seat_id: idResStart[i][1],
      group_id: data ? data.group : "dummy", // TODO: brauchen wir die group id?
      start: startDate.toString(),
      duration: lengths[i],
      is_rated: false,
    };
    console.log(new_reservation);
    const request = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.access}`,
      },
      mode: "cors",
      body: JSON.stringify(new_reservation),
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
    sendGet();
  }
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
    if (r.username === testUserID) {
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
  return res.username === testUserID;
}

export default Reservation;
