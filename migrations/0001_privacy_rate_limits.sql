-- STAGING FIRST. Apply to each separate existing D1 database only after authorization.
-- No applicant or privacy records are modified.
CREATE TABLE IF NOT EXISTS privacy_rate_limits (
  ip_hash TEXT PRIMARY KEY,
  window_start TEXT NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_privacy_rate_limits_window ON privacy_rate_limits(window_start);
