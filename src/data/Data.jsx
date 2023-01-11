const Data = [
    {
        heading: "Quizzical",
        detail: "I created the Quizzical App because I wanted to have a way to show off my portfolio in a fun and interactive way. The app features a quiz that tests your knowledge. I think it's a great way for potential employers to see what I know and what I can do. Plus, it's just really fun!",
        features: [
            "On the landing page you can select 1. Category, 2. Total number of questions, 3. Difficulty level",
            "The start quiz button will take you to the quiz page",
            "After selecting the choices you think are correct click submit.",
            "After submitting you can see correct(green) and wrong(red) answers.",
            "After submitting on the bottom right corner of the app, your score will be displayed with % accuracy.",
            "Submit button changed to the try again button. Click the try again button to go back to the start page."
        ],
        tech: "I created a useState hook to get the category, number of questions, and difficulty level. The input for these hooks is taken from the HTML selected tag input value. To retrieve the questions, enter these values into the request url (open trivia db). The Start Quiz button launches the app and searches for components. I converted the fetched data into a usable format and pushed it into a new array for easy use. It passes props to the next component. 1. data; 2. loading; 3. error; This page receives the props from the fetch component. If the loading is false and there is no error, It's to iterate over the data for questions and answers. This page is in charge of displaying the questions and answer options. On this page, you can select the choices that are created with a radio input tag. Input tag value data is submitted to handle the Submit function, where it evaluates the correct answers and scores. It stores the correct answers in useState variables after evaluating and scoring them. From there, I am able to get the values of variables and show the score on the page. Finally, click the submit button to convert to the Try Again button, which will use the Navigate hook to take you back to the landing page.",
        vid: "pHqEuj4LIMI",
        appBtn: "/quiz",
        codeBtn: "github"
    },
    {
        heading: "Tenzies",
        detail: "I created this React project, a fun and engaging game that tests the player's luck and strategy.",
        features: [
            "On the start page the user can find the name of the person who has the best score.",
            "How many times he clicked and how much time it took to complete the game.",
            "Under that it shows the current click and time in seconds.",
            "Good luck to the new user when type name it will show after Good luck!",
            "Enter the name and click start to start the new game.",
            "As the user will start the game the timer will start and also it will count all clicks when you click on the Roll button.",
            "The user has to select all the same number dice to finish the game.",
            "When the user selects the same dice and clicks the Roll button will change the unselected dice.",
            "Keep selecting the same dice and Roll button until you select all the same dice.",
            "By clicking the new game button will take the user to the start page.",
            "Reset button will remove any saved user and its score from the game."
        ],
        tech: "One challenge I may have faced while working on this project has been implementing the logic for selecting and holding the dice. This has involved creating a way for the player to select individual dice and storing that information as the game progresses. Another challenge has been implementing the roll button and ensuring that the dice are randomly generated each time it is clicked and hold selected dice positions.",
        vid: "mO955G7wgp8",
        appBtn: "/tenzies",
        codeBtn: "github"
    },
    {
        heading: "Notes",
        detail: "I created the Notes app with scrimba course because I wanted to have a way to show off my portfolio in a fun and interactive way.",
        features: [
            "On the start page if you have 0 notes it will show you to create new note.",
            "If you have any saved notes app will start and show all the save notes on left sidebar.",
            "Left side bar click + button to create a new note.",
            "Righ side you can write notes in markdown lagnuage.",
            "Righ side you have write options like word app which help you to create your note in markdown language.",
            "By clicking on prewiew you will see your note result.",
        ],
        tech: "For creating this app I added libraries like mde and split. I just have to adjust the side bar and writing preview area. Big thing is to store the notes on local storage with id, for that i used nanoid to retrieve the the data with id and organize latest first.",
        vid: "vid url",
        appBtn: "/notes",
        codeBtn: "github"
    }

]

export default Data