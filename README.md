# Voting on the Blockchain

Created for the ethdenver hackathon, 2/16-18/2018 by Carl Cortright, Gerard Casasaez, Scott Street

## The Problem 

In the 2014 midterm elections voter turnout was <40% for local elections. One of the major contributing factors to this high attrition rate is the difficulty finding time to go to the polls and absentee voting. We present a solution to these problems by allowing citizens to vote anonymously over the Ethereum blockchain. 

## Our Solution

The key to the system is a private/public key pair assigned to each citizen. Each citizen would be issued this key pair by an official government office. The public key would be recorded and associated with that specific person. The citizen keeps the private key secret. When there is an election, the government will generate a unique wallet for each citizen that contains one vote token. They will hash the wallet itself, and store it on the Ehtereum blockchain, mapping the citizens public key to the hashed wallet. When the citizen wants to vote they will lookup the hashed wallet using their public key, downloading the wallet from the blockchain and decrypting it with the private key they saved. 

Now the citizen has a voting wallet that is not specifically attributable to them. They will use this wallet to cast their single vote for one of the candidates (also a wallet on the blockchain). These votes are then counted on the blockchain, making the process completely transparent. 