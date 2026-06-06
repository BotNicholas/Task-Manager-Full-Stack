CREATE TABLE IF NOT EXISTS tasks(
    id UUID PRIMARY KEY default gen_random_uuid(),
    title VARCHAR(50) NOT NULL,
    description TEXT,
    status VARCHAR(20),
    created_at VARCHAR(50)
);