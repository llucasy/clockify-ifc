require("dotenv").config();

const axios = require("axios");


const keys = [
  { key: process.env.MARCELO_API, h: 1 } 
];
const url = `https://api.clockify.me/api/v1`;

(async () => {
  // with axios
  keys.forEach(async (key) => {
    const axiosResponse = await axios.get(`${url}/user`, {
      headers: {
        "X-Api-Key": key.key,
      },
    });
    console.log(`Welcome ${axiosResponse.data.name}`);
  });

  async function fill(i) {

    d = new Date(2021, 10, i, 17, 1);

    if (d.getDay() != 0 && d.getDay() != 6) {

      if (d.getHours() == 17 && d.getMinutes() == 1) {

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
    if(i !== 10) {
      i++
      await fill(i)
    }
  }
  await fill(1)
})();
