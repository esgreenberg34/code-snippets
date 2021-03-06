select
a.subscriberkey, 
count(*) as ClickCount
from _Click a
inner join _Job j 
on j.jobid = a.jobid
where 1=1
and a.eventDate >= convert(date, getDate()-7)
and cast(a.isUnique as bit) = 1
group by
a.subscriberkey
having count(*) > 0
