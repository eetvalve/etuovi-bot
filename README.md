## Etuovi-bot

### quickstart:
`$ node index.js`

### description:
Runs cronjob two times a day:
```
at 10:00am and 9:00pm(klo 21).
```
`requestData.js` -file includes the parameters which are used
to fetch apartment data. Modify this file to get wanted apartments
from specific zone, price-range etc.


### Other features
- includes a list of keywords(`isInWantedCondition()`) which are used to parse apartments
with unwanted conditions out of search results, e.g. upcoming renovation on water pipes,
  periodic-charges etc.
  
- does not fetch same apartments data twice (keeps track of already fetched data).
