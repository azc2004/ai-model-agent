from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "LLM Compass API"

def test_get_models():
    response = client.get("/api/v1/models")
    assert response.status_code == 200
    models = response.json()
    assert len(models) >= 5

def test_tco_simulation():
    payload = {
        "monthly_input_tokens_m": 500.0,
        "monthly_output_tokens_m": 100.0,
        "target_model_id": "deepseek-v4-pro",
        "target_quantization": "Q4",
        "kwh_cost_usd": 0.15,
        "hardware_lifecycle_months": 36
    }
    response = client.post("/api/v1/simulate/tco", json=payload)
    assert response.status_code == 200
    res = response.json()
    assert "api_cost" in res
    assert "self_hosted" in res
    assert res["model_id"] == "deepseek-v4-pro"
