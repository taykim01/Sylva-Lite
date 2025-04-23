-- Add push_subscription column to user table
ALTER TABLE "user"
ADD COLUMN push_subscription jsonb;

-- Add comment to explain the column
COMMENT ON COLUMN "user".push_subscription IS 'Stores web push notification subscription details for the user'; 