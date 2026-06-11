from fastapi import FastAPI

app = FastAPI(
    title="Hello World API",
    description="A simple Hello World FastAPI app",
    version="1.0.0",
)


@app.get("/", summary="Root", tags=["general"])
def read_root() -> dict[str, str]:
    return {"message": "Hello, World!"}


@app.get("/hello/{name}", summary="Greet by name", tags=["general"])
def greet(name: str) -> dict[str, str]:
    return {"message": f"Hello, {name}!"}
