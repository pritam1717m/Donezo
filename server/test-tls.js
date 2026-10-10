import tls from "tls";

const host = "ac-rpyksvy-shard-00-02.wpkhiec.mongodb.net";

console.log("Testing TLS connection...");
console.log("Host:", host);

const socket = tls.connect(
  {
    host,
    port: 27017,
    servername: host,
    minVersion: "TLSv1.2",
    maxVersion: "TLSv1.3",
    rejectUnauthorized: true,
  },
  () => {
    console.log("✅ TLS handshake succeeded!");
    console.log("TLS version:", socket.getProtocol());
    console.log("Cipher:", socket.getCipher());
    console.log("Authorized:", socket.authorized);

    socket.end();
  }
);

socket.on("error", (error) => {
  console.error("❌ TLS handshake failed:");
  console.error(error);
});