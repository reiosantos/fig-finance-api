## Node Express Mongo Fig/Finance

- We want to make sure we recommend events a user would be interested in, in order to do this,
  we need to have some information from a user about his interests. We can capture this in
  different ways.


- On signing-up, we request them to checkmark some categories/topics like AI, robotics, etc.
  This can also be done later in settings/profile.


We build a recommendation algorithm to find similarities between these user interests and find
events that match these interests (using a recommendation algorithm would also help in
discovering other events that might be on interest to the user even when they did not chose it
as an interesting topic).

---
As the frontend (https://github.com/reiosantos/fig-finance-web) will only be showing events that have been recommended or that are of interest
to the user, the recommendation logic is implemented in the API


