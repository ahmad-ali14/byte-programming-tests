```
INSERT INTO `events`(`bot_id`, `aggeregate_type`, `aggeregate_id`, `event_type`, `event_data`, `created_at`) VALUES ('1','agg','1','VisitState','{"StateName": "reorder" }', cast(cast(2020*10000 + 5*100 + 1  as varchar(255)) as date)
```

```
SELECT
    event_id,
    event_data,
    COUNT(*) over(
PARTITION BY MONTH(created_at)
)
FROM
    `events`
```

```
SELECT event_id, event_data, COUNT(*) over( PARTITION BY MONTH(created_at) ) FROM `events` WHERE Month(created_at) =2 AND year(created_at) =2020
```

```
SELECT COUNT(*) FROM `events` GROUP By DATE_FORMAT(created_at,'%Y-%m')
```
