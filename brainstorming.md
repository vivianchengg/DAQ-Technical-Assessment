# Brainstorming
part 1: 
crash happens when the msg has an incorrect format and is passed to JSON.parse, e.g. an extra '}'.
So other than generating a syntax error and crash the whole service, try-and-catch is implemented to print an error message.
The format of error message gives error detail after "Invalid Temperature" for better error handling.

part 2:
created another file to export functions. Record the first instance of out of range temperature, keep track of each temperature and their timestamp which are out of range, check whether more than 3 happens within 5 seconds. If so, record current timestamp to the incidents log file. 
