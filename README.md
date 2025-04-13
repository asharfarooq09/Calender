# 📅 Calendar Event Scheduler Pro

A fully interactive calendar scheduling application built using **React**, **Redux**, and **MongoDB**. Designed with drag-and-drop functionality, dynamic task-goal syncing, and real-time event manipulation—similar to Google Calendar.

---

## 🚀 Project Overview

This project enables users to schedule events by dragging and dropping tasks from a sidebar directly into calendar slots. Events can be created, updated, resized, and deleted with ease. Events persist through API-backed MongoDB integration.

### 🌐 Live Demo

_Coming Soon (or include your deployed URL if hosted)_

---

## 🛠️ Features

### 📆 Calendar Functionality

- Create, update, and delete events via modal dialog
- Drag-and-drop task scheduling from sidebar to calendar
- Resizable events (adjust time duration)
- Move events across days/times via drag-and-drop
- 15-minute precision support

### 🧠 Smart Task Mapping

- Left sidebar shows **Goals**
- Clicking a goal fetches related **Tasks** from MongoDB
- Tasks inherit their goal's color
- Dropping a task into the calendar auto-fills modal details

### ⚙️ Backend API

- Built with Node.js + Express
- MongoDB Atlas used as the database
- API routes:
  - `GET /api/goals` – fetch goals
  - `GET /api/tasks` – fetch tasks
  - `POST /api/events` – create an event
  - `PUT /api/events/:id` – update an event
  - `DELETE /api/events/:id` – delete an event

---

## 📁 Project Structure
