let peer;
let conn;

function hostChat() {
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("host-section").classList.remove("hidden");

  const storedId = localStorage.getItem("my-peer-id") || "host-" + Math.floor(Math.random() * 10000);
  localStorage.setItem("my-peer-id", storedId);

  peer = new Peer(storedId);

  peer.on("open", function (id) {
    document.getElementById("my-id").textContent = id;
    QRCode.toCanvas(document.getElementById("qrcode"), id, { width: 200 });

    const lastPeer = localStorage.getItem("last-peer-id");
    if (lastPeer) loadMessages(lastPeer);
  });

  peer.on("connection", function (c) {
    conn = c;
    localStorage.setItem("last-peer-id", c.peer);
    setupConnection();
  });
}

function joinChat() {
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("join-section").classList.remove("hidden");

  const storedId = localStorage.getItem("my-peer-id") || "client-" + Math.floor(Math.random() * 10000);
  localStorage.setItem("my-peer-id", storedId);

  peer = new Peer(storedId);

  peer.on("open", function () {
    console.log("Ready to join chat");

    const lastPeer = localStorage.getItem("last-peer-id");
    if (lastPeer) loadMessages(lastPeer);
  });
}

function connectToPeer() {
  const joinId = document.getElementById("join-id").value;
  conn = peer.connect(joinId);
  localStorage.setItem("last-peer-id", joinId);
  setupConnection();
}

function setupConnection() {
  document.getElementById("join-section").classList.add("hidden");
  document.getElementById("host-section").classList.add("hidden");
  document.getElementById("chat-section").classList.remove("hidden");

  if (conn && conn.peer) {
    loadMessages(conn.peer);
  }

  conn.on("open", function () {
    console.log("Connection open with", conn.peer);
  });

  conn.on("data", function (data) {
    addMessage("them", data);
    saveMessage(conn.peer, conn.peer, data); // Save senderId as the peer who sent it
    notify(data);
  });
}

function sendMessage() {
  const msgInput = document.getElementById("msg-input");
  const message = msgInput.value.trim();
  if (message) {
    conn.send(message);
    addMessage("me", message);
    saveMessage(conn.peer, peer.id, message); // Save senderId as myself
    msgInput.value = "";
  }
}

function addMessage(sender, text, time) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = "message " + sender;
  const timestamp = new Date(time || Date.now()).toLocaleTimeString();
  div.innerHTML = text + '<span class="timestamp">' + timestamp + '</span>';
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function saveMessage(peerId, senderId, text) {
  const chat = JSON.parse(localStorage.getItem("chat-" + peerId)) || [];
  chat.push({ senderId, text, time: new Date().toISOString() });
  localStorage.setItem("chat-" + peerId, JSON.stringify(chat));
}

function loadMessages(peerId) {
  const chat = JSON.parse(localStorage.getItem("chat-" + peerId)) || [];
  const myId = localStorage.getItem("my-peer-id");

  document.getElementById("chat-box").innerHTML = ""; // Clear current box before loading

  chat.forEach(msg => {
    const sender = msg.senderId === myId ? "me" : "them";
    addMessage(sender, msg.text, msg.time);
  });
}

function clearChat() {
  if (conn && conn.peer) {
    localStorage.removeItem("chat-" + conn.peer);
    document.getElementById("chat-box").innerHTML = "";
  }
}

function notify(message) {
  if (Notification.permission === "granted") {
    new Notification("New Message", { body: message });
  }
}



// Emoji Picker setup
window.addEventListener("DOMContentLoaded", () => {
  const picker = new EmojiButton({
    position: 'top-start',
    theme: document.body.classList.contains("dark") ? 'dark' : 'light',
  });

  const trigger = document.querySelector('#emoji-btn');
  const input = document.querySelector('#msg-input');

  picker.on('emoji', emoji => {
    input.value += emoji;
    input.focus();
  });

  trigger.addEventListener('click', () => {
    picker.togglePicker(trigger);
  });
});


// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

window.onload = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
};


