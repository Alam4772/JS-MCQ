# JavaScript Arrays Mock Test

This project is a **React-based 100-question JavaScript Arrays Mock Test** built with **Tailwind CSS** and set up using **Vite**. It is designed to help learners practice and test their knowledge of JavaScript arrays.

## Features

- Multiple-choice questions (MCQs) and True/False questions.
- Immediate explanation shown after answering each question.
- Navigation between questions (Previous/Next buttons).
- Final score calculation after submitting.
- Retry functionality to retake the test.
- Fully responsive UI using Tailwind CSS.

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd <repository-folder>
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the project**

```bash
npm run dev
```

The app will open in your default browser at the local Vite development server URL (usually `http://localhost:5173`).

## Usage

- Click on an option to select your answer.
- Once an answer is selected, the explanation will appear below.
- Use the **Next** and **Previous** buttons to navigate through questions.
- On the last question, click **Submit** to see your total score.
- Click **Retry** to reset the test.

## Adding Questions

- Questions are stored in the `questions` array inside `JSArraysMockTest.jsx`.
- Each question object has the following structure:

```javascript
{
  q: 'Question text here',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correct: 1, // index of correct option
  explanation: 'Explanation text here'
}
```

- You can add up to 100 questions or more by following the same format.

## Dependencies

- React
- Tailwind CSS
- Vite

## License

This project is open-source and free to use for educational purposes.
