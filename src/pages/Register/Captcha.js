import React, { useState } from "react";
import "../../assets/captcha.scss";
import { toast } from "react-hot-toast";
import { TextField } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function Captcha() {
  const [captcha1, setCaptcha1] = useState("");
  const [cap, setCap] = useState("");
  const handleAutoRenew = () => {
    var a = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
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
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
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
      "!",
      "@",
      "#",
      "$",
      "%",
      "&",
      "@",
      "#",
      "$",
      "%",
      "&",
    ];
    var newCap = "";
    for (var i = 1; i <= 6; i++) {
      var r = Math.floor(Math.random() * 62);
      newCap = newCap + a[r];
    }
    setCap(newCap);
  };

  const handleCaptcha = () => {
    if (cap === captcha1) {
      toast.success(" ");
    } else {
      toast.error("Invalid Captcha");
    }
  };

  return (
    <div className="captcha">
      <TextField className="captcha_code" variant="filled" value={cap} />

      <TextField
        className="captcha_text"
        value={captcha1}
        onChange={(e) => setCaptcha1(e.target.value)}
      />
      <div className="icons">
        <AutorenewIcon onClick={handleAutoRenew} />
        <CheckBoxIcon onClick={handleCaptcha} />
      </div>
    </div>
  );
}
