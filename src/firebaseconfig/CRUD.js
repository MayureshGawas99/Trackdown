import React, { useContext, useState } from "react";
import { ref, set, get, child } from "firebase/database";
import { MapContext } from "../App";

export const addData = async (db, user, cord) => {
  try {
    await set(ref(db, "Users/" + user), { cord });
  } catch (error) {
    console.log(error);
  }
};

export const selectData = async (db, useremail) => {
  const dbref = ref(db);
  const snapshot = await get(child(dbref, "Users/" + useremail));
  if (snapshot.exists()) {
    const rcord = snapshot.val().cord;
    return rcord;
  } else {
    return null;
  }
};

export const getUserFromEmail = (email) => {
  const letters = new Set([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ]);
  let user = "";
  for (let i = 0; i < email.length; i++) {
    if (letters.has(email.charAt(i))) {
      user = user + email.charAt(i);
    }
  }
  return user;
};

export default function CRUD() {
  const [user, setUser] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const { db } = useContext(MapContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const ans = getUserFromEmail(user);

      addData(db, ans, { lat, lng });
    } catch (error) {
      console.log(error);
    }
  };
  const getinfo = async () => {
    try {
      const ans = getUserFromEmail(user);
      const res = await selectData(db, ans);
      console.log(ans, res);

      //   addData(db, ans, { lat, lng });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user" name="user"></label>
          <input
            type="text"
            id="user"
            val={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="lat" name="lat"></label>
          <input
            type="text"
            id="lat"
            val={lat}
            onChange={(e) => {
              setLat(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="lng" name="lng"></label>
          <input
            type="text"
            id="lng"
            val={lng}
            onChange={(e) => {
              setLng(e.target.value);
            }}
          />
        </div>
        <button type="submit">submit</button>
      </form>
      <button onClick={getinfo}>get</button>
    </div>
  );
}
