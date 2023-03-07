import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../../assets/subscribe.scss";
import KhaltiCheckout from "khalti-checkout-web";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { doLogout, getCurrentUserDetail } from "../../connection/UserService";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

const plans = [
  {
    id: 3,
    name: "Premium",
    price: 100,
    features: [
      "Access to this song",
      "Access to all songs",
      "High-quality audio",
    ],
  },
];

export default function SubscriptionModal({ open, handleClose }) {
const [modelOpen, setModelOpen]= useState(open)
  const [amount, setAmount] = useState(100);
  const [usertoken, setToken] = useState();
  const navigate = useNavigate("");

  useEffect(() => {
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${usertoken}`,
    },
  };

  const handleSubmit = (event) => {
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    const checkout = new KhaltiCheckout(khalticonfig);
    checkout.show({ amount: amount * 100 }); // convert to paisa
    event.preventDefault();
  };

  const khalticonfig = {
    // replace this key with yours
    publicKey: "test_public_key_8d18f4ecc9514345a2f52fcb549336ac",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: "http://localhost:5000/v1/khalti/payment",
    eventHandler: {
      onSuccess: (payload) => {
        // hit merchant api for initiating verification
        console.log(payload);
        const data = {
          token: payload?.token,
          amount: amount * 100,
        };
        console.log(data);
        axios
          .post("/v1/khalti/payment", data, config)
          .then((response) => {
            console.log(response.data);
            toast.success("payment successfull");
            setModelOpen(false)

            doLogout(() => {
              navigate("/");
            });
            toast.success("Login Again To play your premium songs");



          
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onError: (error) => {
        // handle errors
        console.log(error);
      },
      onClose: () => {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Modal
      open={modelOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="title"
        >
          Choose Your Plan
        </Typography>
        <Box className="plans-container">
          {plans.map((plan) => (
            <Box key={plan.id} className="plan">
              <Typography variant="h6" component="h3">
                {plan.name}
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                className="price"
              >{`Rs ${plan.price}`}</Typography>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <form onSubmit={handleSubmit}>
                <button type="submit" method="POST">
                  Pay with Khalti
                </button>
              </form>
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
}
