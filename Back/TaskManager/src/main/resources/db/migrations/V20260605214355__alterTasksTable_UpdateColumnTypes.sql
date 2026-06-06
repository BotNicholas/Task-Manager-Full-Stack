ALTER TABLE IF EXISTS tasks
ALTER COLUMN created_at TYPE TIMESTAMPTZ
    USING created_at::timestamptz,
ALTER COLUMN updated_at TYPE TIMESTAMPTZ
    USING updated_at::timestamptz;