const express = require("express");
const Agora = require("agora-access-token");

const app = express();
app.use(express.json());
var APP_ID = process.env.APP_ID;
var APP_CERTIFICATE = process.env.APP_CERTIFICATE;
var port =  process.env.PORT || 8080;

app.post("/rtctoken", (req, res) => {
  const appID = APP_ID;
  const appCertificate = APP_CERTIFICATE;
  const expirationTimeInSeconds = 3600;
  const uid = Math.floor(Math.random() * 100000);
  const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
  const channel = req.body.channel;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

  const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
  res.send({ uid, token });
});

app.post("/rtmtoken", (req, res) => {
  const appID = APP_ID;
  const appCertificate = APP_CERTIFICATE;
  const user = req.body.user;
  const role = Agora.RtmRole.Rtm_User;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;

  const token = Agora.RtmTokenBuilder.buildToken(appID, appCertificate, user, role, expirationTimestamp);
  res.send({ token });
});

app.listen(port, () => console.log(`Agora Auth Token Server listening at Port ${port}`));
