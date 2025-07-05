# NQueen-Visualizer

A visual and interactive tool to understand and explore the N-Queens problem—one of the classic puzzles in computer science and combinatorics. Built using HTML, CSS, JavaScript, and C++ (for algorithmic logic), this project visually demonstrates how algorithms solve the N-Queens problem step by step.

## Features

- 🎲 **Interactive Visualization:** Watch the N-Queens algorithm in action as it places queens on the board.
- 🖱️ **User Controls:** Choose the board size (N), start, pause, or reset the visualization.
- 📊 **Step-by-Step Animation:** See each recursive step and backtracking decision.
- 🌈 **Clean UI:** Responsive and modern design for an engaging learning experience.
- 💻 **Multi-language Implementation:** Core logic in JavaScript & C++, with a web-based visualization.

## Demo

![image](https://github.com/user-attachments/assets/bc290784-453d-41e0-93cb-d479b1edd8f4)


## What is the N-Queens Problem?

The N-Queens problem asks: **How can you place N chess queens on an N×N chessboard so that no two queens threaten each other?**  
This means no two queens can share the same row, column, or diagonal.

## How It Works

- The algorithm uses backtracking to try placing queens one row at a time.
- If a conflict is found, it backtracks and tries the next possible position.
- The visualization shows each placement, conflict, and backtrack in real time.

## Getting Started

### Prerequisites

- Modern web browser (for HTML/JS/CSS visualizer)
- (Optional) C++ compiler if you want to run the C++ algorithm locally

### Running Locally

1. **Clone the repository:**
    ```bash
    git clone https://github.com/sachinburnwal22/NQueen-Visulaizer.git
    cd NQueen-Visulaizer
    ```

2. **Open `index.html` in your browser.**

3. **(Optional) Compile and run C++ code:**
    ```bash
    cd cpp
    g++ nqueen.cpp -o nqueen
    ./nqueen
    ```
## Technologies Used

- HTML, CSS, JavaScript (Frontend & Visualization)
- C++ (Algorithm demonstration and comparison)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Author

- [Sachin Burnwal](https://github.com/sachinburnwal22)
