# this bash file is for mac and linux users
# open the terminal and run the following command First time only: chmod +x file_name.sh
# then run the file with this command: ./file_name.sh

# to run this file on windows, you need to install git bash
# then use the command: chmod +x file_name.sh
# then use the command: ./file_name.sh


#!/bin/sh

# Detect the operating system
case "$(uname -s)" in
    CYGWIN*|MINGW*|MSYS*)
        # Windows detected, run the batch file
        cmd //c run_project.bat
        ;;
    *)
        # Unix-like OS detected
        # Install dependencies if necessary
        npm install

        # Start the React development server
        exec npm run dev "$@"
        ;;
esac