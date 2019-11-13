import http from "k6/http";
import { Trend } from "k6/metrics";

var myTrend = new Trend("waiting_time");

export let options = {
  duration: '20m',
  vus: 100,
  rps: 1000
}

export default function() {
   var r = http.get("http://localhost:3003/?productId=1232");
};