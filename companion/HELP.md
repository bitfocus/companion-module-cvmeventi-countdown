# CVM Eventi Countdown

This module allows companion to receive data from, and send commands to Countdown.

The module communicates with the installed Countdown application.

The module communicates using the HTTP protocol to send commands and WebSocket protocol to receive state updated (to update variables and feedbacks).

**Note that you'll need Countdown v0.0.14 or later to allow for Companion control.**

Full details of Countdown can be found at https://github.com/CVMEventi/Countdown.

## Network discovery

Countdown v1.4.0 and later announce themselves on the local network via Bonjour/mDNS (Settings → Remote → Protocols → Network discovery). Running instances will appear in the **Countdown** dropdown of the connection settings; select one to connect without entering an IP and port. Choose **Manual** to enter them yourself, e.g. when discovery isn't available on your network.
