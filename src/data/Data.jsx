const Data = [
    {
        heading: "Quizzical",
        detail: "A dynamic and interactive quiz application designed to test general knowledge while showcasing smooth UI transitions. Users can customize their experience by selecting categories, difficulty levels, and the number of questions.",
        features: [
            "Customizable starting options: Category, Question Count, and Difficulty.",
            "Real-time scoring system with accuracy percentage display.",
            "Visual feedback for correct and incorrect answers after submission.",
            "Seamless navigation flow between configuration and the quiz interface."
        ],
        tech: "Built using React's functional components and hooks (`useState`, `useEffect`). Integrated the Open Trivia DB API for dynamic question fetching. Developed custom scoring logic and managed application state to handle user selections and result evaluation.",
        vid: "pHqEuj4LIMI",
        image: "/mockups/quizzical.png",
        appBtn: "/quiz",
        codeBtn: "https://github.com/umairny/react23/tree/main/src/projects/Quiz"
    },
    {
        heading: "Tenzies",
        detail: "A Fast-paced dice game that combines luck and strategy. Players aim to roll and freeze dice until all match, tracking their speed and roll counts to set new personal records.",
        features: [
            "User profile management and local leaderboard for high scores.",
            "Live timer and roll counter to track player performance.",
            "Dice freezing mechanic to strategically hold numbers.",
            "Interactive celebration effects upon winning (Confetti).",
            "Responsive game state with reset and memory clear options."
        ],
        tech: "Implemented complex game state logic using React hooks. Leveraged local storage for data persistence across sessions. Integrated `react-confetti` for an enhanced win-state experience and utilized nanoid for efficient unique identifier management.",
        vid: "mO955G7wgp8",
        image: "/mockups/tenzies.png",
        appBtn: "/tenzies",
        codeBtn: "https://github.com/umairny/react23/tree/main/src/projects/Tenzies"
    },
    {
        heading: "Notes",
        detail: "A powerful Markdown-based note-taking application. Features a split-pane interface and real-time preview, allowing for organized writing and instant visualization of formatted content.",
        features: [
            "Modern Markdown editor with a toolbar for common formatting.",
            "Instant preview mode to visualize formatted output.",
            "Auto-save functionality with local storage persistence.",
            "Dynamic sidebar for quick note management and organization.",
            "Split-view layout for efficient multi-tasking and previewing."
        ],
        tech: "Integrated `react-mde` for Markdown editing and `showdown` for HTML conversion. Used `react-split` for the adjustable multi-pane layout. Managed data persistence and ordering to ensure the most recently edited notes appear first.",
        vid: "9qv45YGkvEU",
        image: "/mockups/notes.png",
        appBtn: "/notes",
        codeBtn: "https://github.com/umairny/react23/tree/main/src/projects/Notes"
    }

]

export default Data