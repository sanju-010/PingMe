# PingMe
This is a P2P (Peer-to-Peer) Chat App built using WebRTC for real-time communication, combined with a Progressive Web App (PWA) structure for an offline-first, mobile-friendly experience. The app allows users to directly connect and chat with each other without the need for a central server, using unique Peer IDs for connecting.

# P2P Chat App

## Description

The **P2P Chat App** is a lightweight, real-time messaging app that uses **WebRTC** and **PeerJS** to enable **peer-to-peer** communication. Users can host or join a chat by simply sharing or entering a unique Peer ID. The app supports text messaging and is designed as a **Progressive Web App (PWA)**, allowing it to work seamlessly across devices with offline capabilities.

### Key Features:
- **Host or Join Chat**: Users can either host a new chat or join an existing one by entering a Peer ID.
- **Peer-to-Peer Communication**: Messages are sent directly between peers without the need for central server mediation.
- **QR Code for Easy Connection**: Host can generate a QR code to share their ID quickly.
- **Emoji Support**: Users can send emojis through a dedicated emoji picker.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **PWA Capabilities**: Offline-first features for better usability in low-network environments.

---

## How It Works

1. **Host a Chat**: A user can host a chat by clicking the "Host" button. They will be provided with a unique **Peer ID** and a QR code that others can scan to join.
2. **Join a Chat**: Users can enter the **Peer ID** of the host to join the chat. Once connected, they can exchange messages in real-time.
3. **Real-Time Messaging**: Once connected, users can send and receive text messages instantly. The connection is **peer-to-peer** and does not require a central server.
4. **Service Worker (PWA)**: The app registers a service worker, allowing the app to work offline and load faster on subsequent visits.

---

## Technologies Used

- **WebRTC**: For real-time communication (P2P connections).
- **PeerJS**: Simplifies WebRTC integration and peer-to-peer communication.
- **PWA (Progressive Web App)**: Offline-first functionality and app-like experience on mobile.
- **QR Code**: For easily sharing the Peer ID.
- **Emoji Button Library**: To integrate emojis into messages.

---

## Setup Instructions

NOT COMPLETED!!

