# Login

Log in system with TV Guide

This project was meant for building a general authentication system. It has protected routes which are not available for users that have not registered and logged in on said registered accounts.

User registers with their information and uses email and password to verify their identity.

After logging in user is pathed "TV Guide", which fetched information from the applications server, made with Node.js, from AWS EC2 Cloud which has docker-compose running on it.

User can navigate to see their profile information. This page contains editable information about their profile.

User can also log out, removing access from their browser to the protected routes until logged in once again.
