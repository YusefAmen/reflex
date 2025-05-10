from fastapi import Depends, HTTPException, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get the current user from the JWT token"""
    print(f"[DEBUG] ENV: {os.getenv('ENV')}")
    print(f"[DEBUG] Received credentials: {getattr(credentials, 'credentials', None)}")
    # For testing, allow requests with a test token
    if os.getenv("ENV") == "test" and credentials.credentials == "test-token":
        print("[DEBUG] Test token accepted.")
        return {"user_id": "test-user"}
        
    # TODO: Validate Supabase JWT
    # For now, allow all requests in development
    if os.getenv("ENV") == "development":
        print("[DEBUG] Development mode, allowing any user.")
        return {"user_id": "demo"}
        
    print("[DEBUG] Invalid authentication credentials.")
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Invalid authentication credentials"
    ) 