#include <vector>
#include <cmath>     // For abs()
#include <emscripten/bind.h>

using namespace std;
using namespace emscripten;

vector<vector<int>> steps;
bool found = false; 
vector<int> finalBoard; // stores the final solution board

bool isSafe(vector<int>& board, int row, int col, int n) {
    for (int i = 0; i < row; i++)
        if (board[i] == col || abs(board[i] - col) == abs(i - row))
            return false;
    return true;
}

void solve(vector<int>& board, int row, int n) {
    if (found) return; // Stop if already found

    if (row == n) {
        found = true;
        finalBoard = board;
        return;
    }

    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row] = col;
            steps.push_back({row, col, 1});  // Try to place

            solve(board, row + 1, n);

            if (!found) {
                steps.push_back({row, col, 0});  // Backtrack if not final
            }
        }
    }
}

vector<vector<int>> solveNQueen(int n) {
    steps.clear();
    found = false;
    finalBoard.clear();
    vector<int> board(n, -1);
    solve(board, 0, n);

    // ✅ Push finalBoard again to ensure final state is set
    if (found) {
        for (int row = 0; row < n; row++) {
            steps.push_back({row, finalBoard[row], 1});
        }
    }

    return steps;
}

// 🔧 Binding std::vector<int> and std::vector<std::vector<int>>
EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::register_vector<int>("VectorInt");
    emscripten::register_vector<std::vector<int>>("VectorVectorInt");
    emscripten::function("solveNQueen", &solveNQueen);
}
