# #!/bin/bash

# # Navigate to the project directory
# cd "$(dirname "$0")"

# # Detect the operating system
# case "$(uname -s)" in
#     CYGWIN*|MINGW*|MSYS*)
#         # Windows detected, run the batch file
#         echo "Detected Windows OS. Running the batch file..."
#         cmd //c run.bat
#         ;;
#     *)
#         # Unix-like OS detected (Linux or macOS)
#         echo "Detected Unix-based OS (Linux or macOS)."

#         # Install dependencies if not installed
#         if [ ! -d "node_modules" ]; then
#             echo "Installing dependencies..."
#             npm install
#         fi

#         # Start the React development server
#         exec npm run dev "$@"
#         ;;
# esac



#!/bin/bash

# Exit on any error
set -e

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Navigate to the script's directory
cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command_exists node; then
    echo "Error: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found!"
    echo "Please ensure you're in the correct project directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install || {
        echo "Error: Failed to install dependencies!"
        exit 1
    }
fi

# Start the React development server
echo "Starting the React development server..."
exec npm run dev "$@"