from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    # TODO: Validate Supabase JWT
    return {"user_id": "demo"} 