require("dotenv").config();

const axios = require("axios");

var http = require("http");

http.createServer(function(req, res) {
    res.write("Hello World!");
    res.end(); 
  }).listen(process.env.PORT || 5000); 


const key = process.env.CLOCKIFY_API_KEY || "";
const keys = [
  { key, h: 0 }
];
const url = `https://api.clockify.me/api/v1`;

if (!key) {
  console.log(
    `API key must be provided through 'CLOCKIFY_API_KEY' env variable. Get one at https://clockify.me/user/settings`
  );

  process.exit(1);
}

(async () => {
  keys.forEach(async (key) => {
    const axiosResponse = await axios.get(`${url}/user`, {
      headers: {
        "X-Api-Key": key.key,
      },
    });
    console.log(`Welcome ${axiosResponse.data.name}`);
  });

  setInterval(async () => {
    d = new Date();

    if (d.getDay() != 0 && d.getDay() != 6) {
      if (d.getHours() == 16 && d.getMinutes() == 5) {
        async function process(key, i, h) {
          console.log("entrou");

          const start1 = new Date(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            9 - h
          );
          const end1 = new Date(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            13 - h
          );
          const start2 = new Date(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            14 - h
          );
          const end2 = new Date(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            18 - h
          );

          headers = {
            "X-Api-Key": key,
          };

          entry1Response = await axios.post(
            `${url}/workspaces/5f5adb00d96f4f6ec6acbd65/time-entries`,
            {
              start: start1,
              billable: "true",
              description: "Teste",
              projectId: "604bec78ad6d1f0589d7bf19",
              end: end1,
              tagIds: ["616f30b4b0ba9d5c5ccb0ec8"],
            },
            { headers }
          );

          entry2Response = await axios.post(
            `${url}/workspaces/5f5adb00d96f4f6ec6acbd65/time-entries`,
            {
              start: start2,
              billable: "true",
              description: "Teste",
              projectId: "6053c8e3c15f5f7905d54aa0",
              end: end2,
              tagIds: ["616f30b4b0ba9d5c5ccb0ec8"],
            },
            { headers }
          );

          console.log(entry1Response.statusText);
          console.log(entry2Response.statusText);

          if (i !== keys.length - 1) {
            i++;
            await process(keys[i].key, i, keys[i].h);
          }
        }
        await process(keys[0].key, 0, keys[0].h);
      }
    }
  }, 60000);
})();
