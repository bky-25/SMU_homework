import csv
csvpath = r"Resources\budget_data.csv"

#Parameters
ttl_months = 0
prev_revenue = 0
ttl_profit = 0
row_count = 0
month_of_change = []
profit_changes = []
max_profit = ["",0]
min_profit = ["",0]

with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    csv_header = next(csvreader)
    # print(f"CSV Header: {csv_header}")
    
    # Extract first row to avoid appending
    first_row = next(csvreader)
    ttl_months += 1
    ttl_profit += int(first_row[1])
    prev_revenue = int(first_row[1])
    
    for row in csvreader:
        # track totals
        ttl_months += 1 
        ttl_profit += int(row[1])

        # track revenue change
        profit_calc = int(row[1]) - prev_revenue
        prev_revenue = int(row[1])
        profit_changes += [profit_calc]
        # print(profit_changes)
        month_of_change += [row[0]]
        #print(month_of_change)
      
        # Calc greatest increase
        if profit_calc > max_profit[1]:
            max_profit[0] = row[0]
            max_profit[1] = profit_calc
        # print(max_profit)
        # Calc greatest decrease
        if profit_calc < min_profit[1]:
            min_profit[0] = row[0]
            min_profit[1] = profit_calc

# AVG revenue change
profit_avg = sum(profit_changes) / len(profit_changes)
# print(profit_avg)

output = (
    f"Total months: {ttl_months}\n"
    f"Total Revenue: ${ttl_profit}\n" 
    f"AVG Profit: ${profit_avg: .2f}\n" 
    f"Greatest Increase in Revenue: {max_profit[0]} (${max_profit[1]})\n"
    f"Greatest Decrease in Revenue: {min_profit[0]} (${min_profit[1]})\n"  
)

print(output)