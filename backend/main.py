"""
DrugForge FastAPI Backend - Entry Point

Main application initialization with CORS, middleware, and health checks.
Migrated from deprecated Flask backend to modern async FastAPI.
"""

import os
import logging
from contextlib import asynccontextmanager
from typing import Dict, Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from utils.model_loader import ModelLoader

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


# ============================================================================
# GLOBAL STATE
# ============================================================================

model_loader = ModelLoader()


# ============================================================================
# STARTUP / SHUTDOWN LIFECYCLE
# ============================================================================

async def startup_event() -> None:
    """
    Initialize application on startup.

    - Load ML models into memory
    - Verify Supabase database connectivity
    - Log initialization status
    """
    logger.info("🚀 DrugForge Backend Starting...")

    # Load ML models
    models_dir = os.getenv("MODELS_PATH", os.path.join(os.path.dirname(__file__), "models"))
    loaded = model_loader.load_all(models_dir)
    logger.info(f"📦 Loaded {loaded} ML model(s) from {models_dir}")

    # Check Supabase connectivity
    from services.db_service import check_database_connection
    db_ok = await check_database_connection()
    if db_ok:
        logger.info("✅ Supabase database connected")
    else:
        logger.warning("⚠️  Supabase not available — predictions will NOT be persisted")

    logger.info("✅ All systems initialized successfully")


async def shutdown_event() -> None:
    """
    Cleanup on application shutdown.

    - Release model memory
    """
    logger.info("🛑 DrugForge Backend Shutting Down...")
    model_loader.unload_all()
    logger.info("✅ Shutdown complete")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """FastAPI lifespan context manager for startup/shutdown events."""
    await startup_event()
    yield
    await shutdown_event()


# ============================================================================
# FASTAPI APPLICATION
# ============================================================================

app = FastAPI(
    title="DrugForge API",
    description="AI-powered drug discovery prediction service",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)


# ============================================================================
# MIDDLEWARE: CORS
# ============================================================================

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

ALLOWED_ORIGINS: list[str] = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://drug-forge.vercel.app",
    FRONTEND_URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info(f"✅ CORS configured for origins: {ALLOWED_ORIGINS}")


# ============================================================================
# REGISTER ROUTERS
# ============================================================================

from routers import solubility, bbbp, cyp3a4, toxicity, binding_score
from routers import cox2, hepg2, ace2, half_life
from routers import batch as batch_router
from routers import utils as utils_router
from routers import chat

app.include_router(solubility.router, prefix="/predict", tags=["Predictions"])
app.include_router(bbbp.router, prefix="/predict", tags=["Predictions"])
app.include_router(cyp3a4.router, prefix="/predict", tags=["Predictions"])
app.include_router(toxicity.router, prefix="/predict", tags=["Predictions"])
app.include_router(binding_score.router, prefix="/predict", tags=["Predictions"])
app.include_router(cox2.router, prefix="/predict", tags=["Predictions"])
app.include_router(hepg2.router, prefix="/predict", tags=["Predictions"])
app.include_router(ace2.router, prefix="/predict", tags=["Predictions"])
app.include_router(half_life.router, prefix="/predict", tags=["Predictions"])
app.include_router(batch_router.router, prefix="/predict", tags=["Batch"])
app.include_router(utils_router.router, prefix="/utils", tags=["Utilities"])
app.include_router(chat.router, prefix="/api/chat", tags=["AI Chat"])


# ============================================================================
# RESPONSE SCHEMAS
# ============================================================================

class HealthResponse(BaseModel):
    """Health check response."""

    status: str
    version: str
    models_loaded: int
    models_available: list[str]


# ============================================================================
# ROUTES
# ============================================================================

@app.get("/", tags=["Root"])
async def root() -> Dict[str, str]:
    """
    Root endpoint with API information.

    Returns:
        API name, version, and links to docs / health.
    """
    return {
        "name": "DrugForge API",
        "version": "1.0.0",
        "message": "AI-powered drug discovery prediction service",
        "docs": "/docs",
        "health": "/health",
        "models": "/models",
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check() -> HealthResponse:
    """
    Health check endpoint for deployment monitoring.

    Returns:
        HealthResponse with status, version, and loaded-model count.
    """
    loaded = model_loader.list_loaded()
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        models_loaded=len(loaded),
        models_available=loaded,
    )


@app.get("/models", tags=["Models"])
async def list_models() -> Dict[str, Dict[str, str]]:
    """
    List every prediction model and its availability status.

    Returns:
        Mapping of model name → metadata.
    """
    return model_loader.get_metadata()


# ============================================================================
# AUTH STUBS (frontend AuthContext compatibility)
# ============================================================================

@app.get("/auth/me", tags=["Auth"])
async def auth_me():
    """
    Stub auth endpoint - returns 401 when no auth system is configured.
    Prevents frontend AuthContext from throwing unhandled errors.
    """
    raise HTTPException(status_code=401, detail="Authentication not configured")


@app.post("/auth/login", tags=["Auth"])
async def auth_login():
    """Stub login endpoint."""
    raise HTTPException(status_code=501, detail="Authentication not implemented")


@app.post("/auth/register", tags=["Auth"])
async def auth_register():
    """Stub register endpoint."""
    raise HTTPException(status_code=501, detail="Authentication not implemented")


@app.post("/auth/logout", tags=["Auth"])
async def auth_logout():
    """Stub logout endpoint."""
    return {"message": "Logged out"}


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    """Return structured JSON for HTTP errors."""
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code},
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc: Exception):
    """Catch-all for unexpected errors."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "status_code": 500},
    )


# ============================================================================
# DEV ENTRYPOINT
# ============================================================================

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", "5001"))
    debug = os.getenv("ENVIRONMENT", "development") == "development"

    logger.info(f"🚀 Starting FastAPI server on port {port}")
    logger.info(f"📊 Docs: http://localhost:{port}/docs")

    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=debug, log_level="info")
