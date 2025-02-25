## SWOC ACCEPTED PROJECT - JOBHIVE <br> 
### The Ultimate Project Repository For Beginners 😎 <br>




<a href="/"><img align='center' height="25" src="https://img.shields.io/badge/Hola - 👋-pink.svg?&style=for-the-badge&logo=ignyte&logoColor=blue" /></a> <br>



<a href="#Contribution" title="Contributions are welcome"><img src="https://img.shields.io/badge/contributions-welcome-green.svg"></a> <br>

<div align="center">
  <img src="https://i.ibb.co/zFdJgvQ/Screenshot-548.png" alt="SWOC 2024" width="80%">
</div> <br>
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">


📌 Introduction
------------------
**JobHive** is a modern job portal designed to bridge the gap between recruiters and candidates. It enables recruiters to post jobs effortlessly, review applications, and streamline candidate selection. Job seekers can easily explore opportunities, apply for jobs, and track their applications. With features like secure authentication, user-friendly interfaces, and seamless functionality, JobHive simplifies the recruitment process. Whether you're hiring or looking for your dream job, JobHive is your go-to platform for success in the professional world.





## Contributing :handshake:

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat&logo=git&logoColor=white)](https://github.com/vedanshjainvj/Job-Hive/pulls)[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?color=red)](https://github.com/vedanshjainvj/Job-Hive/pulls)




**We're accepting PRs for our open and unassigned [issues🐛](https://github.com/vedanshjainvj/Job-Hive/issues)**. Please check [CONTRIBUTING.md✨](). We'd love your contributions! **Kindly follow the steps below to get started:** 

**0.** Star [this](https://github.com/vedanshjainvj/Job-Hive) repository.

**1.** Fork [this](https://github.com/vedanshjainvj/Job-Hive) repository.

**2.** Clone the forked repository.

```bash
git clone https://github.com/vedanshjainvj/Job-Hive.git
```

**3.** Navigate to the project directory.

```bash
cd Job-Hive
```

**4.** Create a new branch for every feature or bug fix.

```bash
git checkout -b <your_branch_name>
```

**5.** Make changes.

**6.** Stage your changes and commit

```bash
git add -A

git commit -m "<your_commit_message>"
```

**7.** Push your local commits to the remote repo.

```bash
git push -u origin <your_branch_name>
```

**8.** Create a [PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) to `develop` !

**9.** **Congratulations!** :tada: Sit and relax, you've made your contribution :v: :heart: 💥
<br><be>
## 🔥 Setting up Firebase Admin SDK  

In the server, there is a `firebase-adminsdk.json` file inside the `utils` folder. This file is required for Firebase authentication and services.  

### Steps to Retrieve `firebase-adminsdk.json`:  

1. **Go to Firebase Console**:  
   - Visit [Firebase Console](https://console.firebase.google.com/) and select your project.  

2. **Generate Service Account Key**:  
   - Navigate to **Project Settings** → **Service accounts**.  
   - Click **Generate new private key** under **Firebase Admin SDK**.  
   - Download the JSON file.  

3. **Add the File to the Project**:  
   - Place the downloaded `firebase-adminsdk.json` inside the `server/utils/` folder.  

### Sample `firebase-adminsdk.json` Format:  

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "your-private-key",
  "client_email": "your-client-email",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your-client-cert-url",
  "universe_domain": "googleapis.com"
}
```

### 📧 Setting Up Gmail Email and Password for SMTP  

To enable email notifications, you need a Gmail account and an **App Password** to authenticate SMTP. Follow these steps:  

#### 1. **Enable 2-Step Verification**  
- Go to your [Google Account Security](https://myaccount.google.com/security).  
- Scroll to **"How you sign in to Google"** and enable **2-Step Verification** if not already enabled.  

#### 2. **Generate an App Password**  
- In the **Security** section, find **"App Passwords"**.  
- Select **Mail** as the app and **Other (Custom name)** as the device name (e.g., "JobHive").  
- Click **Generate**, and Google will provide a 16-character password.  

#### 3. **Update Your Environment Variables**  
Add the following to your `.env` file in the backend:  

```env
EMAIL=your-email@gmail.com
PASSWORD=your-app-password
```

## Backend ENV
```bash
MONGODB_URI=
PORT=
SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL=
PASSWORD=
```

## Frontenv ENV
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_VAPID_KEY=
VITE_BASE_URL=
```
<br> <be>

## 🛠️ Running JobHive with Docker  

We have provided a `docker-compose.yaml` file to set up the JobHive project using Docker. Follow these steps to run the project using Docker containers.  

### Steps to Start Docker Containers  

1. **Ensure Docker is Installed**  
   - Install Docker from [Docker Official Website](https://www.docker.com/get-started).  

2. **Navigate to the Project Directory**  
   ```bash
   cd Job-Hive
   ```

3. **Navigate to the client folder**  
   ```bash
   cd client && docker build -t job-hive-client .
   ```
   
4. **In the server folder**  
   ```bash
   cd server && docker build -t job-hive-server .
   ```

5. **In the root dir**
    ```bash
    docker compose up -d
    ```
    This will start the Frontend, Backend, and MongoDB on the specified ports.
  
6. **To Stop the Containers**  
   ```bash
   docker-compose down
   ```

## 🏆 Contribution Points
Contributors can earn points based on the complexity of their tasks:
- **🥇 Beginner**: 20 Points  
- **🥈 Intermediate**: 30 Points  
- **🥉 Advance**: 40 Points
<br> <br>


## SWOC Code of Conduct
As this project is part of SWOC, please follow the [Guidelines](https://docs.google.com/document/d/1JQdzFbdIlRNjeBZiyZS-9oXE29n6ps-c4SeehPrud_U/edit?usp=sharing) to ensure smooth participation.



## 👥 Project Admin
| ![Vedansh Jain](https://avatars.githubusercontent.com/u/111676155?v=4) |  |
|:--:|:--:|
| **Vedansh Jain** <br> <sub>Project Admin</sub> <br> [![LinkedIn](https://img.icons8.com/fluency/32/000000/linkedin.png)](https://www.linkedin.com/in/vedanshcode)  [![GitHub](https://img.icons8.com/?size=33&id=63777&format=png&color=000000)](https://github.com/vedanshjainvj) 


<!--Line-->
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">


## Contributors
A huge shoutout to our wonderful contributors 

<a href="https://github.com/vedanshjainvj/Job-Hive/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vedanshjainvj/Job-Hive" />
</a>


## 📄 Ending Note
Thank you for your interest in **JobHive**! We value your contributions and are excited to have you as part of our community. Feel free to share your ideas, report bugs, and help us make **JobHive** even better.


:tada: :confetti_ball: :smiley: _**Happy Contributing**_ :smiley: :confetti_ball: :tada:
