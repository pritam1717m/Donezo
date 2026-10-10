import app from './app.js';
import dotenv from 'dotenv';
import startReminderJob from "./jobs/reminderJob.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

        app.listen(PORT, ()=> {
        console.log(`Server is running on ${PORT}`); 
});
    

startReminderJob();


