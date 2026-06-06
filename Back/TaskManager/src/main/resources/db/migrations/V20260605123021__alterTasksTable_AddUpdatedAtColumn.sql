ALTER TABLE IF EXISTS tasks ADD COLUMN updated_at VARCHAR(50);

-- TODO: Add to entity, update it at update, sort by updated at & update front to sort by this field