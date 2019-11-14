import http from "k6/http";
import { check } from "k6";

export let options = {
  duration: '2m',
  vus: 100,
  rps: 1000
}

export default function() {
   var randomNum = Math.floor(Math.random()*9999990 + 1);
   var res1 = http.get(`http://localhost:3003/products/${randomNum}`);
   check(res1, {
    "is status 200": (r) => r.status === 200
  });
};