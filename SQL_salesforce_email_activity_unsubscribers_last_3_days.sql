SELECT a.SubscriberKey, a.UnsubDateUTC, a.UnsubReason, c.CreatedDate, c.JobID, c.EmailName, c.EmailSubject, c.FromEmail, c.SendClassification
FROM _businessunitunsubscribes a
join _click b
on a.SubscriberKey = b.SubscriberKey
inner join _job c
on b.JobID = c.JobID 
where c.CreatedDate >= dateadd(day,-3,current_timestamp)
