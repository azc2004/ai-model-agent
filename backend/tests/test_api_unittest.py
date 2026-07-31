import unittest
from fastapi.testclient import TestClient
from app.main import app

class TestLLMCompassAPI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_root(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["service"], "LLM Compass API")

    def test_get_models(self):
        response = self.client.get("/api/v1/models")
        self.assertEqual(response.status_code, 200)
        models = response.json()
        self.assertGreaterEqual(len(models), 5)

    def test_tco_simulation(self):
        payload = {
            "monthly_input_tokens_m": 500.0,
            "monthly_output_tokens_m": 100.0,
            "target_model_id": "deepseek-v4-pro",
            "target_quantization": "Q4",
            "kwh_cost_usd": 0.15,
            "hardware_lifecycle_months": 36
        }
        response = self.client.post("/api/v1/simulate/tco", json=payload)
        self.assertEqual(response.status_code, 200)
        res = response.json()
        self.assertIn("api_cost", res)
        self.assertIn("self_hosted", res)
        self.assertEqual(res["model_id"], "deepseek-v4-pro")

if __name__ == "__main__":
    unittest.main()
