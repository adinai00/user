import axios from "axios";

export function getUsers(cb) {
  axios("https://64340de21c5ed06c958dd2da.mockapi.io/users").then(
    ({ data }) => {
      cb(data);
    }
  );
}
