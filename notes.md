
<<<<<<< HEAD
 
=======

>>>>>>> 5271a1b7d64d41c0f44551195e94a2bb4966ddb9
##Rough Data Model
	Transactions
		TransactionX
			Amt
			When
			Type   
			AccountId
			Note
	AllowanceX
		AmountPer
		Period
	Accounts
		ChildX
			Name
			Pic
			AllowanceId
			AllowanceLastUpdated

####Calculated at runtime (on demand)
    Accounts
        ChildX
        	Balance()

###Updated transparently (as needed)
	Transactions
		TransactionXXX

##Screens

###Home Screen

Choose from the list of kids
View balance and profile info per kid

###Kid Screen

View current balance
View balance graph
View last 5 transactions
Button to add transaction

###Add/edit transaction
(assumes you know the kid, assumes 'now', assumes 'debit')

View balance and profile info of kid
View date, transaction type
Editable amount
Editable notes field
Real time update of kid's balance



## Version 2 Screens

###Home Screen
.. grayed out invitation to get to settings at end of kid list

###Home Screen when blank

Invitation to add a child
..fake data?

### Kid screen when blank
.. fake data


## Version 2 Data

Ability to set allowance info in the past
