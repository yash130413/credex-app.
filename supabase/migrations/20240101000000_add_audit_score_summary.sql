-- Add optimization_score and ai_summary to audits
alter table audits
  add column if not exists optimization_score integer not null default 0,
  add column if not exists ai_summary         text;
