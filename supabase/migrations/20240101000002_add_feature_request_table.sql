-- Create feature_request table
CREATE TABLE IF NOT EXISTS feature_request (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    request TEXT NOT NULL
);

-- Add RLS policies
ALTER TABLE feature_request ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all feature requests
CREATE POLICY "Allow authenticated users to read feature requests"
    ON feature_request
    FOR SELECT
    TO authenticated
    USING (true);

-- Allow authenticated users to insert feature requests
CREATE POLICY "Allow authenticated users to insert feature requests"
    ON feature_request
    FOR INSERT
    TO authenticated
    WITH CHECK (true); 