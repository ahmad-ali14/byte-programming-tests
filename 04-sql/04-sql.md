# SQL Querying

Given the following table which tracks app events:

```sql
create table app_events (
  bot_id text not null,
  event_id bigserial not null,
  aggregate_type text not null,
  aggregate_id text not null,
  event_type text not null,
  event_data jsonb not null,
  created_at timestamp default now() not null,
  primary key app_events_pkey (event_id)
);
```

## A Basic Query

One of the events tracked is whenever a user visits a given “state” in a conversation/workflow, write a query to count the number of times each of these states is visited in a given month: `reorder-allergy-info`, `reorder`, and `reorder-pay`. Your query should take the `bot_id` and month as parameters; assume that the `event_type` for this is `VisitState` and that the state name is stored in a field called `StateName` withing the `event_data`.

## Performance

Oops! The events table has millions of rows in it and your query is taking an unacceptable amount of time to run, how would you go about improving this?