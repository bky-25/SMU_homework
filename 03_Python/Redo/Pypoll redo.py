import csv
csvpath = r"Resources\election_data.csv"


# Counter
ttl_votes = 0
winner = ""
winning_count = 0

#append to...
candidates_opt = []
vote_ct = {}

with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    csv_header = next(csvreader)
    # print(csv_header)

    # total counts
    for row in csvreader:
        ttl_votes += 1
        candidate_name = row[2]

        if candidate_name not in candidates_opt:
            candidates_opt.append(candidate_name)
            vote_ct[candidate_name] = 0
        vote_ct[candidate_name] += 1
    total_votes = f"Total Votes : {ttl_votes}"
    election_results = (
    f"Election Results\n"
    f"---------------\n"
    f"Total Votes : {ttl_votes}\n"
    f"---------------\n"
    )
    print(election_results)
    
    # votes by candidate
    for candidate in vote_ct:
        votes = vote_ct.get(candidate)
        vote_pct = int(votes) / int(ttl_votes) * 100

        if votes > winning_count:
            winning_count = votes
            winner = candidate      
    
        voter_ct = (f"{candidate}: {vote_pct:.2f}% ({votes})\n"
                    f"--------------------\n"
                    f"Winner : {winner}")
        print(voter_ct)