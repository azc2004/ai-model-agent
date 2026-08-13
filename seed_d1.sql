INSERT OR REPLACE INTO providers (id, name) VALUES ('anthropic', 'Anthropic');
INSERT OR REPLACE INTO providers (id, name) VALUES ('openai', 'OpenAI');
INSERT OR REPLACE INTO providers (id, name) VALUES ('deepseek', 'DeepSeek');
INSERT OR REPLACE INTO providers (id, name) VALUES ('xai', 'xAI (Grok)');
INSERT OR REPLACE INTO providers (id, name) VALUES ('google', 'Google AI');
INSERT OR REPLACE INTO providers (id, name) VALUES ('zhipu', 'Zhipu AI (GLM)');
INSERT OR REPLACE INTO providers (id, name) VALUES ('perplexity', 'Perplexity AI');
INSERT OR REPLACE INTO providers (id, name) VALUES ('fireworks_ai', 'Fireworks AI');
INSERT OR REPLACE INTO providers (id, name) VALUES ('aws_bedrock', 'AWS Bedrock');
INSERT OR REPLACE INTO providers (id, name) VALUES ('moonshot', 'Moonshot AI (Kimi)');
INSERT OR REPLACE INTO providers (id, name) VALUES ('meta', 'Meta AI');
INSERT OR REPLACE INTO providers (id, name) VALUES ('alibaba', 'Alibaba Cloud (Qwen)');
INSERT OR REPLACE INTO providers (id, name) VALUES ('together_ai', 'Together AI');
INSERT OR REPLACE INTO providers (id, name) VALUES ('mistral', 'Mistral AI');
INSERT OR REPLACE INTO providers (id, name) VALUES ('cohere', 'Cohere');
INSERT OR REPLACE INTO providers (id, name) VALUES ('groq', 'Groq');
INSERT OR REPLACE INTO providers (id, name) VALUES ('microsoft', 'Microsoft');
INSERT OR REPLACE INTO providers (id, name) VALUES ('inclusionai', 'Inclusionai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('qwen', 'Qwen');
INSERT OR REPLACE INTO providers (id, name) VALUES ('~deepseek', '~deepseek');
INSERT OR REPLACE INTO providers (id, name) VALUES ('thinkingmachines', 'Thinkingmachines');
INSERT OR REPLACE INTO providers (id, name) VALUES ('poolside', 'Poolside');
INSERT OR REPLACE INTO providers (id, name) VALUES ('meituan', 'Meituan');
INSERT OR REPLACE INTO providers (id, name) VALUES ('openrouter', 'Openrouter');
INSERT OR REPLACE INTO providers (id, name) VALUES ('moonshotai', 'Moonshotai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('kwaipilot', 'Kwaipilot');
INSERT OR REPLACE INTO providers (id, name) VALUES ('x-ai', 'X-ai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('~x-ai', '~x-ai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('aion-labs', 'Aion-labs');
INSERT OR REPLACE INTO providers (id, name) VALUES ('tencent', 'Tencent');
INSERT OR REPLACE INTO providers (id, name) VALUES ('nex-agi', 'Nex-agi');
INSERT OR REPLACE INTO providers (id, name) VALUES ('sakana', 'Sakana');
INSERT OR REPLACE INTO providers (id, name) VALUES ('z-ai', 'Z-ai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('~anthropic', '~anthropic');
INSERT OR REPLACE INTO providers (id, name) VALUES ('nvidia', 'Nvidia');
INSERT OR REPLACE INTO providers (id, name) VALUES ('minimax', 'Minimax');
INSERT OR REPLACE INTO providers (id, name) VALUES ('stepfun', 'Stepfun');
INSERT OR REPLACE INTO providers (id, name) VALUES ('perceptron', 'Perceptron');
INSERT OR REPLACE INTO providers (id, name) VALUES ('ibm-granite', 'Ibm-granite');
INSERT OR REPLACE INTO providers (id, name) VALUES ('mistralai', 'Mistralai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('~openai', '~openai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('~google', '~google');
INSERT OR REPLACE INTO providers (id, name) VALUES ('~moonshotai', '~moonshotai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('xiaomi', 'Xiaomi');
INSERT OR REPLACE INTO providers (id, name) VALUES ('arcee-ai', 'Arcee-ai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('rekaai', 'Rekaai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('bytedance-seed', 'Bytedance-seed');
INSERT OR REPLACE INTO providers (id, name) VALUES ('inception', 'Inception');
INSERT OR REPLACE INTO providers (id, name) VALUES ('upstage', 'Upstage');
INSERT OR REPLACE INTO providers (id, name) VALUES ('writer', 'Writer');
INSERT OR REPLACE INTO providers (id, name) VALUES ('relace', 'Relace');
INSERT OR REPLACE INTO providers (id, name) VALUES ('amazon', 'Amazon');
INSERT OR REPLACE INTO providers (id, name) VALUES ('allenai', 'Allenai');
INSERT OR REPLACE INTO providers (id, name) VALUES ('deepcogito', 'Deepcogito');
INSERT OR REPLACE INTO providers (id, name) VALUES ('thedrummer', 'Thedrummer');
INSERT OR REPLACE INTO providers (id, name) VALUES ('nousresearch', 'Nousresearch');
INSERT OR REPLACE INTO providers (id, name) VALUES ('ai21', 'Ai21');
INSERT OR REPLACE INTO providers (id, name) VALUES ('bytedance', 'Bytedance');
INSERT OR REPLACE INTO providers (id, name) VALUES ('cognitivecomputations', 'Cognitivecomputations');
INSERT OR REPLACE INTO providers (id, name) VALUES ('morph', 'Morph');
INSERT OR REPLACE INTO providers (id, name) VALUES ('baidu', 'Baidu');
INSERT OR REPLACE INTO providers (id, name) VALUES ('meta-llama', 'Meta-llama');
INSERT OR REPLACE INTO providers (id, name) VALUES ('sao10k', 'Sao10k');
INSERT OR REPLACE INTO providers (id, name) VALUES ('anthracite-org', 'Anthracite-org');
INSERT OR REPLACE INTO providers (id, name) VALUES ('mancer', 'Mancer');
INSERT OR REPLACE INTO providers (id, name) VALUES ('undi95', 'Undi95');
INSERT OR REPLACE INTO providers (id, name) VALUES ('gryphe', 'Gryphe');
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-opus-5', 'anthropic', 'Anthropic', 'Claude Opus 5', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 200000, 16384, '["text", "vision"]',
          '최고 수준 지능 및 문서 분석 최상위 모델', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 5.0, "output_price_per_1m": 25.0, "cached_input_price_per_1m": 1.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1392, "mmlu_pro": 90.1, "gpqa": 78.4, "swe_bench": 68.2}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-5.6-sol', 'openai', 'OpenAI', 'GPT-5.6 Sol', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 272000, 16384, '["text", "vision", "audio"]',
          'OpenAI 2026 플래그십 모델. 복잡한 시스템 추론 및 멀티 에이전트 오케스트레이션', 'https://platform.openai.com/docs/models', 'https://platform.openai.com/docs/models', '{"input_price_per_1m": 5.0, "output_price_per_1m": 30.0, "cached_input_price_per_1m": 2.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1385, "mmlu_pro": 89.4, "gpqa": 76.8, "swe_bench": 62.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4-5-preview', 'openai', 'OpenAI', 'GPT-4.5 Preview', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 128000, 16384, '["text", "vision"]',
          '최대 규모의 GPT 계열 모델. 감성 지능 및 창의적 글쓰기 특화', 'https://platform.openai.com/docs/models/gpt-4-5', 'https://platform.openai.com/docs/models/gpt-4-5', '{"input_price_per_1m": 75.0, "output_price_per_1m": 150.0, "cached_input_price_per_1m": 37.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1380, "mmlu_pro": 90.5, "gpqa": 77.0, "swe_bench": 38.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-opus-4-1', 'anthropic', 'Anthropic', 'Claude Opus 4.1', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text", "vision"]',
          'Claude 4세대 최고 성능. 복잡한 멀티스텝 추론 및 코딩 SOTA', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 15.0, "output_price_per_1m": 75.0, "cached_input_price_per_1m": 1.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1380, "mmlu_pro": 91.0, "gpqa": 84.0, "swe_bench": 72.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-reasoner', 'deepseek', 'DeepSeek', 'DeepSeek-R1 (reasoner alias)', 'Frontier', 1, 'Open-Weight',
          0, 'MoE CoT', 131072, 16384, '["text"]',
          'DeepSeek 공식 추론 엔드포인트. 현행 R1 모델로 자동 라우팅', 'https://platform.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.28, "output_price_per_1m": 0.42, "cached_input_price_per_1m": 0.07, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1375, "mmlu_pro": 90.0, "gpqa": 82.0, "swe_bench": 70.0}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-v4-pro', 'deepseek', 'DeepSeek', 'DeepSeek V4 Pro', 'Frontier', 1, 'Open-Weight',
          0, 'MoE (Active 37B)', 128000, 8192, '["text"]',
          '글로벌 탑티어 오픈웨이트 MoE', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.55, "output_price_per_1m": 2.19, "cached_input_price_per_1m": 0.14, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1370, "mmlu_pro": 88.5, "gpqa": 75.2, "swe_bench": 64.1}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'o3', 'openai', 'OpenAI', 'o3', 'Frontier', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 200000, 100000, '["text", "vision"]',
          'o시리즈 최상위 추론 모델. 복잡한 수학·과학·코딩 작업에 특화', 'https://platform.openai.com/docs/models/o3', 'https://platform.openai.com/docs/models/o3', '{"input_price_per_1m": 10.0, "output_price_per_1m": 40.0, "cached_input_price_per_1m": 2.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1370, "mmlu_pro": 91.0, "gpqa": 83.3, "swe_bench": 71.7}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'grok-4', 'xai', 'xAI (Grok)', 'Grok 4', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 256000, 16384, '["text", "vision"]',
          'xAI 플래그십. 실시간 X 데이터 접근 + 256k 컨텍스트 추론 모델', 'https://x.ai/api', 'https://docs.x.ai/docs/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1370, "mmlu_pro": 88.0, "gpqa": 80.0, "swe_bench": 65.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-2-5-pro', 'google', 'Google AI', 'Gemini 2.5 Pro', 'Frontier', 0, 'Proprietary',
          0, 'Dense (Thinking)', 1048576, 65536, '["text", "vision", "audio"]',
          'Google 최상위 추론. 1M 컨텍스트 + Thinking 내장', 'https://ai.google.dev', 'https://ai.google.dev/gemini-api/docs/models', '{"input_price_per_1m": 1.25, "output_price_per_1m": 10.0, "cached_input_price_per_1m": 0.31, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1370, "mmlu_pro": 90.0, "gpqa": 84.0, "swe_bench": 72.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-opus-4-5', 'anthropic', 'Anthropic', 'Claude Opus 4.5', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text", "vision"]',
          'Claude 4.5 Opus. 에이전트 툴 사용·복잡 추론 최상위', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 5.0, "output_price_per_1m": 25.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1370, "mmlu_pro": 89.0, "gpqa": 82.0, "swe_bench": 70.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'glm-5-2', 'zhipu', 'Zhipu AI (GLM)', 'GLM-5.2', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 8192, '["text", "vision"]',
          '에이전트 및 코딩 특화 GLM 신작', 'https://open.bigmodel.cn/dev/howuse/model', 'https://open.bigmodel.cn/dev/howuse/model', '{"input_price_per_1m": 0.6, "output_price_per_1m": 2.4, "cached_input_price_per_1m": 0.15, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1362, "mmlu_pro": 87.0, "gpqa": 73.5, "swe_bench": 61.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-3.1-pro', 'google', 'Google AI', 'Gemini 3.1 Pro', 'Frontier', 0, 'Proprietary',
          0, 'Native Multimodal', 2000000, 8192, '["text", "vision", "audio", "video"]',
          '200만 컨텍스트 및 옴니 전 영역 통합 처리 플래그십', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 2.0, "output_price_per_1m": 12.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1360, "mmlu_pro": 87.2, "gpqa": 73.1, "swe_bench": 56.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'perplexity-sonar-deep-research', 'perplexity', 'Perplexity AI', 'Sonar Deep Research', 'Frontier', 0, 'Proprietary',
          0, 'Web+Deep Reasoning', 128000, 8192, '["text"]',
          '다단계 추론 + 실시간 딥 리서치. 복잡한 분석 리포트 자동 생성', 'https://docs.perplexity.ai/guides/model-cards', 'https://docs.perplexity.ai/guides/model-cards', '{"input_price_per_1m": 2.0, "output_price_per_1m": 8.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1360, "mmlu_pro": 87.0, "gpqa": 76.0, "swe_bench": 60.0}',
          1, '', 0, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'fireworks-deepseek-r1', 'fireworks_ai', 'Fireworks AI', 'DeepSeek R1 (Fireworks)', 'Frontier', 1, 'Open-Weight',
          0, 'MoE CoT', 65536, 16384, '["text"]',
          'Fireworks AI DeepSeek R1 서빙. SOTA 추론 모델 최적화 배포', 'https://fireworks.ai', 'https://readme.fireworks.ai/docs/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 7.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1360, "mmlu_pro": 88.0, "gpqa": 79.0, "swe_bench": 67.0}',
          1, '', 1, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-r1', 'deepseek', 'DeepSeek', 'DeepSeek R1 (Reasoning)', 'Frontier', 1, 'Open-Weight',
          0, 'MoE RL Reasoning', 128000, 8192, '["text"]',
          'o1 수준 강화학습 심층 추론 모델', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.55, "output_price_per_1m": 2.19, "cached_input_price_per_1m": 0.14, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1358, "mmlu_pro": 87.9, "gpqa": 75.7, "swe_bench": 60.5}',
          1, '', 1, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'o1', 'openai', 'OpenAI', 'o1 (Latest)', 'Frontier', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 200000, 100000, '["text", "vision"]',
          '강화학습 심층 추론 정식 플래그십', 'https://platform.openai.com/docs/models/o1', 'https://platform.openai.com/docs/models/o1', '{"input_price_per_1m": 15.0, "output_price_per_1m": 60.0, "cached_input_price_per_1m": 7.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1355, "mmlu_pro": 89.0, "gpqa": 78.2, "swe_bench": 61.8}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'o1-2024-12-17', 'openai', 'OpenAI', 'o1 (2024-12-17)', 'Frontier', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 200000, 100000, '["text", "vision"]',
          'o1 정식 릴리스 12월 스냅샷', 'https://platform.openai.com/docs/models/o1', 'https://platform.openai.com/docs/models/o1', '{"input_price_per_1m": 15.0, "output_price_per_1m": 60.0, "cached_input_price_per_1m": 7.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1355, "mmlu_pro": 89.0, "gpqa": 78.2, "swe_bench": 61.8}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'fireworks-qwen-3-235b', 'fireworks_ai', 'Fireworks AI', 'Qwen 3 235B A22B (Fireworks)', 'Frontier', 1, 'Open-Weight',
          0, 'MoE (A22B)', 131072, 8192, '["text"]',
          'Fireworks 서빙 Qwen 3 최대 MoE. 235B 전체/22B 활성 초효율', 'https://fireworks.ai', 'https://readme.fireworks.ai/docs/models', '{"input_price_per_1m": 0.22, "output_price_per_1m": 0.88, "cached_input_price_per_1m": 0.055, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1355, "mmlu_pro": 87.0, "gpqa": 78.0, "swe_bench": 65.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-nova-premier', 'aws_bedrock', 'AWS Bedrock', 'Amazon Nova Premier', 'Frontier', 0, 'Proprietary',
          0, 'Native Multimodal', 1000000, 8192, '["text", "vision"]',
          'Amazon 최상위 프론티어 모델. VPC 통합', 'https://aws.amazon.com/bedrock/nova', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 2.0, "output_price_per_1m": 8.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1352, "mmlu_pro": 85.2, "gpqa": 71.0, "swe_bench": 54.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'kimi-k2-7', 'moonshot', 'Moonshot AI (Kimi)', 'Kimi K2.7', 'Frontier', 1, 'Open-Weight',
          0, 'MoE Ultra-Long Context', 2000000, 16384, '["text", "vision"]',
          '200만 토큰 문서 이해 및 에이전트 코딩', 'https://platform.moonshot.cn/docs/intro', 'https://platform.moonshot.cn/docs/intro', '{"input_price_per_1m": 1.0, "output_price_per_1m": 4.0, "cached_input_price_per_1m": 0.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1350, "mmlu_pro": 85.5, "gpqa": 71.0, "swe_bench": 57.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-4-maverick', 'meta', 'Meta AI', 'Llama 4 Maverick', 'Frontier', 1, 'Open-Weight',
          0, 'MoE (Early Fusion)', 1000000, 8192, '["text", "vision"]',
          '400B MoE 파라미터 멀티모달 플래그십. 128 전문가 혼합 구조', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.5, "output_price_per_1m": 1.5, "cached_input_price_per_1m": 0.12, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1350, "mmlu_pro": 86.0, "gpqa": 69.0, "swe_bench": 54.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-sonnet-4-5', 'anthropic', 'Anthropic', 'Claude Sonnet 4.5', 'Mid', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text", "vision"]',
          '에이전트 작업 및 도구 사용에 최적화된 Sonnet 4.5', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.3, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1350, "mmlu_pro": 86.0, "gpqa": 71.0, "swe_bench": 56.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'perplexity-sonar-reasoning-pro', 'perplexity', 'Perplexity AI', 'Sonar Reasoning Pro', 'Frontier', 0, 'Proprietary',
          0, 'Web+CoT', 128000, 8192, '["text"]',
          '웹 검색 통합 고급 추론 Pro 버전. 프리미엄 분석·추론 태스크', 'https://docs.perplexity.ai/guides/model-cards', 'https://docs.perplexity.ai/guides/model-cards', '{"input_price_per_1m": 2.0, "output_price_per_1m": 8.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1350, "mmlu_pro": 86.0, "gpqa": 75.0, "swe_bench": 59.0}',
          1, '', 1, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-chat', 'deepseek', 'DeepSeek', 'DeepSeek-V3 (chat alias)', 'Frontier', 1, 'Open-Weight',
          0, 'MoE', 131072, 8192, '["text"]',
          'DeepSeek 공식 chat 엔드포인트. 현행 최신 V3 모델로 자동 라우팅', 'https://platform.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.28, "output_price_per_1m": 0.42, "cached_input_price_per_1m": 0.07, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1350, "mmlu_pro": 84.0, "gpqa": 68.0, "swe_bench": 52.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-sonnet-5', 'anthropic', 'Anthropic', 'Claude Sonnet 5', 'Mid', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text", "vision"]',
          '성능과 속도 표준 주력 모델', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 2.0, "output_price_per_1m": 10.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1345, "mmlu_pro": 84.8, "gpqa": 69.5, "swe_bench": 54.8}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-3-flash-preview', 'google', 'Google AI', 'Gemini 3 Flash Preview', 'Mid', 0, 'Proprietary',
          0, 'Dense (Thinking)', 1048576, 65536, '["text", "vision", "audio"]',
          'Gemini 3세대 Flash 프리뷰. Thinking 내장 차세대 멀티모달', 'https://ai.google.dev', 'https://ai.google.dev/gemini-api/docs/models', '{"input_price_per_1m": 0.5, "output_price_per_1m": 3.0, "cached_input_price_per_1m": 0.125, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1345, "mmlu_pro": 87.0, "gpqa": 77.0, "swe_bench": 62.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-max', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 Max', 'Frontier', 0, 'Proprietary',
          0, 'MoE', 128000, 8192, '["text", "vision"]',
          'Alibaba 플래그십 상용 API', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 1.6, "output_price_per_1m": 6.4, "cached_input_price_per_1m": 0.4, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1342, "mmlu_pro": 85.0, "gpqa": 68.5, "swe_bench": 52.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-5.6-terra', 'openai', 'OpenAI', 'GPT-5.6 Terra', 'Mid', 0, 'Proprietary',
          0, 'Dense', 272000, 16384, '["text", "vision"]',
          '성능과 가격 밸런스가 뛰어난 OpenAI Mid-tier 주력 모델', 'https://platform.openai.com/docs/models', 'https://platform.openai.com/docs/models', '{"input_price_per_1m": 2.5, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 1.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1340, "mmlu_pro": 83.5, "gpqa": 68.2, "swe_bench": 51.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'perplexity-sonar-reasoning', 'perplexity', 'Perplexity AI', 'Sonar Reasoning', 'Frontier', 0, 'Proprietary',
          0, 'DeepSeek R1 Web-Integrated', 128000, 8192, '["text"]',
          'DeepSeek R1 웹 통합 심층 추론 API', 'https://docs.perplexity.ai/guides/model-cards', 'https://docs.perplexity.ai/guides/model-cards', '{"input_price_per_1m": 1.0, "output_price_per_1m": 5.0, "cached_input_price_per_1m": 0.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1340, "mmlu_pro": 86.5, "gpqa": 74.0, "swe_bench": 58.0}',
          1, '', 1, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'o4-mini', 'openai', 'OpenAI', 'o4-mini', 'Small', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 200000, 100000, '["text", "vision"]',
          'o시리즈 최신 소형 고속 추론 모델. 코딩·수학 태스크 최적화', 'https://platform.openai.com/docs/models/o4-mini', 'https://platform.openai.com/docs/models/o4-mini', '{"input_price_per_1m": 1.1, "output_price_per_1m": 4.4, "cached_input_price_per_1m": 0.275, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1340, "mmlu_pro": 88.0, "gpqa": 79.6, "swe_bench": 68.1}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'grok-3', 'xai', 'xAI (Grok)', 'Grok 3', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 131072, 8192, '["text", "vision"]',
          'X 실시간 검색 통합 플래그십. 고성능 코딩·분석 특화', 'https://x.ai/api', 'https://docs.x.ai/docs/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1340, "mmlu_pro": 85.0, "gpqa": 75.0, "swe_bench": 58.0}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-2-5-flash', 'google', 'Google AI', 'Gemini 2.5 Flash', 'Mid', 0, 'Proprietary',
          0, 'Dense (Thinking)', 1048576, 65536, '["text", "vision", "audio"]',
          '1M 컨텍스트 Thinking 지원 고속 Flash. 가성비 최상위', 'https://ai.google.dev', 'https://ai.google.dev/gemini-api/docs/models', '{"input_price_per_1m": 0.3, "output_price_per_1m": 2.5, "cached_input_price_per_1m": 0.075, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1340, "mmlu_pro": 86.0, "gpqa": 75.0, "swe_bench": 60.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'together-deepseek-v3', 'together_ai', 'Together AI', 'DeepSeek-V3 (Together)', 'Frontier', 1, 'Open-Weight',
          0, 'MoE', 65536, 8192, '["text"]',
          'Together AI DeepSeek V3 서빙. 오픈웨이트 최고 가성비 MoE', 'https://together.ai', 'https://docs.together.ai/docs/serverless-models', '{"input_price_per_1m": 1.25, "output_price_per_1m": 1.25, "cached_input_price_per_1m": 0.31, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1340, "mmlu_pro": 84.0, "gpqa": 68.0, "swe_bench": 52.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-2.0-flash-thinking-exp', 'google', 'Google AI', 'Gemini 2.0 Flash Thinking', 'Frontier', 0, 'Proprietary',
          0, 'Native Multimodal RL', 1000000, 8192, '["text", "vision"]',
          '생각 과정을 노출하는 추론 특화 실험 버전', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6, "cached_input_price_per_1m": 0.035, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1335, "mmlu_pro": 84.0, "gpqa": 70.0, "swe_bench": 52.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'o1-preview', 'openai', 'OpenAI', 'o1-preview', 'Frontier', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 128000, 32768, '["text"]',
          'o1 초기 공개 프리뷰 스냅샷', 'https://platform.openai.com/docs/models/o1', 'https://platform.openai.com/docs/models/o1', '{"input_price_per_1m": 15.0, "output_price_per_1m": 60.0, "cached_input_price_per_1m": 7.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1330, "mmlu_pro": 85.0, "gpqa": 72.0, "swe_bench": 53.0}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-4-70b', 'meta', 'Meta AI', 'Llama 4 Scout 70B', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 10000000, 8192, '["text", "vision"]',
          '1,000만 토큰 스캐닝 Llama 4 라인업', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.6, "output_price_per_1m": 1.8, "cached_input_price_per_1m": 0.15, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1330, "mmlu_pro": 83.0, "gpqa": 65.5, "swe_bench": 49.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-v4-flash', 'deepseek', 'DeepSeek', 'DeepSeek-V4 Flash', 'Mid', 1, 'Open-Weight',
          0, 'MoE Ultra-Long', 1000000, 8192, '["text"]',
          '100만 토큰 초장문 컨텍스트 + 추론 지원 고속 MoE 모델', 'https://platform.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.14, "output_price_per_1m": 0.28, "cached_input_price_per_1m": 0.035, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1330, "mmlu_pro": 83.0, "gpqa": 72.0, "swe_bench": 58.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-3.6-72b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 3.6 72B', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text", "vision"]',
          '다국어 및 코딩 탑티어 Apache 2.0 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.4, "output_price_per_1m": 1.2, "cached_input_price_per_1m": 0.1, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1325, "mmlu_pro": 82.1, "gpqa": 64.0, "swe_bench": 48.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistral-large-3', 'mistral', 'Mistral AI', 'Mistral Large 3', 'Frontier', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text", "vision"]',
          '123B 다국어 플래그십', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1320, "mmlu_pro": 81.2, "gpqa": 61.5, "swe_bench": 46.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'grok-4-1-fast', 'xai', 'xAI (Grok)', 'Grok 4.1 Fast', 'Mid', 0, 'Proprietary',
          0, 'Dense', 2000000, 8192, '["text", "vision"]',
          '200만 토큰 초장문 컨텍스트 고속 추론 버전', 'https://x.ai/api', 'https://docs.x.ai/docs/models', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.5, "cached_input_price_per_1m": 0.05, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1320, "mmlu_pro": 82.0, "gpqa": 70.0, "swe_bench": 52.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-3.6-flash', 'google', 'Google AI', 'Gemini 3.6 Flash', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal', 1000000, 8192, '["text", "vision", "audio"]',
          'Google 메인 고속 서빙 모델', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 1.5, "output_price_per_1m": 7.5, "cached_input_price_per_1m": 0.38, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1315, "mmlu_pro": 80.5, "gpqa": 63.4, "swe_bench": 45.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-v3', 'deepseek', 'DeepSeek', 'DeepSeek V3', 'Mid', 1, 'Open-Weight',
          0, 'MoE (Active 37B)', 128000, 8192, '["text"]',
          '671B 오픈소스 기준 표준 모델', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.27, "output_price_per_1m": 1.1, "cached_input_price_per_1m": 0.07, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1310, "mmlu_pro": 80.1, "gpqa": 62.5, "swe_bench": 49.2}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwq-32b-preview', 'alibaba', 'Alibaba Cloud (Qwen)', 'QwQ 32B Preview (Reasoning)', 'Mid', 1, 'Open-Weight',
          0, 'Chain-of-Thought RL', 32000, 8192, '["text"]',
          '추론 특화 32B 오픈 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.25, "output_price_per_1m": 0.75, "cached_input_price_per_1m": 0.06, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1310, "mmlu_pro": 82.0, "gpqa": 67.0, "swe_bench": 48.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'pixtral-large', 'mistral', 'Mistral AI', 'Pixtral Large', 'Frontier', 0, 'Proprietary',
          0, 'Multimodal', 128000, 8192, '["text", "vision"]',
          '123B 최상위 멀티모달', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1310, "mmlu_pro": 80.0, "gpqa": 60.0, "swe_bench": 45.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'perplexity-sonar-pro', 'perplexity', 'Perplexity AI', 'Sonar Pro', 'Mid', 0, 'Proprietary',
          0, 'Web Search Fine-Tuned', 200000, 8192, '["text", "vision"]',
          '실시간 웹 검색 탐색형 LLM', 'https://docs.perplexity.ai/guides/model-cards', 'https://docs.perplexity.ai/guides/model-cards', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1310, "mmlu_pro": 80.0, "gpqa": 62.0, "swe_bench": 42.0}',
          1, '', 0, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'grok-2-vision', 'xai', 'xAI (Grok)', 'Grok 2 Vision', 'Mid', 0, 'Proprietary',
          0, 'Dense Multimodal', 32768, 8192, '["text", "vision"]',
          '이미지 이해 + X 검색 통합 멀티모달 모델', 'https://x.ai/api', 'https://docs.x.ai/docs/models', '{"input_price_per_1m": 2.0, "output_price_per_1m": 10.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1310, "mmlu_pro": 81.0, "gpqa": 68.0, "swe_bench": 50.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'together-llama-3-1-405b', 'together_ai', 'Together AI', 'Meta Llama 3.1 405B (Together)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense', 131072, 8192, '["text"]',
          'Together AI에서 서빙하는 Llama 3.1 405B. 완전 오픈웨이트 최대 규모', 'https://together.ai', 'https://docs.together.ai/docs/serverless-models', '{"input_price_per_1m": 3.5, "output_price_per_1m": 3.5, "cached_input_price_per_1m": 0.875, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1310, "mmlu_pro": 82.0, "gpqa": 65.0, "swe_bench": 50.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-nova-pro', 'aws_bedrock', 'AWS Bedrock', 'Amazon Nova Pro', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal', 300000, 5000, '["text", "vision", "video"]',
          '속도와 지능의 균형 멀티모달', 'https://aws.amazon.com/bedrock/nova', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 0.8, "output_price_per_1m": 3.2, "cached_input_price_per_1m": 0.2, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1308, "mmlu_pro": 79.4, "gpqa": 61.8, "swe_bench": 44.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'o3-mini', 'openai', 'OpenAI', 'o3-mini (Latest)', 'Small', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 200000, 100000, '["text"]',
          '2025 최신 o3 세대 논리/코딩 추론 모델', 'https://platform.openai.com/docs/models/o3-mini', 'https://platform.openai.com/docs/models/o3-mini', '{"input_price_per_1m": 1.1, "output_price_per_1m": 4.4, "cached_input_price_per_1m": 0.55, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1305, "mmlu_pro": 79.5, "gpqa": 62.0, "swe_bench": 47.2}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'o3-mini-2025-01-31', 'openai', 'OpenAI', 'o3-mini (2025-01-31)', 'Small', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 200000, 100000, '["text"]',
          'o3-mini 1월 스냅샷', 'https://platform.openai.com/docs/models/o3-mini', 'https://platform.openai.com/docs/models/o3-mini', '{"input_price_per_1m": 1.1, "output_price_per_1m": 4.4, "cached_input_price_per_1m": 0.55, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1305, "mmlu_pro": 79.5, "gpqa": 62.0, "swe_bench": 47.2}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'fireworks-llama-3-1-405b', 'fireworks_ai', 'Fireworks AI', 'Llama 3.1 405B (Fireworks)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense', 131072, 8192, '["text"]',
          'Fireworks AI 최적화 Llama 3.1 405B. 저비용 대형 모델 추론', 'https://fireworks.ai', 'https://readme.fireworks.ai/docs/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 3.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1305, "mmlu_pro": 81.0, "gpqa": 63.0, "swe_bench": 49.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-2.0-flash-exp', 'google', 'Google AI', 'Gemini 2.0 Flash (Experimental)', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal', 1000000, 8192, '["text", "vision", "audio"]',
          '속도와 멀티모달 능력을 강화한 실험 버전', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.4, "cached_input_price_per_1m": 0.025, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1300, "mmlu_pro": 79.0, "gpqa": 61.0, "swe_bench": 42.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-vl-72b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 VL 72B', 'Mid', 1, 'Open-Weight',
          0, 'Multimodal', 128000, 8192, '["text", "vision", "video"]',
          '72B 비디오 이해 멀티모달 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.45, "output_price_per_1m": 1.35, "cached_input_price_per_1m": 0.11, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1300, "mmlu_pro": 80.0, "gpqa": 62.0, "swe_bench": 44.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-command-a', 'cohere', 'Cohere', 'Command A', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 256000, 8192, '["text"]',
          '기업용 에이전트 워크플로 특화 256k 컨텍스트 플래그십', 'https://docs.cohere.com/docs/models', 'https://docs.cohere.com/docs/models', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0, "cached_input_price_per_1m": 0.625, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1300, "mmlu_pro": 79.0, "gpqa": 60.0, "swe_bench": 45.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-3-1-flash-lite', 'google', 'Google AI', 'Gemini 3.1 Flash Lite', 'Small', 0, 'Proprietary',
          0, 'Dense', 1048576, 32768, '["text", "vision"]',
          'Gemini 3.1 초경량. 엣지·모바일 온디바이스 추론 최적화', 'https://ai.google.dev', 'https://ai.google.dev/gemini-api/docs/models', '{"input_price_per_1m": 0.25, "output_price_per_1m": 1.5, "cached_input_price_per_1m": 0.063, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1300, "mmlu_pro": 80.0, "gpqa": 62.0, "swe_bench": 45.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-haiku-4.5', 'anthropic', 'Anthropic', 'Claude Haiku 4.5', 'Small', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text", "vision"]',
          '초고속 핑퐁 대화 특화 소형 모델', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 1.0, "output_price_per_1m": 5.0, "cached_input_price_per_1m": 0.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1295, "mmlu_pro": 78.8, "gpqa": 59.4, "swe_bench": 42.0}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-plus', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 Plus', 'Mid', 0, 'Proprietary',
          0, 'Dense', 128000, 8192, '["text"]',
          '상용 클라우드 주력 API', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.4, "output_price_per_1m": 1.2, "cached_input_price_per_1m": 0.1, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1295, "mmlu_pro": 78.5, "gpqa": 60.0, "swe_bench": 42.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-haiku-4-5', 'anthropic', 'Anthropic', 'Claude Haiku 4.5', 'Small', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text", "vision"]',
          'Claude 4.5 최고속 경량. 실시간 대화·분류 태스크 최적화', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 1.0, "output_price_per_1m": 5.0, "cached_input_price_per_1m": 0.1, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1295, "mmlu_pro": 76.0, "gpqa": 56.0, "swe_bench": 42.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-5.6-luna', 'openai', 'OpenAI', 'GPT-5.6 Luna', 'Small', 0, 'Proprietary',
          0, 'Dense', 128000, 8192, '["text", "vision"]',
          '대량 토큰 처리에 최적화된 저비용 초고속 소형 모델', 'https://platform.openai.com/docs/models', 'https://platform.openai.com/docs/models', '{"input_price_per_1m": 1.0, "output_price_per_1m": 6.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1290, "mmlu_pro": 78.2, "gpqa": 59.1, "swe_bench": 41.2}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'o1-mini', 'openai', 'OpenAI', 'o1-mini (Latest)', 'Small', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 128000, 65536, '["text"]',
          'o1 고속 경량 추론 전용 모델', 'https://platform.openai.com/docs/models/o1', 'https://platform.openai.com/docs/models/o1', '{"input_price_per_1m": 3.0, "output_price_per_1m": 12.0, "cached_input_price_per_1m": 1.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1290, "mmlu_pro": 77.0, "gpqa": 60.0, "swe_bench": 45.0}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'o1-mini-2024-09-12', 'openai', 'OpenAI', 'o1-mini (2024-09-12)', 'Small', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 128000, 65536, '["text"]',
          'o1-mini 9월 스냅샷', 'https://platform.openai.com/docs/models/o1', 'https://platform.openai.com/docs/models/o1', '{"input_price_per_1m": 3.0, "output_price_per_1m": 12.0, "cached_input_price_per_1m": 1.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1290, "mmlu_pro": 77.0, "gpqa": 60.0, "swe_bench": 45.0}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'grok-3-mini', 'xai', 'xAI (Grok)', 'Grok 3 Mini', 'Small', 0, 'Proprietary',
          0, 'Dense', 131072, 8192, '["text"]',
          'Grok 3 경량 버전. 빠른 응답·저비용 추론 최적화', 'https://x.ai/api', 'https://docs.x.ai/docs/models', '{"input_price_per_1m": 0.3, "output_price_per_1m": 0.5, "cached_input_price_per_1m": 0.07, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1290, "mmlu_pro": 78.0, "gpqa": 62.0, "swe_bench": 45.0}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'groq-deepseek-r1-distill-70b', 'groq', 'Groq', 'DeepSeek R1 Distill 70B (Groq)', 'Mid', 1, 'Open-Weight',
          0, 'Dense Distilled', 131072, 8192, '["text"]',
          'DeepSeek R1 추론 증류 70B. Groq LPU 초고속 서빙', 'https://console.groq.com', 'https://console.groq.com/docs/models', '{"input_price_per_1m": 0.75, "output_price_per_1m": 0.99, "cached_input_price_per_1m": 0.18, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1290, "mmlu_pro": 77.0, "gpqa": 65.0, "swe_bench": 48.0}',
          1, '', 1, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-2-5-flash-lite', 'google', 'Google AI', 'Gemini 2.5 Flash Lite', 'Small', 0, 'Proprietary',
          0, 'Dense', 1048576, 32768, '["text", "vision"]',
          '1M 컨텍스트 초경량 Flash. 대량 처리 최저 비용', 'https://ai.google.dev', 'https://ai.google.dev/gemini-api/docs/models', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.4, "cached_input_price_per_1m": 0.025, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1290, "mmlu_pro": 78.0, "gpqa": 58.0, "swe_bench": 42.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'together-qwen-2-5-72b', 'together_ai', 'Together AI', 'Qwen 2.5 72B Instruct (Together)', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 131072, 8192, '["text"]',
          'Together AI Qwen 2.5 72B 서빙. 다국어·코딩 우수 오픈웨이트', 'https://together.ai', 'https://docs.together.ai/docs/serverless-models', '{"input_price_per_1m": 1.2, "output_price_per_1m": 1.2, "cached_input_price_per_1m": 0.3, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1290, "mmlu_pro": 79.0, "gpqa": 60.0, "swe_bench": 45.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-llm-67b', 'deepseek', 'DeepSeek', 'DeepSeek LLM 67B', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 4096, 4096, '["text"]',
          '초기 67B 오리지널 모델', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.4, "cached_input_price_per_1m": 0.05, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1225, "mmlu_pro": 68.0, "gpqa": 41.0, "swe_bench": 26.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4o', 'openai', 'OpenAI', 'GPT-4o (Latest)', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal', 128000, 16384, '["text", "vision", "audio"]',
          '범용 플래그십 옴니 모델 공식 최신 버전', 'https://platform.openai.com/docs/models/gpt-4o', 'https://platform.openai.com/docs/models/gpt-4o', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0, "cached_input_price_per_1m": 1.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1286, "mmlu_pro": 77.0, "gpqa": 53.6, "swe_bench": 38.8}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4o-2024-11-20', 'openai', 'OpenAI', 'GPT-4o (2024-11-20)', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal', 128000, 16384, '["text", "vision", "audio"]',
          '2024-11-20 릴리스 안정화 스냅샷', 'https://platform.openai.com/docs/models/gpt-4o', 'https://platform.openai.com/docs/models/gpt-4o', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0, "cached_input_price_per_1m": 1.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1286, "mmlu_pro": 77.0, "gpqa": 53.6, "swe_bench": 38.8}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-1-405b-bedrock', 'aws_bedrock', 'AWS Bedrock', 'Llama 3.1 405B (on Bedrock)', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 128000, 4096, '["text"]',
          'AWS 서버리스 호스팅 Llama 3.1 405B 초대형 모델', 'https://aws.amazon.com/bedrock/llama', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 2.4, "output_price_per_1m": 2.4, "cached_input_price_per_1m": 0.6, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1285, "mmlu_pro": 78.2, "gpqa": 55.0, "swe_bench": 39.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-1-405b-instruct', 'meta', 'Meta AI', 'Llama 3.1 405B Instruct', 'Frontier', 1, 'Open-Weight',
          0, 'Dense', 128000, 4096, '["text"]',
          '405B 프론티어 오픈 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1285, "mmlu_pro": 78.2, "gpqa": 55.0, "swe_bench": 39.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-5-sonnet-20241022', 'anthropic', 'Anthropic', 'Claude 3.5 Sonnet (20241022)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text", "vision"]',
          'Computer Use 및 코딩 기능 업그레이드 최신 릴리스', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1282, "mmlu_pro": 77.5, "gpqa": 59.4, "swe_bench": 49.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-5-sonnet-bedrock', 'aws_bedrock', 'AWS Bedrock', 'Claude 3.5 Sonnet v2 (on Bedrock)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text", "vision"]',
          'AWS 관리형 서버리스 호스팅 Claude 3.5 Sonnet v2', 'https://aws.amazon.com/bedrock/claude', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1282, "mmlu_pro": 77.5, "gpqa": 59.4, "swe_bench": 49.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-72b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 72B', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text"]',
          '72B 오픈웨이트 표준', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.35, "output_price_per_1m": 1.05, "cached_input_price_per_1m": 0.08, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1282, "mmlu_pro": 77.0, "gpqa": 58.0, "swe_bench": 39.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4o-2024-08-06', 'openai', 'OpenAI', 'GPT-4o (2024-08-06)', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal', 128000, 16384, '["text", "vision"]',
          '구조화 출력(Structured Outputs) 최초 지원 스냅샷', 'https://platform.openai.com/docs/models/gpt-4o', 'https://platform.openai.com/docs/models/gpt-4o', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0, "cached_input_price_per_1m": 1.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1280, "mmlu_pro": 76.5, "gpqa": 53.0, "swe_bench": 38.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-3-70b-bedrock', 'aws_bedrock', 'AWS Bedrock', 'Llama 3.3 70B (on Bedrock)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 128000, 4096, '["text"]',
          'AWS 서버리스 관리형 Llama 3.3 70B', 'https://aws.amazon.com/bedrock/llama', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 0.72, "output_price_per_1m": 0.72, "cached_input_price_per_1m": 0.18, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1280, "mmlu_pro": 76.8, "gpqa": 52.5, "swe_bench": 38.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-3-70b-instruct', 'meta', 'Meta AI', 'Llama 3.3 70B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text"]',
          '405B급 지능을 70B 파라미터로 압축한 오픈 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.4, "output_price_per_1m": 1.2, "cached_input_price_per_1m": 0.1, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1280, "mmlu_pro": 76.8, "gpqa": 52.5, "swe_bench": 38.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistral-large-2407', 'mistral', 'Mistral AI', 'Mistral Large 2 (2407)', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 128000, 4096, '["text"]',
          '123B 코드/추론 모델', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1280, "mmlu_pro": 77.0, "gpqa": 55.0, "swe_bench": 40.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-haiku-3-5', 'anthropic', 'Anthropic', 'Claude Haiku 3.5', 'Small', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text", "vision"]',
          'Sonnet 3 수준의 지능을 가진 빠르고 경량 모델', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 0.8, "output_price_per_1m": 4.0, "cached_input_price_per_1m": 0.08, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1280, "mmlu_pro": 75.0, "gpqa": 55.0, "swe_bench": 40.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4o-realtime-preview', 'openai', 'OpenAI', 'GPT-4o Realtime Preview', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal Realtime', 128000, 4096, '["text", "audio"]',
          '양방향 초저지연 음성 대화 API', 'https://platform.openai.com/docs/models/gpt-4o-realtime', 'https://platform.openai.com/docs/models/gpt-4o-realtime', '{"input_price_per_1m": 5.0, "output_price_per_1m": 20.0, "cached_input_price_per_1m": 2.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1275, "mmlu_pro": 74.0, "gpqa": 50.0, "swe_bench": 35.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-5-sonnet-20240620', 'anthropic', 'Anthropic', 'Claude 3.5 Sonnet (20240620)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text", "vision"]',
          '3.5 Sonnet 오리지널 릴리스 스냅샷', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1275, "mmlu_pro": 76.8, "gpqa": 58.5, "swe_bench": 45.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-coder-32b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 Coder 32B', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text"]',
          '32B GPT-4o급 코딩 오픈 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.6, "cached_input_price_per_1m": 0.05, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1275, "mmlu_pro": 76.2, "gpqa": 54.0, "swe_bench": 45.2}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4o-2024-05-13', 'openai', 'OpenAI', 'GPT-4o (2024-05-13)', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal', 128000, 4096, '["text", "vision"]',
          'GPT-4o 최초 데뷔 스냅샷', 'https://platform.openai.com/docs/models/gpt-4o', 'https://platform.openai.com/docs/models/gpt-4o', '{"input_price_per_1m": 5.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 2.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1270, "mmlu_pro": 75.0, "gpqa": 51.0, "swe_bench": 36.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4o-audio-preview', 'openai', 'OpenAI', 'GPT-4o Audio Preview', 'Mid', 0, 'Proprietary',
          0, 'Audio Native', 128000, 16384, '["text", "audio"]',
          '오디오 입력 및 음성 직접 생성 API', 'https://platform.openai.com/docs/models/gpt-4o-audio', 'https://platform.openai.com/docs/models/gpt-4o-audio', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0, "cached_input_price_per_1m": 1.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1270, "mmlu_pro": 74.0, "gpqa": 49.0, "swe_bench": 34.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-2-90b-vision-bedrock', 'aws_bedrock', 'AWS Bedrock', 'Llama 3.2 90B Vision (on Bedrock)', 'Mid', 0, 'Proprietary',
          0, 'Multimodal', 128000, 4096, '["text", "vision"]',
          'AWS 서버리스 호스팅 Llama 3.2 90B 비전 모델', 'https://aws.amazon.com/bedrock/llama', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 0.9, "output_price_per_1m": 0.9, "cached_input_price_per_1m": 0.22, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1270, "mmlu_pro": 75.0, "gpqa": 51.0, "swe_bench": 36.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistral-large-2-bedrock', 'aws_bedrock', 'AWS Bedrock', 'Mistral Large 2 (on Bedrock)', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 128000, 4096, '["text"]',
          'AWS 서버리스 호스팅 Mistral Large 2', 'https://aws.amazon.com/bedrock/mistral', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1270, "mmlu_pro": 75.5, "gpqa": 51.0, "swe_bench": 36.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-v2-5', 'deepseek', 'DeepSeek', 'DeepSeek V2.5', 'Mid', 1, 'Open-Weight',
          0, 'MoE', 128000, 8192, '["text"]',
          'Coder V2와 Chat 기능 통합 버전', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.14, "output_price_per_1m": 0.28, "cached_input_price_per_1m": 0.03, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1270, "mmlu_pro": 75.0, "gpqa": 53.0, "swe_bench": 41.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-2-90b-vision', 'meta', 'Meta AI', 'Llama 3.2 90B Vision', 'Mid', 1, 'Open-Weight',
          0, 'Multimodal', 128000, 4096, '["text", "vision"]',
          'Meta 대표 90B 비전 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.9, "output_price_per_1m": 0.9, "cached_input_price_per_1m": 0.22, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1270, "mmlu_pro": 75.0, "gpqa": 51.0, "swe_bench": 36.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'groq-llama-3-3-70b', 'groq', 'Groq', 'Llama 3.3 70B (Groq LPU)', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text"]',
          'Groq LPU 초고속 Llama 3.3 70B. 업계 최저 레이턴시 서빙', 'https://console.groq.com', 'https://console.groq.com/docs/models', '{"input_price_per_1m": 0.59, "output_price_per_1m": 0.79, "cached_input_price_per_1m": 0.14, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1270, "mmlu_pro": 72.0, "gpqa": 50.0, "swe_bench": 38.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-coder-v2', 'deepseek', 'DeepSeek', 'DeepSeek Coder V2 (236B)', 'Mid', 1, 'Open-Weight',
          0, 'MoE (Active 21B)', 128000, 8192, '["text"]',
          '338개 언어 지원 코딩 특화 모델', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.14, "output_price_per_1m": 0.28, "cached_input_price_per_1m": 0.03, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1268, "mmlu_pro": 74.8, "gpqa": 52.1, "swe_bench": 43.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'phi-4-14b', 'microsoft', 'Microsoft', 'Phi-4 14B', 'Small', 1, 'Open-Weight',
          0, 'Dense', 64000, 4096, '["text"]',
          '수학/논리 추론 특화 14B 모델', 'https://huggingface.co/microsoft/phi-4', 'https://huggingface.co/microsoft', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.45, "cached_input_price_per_1m": 0.04, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1265, "mmlu_pro": 76.0, "gpqa": 56.8, "swe_bench": 38.2}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-1.5-pro-002', 'google', 'Google AI', 'Gemini 1.5 Pro (002)', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal MoE', 2000000, 8192, '["text", "vision", "audio", "video"]',
          '200만 토큰 정식 안정화 스냅샷', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 3.5, "output_price_per_1m": 10.5, "cached_input_price_per_1m": 0.875, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1262, "mmlu_pro": 74.5, "gpqa": 50.0, "swe_bench": 35.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mixtral-8x22b', 'mistral', 'Mistral AI', 'Mixtral 8x22B', 'Mid', 1, 'Open-Weight',
          0, 'MoE (Active 39B)', 64000, 4096, '["text"]',
          '오픈소스 MoE 대표 모델', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', '{"input_price_per_1m": 0.9, "output_price_per_1m": 2.7, "cached_input_price_per_1m": 0.22, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1262, "mmlu_pro": 73.5, "gpqa": 49.0, "swe_bench": 36.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-3.5-flash-lite', 'google', 'Google AI', 'Gemini 3.5 Flash-Lite', 'Small', 0, 'Proprietary',
          0, 'Native Multimodal', 1000000, 8192, '["text", "vision"]',
          '1M 토큰 당 단가 효율성 최상위 모델', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 0.3, "output_price_per_1m": 2.5, "cached_input_price_per_1m": 0.08, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1260, "mmlu_pro": 74.1, "gpqa": 52.0, "swe_bench": 34.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-1-70b-instruct', 'meta', 'Meta AI', 'Llama 3.1 70B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 128000, 4096, '["text"]',
          '3.1 세대 70B 표준 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.45, "output_price_per_1m": 1.35, "cached_input_price_per_1m": 0.11, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1260, "mmlu_pro": 74.0, "gpqa": 49.0, "swe_bench": 33.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-command-r-plus-bedrock', 'aws_bedrock', 'AWS Bedrock', 'Command R+ (on Bedrock)', 'Frontier', 0, 'Proprietary',
          0, 'Dense RAG', 128000, 4096, '["text"]',
          'AWS 서버리스 호스팅 Command R+ 104B', 'https://aws.amazon.com/bedrock/cohere', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1258, "mmlu_pro": 74.2, "gpqa": 48.0, "swe_bench": 35.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-command-r-plus', 'cohere', 'Cohere', 'Command R+', 'Frontier', 1, 'Open-Weight',
          0, 'Dense RAG', 128000, 4096, '["text"]',
          '기업용 RAG 전용 104B 모델', 'https://docs.cohere.com/docs/models', 'https://docs.cohere.com/docs/models', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0, "cached_input_price_per_1m": 0.625, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1258, "mmlu_pro": 74.2, "gpqa": 48.0, "swe_bench": 35.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-opus-20240229', 'anthropic', 'Anthropic', 'Claude 3 Opus (20240229)', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 200000, 4096, '["text", "vision"]',
          'Claude 3 세대 최상위 플래그십', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 15.0, "output_price_per_1m": 75.0, "cached_input_price_per_1m": 3.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1256, "mmlu_pro": 75.0, "gpqa": 50.4, "swe_bench": 38.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-opus-bedrock', 'aws_bedrock', 'AWS Bedrock', 'Claude 3 Opus (on Bedrock)', 'Frontier', 0, 'Proprietary',
          0, 'Dense', 200000, 4096, '["text", "vision"]',
          'AWS 관리형 서버리스 호스팅 Claude 3 Opus', 'https://aws.amazon.com/bedrock/claude', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 15.0, "output_price_per_1m": 75.0, "cached_input_price_per_1m": 3.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1256, "mmlu_pro": 75.0, "gpqa": 50.4, "swe_bench": 38.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-1.5-pro-001', 'google', 'Google AI', 'Gemini 1.5 Pro (001)', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal MoE', 1000000, 8192, '["text", "vision", "audio"]',
          '1.5 Pro 오리지널 릴리스 스냅샷', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 3.5, "output_price_per_1m": 10.5, "cached_input_price_per_1m": 0.875, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1255, "mmlu_pro": 73.5, "gpqa": 49.0, "swe_bench": 33.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'codestral-22b', 'mistral', 'Mistral AI', 'Codestral 22B', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 32000, 4096, '["text"]',
          '코드 전용 22B 모델', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', '{"input_price_per_1m": 0.3, "output_price_per_1m": 0.9, "cached_input_price_per_1m": 0.08, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1255, "mmlu_pro": 72.0, "gpqa": 48.5, "swe_bench": 41.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4-turbo', 'openai', 'OpenAI', 'GPT-4 Turbo (Latest)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 128000, 4096, '["text", "vision"]',
          'GPT-4 가속 버전 최신 릴리스', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', '{"input_price_per_1m": 10.0, "output_price_per_1m": 30.0, "cached_input_price_per_1m": 5.0, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1250, "mmlu_pro": 73.2, "gpqa": 49.0, "swe_bench": 33.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4-turbo-2024-04-09', 'openai', 'OpenAI', 'GPT-4 Turbo (2024-04-09)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 128000, 4096, '["text", "vision"]',
          '비전 통합 GPT-4 Turbo 스냅샷', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', '{"input_price_per_1m": 10.0, "output_price_per_1m": 30.0, "cached_input_price_per_1m": 5.0, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1250, "mmlu_pro": 73.2, "gpqa": 49.0, "swe_bench": 33.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'groq-llama-3-1-70b', 'groq', 'Groq', 'Llama 3.1 70B (Groq LPU)', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 131072, 8192, '["text"]',
          'Groq LPU 서빙 Llama 3.1 70B. 실시간 레이턴시 최적화', 'https://console.groq.com', 'https://console.groq.com/docs/models', '{"input_price_per_1m": 0.59, "output_price_per_1m": 0.79, "cached_input_price_per_1m": 0.14, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1250, "mmlu_pro": 70.0, "gpqa": 46.0, "swe_bench": 36.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4-0125-preview', 'openai', 'OpenAI', 'GPT-4 Turbo Preview (0125)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 128000, 4096, '["text"]',
          '코드 생성 수정을 거친 프리뷰', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', '{"input_price_per_1m": 10.0, "output_price_per_1m": 30.0, "cached_input_price_per_1m": 5.0, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1245, "mmlu_pro": 72.5, "gpqa": 48.0, "swe_bench": 32.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4-1106-preview', 'openai', 'OpenAI', 'GPT-4 Turbo Preview (1106)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 128000, 4096, '["text"]',
          'DevDay 최초 공개 128k 프리뷰', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', '{"input_price_per_1m": 10.0, "output_price_per_1m": 30.0, "cached_input_price_per_1m": 5.0, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1240, "mmlu_pro": 72.0, "gpqa": 47.0, "swe_bench": 31.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-5-haiku-20241022', 'anthropic', 'Anthropic', 'Claude 3.5 Haiku (20241022)', 'Small', 0, 'Proprietary',
          0, 'Dense', 200000, 8192, '["text"]',
          'Opus급 지능을 가진 초고속 3.5 Haiku 스냅샷', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 0.8, "output_price_per_1m": 4.0, "cached_input_price_per_1m": 0.2, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1240, "mmlu_pro": 71.2, "gpqa": 48.0, "swe_bench": 33.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemma-2-27b', 'google', 'Google AI', 'Gemma 2 27B', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 8192, 4096, '["text"]',
          'Google 오픈웨이트 27B 대표 모델', 'https://ai.google.dev/gemma', 'https://ai.google.dev/gemma', '{"input_price_per_1m": 0.27, "output_price_per_1m": 0.27, "cached_input_price_per_1m": 0.06, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1240, "mmlu_pro": 71.0, "gpqa": 43.0, "swe_bench": 28.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-70b-instruct', 'meta', 'Meta AI', 'Llama 3 70B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 8192, 2048, '["text"]',
          'Llama 3 1세대 70B 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.5, "output_price_per_1m": 1.5, "cached_input_price_per_1m": 0.12, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1240, "mmlu_pro": 71.0, "gpqa": 44.0, "swe_bench": 28.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-turbo', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 Turbo', 'Small', 0, 'Proprietary',
          0, 'Dense', 1000000, 8192, '["text"]',
          '1M 장문 가성비 API', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.2, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1240, "mmlu_pro": 70.0, "gpqa": 45.0, "swe_bench": 30.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-32b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 32B', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text"]',
          '32B 표준 오픈 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.6, "cached_input_price_per_1m": 0.05, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1240, "mmlu_pro": 71.0, "gpqa": 48.0, "swe_bench": 31.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'perplexity-sonar', 'perplexity', 'Perplexity AI', 'Sonar', 'Small', 0, 'Proprietary',
          0, 'Web Search Fine-Tuned', 128000, 8192, '["text"]',
          '경량 실시간 웹 검색 통합 LLM. 저비용 검색 쿼리 최적화', 'https://docs.perplexity.ai/guides/model-cards', 'https://docs.perplexity.ai/guides/model-cards', '{"input_price_per_1m": 1.0, "output_price_per_1m": 1.0, "cached_input_price_per_1m": 0.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1240, "mmlu_pro": 68.0, "gpqa": 45.0, "swe_bench": 28.0}',
          1, '', 0, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4-vision-preview', 'openai', 'OpenAI', 'GPT-4 Vision Preview (1106)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 128000, 4096, '["text", "vision"]',
          '초기 비전 지원 프리뷰 스냅샷', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', '{"input_price_per_1m": 10.0, "output_price_per_1m": 30.0, "cached_input_price_per_1m": 5.0, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1235, "mmlu_pro": 71.0, "gpqa": 46.0, "swe_bench": 30.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-nova-lite', 'aws_bedrock', 'AWS Bedrock', 'Amazon Nova Lite', 'Small', 0, 'Proprietary',
          0, 'Native Multimodal', 300000, 5000, '["text", "vision"]',
          '저렴한 이미지/비디오 분석 경량 모델', 'https://aws.amazon.com/bedrock/nova', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 0.06, "output_price_per_1m": 0.24, "cached_input_price_per_1m": 0.015, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1235, "mmlu_pro": 68.0, "gpqa": 43.5, "swe_bench": 29.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistral-small-2409', 'mistral', 'Mistral AI', 'Mistral Small (2409)', 'Small', 1, 'Open-Weight',
          0, 'Dense', 32000, 4096, '["text"]',
          '24B 오픈 모델', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.6, "cached_input_price_per_1m": 0.05, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1230, "mmlu_pro": 69.0, "gpqa": 42.0, "swe_bench": 28.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'phi-3-5-moe', 'microsoft', 'Microsoft', 'Phi-3.5 MoE (16B)', 'Small', 1, 'Open-Weight',
          0, 'MoE (Active 6.6B)', 128000, 4096, '["text"]',
          '16B MoE 소형 모델', 'https://huggingface.co/microsoft', 'https://huggingface.co/microsoft', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.45, "cached_input_price_per_1m": 0.03, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1230, "mmlu_pro": 69.0, "gpqa": 44.0, "swe_bench": 28.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4o-mini', 'openai', 'OpenAI', 'GPT-4o mini (Latest)', 'Small', 0, 'Proprietary',
          0, 'Dense', 128000, 16384, '["text", "vision"]',
          '가성비 소형 모델 공식 최신 버전', 'https://platform.openai.com/docs/models/gpt-4o-mini', 'https://platform.openai.com/docs/models/gpt-4o-mini', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6, "cached_input_price_per_1m": 0.075, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1220, "mmlu_pro": 65.2, "gpqa": 41.0, "swe_bench": 28.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4o-mini-2024-07-18', 'openai', 'OpenAI', 'GPT-4o mini (2024-07-18)', 'Small', 0, 'Proprietary',
          0, 'Dense', 128000, 16384, '["text", "vision"]',
          'GPT-4o mini 공식 7월 스냅샷', 'https://platform.openai.com/docs/models/gpt-4o-mini', 'https://platform.openai.com/docs/models/gpt-4o-mini', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6, "cached_input_price_per_1m": 0.075, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1220, "mmlu_pro": 65.2, "gpqa": 41.0, "swe_bench": 28.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-coder-14b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 Coder 14B', 'Small', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text"]',
          '14B 코딩 특화 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.3, "cached_input_price_per_1m": 0.02, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1220, "mmlu_pro": 68.0, "gpqa": 44.0, "swe_bench": 36.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'phi-4-multimodal-5.6b', 'microsoft', 'Microsoft', 'Phi-4 Multimodal (5.6B)', 'Micro', 1, 'Open-Weight',
          0, 'Multimodal', 128000, 4096, '["text", "vision", "audio"]',
          '5.6B 옴니 멀티모달 모델', 'https://huggingface.co/microsoft', 'https://huggingface.co/microsoft', '{"input_price_per_1m": 0.08, "output_price_per_1m": 0.24, "cached_input_price_per_1m": 0.02, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1220, "mmlu_pro": 67.0, "gpqa": 42.0, "swe_bench": 26.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'groq-gemma2-9b', 'groq', 'Groq', 'Gemma 2 9B (Groq LPU)', 'Small', 1, 'Open-Weight',
          0, 'Dense', 8192, 4096, '["text"]',
          'Groq LPU 서빙 Google Gemma 2 9B. 소형 고성능 모델', 'https://console.groq.com', 'https://console.groq.com/docs/models', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.2, "cached_input_price_per_1m": 0.05, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1220, "mmlu_pro": 65.0, "gpqa": 40.0, "swe_bench": 30.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistral-nemo-12b', 'mistral', 'Mistral AI', 'Mistral NeMo 12B', 'Small', 1, 'Open-Weight',
          0, 'Dense', 128000, 4096, '["text"]',
          '128K 컨텍스트 12B 모델', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.45, "cached_input_price_per_1m": 0.03, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1215, "mmlu_pro": 66.5, "gpqa": 38.0, "swe_bench": 24.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4o-mini-realtime-preview', 'openai', 'OpenAI', 'GPT-4o mini Realtime Preview', 'Small', 0, 'Proprietary',
          0, 'Native Multimodal Realtime', 128000, 4096, '["text", "audio"]',
          '소형 초저지연 음성 대화 API', 'https://platform.openai.com/docs/models/gpt-4o-realtime', 'https://platform.openai.com/docs/models/gpt-4o-realtime', '{"input_price_per_1m": 0.6, "output_price_per_1m": 2.4, "cached_input_price_per_1m": 0.3, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1210, "mmlu_pro": 63.0, "gpqa": 38.0, "swe_bench": 25.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-math-7b', 'deepseek', 'DeepSeek', 'DeepSeek Math 7B', 'Small', 1, 'Open-Weight',
          0, 'Dense', 4096, 2048, '["text"]',
          '수학 증명 7B 소형 오픈소스 모델', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.07, "output_price_per_1m": 0.14, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1210, "mmlu_pro": 65.0, "gpqa": 46.0, "swe_bench": 25.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-14b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 14B', 'Small', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text"]',
          '14B 가성비 오픈 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.3, "cached_input_price_per_1m": 0.02, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1210, "mmlu_pro": 65.0, "gpqa": 40.0, "swe_bench": 24.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'pixtral-12b', 'mistral', 'Mistral AI', 'Pixtral 12B', 'Small', 1, 'Open-Weight',
          0, 'Multimodal', 128000, 4096, '["text", "vision"]',
          '12B 비전 오픈 모델', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.45, "cached_input_price_per_1m": 0.03, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1210, "mmlu_pro": 65.0, "gpqa": 39.0, "swe_bench": 22.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'phi-4-mini-3.8b', 'microsoft', 'Microsoft', 'Phi-4 mini (3.8B)', 'Micro', 1, 'Open-Weight',
          0, 'Dense', 128000, 4096, '["text"]',
          '3.8B 고속 추론 소형 모델', 'https://huggingface.co/microsoft', 'https://huggingface.co/microsoft', '{"input_price_per_1m": 0.06, "output_price_per_1m": 0.18, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1210, "mmlu_pro": 65.0, "gpqa": 40.0, "swe_bench": 25.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-1.5-flash-002', 'google', 'Google AI', 'Gemini 1.5 Flash (002)', 'Small', 0, 'Proprietary',
          0, 'Native Multimodal MoE', 1000000, 8192, '["text", "vision", "audio"]',
          '최신 1.5 Flash 002 스냅샷', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 0.075, "output_price_per_1m": 0.3, "cached_input_price_per_1m": 0.018, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1205, "mmlu_pro": 64.0, "gpqa": 37.5, "swe_bench": 22.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-command-r', 'cohere', 'Cohere', 'Command R', 'Mid', 1, 'Open-Weight',
          0, 'Dense RAG', 128000, 4096, '["text"]',
          '가성비 RAG 연동 35B 모델', 'https://docs.cohere.com/docs/models', 'https://docs.cohere.com/docs/models', '{"input_price_per_1m": 0.5, "output_price_per_1m": 1.5, "cached_input_price_per_1m": 0.125, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1205, "mmlu_pro": 65.0, "gpqa": 38.0, "swe_bench": 22.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-sonnet-20240229', 'anthropic', 'Anthropic', 'Claude 3 Sonnet (20240229)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 200000, 4096, '["text", "vision"]',
          'Claude 3 세대 표준 주력 모델', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1200, "mmlu_pro": 65.0, "gpqa": 40.0, "swe_bench": 25.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-coder-33b', 'deepseek', 'DeepSeek', 'DeepSeek Coder 33B', 'Small', 1, 'Open-Weight',
          0, 'Dense', 16384, 4096, '["text"]',
          '1세대 33B 코드 모델', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.12, "output_price_per_1m": 0.24, "cached_input_price_per_1m": 0.03, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1200, "mmlu_pro": 63.0, "gpqa": 36.0, "swe_bench": 30.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-2-11b-vision', 'meta', 'Meta AI', 'Llama 3.2 11B Vision', 'Small', 1, 'Open-Weight',
          0, 'Multimodal', 128000, 4096, '["text", "vision"]',
          '경량화 11B 비전 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.16, "output_price_per_1m": 0.16, "cached_input_price_per_1m": 0.04, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1200, "mmlu_pro": 61.0, "gpqa": 36.0, "swe_bench": 21.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-vl-7b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 VL 7B', 'Small', 1, 'Open-Weight',
          0, 'Multimodal', 128000, 8192, '["text", "vision"]',
          '7B 경량 비전 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.08, "output_price_per_1m": 0.24, "cached_input_price_per_1m": 0.02, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1200, "mmlu_pro": 63.0, "gpqa": 38.0, "swe_bench": 22.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4-32k-0613', 'openai', 'OpenAI', 'GPT-4 32k (0613)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 32768, 8192, '["text"]',
          '오리지널 32k 고장문 스냅샷', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', '{"input_price_per_1m": 60.0, "output_price_per_1m": 120.0, "cached_input_price_per_1m": 30.0, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1190, "mmlu_pro": 65.0, "gpqa": 40.0, "swe_bench": 23.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-7b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 7B', 'Small', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text"]',
          '7B 초소형 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.15, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1190, "mmlu_pro": 61.0, "gpqa": 35.0, "swe_bench": 22.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'codestral-mamba-7b', 'mistral', 'Mistral AI', 'Codestral Mamba 7B', 'Small', 1, 'Open-Weight',
          0, 'Mamba (SSM)', 256000, 4096, '["text"]',
          'Mamba SSM 256k 코드 모델', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.45, "cached_input_price_per_1m": 0.03, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1190, "mmlu_pro": 60.0, "gpqa": 35.0, "swe_bench": 25.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'groq-mixtral-8x7b', 'groq', 'Groq', 'Mixtral 8x7B (Groq LPU)', 'Small', 1, 'Open-Weight',
          0, 'MoE', 32768, 4096, '["text"]',
          'Groq LPU 초고속 Mixtral MoE. 저비용 대량 처리 최적화', 'https://console.groq.com', 'https://console.groq.com/docs/models', '{"input_price_per_1m": 0.24, "output_price_per_1m": 0.24, "cached_input_price_per_1m": 0.06, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1190, "mmlu_pro": 60.0, "gpqa": 35.0, "swe_bench": 26.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-command-r7b', 'cohere', 'Cohere', 'Command R7B', 'Micro', 0, 'Proprietary',
          0, 'Dense', 128000, 4096, '["text"]',
          '초경량 7B Command 모델. 엣지/저비용 RAG 파이프라인 최적화', 'https://docs.cohere.com/docs/models', 'https://docs.cohere.com/docs/models', '{"input_price_per_1m": 0.0375, "output_price_per_1m": 0.15, "cached_input_price_per_1m": 0.009, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1190, "mmlu_pro": 58.0, "gpqa": 32.0, "swe_bench": 18.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-4-0613', 'openai', 'OpenAI', 'GPT-4 (0613)', 'Mid', 0, 'Proprietary',
          0, 'Dense', 8192, 4096, '["text"]',
          '오리지널 8k 고정밀 텍스트 모델', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', 'https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo', '{"input_price_per_1m": 30.0, "output_price_per_1m": 60.0, "cached_input_price_per_1m": 15.0, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1185, "mmlu_pro": 64.8, "gpqa": 39.0, "swe_bench": 22.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-haiku-20240307', 'anthropic', 'Anthropic', 'Claude 3 Haiku (20240307)', 'Small', 0, 'Proprietary',
          0, 'Dense', 200000, 4096, '["text", "vision"]',
          'Claude 3 세대 고속 경량 스냅샷', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 0.25, "output_price_per_1m": 1.25, "cached_input_price_per_1m": 0.06, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1180, "mmlu_pro": 59.0, "gpqa": 32.0, "swe_bench": 20.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemma-2-9b', 'google', 'Google AI', 'Gemma 2 9B', 'Small', 1, 'Open-Weight',
          0, 'Dense', 8192, 4096, '["text"]',
          '단일 GPU 전용 9B 오픈 모델', 'https://ai.google.dev/gemma', 'https://ai.google.dev/gemma', '{"input_price_per_1m": 0.08, "output_price_per_1m": 0.08, "cached_input_price_per_1m": 0.02, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1180, "mmlu_pro": 59.5, "gpqa": 33.0, "swe_bench": 18.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-haiku-bedrock', 'aws_bedrock', 'AWS Bedrock', 'Claude 3 Haiku (on Bedrock)', 'Small', 0, 'Proprietary',
          0, 'Dense', 200000, 4096, '["text", "vision"]',
          'AWS 관리형 서버리스 호스팅 Claude 3 Haiku', 'https://aws.amazon.com/bedrock/claude', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 0.25, "output_price_per_1m": 1.25, "cached_input_price_per_1m": 0.06, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1180, "mmlu_pro": 59.0, "gpqa": 32.0, "swe_bench": 20.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-1-8b-instruct', 'meta', 'Meta AI', 'Llama 3.1 8B Instruct', 'Small', 1, 'Open-Weight',
          0, 'Dense', 128000, 4096, '["text"]',
          '8B 경량 오픈 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.15, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1180, "mmlu_pro": 58.2, "gpqa": 32.0, "swe_bench": 19.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mixtral-8x7b', 'mistral', 'Mistral AI', 'Mixtral 8x7B', 'Small', 1, 'Open-Weight',
          0, 'MoE (Active 13B)', 32000, 4096, '["text"]',
          '8x7B MoE 대표 모델', 'https://docs.mistral.ai', 'https://docs.mistral.ai/getting-started/models/models_overview', '{"input_price_per_1m": 0.45, "output_price_per_1m": 0.45, "cached_input_price_per_1m": 0.1, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1180, "mmlu_pro": 60.0, "gpqa": 35.0, "swe_bench": 20.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-nova-micro', 'aws_bedrock', 'AWS Bedrock', 'Amazon Nova Micro', 'Micro', 0, 'Proprietary',
          0, 'Text-only Dense', 128000, 5000, '["text"]',
          '초저지연 대화 전용 초소형 모델', 'https://aws.amazon.com/bedrock/nova', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 0.035, "output_price_per_1m": 0.14, "cached_input_price_per_1m": 0.009, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1175, "mmlu_pro": 57.5, "gpqa": 31.0, "swe_bench": 18.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-1.5-flash-8b', 'google', 'Google AI', 'Gemini 1.5 Flash-8B', 'Micro', 0, 'Proprietary',
          0, 'Native Multimodal', 1000000, 8192, '["text", "vision"]',
          '8B 스케일 초저비용 대량 변환용 모델', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 0.0375, "output_price_per_1m": 0.15, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1170, "mmlu_pro": 56.0, "gpqa": 30.0, "swe_bench": 17.5}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-coder-7b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 Coder 7B', 'Small', 1, 'Open-Weight',
          0, 'Dense', 128000, 8192, '["text"]',
          '7B 경량 코드 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.15, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1170, "mmlu_pro": 58.0, "gpqa": 32.0, "swe_bench": 28.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'phi-3-5-vision', 'microsoft', 'Microsoft', 'Phi-3.5 Vision (4.2B)', 'Micro', 1, 'Open-Weight',
          0, 'Multimodal', 128000, 4096, '["text", "vision"]',
          '경량 비전 멀티모달 모델', 'https://huggingface.co/microsoft', 'https://huggingface.co/microsoft', '{"input_price_per_1m": 0.06, "output_price_per_1m": 0.18, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1170, "mmlu_pro": 56.0, "gpqa": 30.0, "swe_bench": 18.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'phi-3-5-mini', 'microsoft', 'Microsoft', 'Phi-3.5 mini (3.8B)', 'Micro', 1, 'Open-Weight',
          0, 'Dense', 128000, 4096, '["text"]',
          '모바일 Edge 3.8B 초소형 모델', 'https://huggingface.co/microsoft', 'https://huggingface.co/microsoft', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.15, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1160, "mmlu_pro": 54.0, "gpqa": 28.0, "swe_bench": 16.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-2.1', 'anthropic', 'Anthropic', 'Claude 2.1', 'Mid', 0, 'Proprietary',
          0, 'Dense', 200000, 4096, '["text"]',
          '200k 컨텍스트 초기 지원 레거시 모델', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 8.0, "output_price_per_1m": 24.0, "cached_input_price_per_1m": 2.0, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1150, "mmlu_pro": 55.0, "gpqa": 28.0, "swe_bench": 15.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-8b-instruct', 'meta', 'Meta AI', 'Llama 3 8B Instruct', 'Small', 1, 'Open-Weight',
          0, 'Dense', 8192, 2048, '["text"]',
          'Llama 3 1세대 8B 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.06, "output_price_per_1m": 0.06, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1150, "mmlu_pro": 53.0, "gpqa": 28.0, "swe_bench": 15.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'code-llama-70b', 'meta', 'Meta AI', 'Code Llama 70B', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 16384, 4096, '["text"]',
          '코드 전용 70B 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.7, "output_price_per_1m": 0.7, "cached_input_price_per_1m": 0.15, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1150, "mmlu_pro": 55.0, "gpqa": 30.0, "swe_bench": 28.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-2-3b', 'meta', 'Meta AI', 'Llama 3.2 3B', 'Micro', 1, 'Open-Weight',
          0, 'Dense', 128000, 4096, '["text"]',
          '모바일 디바이스 3B 경량 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.04, "output_price_per_1m": 0.04, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1140, "mmlu_pro": 50.0, "gpqa": 26.0, "swe_bench": 12.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-2.0', 'anthropic', 'Anthropic', 'Claude 2.0', 'Mid', 0, 'Proprietary',
          0, 'Dense', 100000, 4096, '["text"]',
          'Claude 2세대 초기 대화 레거시 모델', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 8.0, "output_price_per_1m": 24.0, "cached_input_price_per_1m": 2.0, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1130, "mmlu_pro": 52.0, "gpqa": 25.0, "swe_bench": 12.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-titan-text-express', 'aws_bedrock', 'AWS Bedrock', 'Amazon Titan Text Express', 'Small', 0, 'Proprietary',
          0, 'Dense', 8192, 4096, '["text"]',
          'AWS 자체 텍스트 생성 표준 모델', 'https://aws.amazon.com/bedrock/titan', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.8, "cached_input_price_per_1m": 0.05, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1130, "mmlu_pro": 53.0, "gpqa": 25.0, "swe_bench": 12.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-1.0-pro-001', 'google', 'Google AI', 'Gemini 1.0 Pro (001)', 'Small', 0, 'Proprietary',
          0, 'Native Multimodal', 32768, 2048, '["text"]',
          '초기 Gemini 1.0 세대 대화 스냅샷', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 0.5, "output_price_per_1m": 1.5, "cached_input_price_per_1m": 0.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1120, "mmlu_pro": 53.0, "gpqa": 26.0, "swe_bench": 13.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemma-7b', 'google', 'Google AI', 'Gemma 1.0 7B', 'Small', 1, 'Open-Weight',
          0, 'Dense', 8192, 2048, '["text"]',
          '1세대 7B 오픈 레거시 모델', 'https://ai.google.dev/gemma', 'https://ai.google.dev/gemma', '{"input_price_per_1m": 0.07, "output_price_per_1m": 0.07, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1120, "mmlu_pro": 50.0, "gpqa": 24.0, "swe_bench": 12.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-2-5-3b', 'alibaba', 'Alibaba Cloud (Qwen)', 'Qwen 2.5 3B', 'Micro', 1, 'Open-Weight',
          0, 'Dense', 32000, 4096, '["text"]',
          '3B 온디바이스 모델', 'https://qwenlm.github.io', 'https://qwenlm.github.io', '{"input_price_per_1m": 0.03, "output_price_per_1m": 0.09, "cached_input_price_per_1m": 0.005, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1120, "mmlu_pro": 48.0, "gpqa": 24.0, "swe_bench": 12.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-3.5-turbo-0125', 'openai', 'OpenAI', 'GPT-3.5 Turbo (0125)', 'Small', 0, 'Proprietary',
          0, 'Dense', 16385, 4096, '["text"]',
          '16k 컨텍스트 및 이행 능력 향상 최신 스냅샷', 'https://platform.openai.com/docs/models/gpt-3-5-turbo', 'https://platform.openai.com/docs/models/gpt-3-5-turbo', '{"input_price_per_1m": 0.5, "output_price_per_1m": 1.5, "cached_input_price_per_1m": 0.25, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1115, "mmlu_pro": 52.0, "gpqa": 25.0, "swe_bench": 12.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-3.5-turbo-1106', 'openai', 'OpenAI', 'GPT-3.5 Turbo (1106)', 'Small', 0, 'Proprietary',
          0, 'Dense', 16385, 4096, '["text"]',
          '16k 기본 탑재 11월 스냅샷', 'https://platform.openai.com/docs/models/gpt-3-5-turbo', 'https://platform.openai.com/docs/models/gpt-3-5-turbo', '{"input_price_per_1m": 1.0, "output_price_per_1m": 2.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1110, "mmlu_pro": 51.0, "gpqa": 24.0, "swe_bench": 11.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-instant-1.2', 'anthropic', 'Anthropic', 'Claude Instant 1.2', 'Micro', 0, 'Proprietary',
          0, 'Dense', 100000, 4096, '["text"]',
          '초저지연 레거시 대화 모델', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 0.8, "output_price_per_1m": 2.4, "cached_input_price_per_1m": 0.2, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1110, "mmlu_pro": 48.0, "gpqa": 22.0, "swe_bench": 10.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gpt-3.5-turbo-instruct', 'openai', 'OpenAI', 'GPT-3.5 Turbo Instruct', 'Small', 0, 'Proprietary',
          0, 'Dense', 4096, 4096, '["text"]',
          'Direct completion 전용 instruct 모델', 'https://platform.openai.com/docs/models/gpt-3-5-turbo', 'https://platform.openai.com/docs/models/gpt-3-5-turbo', '{"input_price_per_1m": 1.5, "output_price_per_1m": 2.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1100, "mmlu_pro": 49.0, "gpqa": 22.0, "swe_bench": 10.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemma-2-2b', 'google', 'Google AI', 'Gemma 2 2B', 'Micro', 1, 'Open-Weight',
          0, 'Dense', 8192, 4096, '["text"]',
          '모바일 Edge 온디바이스 2B 오픈 모델', 'https://ai.google.dev/gemma', 'https://ai.google.dev/gemma', '{"input_price_per_1m": 0.02, "output_price_per_1m": 0.02, "cached_input_price_per_1m": 0.005, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1100, "mmlu_pro": 45.0, "gpqa": 20.0, "swe_bench": 10.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-2-70b-chat', 'meta', 'Meta AI', 'Llama 2 70B Chat', 'Mid', 1, 'Open-Weight',
          0, 'Dense', 4096, 2048, '["text"]',
          'Llama 2세대 레거시 70B 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.7, "output_price_per_1m": 0.7, "cached_input_price_per_1m": 0.15, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1100, "mmlu_pro": 49.0, "gpqa": 22.0, "swe_bench": 8.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-titan-text-lite', 'aws_bedrock', 'AWS Bedrock', 'Amazon Titan Text Lite', 'Micro', 0, 'Proprietary',
          0, 'Dense', 4096, 2048, '["text"]',
          '단순 요약 전용 AWS 초경량 모델', 'https://aws.amazon.com/bedrock/titan', 'https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.2, "cached_input_price_per_1m": 0.03, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1090, "mmlu_pro": 44.0, "gpqa": 20.0, "swe_bench": 8.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'llama-3-2-1b', 'meta', 'Meta AI', 'Llama 3.2 1B', 'Micro', 1, 'Open-Weight',
          0, 'Dense', 128000, 4096, '["text"]',
          '1B 온디바이스 초소형 모델', 'https://llama.meta.com', 'https://llama.meta.com/docs/model-cards-and-prompt-formats', '{"input_price_per_1m": 0.02, "output_price_per_1m": 0.02, "cached_input_price_per_1m": 0.005, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1080, "mmlu_pro": 40.0, "gpqa": 18.0, "swe_bench": 6.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'text-embedding-3-large', 'openai', 'OpenAI', 'Text Embedding 3 Large', 'Micro', 0, 'Proprietary',
          0, 'Embedding', 8191, 4096, '["text"]',
          '3072차원 최상위 벡터 임베딩', 'https://platform.openai.com/docs/models/embeddings', 'https://platform.openai.com/docs/models/embeddings', '{"input_price_per_1m": 0.13, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 0.06, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'whisper-1', 'openai', 'OpenAI', 'Whisper v2 Large', 'Micro', 0, 'Proprietary',
          0, 'Speech-to-Text', 128000, 4096, '["audio"]',
          '다국어 음성 인식 및 번역. 99개 언어 지원 공식 STT API', 'https://platform.openai.com/docs/models/whisper', 'https://platform.openai.com/docs/models/whisper', '{"input_price_per_1m": 0.006, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 0.006, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'dall-e-3', 'openai', 'OpenAI', 'DALL-E 3', 'Micro', 0, 'Proprietary',
          0, 'Image Generation', 128000, 4096, '["image"]',
          '텍스트 기반 고품질 이미지 생성. 1024x1024/1792x1024 지원', 'https://platform.openai.com/docs/models/dall-e', 'https://platform.openai.com/docs/models/dall-e', '{"input_price_per_1m": 0.04, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 0.04, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'dall-e-2', 'openai', 'OpenAI', 'DALL-E 2', 'Micro', 0, 'Proprietary',
          0, 'Image Generation', 128000, 4096, '["image"]',
          '이미지 편집/변형(inpainting/outpainting) 지원 레거시 이미지 모델', 'https://platform.openai.com/docs/models/dall-e', 'https://platform.openai.com/docs/models/dall-e', '{"input_price_per_1m": 0.02, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 0.02, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'tts-1', 'openai', 'OpenAI', 'TTS-1', 'Micro', 0, 'Proprietary',
          0, 'Text-to-Speech', 128000, 4096, '["audio"]',
          '저지연 실시간 음성 합성. 6개 음성(alloy, echo, fable, onyx, nova, shimmer)', 'https://platform.openai.com/docs/models/tts', 'https://platform.openai.com/docs/models/tts', '{"input_price_per_1m": 15.0, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 15.0, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'tts-1-hd', 'openai', 'OpenAI', 'TTS-1 HD', 'Micro', 0, 'Proprietary',
          0, 'Text-to-Speech HD', 128000, 4096, '["audio"]',
          '고품질 오디오 음성 합성. 방송·미디어 수준 HD 음성 출력', 'https://platform.openai.com/docs/models/tts', 'https://platform.openai.com/docs/models/tts', '{"input_price_per_1m": 30.0, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 30.0, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'text-embedding-3-small', 'openai', 'OpenAI', 'Text Embedding 3 Small', 'Micro', 0, 'Proprietary',
          0, 'Embedding', 8191, 4096, '["text"]',
          '1536차원 고속 경량 벡터 임베딩. RAG 구축 최고 가성비', 'https://platform.openai.com/docs/models/embeddings', 'https://platform.openai.com/docs/models/embeddings', '{"input_price_per_1m": 0.02, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 0.01, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'text-embedding-ada-002', 'openai', 'OpenAI', 'Text Embedding Ada-002', 'Micro', 0, 'Proprietary',
          0, 'Embedding', 8191, 4096, '["text"]',
          '1536차원 2세대 임베딩. 기존 레거시 시스템 호환성 유지', 'https://platform.openai.com/docs/models/embeddings', 'https://platform.openai.com/docs/models/embeddings', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 0.05, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'omni-moderation-latest', 'openai', 'OpenAI', 'Omni Moderation', 'Micro', 0, 'Proprietary',
          0, 'Classifier', 128000, 4096, '["text", "image"]',
          '텍스트 및 이미지 콘텐츠 정책 위반 분류 무료 API', 'https://platform.openai.com/docs/models/moderation', 'https://platform.openai.com/docs/models/moderation', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 0.0, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-embed-v3-english', 'cohere', 'Cohere', 'Embed v3 English', 'Micro', 0, 'Proprietary',
          0, 'Embedding', 512, 4096, '["text"]',
          '1024차원 영어 특화 임베딩. 분류·검색·클러스터링 SOTA', 'https://docs.cohere.com/docs/models', 'https://docs.cohere.com/docs/models', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 0.025, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-embed-v3-multilingual', 'cohere', 'Cohere', 'Embed v3 Multilingual', 'Micro', 0, 'Proprietary',
          0, 'Embedding', 512, 4096, '["text"]',
          '1024차원 100+ 언어 멀티링구얼 임베딩. 글로벌 다국어 검색', 'https://docs.cohere.com/docs/models', 'https://docs.cohere.com/docs/models', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.0, "cached_input_price_per_1m": 0.025, "batch_discount_percent": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-7-sonnet-thinking', 'anthropic', 'Anthropic', 'Claude 3.7 Sonnet (Thinking Mode)', 'Frontier', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 200000, 64000, '["text", "vision"]',
          'Claude 3.7 Sonnet 사고 과정(Extended Thinking) 최대 가동 추론 스펙', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1405, "mmlu_pro": 92.5, "gpqa": 86.2, "swe_bench": 70.3}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-7-sonnet-20250219', 'anthropic', 'Anthropic', 'Claude 3.7 Sonnet (20250219)', 'Frontier', 0, 'Proprietary',
          0, 'Hybrid Reasoning (Thinking Mode)', 200000, 64000, '["text", "vision"]',
          'Anthropic 최초 하이브리드 추론 플래그십. 일반 응답 및 Extended Thinking 선택 가동. SWE-bench 및 코딩 SOTA', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1395, "mmlu_pro": 91.2, "gpqa": 84.8, "swe_bench": 70.3}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'claude-3-7-sonnet', 'anthropic', 'Anthropic', 'Claude 3.7 Sonnet (Latest)', 'Frontier', 0, 'Proprietary',
          0, 'Hybrid Reasoning (Thinking Mode)', 200000, 64000, '["text", "vision"]',
          'Claude 3.7 Sonnet 공식 최신 엔드포인트 파이프라인', 'https://docs.anthropic.com/en/docs/about-claude/models', 'https://docs.anthropic.com/en/docs/about-claude/models', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0, "cached_input_price_per_1m": 0.75, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1395, "mmlu_pro": 91.2, "gpqa": 84.8, "swe_bench": 70.3}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-2-0-pro-exp', 'google', 'Google AI', 'Gemini 2.0 Pro (Experimental)', 'Frontier', 0, 'Proprietary',
          0, 'Native Multimodal', 2097152, 8192, '["text", "vision", "audio", "video"]',
          'Google 2.0 세대 200만 컨텍스트 플래그십 실험 모델. 복잡 코드 추론 및 옴니 분석', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 2.0, "output_price_per_1m": 10.0, "cached_input_price_per_1m": 0.5, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1365, "mmlu_pro": 88.5, "gpqa": 76.2, "swe_bench": 59.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gemini-2-0-flash', 'google', 'Google AI', 'Gemini 2.0 Flash (GA)', 'Mid', 0, 'Proprietary',
          0, 'Native Multimodal', 1048576, 8192, '["text", "vision", "audio", "video"]',
          'Google 2.0 세대 차세대 고속 옴니 멀티모달 정식 버전. 100만 컨텍스트', 'https://ai.google.dev/gemini-api/docs/models/gemini', 'https://ai.google.dev/gemini-api/docs/models/gemini', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.4, "cached_input_price_per_1m": 0.025, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1310, "mmlu_pro": 80.0, "gpqa": 62.5, "swe_bench": 45.0}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-r1-distill-llama-70b', 'deepseek', 'DeepSeek', 'DeepSeek R1 Distill Llama 70B', 'Mid', 1, 'Open-Weight',
          0, 'Dense Distilled RL', 128000, 8192, '["text"]',
          'Llama 3.3 70B 기반 DeepSeek R1 추론 증류 모델. 온프레미스 단일 서버 호스팅', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.75, "output_price_per_1m": 0.99, "cached_input_price_per_1m": 0.18, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1295, "mmlu_pro": 78.2, "gpqa": 65.5, "swe_bench": 49.0}',
          1, '', 1, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-r1-distill-qwen-32b', 'deepseek', 'DeepSeek', 'DeepSeek R1 Distill Qwen 32B', 'Small', 1, 'Open-Weight',
          0, 'Dense Distilled RL', 128000, 8192, '["text"]',
          'Qwen 2.5 32B 기반 R1 추론 증류 모델. RTX 4090/A100 단일 GPU 호스팅 최적화', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.3, "output_price_per_1m": 0.6, "cached_input_price_per_1m": 0.075, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1275, "mmlu_pro": 75.0, "gpqa": 61.0, "swe_bench": 44.0}',
          1, '', 1, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-r1-distill-qwen-14b', 'deepseek', 'DeepSeek', 'DeepSeek R1 Distill Qwen 14B', 'Small', 1, 'Open-Weight',
          0, 'Dense Distilled RL', 128000, 8192, '["text"]',
          'Qwen 2.5 14B 기반 경량 R1 추론 증류 모델', 'https://api-docs.deepseek.com', 'https://api-docs.deepseek.com', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.3, "cached_input_price_per_1m": 0.03, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1235, "mmlu_pro": 70.0, "gpqa": 52.0, "swe_bench": 36.0}',
          1, '', 1, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'o1-pro', 'openai', 'OpenAI', 'o1 Pro', 'Frontier', 0, 'Proprietary',
          0, 'Chain-of-Thought RL', 200000, 100000, '["text", "vision"]',
          'o1 컴퓨팅 연산 자원 증대 버전. 고난도 수학·과학 연구 최상위', 'https://platform.openai.com/docs/models/o1', 'https://platform.openai.com/docs/models/o1', '{"input_price_per_1m": 150.0, "output_price_per_1m": 600.0, "cached_input_price_per_1m": 75.0, "batch_discount_percent": 0.0}', '{}', '{"arena_elo": 1390, "mmlu_pro": 91.5, "gpqa": 83.0, "swe_bench": 68.0}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'inclusionai-ling-3.0-tiny:free', 'inclusionai', 'Inclusionai', 'inclusionAI: Ling 3.0 Tiny (free)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 32768, '["text"]',
          'Ling 3.0 Tiny is a mixture-of-experts model from InclusionAI, with 1.3B active parameters out of 7.9B total. It is designed for responsive agents, instruction following, and multi-turn conversations, with switchable...', 'https://openrouter.ai/models/inclusionai/ling-3.0-tiny:free', 'https://openrouter.ai/playground?model=inclusionai/ling-3.0-tiny:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meta-muse-spark-1.2', 'meta', 'Meta', 'Meta: Muse Spark 1.2', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 16384, '["text", "vision"]',
          'Muse Spark 1.2 is a reasoning model from Meta, designed for complex agentic tasks. It accepts text, images, video, audio, and PDF documents, returns text, and offers a 1M-token context...', 'https://openrouter.ai/models/meta/muse-spark-1.2', 'https://openrouter.ai/playground?model=meta/muse-spark-1.2', '{"input_price_per_1m": 1.25, "output_price_per_1m": 4.25}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.8-max', 'qwen', 'Qwen', 'Qwen: Qwen3.8 Max', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 131072, '["text", "vision"]',
          'Qwen3.8 Max is the flagship model in Alibaba''s Qwen3.8 series, the general-availability successor to the Qwen3.8 Max Preview. It is a multimodal reasoning model intended for complex reasoning, visual understanding,...', 'https://openrouter.ai/models/qwen/qwen3.8-max', 'https://openrouter.ai/playground?model=qwen/qwen3.8-max', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~deepseek-deepseek-v4-flash-latest', '~deepseek', '~deepseek', 'DeepSeek V4 Flash Latest', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1048576, 16384, '["text"]',
          'This model always redirects to the latest model in the DeepSeek V4 Flash family.', 'https://openrouter.ai/models/~deepseek/deepseek-v4-flash-latest', 'https://openrouter.ai/playground?model=~deepseek/deepseek-v4-flash-latest', '{"input_price_per_1m": 0.08, "output_price_per_1m": 0.252}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-v4-flash-0731', 'deepseek', 'Deepseek', 'DeepSeek: DeepSeek V4 Flash 0731', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1048576, 384000, '["text"]',
          'DeepSeek V4 Flash 0731 is a sparse mixture-of-experts model from DeepSeek, with 13B active parameters out of 284B total. This re-post-trained revision is suited for coding, reasoning, and agent workflows.', 'https://openrouter.ai/models/deepseek/deepseek-v4-flash-0731', 'https://openrouter.ai/playground?model=deepseek/deepseek-v4-flash-0731', '{"input_price_per_1m": 0.09, "output_price_per_1m": 0.18}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'thinkingmachines-inkling-small', 'thinkingmachines', 'Thinkingmachines', 'Thinking Machines: Inkling Small', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 524288, 262144, '["text", "vision"]',
          'Inkling Small is an open-weight multimodal mixture-of-experts model from Thinking Machines Lab, with 12B active parameters out of 276B total. It is positioned as the smaller, more efficient member of...', 'https://openrouter.ai/models/thinkingmachines/inkling-small', 'https://openrouter.ai/playground?model=thinkingmachines/inkling-small', '{"input_price_per_1m": 0.45, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.7-flash', 'qwen', 'Qwen', 'Qwen: Qwen3.7 Flash', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 65536, '["text", "vision"]',
          'Qwen3.7 Flash is a vision-language reasoning model from Alibaba. It is suited for multimodal agents, visual coding, search, and computer interaction, with strengths in object recognition, spatial understanding, and real-world...', 'https://openrouter.ai/models/qwen/qwen3.7-flash', 'https://openrouter.ai/playground?model=qwen/qwen3.7-flash', '{"input_price_per_1m": 0.03, "output_price_per_1m": 0.13}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-5-fast', 'anthropic', 'Anthropic', 'Claude Opus 5 (Fast)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Fast-mode variant of [Opus 5](/anthropic/claude-opus-5) - identical capabilities with higher output speed at 2x pricing relative to regular Opus 5.

Learn more in Anthropic''s docs: https://platform.claude.com/docs/en/build-with-claude/fast-mode', 'https://openrouter.ai/models/anthropic/claude-opus-5-fast', 'https://openrouter.ai/playground?model=anthropic/claude-opus-5-fast', '{"input_price_per_1m": 10.0, "output_price_per_1m": 50.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-5', 'anthropic', 'Anthropic', 'Claude Opus 5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Claude Opus 5 is Anthropic’s flagship model for demanding reasoning, coding, and long-horizon agentic work. It is particularly strong at end-to-end software tasks, code review and bug finding, visual analysis...', 'https://openrouter.ai/models/anthropic/claude-opus-5', 'https://openrouter.ai/playground?model=anthropic/claude-opus-5', '{"input_price_per_1m": 5.0, "output_price_per_1m": 25.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-5:batch', 'anthropic', 'Anthropic', 'Claude Opus 5 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Claude Opus 5 is Anthropic’s flagship model for demanding reasoning, coding, and long-horizon agentic work. It is particularly strong at end-to-end software tasks, code review and bug finding, visual analysis...', 'https://openrouter.ai/models/anthropic/claude-opus-5:batch', 'https://openrouter.ai/playground?model=anthropic/claude-opus-5:batch', '{"input_price_per_1m": 2.5, "output_price_per_1m": 12.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'inclusionai-ling-3.0-flash', 'inclusionai', 'Inclusionai', 'Ling-3.0-flash', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 32768, '["text"]',
          '*Ling-3.0-flash* is a *124B-parameter Mixture-of-Experts (MoE) model*, with approximately *5.1B parameters activated per token*. The model is designed with *token efficiency and production-scale agentic inference* as key priorities, enabling developers...', 'https://openrouter.ai/models/inclusionai/ling-3.0-flash', 'https://openrouter.ai/playground?model=inclusionai/ling-3.0-flash', '{"input_price_per_1m": 0.021, "output_price_per_1m": 0.063}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'poolside-laguna-s-2.1', 'poolside', 'Poolside', 'Poolside: Laguna S 2.1', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 131072, '["text"]',
          'Laguna S 2.1 is the latest coding agent model from [Poolside](<https://poolside.ai/>). Laguna S 2.1 is a 118B total parameter model with 8B active parameters, scoring 70.2% on Terminal-Bench 2.1 and...', 'https://openrouter.ai/models/poolside/laguna-s-2.1', 'https://openrouter.ai/playground?model=poolside/laguna-s-2.1', '{"input_price_per_1m": 0.09, "output_price_per_1m": 0.18}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'poolside-laguna-s-2.1:free', 'poolside', 'Poolside', 'Poolside: Laguna S 2.1 (free)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 32768, '["text"]',
          'Laguna S 2.1 is the latest coding agent model from [Poolside](<https://poolside.ai/>). Laguna S 2.1 is a 118B total parameter model with 8B active parameters, scoring 70.2% on Terminal-Bench 2.1 and...', 'https://openrouter.ai/models/poolside/laguna-s-2.1:free', 'https://openrouter.ai/playground?model=poolside/laguna-s-2.1:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.6-flash', 'google', 'Google', 'Google: Gemini 3.6 Flash', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.6 Flash is a high-efficiency model from Google for coding, agentic workflows, and web and app development. It is designed to produce polished outputs with fewer unnecessary edits and...', 'https://openrouter.ai/models/google/gemini-3.6-flash', 'https://openrouter.ai/playground?model=google/gemini-3.6-flash', '{"input_price_per_1m": 1.5, "output_price_per_1m": 7.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.6-flash:batch', 'google', 'Google', 'Google: Gemini 3.6 Flash (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.6 Flash is a high-efficiency model from Google for coding, agentic workflows, and web and app development. It is designed to produce polished outputs with fewer unnecessary edits and...', 'https://openrouter.ai/models/google/gemini-3.6-flash:batch', 'https://openrouter.ai/playground?model=google/gemini-3.6-flash:batch', '{"input_price_per_1m": 0.75, "output_price_per_1m": 3.75}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.5-flash-lite', 'google', 'Google', 'Google: Gemini 3.5 Flash Lite', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.5 Flash Lite is a high-efficiency model from Google with upgraded agentic capabilities. It is suited for subagents that execute focused tasks within complex, multi-agent workflows.', 'https://openrouter.ai/models/google/gemini-3.5-flash-lite', 'https://openrouter.ai/playground?model=google/gemini-3.5-flash-lite', '{"input_price_per_1m": 0.3, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.5-flash-lite:batch', 'google', 'Google', 'Google: Gemini 3.5 Flash Lite (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.5 Flash Lite is a high-efficiency model from Google with upgraded agentic capabilities. It is suited for subagents that execute focused tasks within complex, multi-agent workflows.', 'https://openrouter.ai/models/google/gemini-3.5-flash-lite:batch', 'https://openrouter.ai/playground?model=google/gemini-3.5-flash-lite:batch', '{"input_price_per_1m": 0.15, "output_price_per_1m": 1.25}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meituan-longcat-2.0', 'meituan', 'Meituan', 'Meituan: LongCat 2.0', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048756, 262144, '["text"]',
          'LongCat 2.0 is a sparse mixture-of-experts language model from Meituan, with 48B active parameters out of 1.6T total. It is suited for coding, repository-level changes, long-horizon problem solving, and agentic...', 'https://openrouter.ai/models/meituan/longcat-2.0', 'https://openrouter.ai/playground?model=meituan/longcat-2.0', '{"input_price_per_1m": 0.3, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'thinkingmachines-inkling', 'thinkingmachines', 'Thinkingmachines', 'Thinking Machines: Inkling', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 262144, '["text", "vision"]',
          'Inkling is an open-weight multimodal mixture-of-experts model from Thinking Machines Lab, with 41B active parameters out of 975B total. It is designed for general-purpose reasoning, coding, agentic and tool-use systems,...', 'https://openrouter.ai/models/thinkingmachines/inkling', 'https://openrouter.ai/playground?model=thinkingmachines/inkling', '{"input_price_per_1m": 0.95, "output_price_per_1m": 4.05}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'thinkingmachines-inkling:batch', 'thinkingmachines', 'Thinkingmachines', 'Thinking Machines: Inkling (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 524288, 16384, '["text", "vision"]',
          'Inkling is an open-weight multimodal mixture-of-experts model from Thinking Machines Lab, with 41B active parameters out of 975B total. It is designed for general-purpose reasoning, coding, agentic and tool-use systems,...', 'https://openrouter.ai/models/thinkingmachines/inkling:batch', 'https://openrouter.ai/playground?model=thinkingmachines/inkling:batch', '{"input_price_per_1m": 0.5, "output_price_per_1m": 2.025}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openrouter-auto-beta', 'openrouter', 'Openrouter', 'Auto Router (Beta)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 2000000, 16384, '["text", "vision"]',
          'Auto Router (Beta) is a task-aware router from OpenRouter. It classifies each request, then routes it the [most popular model](/rankings#task-spend) for that task based on aggregate spend, filtered by your...', 'https://openrouter.ai/models/openrouter/auto-beta', 'https://openrouter.ai/playground?model=openrouter/auto-beta', '{"input_price_per_1m": -1000000.0, "output_price_per_1m": -1000000.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'moonshotai-kimi-k3', 'moonshotai', 'Moonshotai', 'MoonshotAI: Kimi K3', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 16384, '["text", "vision"]',
          'Kimi K3 is a 2.8T parameter open-weight multimodal reasoning model from Moonshot AI. It is suited for complex coding, knowledge work, and long-horizon agentic workflows, and is particularly strong at...', 'https://openrouter.ai/models/moonshotai/kimi-k3', 'https://openrouter.ai/playground?model=moonshotai/kimi-k3', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meta-muse-spark-1.1', 'meta', 'Meta', 'Meta: Muse Spark 1.1', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 16384, '["text", "vision"]',
          'Muse Spark 1.1 is a multimodal reasoning model from Meta, built for agentic tasks. It accepts text, images, video, audio, and PDF documents and returns text, with a 1M-token context...', 'https://openrouter.ai/models/meta/muse-spark-1.1', 'https://openrouter.ai/playground?model=meta/muse-spark-1.1', '{"input_price_per_1m": 1.25, "output_price_per_1m": 4.25}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'kwaipilot-kat-coder-air-v2.5', 'kwaipilot', 'Kwaipilot', 'Kwaipilot: KAT-Coder-Air V2.5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 256000, 80000, '["text"]',
          'KAT-Coder-Air V2.5 is a flagship-level Agentic Coding model that can directly hand over an entire issue or an entire business workflow to it, allowing it to autonomously locate and make...', 'https://openrouter.ai/models/kwaipilot/kat-coder-air-v2.5', 'https://openrouter.ai/playground?model=kwaipilot/kat-coder-air-v2.5', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'kwaipilot-kat-coder-pro-v2.5', 'kwaipilot', 'Kwaipilot', 'Kwaipilot: KAT-Coder-Pro V2.5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 256000, 80000, '["text"]',
          'KAT-Coder-Pro V2.5 is a flagship-level Agentic Coding model that can directly hand over an entire issue or an entire business workflow to it, allowing it to autonomously locate and make...', 'https://openrouter.ai/models/kwaipilot/kat-coder-pro-v2.5', 'https://openrouter.ai/playground?model=kwaipilot/kat-coder-pro-v2.5', '{"input_price_per_1m": 0.74, "output_price_per_1m": 2.96}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-luna-pro', 'openai', 'Openai', 'OpenAI: GPT-5.6 Luna Pro', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Luna Pro is the same underlying model as [GPT-5.6 Luna](https://openrouter.ai/openai/gpt-5.6-luna), served with `reasoning.mode` set to `pro` for higher-quality responses on complex tasks.

Learn more in OpenAI''s docs: https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode', 'https://openrouter.ai/models/openai/gpt-5.6-luna-pro', 'https://openrouter.ai/playground?model=openai/gpt-5.6-luna-pro', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-luna-pro:batch', 'openai', 'Openai', 'OpenAI: GPT-5.6 Luna Pro (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Luna Pro is the same underlying model as [GPT-5.6 Luna](https://openrouter.ai/openai/gpt-5.6-luna), served with `reasoning.mode` set to `pro` for higher-quality responses on complex tasks.

Learn more in OpenAI''s docs: https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode', 'https://openrouter.ai/models/openai/gpt-5.6-luna-pro:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.6-luna-pro:batch', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-luna', 'openai', 'Openai', 'OpenAI: GPT-5.6 Luna', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Luna is a fast, cost-efficient model in OpenAI''s GPT-5.6 series. It is suited for high-volume, latency-sensitive tasks such as chat, classification, and lightweight agentic workflows, providing capable reasoning for...', 'https://openrouter.ai/models/openai/gpt-5.6-luna', 'https://openrouter.ai/playground?model=openai/gpt-5.6-luna', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-luna:batch', 'openai', 'Openai', 'OpenAI: GPT-5.6 Luna (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Luna is a fast, cost-efficient model in OpenAI''s GPT-5.6 series. It is suited for high-volume, latency-sensitive tasks such as chat, classification, and lightweight agentic workflows, providing capable reasoning for...', 'https://openrouter.ai/models/openai/gpt-5.6-luna:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.6-luna:batch', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-terra-pro', 'openai', 'Openai', 'OpenAI: GPT-5.6 Terra Pro', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Terra Pro is the same underlying model as [GPT-5.6 Terra](https://openrouter.ai/openai/gpt-5.6-terra), served with `reasoning.mode` set to `pro` for higher-quality responses on complex tasks.

Learn more in OpenAI''s docs: https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode', 'https://openrouter.ai/models/openai/gpt-5.6-terra-pro', 'https://openrouter.ai/playground?model=openai/gpt-5.6-terra-pro', '{"input_price_per_1m": 1.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-terra-pro:batch', 'openai', 'Openai', 'OpenAI: GPT-5.6 Terra Pro (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Terra Pro is the same underlying model as [GPT-5.6 Terra](https://openrouter.ai/openai/gpt-5.6-terra), served with `reasoning.mode` set to `pro` for higher-quality responses on complex tasks.

Learn more in OpenAI''s docs: https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode', 'https://openrouter.ai/models/openai/gpt-5.6-terra-pro:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.6-terra-pro:batch', '{"input_price_per_1m": 1.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-terra', 'openai', 'Openai', 'OpenAI: GPT-5.6 Terra', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Terra is a balanced model in OpenAI''s GPT-5.6 series, positioned between the flagship Sol tier and the cost-efficient Luna tier. It is suited for everyday coding, reasoning, and agentic...', 'https://openrouter.ai/models/openai/gpt-5.6-terra', 'https://openrouter.ai/playground?model=openai/gpt-5.6-terra', '{"input_price_per_1m": 1.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-terra:batch', 'openai', 'Openai', 'OpenAI: GPT-5.6 Terra (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Terra is a balanced model in OpenAI''s GPT-5.6 series, positioned between the flagship Sol tier and the cost-efficient Luna tier. It is suited for everyday coding, reasoning, and agentic...', 'https://openrouter.ai/models/openai/gpt-5.6-terra:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.6-terra:batch', '{"input_price_per_1m": 1.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-sol-pro', 'openai', 'Openai', 'OpenAI: GPT-5.6 Sol Pro', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Sol Pro is the same underlying model as [GPT-5.6 Sol](https://openrouter.ai/openai/gpt-5.6-sol), served with `reasoning.mode` set to `pro` for higher-quality responses on complex tasks.

Learn more in OpenAI''s docs: https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode', 'https://openrouter.ai/models/openai/gpt-5.6-sol-pro', 'https://openrouter.ai/playground?model=openai/gpt-5.6-sol-pro', '{"input_price_per_1m": 5.0, "output_price_per_1m": 30.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-sol-pro:batch', 'openai', 'Openai', 'OpenAI: GPT-5.6 Sol Pro (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Sol Pro is the same underlying model as [GPT-5.6 Sol](https://openrouter.ai/openai/gpt-5.6-sol), served with `reasoning.mode` set to `pro` for higher-quality responses on complex tasks.

Learn more in OpenAI''s docs: https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode', 'https://openrouter.ai/models/openai/gpt-5.6-sol-pro:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.6-sol-pro:batch', '{"input_price_per_1m": 2.5, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-sol', 'openai', 'Openai', 'OpenAI: GPT-5.6 Sol', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Sol is the flagship model in OpenAI''s GPT-5.6 series. It is suited for complex reasoning, coding, and agentic workflows, and is particularly strong at command-line and multi-step coding tasks...', 'https://openrouter.ai/models/openai/gpt-5.6-sol', 'https://openrouter.ai/playground?model=openai/gpt-5.6-sol', '{"input_price_per_1m": 5.0, "output_price_per_1m": 30.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.6-sol:batch', 'openai', 'Openai', 'OpenAI: GPT-5.6 Sol (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.6 Sol is the flagship model in OpenAI''s GPT-5.6 series. It is suited for complex reasoning, coding, and agentic workflows, and is particularly strong at command-line and multi-step coding tasks...', 'https://openrouter.ai/models/openai/gpt-5.6-sol:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.6-sol:batch', '{"input_price_per_1m": 2.5, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'x-ai-grok-4.5', 'x-ai', 'X-ai', 'SpaceXAI: Grok 4.5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 500000, 16384, '["text", "vision"]',
          'Grok 4.5 is SpaceXAI''s smartest model with frontier performance on coding, knowledge work, and STEM.', 'https://openrouter.ai/models/x-ai/grok-4.5', 'https://openrouter.ai/playground?model=x-ai/grok-4.5', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~x-ai-grok-latest', '~x-ai', '~x-ai', 'xAI: Grok Latest', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 500000, 16384, '["text", "vision"]',
          'This model always redirects to the latest Grok model from xAI.', 'https://openrouter.ai/models/~x-ai/grok-latest', 'https://openrouter.ai/playground?model=~x-ai/grok-latest', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'aion-labs-aion-3.0-mini', 'aion-labs', 'Aion-labs', 'AionLabs: Aion-3.0-Mini', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 32768, '["text"]',
          'Aion-3.0 Mini is a multi-model roleplaying and storytelling system from AionLabs, built on the DeepSeek family of models. It uses a collaborative generation process in which multiple specialized models each...', 'https://openrouter.ai/models/aion-labs/aion-3.0-mini', 'https://openrouter.ai/playground?model=aion-labs/aion-3.0-mini', '{"input_price_per_1m": 0.7, "output_price_per_1m": 1.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'aion-labs-aion-3.0', 'aion-labs', 'Aion-labs', 'AionLabs: Aion-3.0', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 32768, '["text"]',
          'Aion-3.0 is a multi-model roleplaying and storytelling system from AionLabs, built on the GLM family of models. It uses a collaborative generation process in which multiple specialized models each contribute...', 'https://openrouter.ai/models/aion-labs/aion-3.0', 'https://openrouter.ai/playground?model=aion-labs/aion-3.0', '{"input_price_per_1m": 3.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'tencent-hy3', 'tencent', 'Tencent', 'Tencent: Hy3', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 128000, '["text"]',
          'Hy3 is a 295B-parameter Mixture-of-Experts model from Tencent (21B active, 192 experts with top-8 routing) built for reasoning, agentic workflows, and real-world production use. It supports a configurable reasoning effort:...', 'https://openrouter.ai/models/tencent/hy3', 'https://openrouter.ai/playground?model=tencent/hy3', '{"input_price_per_1m": 0.132, "output_price_per_1m": 0.528}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'poolside-laguna-xs-2.1', 'poolside', 'Poolside', 'Poolside: Laguna XS 2.1', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 32768, '["text"]',
          'Laguna XS 2.1 is the latest coding agent model in the 33B-A3B category from [Poolside](https://poolside.ai/) and a step forward from their Laguna XS.2 model (released in April 2026). It combines...', 'https://openrouter.ai/models/poolside/laguna-xs-2.1', 'https://openrouter.ai/playground?model=poolside/laguna-xs-2.1', '{"input_price_per_1m": 0.06, "output_price_per_1m": 0.12}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'poolside-laguna-xs-2.1:free', 'poolside', 'Poolside', 'Poolside: Laguna XS 2.1 (free)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 32768, '["text"]',
          'Laguna XS 2.1 is the latest coding agent model in the 33B-A3B category from [Poolside](https://poolside.ai/) and a step forward from their Laguna XS.2 model (released in April 2026). It combines...', 'https://openrouter.ai/models/poolside/laguna-xs-2.1:free', 'https://openrouter.ai/playground?model=poolside/laguna-xs-2.1:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-sonnet-5', 'anthropic', 'Anthropic', 'Anthropic: Claude Sonnet 5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Sonnet 5 is Anthropic''s most capable Sonnet-class model, with frontier performance across coding, agents, and professional work. It supports adaptive thinking with selectable reasoning effort levels (low, medium, high, max,...', 'https://openrouter.ai/models/anthropic/claude-sonnet-5', 'https://openrouter.ai/playground?model=anthropic/claude-sonnet-5', '{"input_price_per_1m": 2.0, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-sonnet-5:batch', 'anthropic', 'Anthropic', 'Anthropic: Claude Sonnet 5 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Sonnet 5 is Anthropic''s most capable Sonnet-class model, with frontier performance across coding, agents, and professional work. It supports adaptive thinking with selectable reasoning effort levels (low, medium, high, max,...', 'https://openrouter.ai/models/anthropic/claude-sonnet-5:batch', 'https://openrouter.ai/playground?model=anthropic/claude-sonnet-5:batch', '{"input_price_per_1m": 1.0, "output_price_per_1m": 5.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.1-flash-lite-image', 'google', 'Google', 'Google: Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 65536, 65536, '["text", "vision"]',
          'Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image) is Google''s fastest, most cost-efficient Gemini image model, built for high-velocity developer pipelines and rapid-fire visual exploration. It delivers text-to-image generation...', 'https://openrouter.ai/models/google/gemini-3.1-flash-lite-image', 'https://openrouter.ai/playground?model=google/gemini-3.1-flash-lite-image', '{"input_price_per_1m": 0.25, "output_price_per_1m": 1.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nex-agi-nex-n2-mini', 'nex-agi', 'Nex-agi', 'Nex AGI: Nex-N2-Mini', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'Nex-N2-Mini is an open-source agentic mixture-of-experts model from Nex AGI, the smaller sibling in the Nex-N2 series. It accepts text and image input and is built for coding, tool use,...', 'https://openrouter.ai/models/nex-agi/nex-n2-mini', 'https://openrouter.ai/playground?model=nex-agi/nex-n2-mini', '{"input_price_per_1m": 0.025, "output_price_per_1m": 0.1}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'sakana-fugu-ultra', 'sakana', 'Sakana', 'Sakana: Fugu Ultra', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Fugu Ultra is the higher-performance model in Sakana AI''s Fugu family. Rather than a single monolithic model, Fugu is a learned multi-agent orchestration system: a language model trained to route...', 'https://openrouter.ai/models/sakana/fugu-ultra', 'https://openrouter.ai/playground?model=sakana/fugu-ultra', '{"input_price_per_1m": 5.0, "output_price_per_1m": 30.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.1-flash-image', 'google', 'Google', 'Google: Nano Banana 2 (Gemini 3.1 Flash Image)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 32768, '["text", "vision"]',
          'Gemini 3.1 Flash Image, a.k.a. "Nano Banana 2," is Google’s latest state of the art image generation and editing model, delivering Pro-level visual quality at Flash speed. It combines advanced...', 'https://openrouter.ai/models/google/gemini-3.1-flash-image', 'https://openrouter.ai/playground?model=google/gemini-3.1-flash-image', '{"input_price_per_1m": 0.5, "output_price_per_1m": 3.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3-pro-image', 'google', 'Google', 'Google: Nano Banana Pro (Gemini 3 Pro Image)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 32768, '["text", "vision"]',
          'Nano Banana Pro is Google’s most advanced image-generation and editing model, built on Gemini 3 Pro. It extends the original Nano Banana with significantly improved multimodal reasoning, real-world grounding, and...', 'https://openrouter.ai/models/google/gemini-3-pro-image', 'https://openrouter.ai/playground?model=google/gemini-3-pro-image', '{"input_price_per_1m": 2.0, "output_price_per_1m": 12.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-north-mini-code:free', 'cohere', 'Cohere', 'Cohere: North Mini Code (free)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 256000, 64000, '["text"]',
          'North Mini Code is Cohere''s first agentic coding model and the debut of its North family. A sparse mixture-of-experts model with 30B total parameters and 3B active, it is optimized...', 'https://openrouter.ai/models/cohere/north-mini-code:free', 'https://openrouter.ai/playground?model=cohere/north-mini-code:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-5.2', 'z-ai', 'Z-ai', 'Z.ai: GLM 5.2', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 262144, '["text"]',
          'GLM 5.2 is a large-scale reasoning model from Z.ai. It supports text input and output with a 1M-token context window, and is suited for long-horizon agent workflows, project-level software engineering,...', 'https://openrouter.ai/models/z-ai/glm-5.2', 'https://openrouter.ai/playground?model=z-ai/glm-5.2', '{"input_price_per_1m": 0.76, "output_price_per_1m": 2.42}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-5.2:batch', 'z-ai', 'Z-ai', 'Z.ai: GLM 5.2 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 512000, 16384, '["text"]',
          'GLM 5.2 is a large-scale reasoning model from Z.ai. It supports text input and output with a 1M-token context window, and is suited for long-horizon agent workflows, project-level software engineering,...', 'https://openrouter.ai/models/z-ai/glm-5.2:batch', 'https://openrouter.ai/playground?model=z-ai/glm-5.2:batch', '{"input_price_per_1m": 0.7, "output_price_per_1m": 2.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openrouter-fusion', 'openrouter', 'Openrouter', 'OpenRouter: Fusion', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 16384, '["text"]',
          'Fusion turns your prompt into a small multi-model deliberation. A panel of expert models (see below) analyzes your prompt in parallel with web search and web fetch enabled, then a...', 'https://openrouter.ai/models/openrouter/fusion', 'https://openrouter.ai/playground?model=openrouter/fusion', '{"input_price_per_1m": -1000000.0, "output_price_per_1m": -1000000.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'moonshotai-kimi-k2.7-code', 'moonshotai', 'Moonshotai', 'MoonshotAI: Kimi K2.7 Code', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'MoonshotAI: Kimi K2.7 Code is a coding-focused model in Moonshot AI''s Kimi K2 family, built to complete end-to-end programming tasks reliably over long contexts. It uses a native multimodal mixture-of-experts...', 'https://openrouter.ai/models/moonshotai/kimi-k2.7-code', 'https://openrouter.ai/playground?model=moonshotai/kimi-k2.7-code', '{"input_price_per_1m": 0.7, "output_price_per_1m": 3.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'moonshotai-kimi-k2.7-code:batch', 'moonshotai', 'Moonshotai', 'MoonshotAI: Kimi K2.7 Code (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 16384, '["text", "vision"]',
          'MoonshotAI: Kimi K2.7 Code is a coding-focused model in Moonshot AI''s Kimi K2 family, built to complete end-to-end programming tasks reliably over long contexts. It uses a native multimodal mixture-of-experts...', 'https://openrouter.ai/models/moonshotai/kimi-k2.7-code:batch', 'https://openrouter.ai/playground?model=moonshotai/kimi-k2.7-code:batch', '{"input_price_per_1m": 0.475, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~anthropic-claude-fable-latest', '~anthropic', '~anthropic', 'Anthropic: Claude Fable Latest', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'This model always redirects to the latest model in the Claude Fable family.', 'https://openrouter.ai/models/~anthropic/claude-fable-latest', 'https://openrouter.ai/playground?model=~anthropic/claude-fable-latest', '{"input_price_per_1m": 10.0, "output_price_per_1m": 50.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-fable-5', 'anthropic', 'Anthropic', 'Anthropic: Claude Fable 5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Claude Fable 5 is a Mythos-class model from Anthropic, built for autonomous knowledge work and coding. It supports text, image, and file inputs with text output, with reasoning support and...', 'https://openrouter.ai/models/anthropic/claude-fable-5', 'https://openrouter.ai/playground?model=anthropic/claude-fable-5', '{"input_price_per_1m": 10.0, "output_price_per_1m": 50.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-fable-5:batch', 'anthropic', 'Anthropic', 'Anthropic: Claude Fable 5 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Claude Fable 5 is a Mythos-class model from Anthropic, built for autonomous knowledge work and coding. It supports text, image, and file inputs with text output, with reasoning support and...', 'https://openrouter.ai/models/anthropic/claude-fable-5:batch', 'https://openrouter.ai/playground?model=anthropic/claude-fable-5:batch', '{"input_price_per_1m": 5.0, "output_price_per_1m": 25.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nex-agi-nex-n2-pro', 'nex-agi', 'Nex-agi', 'Nex AGI: Nex-N2-Pro', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'Nex-N2-Pro is an agentic mixture-of-experts model from Nex AGI, with 17B active parameters out of 397B total. Built on the Qwen3.5 architecture, it accepts text and image input and produces...', 'https://openrouter.ai/models/nex-agi/nex-n2-pro', 'https://openrouter.ai/playground?model=nex-agi/nex-n2-pro', '{"input_price_per_1m": 0.25, "output_price_per_1m": 1.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-3.5-content-safety:free', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron 3.5 Content Safety (free)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 128000, 8192, '["text", "vision"]',
          'NVIDIA Nemotron 3.5 Content Safety is a compact 4B-parameter multimodal guardrail model from NVIDIA, fine-tuned from Google Gemma-3-4B. It moderates both inputs to and responses from LLMs and VLMs, accepting...', 'https://openrouter.ai/models/nvidia/nemotron-3.5-content-safety:free', 'https://openrouter.ai/playground?model=nvidia/nemotron-3.5-content-safety:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-3-ultra-550b-a55b', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron 3 Ultra', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 512288, 16384, '["text"]',
          'NVIDIA Nemotron 3 Ultra is an open frontier-reasoning and orchestration model from NVIDIA, with 55B active parameters out of 550B total (MoE). Built on a hybrid Transformer-Mamba mixture-of-experts architecture, it...', 'https://openrouter.ai/models/nvidia/nemotron-3-ultra-550b-a55b', 'https://openrouter.ai/playground?model=nvidia/nemotron-3-ultra-550b-a55b', '{"input_price_per_1m": 0.6, "output_price_per_1m": 3.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-3-ultra-550b-a55b:batch', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron 3 Ultra (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 512288, 16384, '["text"]',
          'NVIDIA Nemotron 3 Ultra is an open frontier-reasoning and orchestration model from NVIDIA, with 55B active parameters out of 550B total (MoE). Built on a hybrid Transformer-Mamba mixture-of-experts architecture, it...', 'https://openrouter.ai/models/nvidia/nemotron-3-ultra-550b-a55b:batch', 'https://openrouter.ai/playground?model=nvidia/nemotron-3-ultra-550b-a55b:batch', '{"input_price_per_1m": 0.3, "output_price_per_1m": 1.8}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-3-ultra-550b-a55b:free', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron 3 Ultra (free)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 65536, '["text"]',
          'NVIDIA Nemotron 3 Ultra is an open frontier-reasoning and orchestration model from NVIDIA, with 55B active parameters out of 550B total (MoE). Built on a hybrid Transformer-Mamba mixture-of-experts architecture, it...', 'https://openrouter.ai/models/nvidia/nemotron-3-ultra-550b-a55b:free', 'https://openrouter.ai/playground?model=nvidia/nemotron-3-ultra-550b-a55b:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.7-plus', 'qwen', 'Qwen', 'Qwen: Qwen3.7 Plus', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 131072, '["text", "vision"]',
          'Qwen3.7-Plus is a cost-effective model in Alibaba''s Qwen3.7 series. It supports text and image input with text output, building on the series'' text capabilities with a comprehensive upgrade to its...', 'https://openrouter.ai/models/qwen/qwen3.7-plus', 'https://openrouter.ai/playground?model=qwen/qwen3.7-plus', '{"input_price_per_1m": 0.32, "output_price_per_1m": 1.28}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'minimax-minimax-m3', 'minimax', 'Minimax', 'MiniMax: MiniMax M3', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 512000, '["text", "vision"]',
          'MiniMax-M3 is a multimodal foundation model from MiniMax. It supports text, image, and video inputs with text output, a 1M-token context window, and is suited for long-horizon agentic work, coding,...', 'https://openrouter.ai/models/minimax/minimax-m3', 'https://openrouter.ai/playground?model=minimax/minimax-m3', '{"input_price_per_1m": 0.3, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'minimax-minimax-m3:batch', 'minimax', 'Minimax', 'MiniMax: MiniMax M3 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 524288, 16384, '["text", "vision"]',
          'MiniMax-M3 is a multimodal foundation model from MiniMax. It supports text, image, and video inputs with text output, a 1M-token context window, and is suited for long-horizon agentic work, coding,...', 'https://openrouter.ai/models/minimax/minimax-m3:batch', 'https://openrouter.ai/playground?model=minimax/minimax-m3:batch', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'stepfun-step-3.7-flash', 'stepfun', 'Stepfun', 'StepFun: Step 3.7 Flash', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 256000, '["text", "vision"]',
          'Step 3.7 Flash is StepFun''s latest high-efficiency multimodal Mixture-of-Experts model. It pairs a 196B-parameter language backbone with a vision encoder for native image and video understanding, activating roughly 11B parameters...', 'https://openrouter.ai/models/stepfun/step-3.7-flash', 'https://openrouter.ai/playground?model=stepfun/step-3.7-flash', '{"input_price_per_1m": 0.2, "output_price_per_1m": 1.15}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.8-fast', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.8 (Fast)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Fast-mode variant of [Opus 4.8](/anthropic/claude-opus-4.8) - identical capabilities with higher output speed at 2x pricing relative to regular Opus 4.8.

Learn more in Anthropic''s docs: https://platform.claude.com/docs/en/build-with-claude/fast-mode', 'https://openrouter.ai/models/anthropic/claude-opus-4.8-fast', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.8-fast', '{"input_price_per_1m": 10.0, "output_price_per_1m": 50.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.8', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.8', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Claude Opus 4.8 is Anthropic''s most capable generally available model in the Opus family. It supports text, image, and file inputs with text output, with reasoning support and a 1M-token...', 'https://openrouter.ai/models/anthropic/claude-opus-4.8', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.8', '{"input_price_per_1m": 5.0, "output_price_per_1m": 25.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.8:batch', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.8 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Claude Opus 4.8 is Anthropic''s most capable generally available model in the Opus family. It supports text, image, and file inputs with text output, with reasoning support and a 1M-token...', 'https://openrouter.ai/models/anthropic/claude-opus-4.8:batch', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.8:batch', '{"input_price_per_1m": 2.5, "output_price_per_1m": 12.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.7-max', 'qwen', 'Qwen', 'Qwen: Qwen3.7 Max', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 131072, '["text"]',
          'Qwen3.7-Max is the flagship model in Alibaba''s Qwen3.7 series. It supports text input and output and is designed for agent-centric workloads, with particular strengths in coding, office and productivity tasks,...', 'https://openrouter.ai/models/qwen/qwen3.7-max', 'https://openrouter.ai/playground?model=qwen/qwen3.7-max', '{"input_price_per_1m": 1.475, "output_price_per_1m": 4.425}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'x-ai-grok-build-0.1', 'x-ai', 'X-ai', 'SpaceXAI: Grok Build 0.1', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 256000, 16384, '["text", "vision"]',
          'Grok Build 0.1 is SpaceXAI’s fast coding model trained specifically for agentic software engineering workflows. It supports text and image inputs with text output, and is optimized for interactive coding...', 'https://openrouter.ai/models/x-ai/grok-build-0.1', 'https://openrouter.ai/playground?model=x-ai/grok-build-0.1', '{"input_price_per_1m": 1.0, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.5-flash', 'google', 'Google', 'Google: Gemini 3.5 Flash', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.5 Flash is Google''s high-efficiency multimodal model, bringing near-Pro level coding and reasoning at Flash-tier cost and speed. It is highly optimized for coding proficiency and parallel agentic execution...', 'https://openrouter.ai/models/google/gemini-3.5-flash', 'https://openrouter.ai/playground?model=google/gemini-3.5-flash', '{"input_price_per_1m": 1.5, "output_price_per_1m": 9.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.5-flash:batch', 'google', 'Google', 'Google: Gemini 3.5 Flash (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.5 Flash is Google''s high-efficiency multimodal model, bringing near-Pro level coding and reasoning at Flash-tier cost and speed. It is highly optimized for coding proficiency and parallel agentic execution...', 'https://openrouter.ai/models/google/gemini-3.5-flash:batch', 'https://openrouter.ai/playground?model=google/gemini-3.5-flash:batch', '{"input_price_per_1m": 0.75, "output_price_per_1m": 4.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.7-fast', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.7 (Fast)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Fast-mode variant of [Opus 4.7](/anthropic/claude-opus-4.7) - identical capabilities with higher output speed at premium 6x pricing.

Learn more in Anthropic''s docs: https://platform.claude.com/docs/en/build-with-claude/fast-mode', 'https://openrouter.ai/models/anthropic/claude-opus-4.7-fast', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.7-fast', '{"input_price_per_1m": 30.0, "output_price_per_1m": 150.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'perceptron-perceptron-mk1', 'perceptron', 'Perceptron', 'Perceptron: Perceptron Mk1', 'Small', 0, 'Proprietary',
          0, 'Dense/MoE', 32768, 8192, '["text", "vision"]',
          'Perceptron Mk1 (Mark One) is Perceptron''s highest-quality vision-language model for video and embodied reasoning.** It accepts image and video inputs paired with natural language queries, and produces detailed visual understanding...', 'https://openrouter.ai/models/perceptron/perceptron-mk1', 'https://openrouter.ai/playground?model=perceptron/perceptron-mk1', '{"input_price_per_1m": 0.15, "output_price_per_1m": 1.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'inclusionai-ring-2.6-1t', 'inclusionai', 'Inclusionai', 'inclusionAI: Ring-2.6-1T', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 65536, '["text"]',
          'Ring-2.6-1T is a 1T-parameter-scale thinking model with 63B active parameters, built for real-world agent workflows that require both strong capability and operational efficiency. It is optimized for coding agents, tool...', 'https://openrouter.ai/models/inclusionai/ring-2.6-1t', 'https://openrouter.ai/playground?model=inclusionai/ring-2.6-1t', '{"input_price_per_1m": 0.075, "output_price_per_1m": 0.625}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.1-flash-lite', 'google', 'Google', 'Google: Gemini 3.1 Flash Lite', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.1 Flash Lite is Google’s GA high-efficiency multimodal model optimized for low-latency, high-volume workloads. It supports text, image, video, audio, and PDF inputs, and is designed for lightweight agentic...', 'https://openrouter.ai/models/google/gemini-3.1-flash-lite', 'https://openrouter.ai/playground?model=google/gemini-3.1-flash-lite', '{"input_price_per_1m": 0.25, "output_price_per_1m": 1.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.1-flash-lite:batch', 'google', 'Google', 'Google: Gemini 3.1 Flash Lite (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.1 Flash Lite is Google’s GA high-efficiency multimodal model optimized for low-latency, high-volume workloads. It supports text, image, video, audio, and PDF inputs, and is designed for lightweight agentic...', 'https://openrouter.ai/models/google/gemini-3.1-flash-lite:batch', 'https://openrouter.ai/playground?model=google/gemini-3.1-flash-lite:batch', '{"input_price_per_1m": 0.125, "output_price_per_1m": 0.75}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-chat-latest', 'openai', 'Openai', 'OpenAI: GPT Chat Latest', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT Chat Latest points to OpenAI''s stable API alias `chat-latest` that always resolves to the latest Instant chat model used in ChatGPT. As OpenAI rolls out new Instant model updates...', 'https://openrouter.ai/models/openai/gpt-chat-latest', 'https://openrouter.ai/playground?model=openai/gpt-chat-latest', '{"input_price_per_1m": 5.0, "output_price_per_1m": 30.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'x-ai-grok-4.3', 'x-ai', 'X-ai', 'SpaceXAI: Grok 4.3', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 16384, '["text", "vision"]',
          'Grok 4.3 is a reasoning model from SpaceXAI. It accepts text and image inputs with text output, and is suited for agentic workflows, instruction-following tasks, and applications requiring high factual...', 'https://openrouter.ai/models/x-ai/grok-4.3', 'https://openrouter.ai/playground?model=x-ai/grok-4.3', '{"input_price_per_1m": 1.25, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'ibm-granite-granite-4.1-8b', 'ibm-granite', 'Ibm-granite', 'IBM: Granite 4.1 8B', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 131072, '["text"]',
          'Granite 4.1 8B is a dense, decoder-only 8-billion-parameter language model from IBM, part of the Granite 4.1 family. It supports a 131K-token context window and is designed for enterprise tasks...', 'https://openrouter.ai/models/ibm-granite/granite-4.1-8b', 'https://openrouter.ai/playground?model=ibm-granite/granite-4.1-8b', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.1}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-medium-3-5', 'mistralai', 'Mistralai', 'Mistral: Mistral Medium 3.5', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 16384, '["text", "vision"]',
          'Mistral Medium 3.5 is a dense 128B instruction-following model from Mistral AI. It supports text and image inputs with text output, and is designed for agentic workflows, coding, and complex...', 'https://openrouter.ai/models/mistralai/mistral-medium-3-5', 'https://openrouter.ai/playground?model=mistralai/mistral-medium-3-5', '{"input_price_per_1m": 1.5, "output_price_per_1m": 7.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-3-nano-omni-30b-a3b-reasoning:free', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron 3 Nano Omni (free)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 256000, 65536, '["text", "vision"]',
          'NVIDIA Nemotron™ 3 Nano Omni is a 30B-A3B open multimodal model designed to function as a perception and context sub-agent in enterprise agent systems. It accepts text, image, video, and...', 'https://openrouter.ai/models/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', 'https://openrouter.ai/playground?model=nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~anthropic-claude-haiku-latest', '~anthropic', '~anthropic', 'Anthropic Claude Haiku Latest', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 200000, 64000, '["text", "vision"]',
          'This model always redirects to the latest model in the Anthropic Claude Haiku family.', 'https://openrouter.ai/models/~anthropic/claude-haiku-latest', 'https://openrouter.ai/playground?model=~anthropic/claude-haiku-latest', '{"input_price_per_1m": 1.0, "output_price_per_1m": 5.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~openai-gpt-mini-latest', '~openai', '~openai', 'OpenAI GPT Mini Latest', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'This model always redirects to the latest model in the OpenAI GPT Mini family.', 'https://openrouter.ai/models/~openai/gpt-mini-latest', 'https://openrouter.ai/playground?model=~openai/gpt-mini-latest', '{"input_price_per_1m": 0.75, "output_price_per_1m": 4.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~google-gemini-pro-latest', '~google', '~google', 'Google Gemini Pro Latest', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'This model always redirects to the latest model in the Google Gemini Pro family.', 'https://openrouter.ai/models/~google/gemini-pro-latest', 'https://openrouter.ai/playground?model=~google/gemini-pro-latest', '{"input_price_per_1m": 2.0, "output_price_per_1m": 12.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~moonshotai-kimi-latest', '~moonshotai', '~moonshotai', 'MoonshotAI Kimi Latest', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 1048576, '["text", "vision"]',
          'This model always redirects to the latest model in the MoonshotAI Kimi family.', 'https://openrouter.ai/models/~moonshotai/kimi-latest', 'https://openrouter.ai/playground?model=~moonshotai/kimi-latest', '{"input_price_per_1m": 2.8, "output_price_per_1m": 14.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~google-gemini-flash-latest', '~google', '~google', 'Google Gemini Flash Latest', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'This model always redirects to the latest model in the Google Gemini Flash family.', 'https://openrouter.ai/models/~google/gemini-flash-latest', 'https://openrouter.ai/playground?model=~google/gemini-flash-latest', '{"input_price_per_1m": 1.5, "output_price_per_1m": 7.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~anthropic-claude-sonnet-latest', '~anthropic', '~anthropic', 'Anthropic Claude Sonnet Latest', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'This model always redirects to the latest model in the Anthropic Claude Sonnet family.', 'https://openrouter.ai/models/~anthropic/claude-sonnet-latest', 'https://openrouter.ai/playground?model=~anthropic/claude-sonnet-latest', '{"input_price_per_1m": 2.0, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~openai-gpt-latest', '~openai', '~openai', 'OpenAI GPT Latest', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'This model always redirects to the latest model in the OpenAI GPT family.', 'https://openrouter.ai/models/~openai/gpt-latest', 'https://openrouter.ai/playground?model=~openai/gpt-latest', '{"input_price_per_1m": 5.0, "output_price_per_1m": 30.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.5-plus-20260420', 'qwen', 'Qwen', 'Qwen: Qwen3.5 Plus 2026-04-20', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 65536, '["text", "vision"]',
          'Qwen3.5 Plus (April 2026) is a large-scale multimodal language model from Alibaba. It accepts text, image, and video input and produces text output, with a 1M token context window. This...', 'https://openrouter.ai/models/qwen/qwen3.5-plus-20260420', 'https://openrouter.ai/playground?model=qwen/qwen3.5-plus-20260420', '{"input_price_per_1m": 0.3, "output_price_per_1m": 1.8}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.6-flash', 'qwen', 'Qwen', 'Qwen: Qwen3.6 Flash', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 65536, '["text", "vision"]',
          'Qwen3.6 Flash is a fast, efficient language model from Alibaba''s Qwen 3.6 series. It supports text, image, and video input with a 1M token context window. Tiered pricing kicks in...', 'https://openrouter.ai/models/qwen/qwen3.6-flash', 'https://openrouter.ai/playground?model=qwen/qwen3.6-flash', '{"input_price_per_1m": 0.188, "output_price_per_1m": 1.125}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.6-35b-a3b', 'qwen', 'Qwen', 'Qwen: Qwen3.6 35B A3B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'Qwen3.6-35B-A3B is an open-weight multimodal model from Alibaba Cloud with 35 billion total parameters and 3 billion active parameters per token. It uses a hybrid sparse mixture-of-experts architecture combining Gated...', 'https://openrouter.ai/models/qwen/qwen3.6-35b-a3b', 'https://openrouter.ai/playground?model=qwen/qwen3.6-35b-a3b', '{"input_price_per_1m": 0.15, "output_price_per_1m": 1.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.6-max-preview', 'qwen', 'Qwen', 'Qwen: Qwen3.6 Max Preview', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 65536, '["text"]',
          'Qwen3.6-Max-Preview is a proprietary frontier model from Alibaba Cloud built on a sparse mixture-of-experts architecture with approximately 1 trillion total parameters. It is optimized for agentic coding, tool use, and...', 'https://openrouter.ai/models/qwen/qwen3.6-max-preview', 'https://openrouter.ai/playground?model=qwen/qwen3.6-max-preview', '{"input_price_per_1m": 1.027, "output_price_per_1m": 6.162}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.6-27b', 'qwen', 'Qwen', 'Qwen: Qwen3.6 27B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'Qwen3.6 27B is a dense 27-billion-parameter language model from the Qwen Team at Alibaba, released in April 2026. It features hybrid multimodal capabilities — accepting text, image, and video inputs...', 'https://openrouter.ai/models/qwen/qwen3.6-27b', 'https://openrouter.ai/playground?model=qwen/qwen3.6-27b', '{"input_price_per_1m": 0.6, "output_price_per_1m": 3.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.5-pro', 'openai', 'Openai', 'OpenAI: GPT-5.5 Pro', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.5 Pro is OpenAI’s high-capability model optimized for deep reasoning and accuracy on complex, high-stakes workloads. It features a 1M+ token context window (922K input, 128K output) with support for...', 'https://openrouter.ai/models/openai/gpt-5.5-pro', 'https://openrouter.ai/playground?model=openai/gpt-5.5-pro', '{"input_price_per_1m": 30.0, "output_price_per_1m": 180.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.5-pro:batch', 'openai', 'Openai', 'OpenAI: GPT-5.5 Pro (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.5 Pro is OpenAI’s high-capability model optimized for deep reasoning and accuracy on complex, high-stakes workloads. It features a 1M+ token context window (922K input, 128K output) with support for...', 'https://openrouter.ai/models/openai/gpt-5.5-pro:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.5-pro:batch', '{"input_price_per_1m": 15.0, "output_price_per_1m": 90.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.5', 'openai', 'Openai', 'OpenAI: GPT-5.5', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.5 is OpenAI’s frontier model designed for complex professional workloads, building on GPT-5.4 with stronger reasoning, higher reliability, and improved token efficiency on hard tasks. It features a 1M+ token...', 'https://openrouter.ai/models/openai/gpt-5.5', 'https://openrouter.ai/playground?model=openai/gpt-5.5', '{"input_price_per_1m": 5.0, "output_price_per_1m": 30.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.5:batch', 'openai', 'Openai', 'OpenAI: GPT-5.5 (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.5 is OpenAI’s frontier model designed for complex professional workloads, building on GPT-5.4 with stronger reasoning, higher reliability, and improved token efficiency on hard tasks. It features a 1M+ token...', 'https://openrouter.ai/models/openai/gpt-5.5:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.5:batch', '{"input_price_per_1m": 2.5, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-v4-pro', 'deepseek', 'Deepseek', 'DeepSeek: DeepSeek V4 Pro', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1048576, 384000, '["text"]',
          'DeepSeek V4 Pro is a large-scale Mixture-of-Experts model from DeepSeek with 1.6T total parameters and 49B activated parameters, supporting a 1M-token context window. It is designed for advanced reasoning, coding,...', 'https://openrouter.ai/models/deepseek/deepseek-v4-pro', 'https://openrouter.ai/playground?model=deepseek/deepseek-v4-pro', '{"input_price_per_1m": 0.435, "output_price_per_1m": 0.87}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-v4-flash', 'deepseek', 'Deepseek', 'DeepSeek: DeepSeek V4 Flash 0423', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1048576, 393216, '["text"]',
          'DeepSeek V4 Flash is an efficiency-optimized Mixture-of-Experts model from DeepSeek with 284B total parameters and 13B activated parameters, supporting a 1M-token context window. It is designed for fast inference and...', 'https://openrouter.ai/models/deepseek/deepseek-v4-flash', 'https://openrouter.ai/playground?model=deepseek/deepseek-v4-flash', '{"input_price_per_1m": 0.14, "output_price_per_1m": 0.28}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'inclusionai-ling-2.6-1t', 'inclusionai', 'Inclusionai', 'inclusionAI: Ling-2.6-1T', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 32768, '["text"]',
          'Ling-2.6-1T is an instant (instruct) model from inclusionAI and the company’s trillion-parameter flagship, designed for real-world agents that require fast execution and high efficiency at scale. It uses a “fast...', 'https://openrouter.ai/models/inclusionai/ling-2.6-1t', 'https://openrouter.ai/playground?model=inclusionai/ling-2.6-1t', '{"input_price_per_1m": 0.075, "output_price_per_1m": 0.625}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'tencent-hy3-preview', 'tencent', 'Tencent', 'Tencent: Hy3 preview', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 16384, '["text"]',
          'Hy3 preview is a high-efficiency Mixture-of-Experts model from Tencent designed for agentic workflows and production use. It supports configurable reasoning levels across disabled, low, and high modes, allowing it to...', 'https://openrouter.ai/models/tencent/hy3-preview', 'https://openrouter.ai/playground?model=tencent/hy3-preview', '{"input_price_per_1m": 0.063, "output_price_per_1m": 0.21}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'xiaomi-mimo-v2.5-pro', 'xiaomi', 'Xiaomi', 'Xiaomi: MiMo-V2.5-Pro', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1050000, 131072, '["text"]',
          'MiMo-V2.5-Pro is Xiaomi’s flagship model, delivering strong performance in general agentic capabilities, complex software engineering, and long-horizon tasks, with top rankings on benchmarks such as ClawEval, GDPVal, and SWE-bench Pro....', 'https://openrouter.ai/models/xiaomi/mimo-v2.5-pro', 'https://openrouter.ai/playground?model=xiaomi/mimo-v2.5-pro', '{"input_price_per_1m": 0.435, "output_price_per_1m": 0.87}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'xiaomi-mimo-v2.5', 'xiaomi', 'Xiaomi', 'Xiaomi: MiMo-V2.5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1050000, 131072, '["text", "vision"]',
          'MiMo-V2.5 is a native omnimodal model by Xiaomi. It delivers Pro-level agentic performance at roughly half the inference cost, while surpassing MiMo-V2-Omni in multimodal perception across image and video understanding...', 'https://openrouter.ai/models/xiaomi/mimo-v2.5', 'https://openrouter.ai/playground?model=xiaomi/mimo-v2.5', '{"input_price_per_1m": 0.14, "output_price_per_1m": 0.28}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.4-image-2', 'openai', 'Openai', 'OpenAI: GPT-5.4 Image 2', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 272000, 128000, '["text", "vision"]',
          '[GPT-5.4](https://openrouter.ai/openai/gpt-5.4) Image 2 combines OpenAI''s GPT-5.4 model with state-of-the-art image generation capabilities from GPT Image 2. It enables rich multimodal workflows, allowing users to seamlessly move between reasoning, coding, and...', 'https://openrouter.ai/models/openai/gpt-5.4-image-2', 'https://openrouter.ai/playground?model=openai/gpt-5.4-image-2', '{"input_price_per_1m": 8.0, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'inclusionai-ling-2.6-flash', 'inclusionai', 'Inclusionai', 'inclusionAI: Ling-2.6-flash', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 32768, '["text"]',
          'Ling-2.6-flash is an instant (instruct) model from inclusionAI with 104B total parameters and 7.4B active parameters, designed for real-world agents that require fast responses, strong execution, and high token efficiency....', 'https://openrouter.ai/models/inclusionai/ling-2.6-flash', 'https://openrouter.ai/playground?model=inclusionai/ling-2.6-flash', '{"input_price_per_1m": 0.01, "output_price_per_1m": 0.03}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          '~anthropic-claude-opus-latest', '~anthropic', '~anthropic', 'Anthropic: Claude Opus Latest', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'This model always redirects to the latest model in the Claude Opus family.', 'https://openrouter.ai/models/~anthropic/claude-opus-latest', 'https://openrouter.ai/playground?model=~anthropic/claude-opus-latest', '{"input_price_per_1m": 5.0, "output_price_per_1m": 25.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openrouter-pareto-code', 'openrouter', 'Openrouter', 'Pareto Code Router', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 2000000, 16384, '["text"]',
          'The Pareto Router maintains a tiered shortlist of strong coding models, ranked by [Artificial Analysis](https://artificialanalysis.ai/) coding percentiles. Set min_coding_score between 0 and 1 on the [pareto-router plugin](https://openrouter.ai/docs/guides/routing/routers/pareto-router#the-min_coding_score-parameter) to control how...', 'https://openrouter.ai/models/openrouter/pareto-code', 'https://openrouter.ai/playground?model=openrouter/pareto-code', '{"input_price_per_1m": -1000000.0, "output_price_per_1m": -1000000.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'moonshotai-kimi-k2.6', 'moonshotai', 'Moonshotai', 'MoonshotAI: Kimi K2.6', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'Kimi K2.6 is Moonshot AI''s next-generation multimodal model, designed for long-horizon coding, coding-driven UI/UX generation, and multi-agent orchestration. It handles complex end-to-end coding tasks across Python, Rust, and Go, and...', 'https://openrouter.ai/models/moonshotai/kimi-k2.6', 'https://openrouter.ai/playground?model=moonshotai/kimi-k2.6', '{"input_price_per_1m": 0.95, "output_price_per_1m": 4.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.7', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.7', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Opus 4.7 is the next generation of Anthropic''s Opus family, built for long-running, asynchronous agents. Building on the coding and agentic strengths of Opus 4.6, it delivers stronger performance on...', 'https://openrouter.ai/models/anthropic/claude-opus-4.7', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.7', '{"input_price_per_1m": 5.0, "output_price_per_1m": 25.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.7:batch', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.7 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Opus 4.7 is the next generation of Anthropic''s Opus family, built for long-running, asynchronous agents. Building on the coding and agentic strengths of Opus 4.6, it delivers stronger performance on...', 'https://openrouter.ai/models/anthropic/claude-opus-4.7:batch', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.7:batch', '{"input_price_per_1m": 2.5, "output_price_per_1m": 12.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-5.1', 'z-ai', 'Z-ai', 'Z.ai: GLM 5.1', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 204800, 131072, '["text"]',
          'GLM-5.1 delivers a major leap in coding capability, with particularly significant gains in handling long-horizon tasks. Unlike previous models built around minute-level interactions, GLM-5.1 can work independently and continuously on...', 'https://openrouter.ai/models/z-ai/glm-5.1', 'https://openrouter.ai/playground?model=z-ai/glm-5.1', '{"input_price_per_1m": 1.4, "output_price_per_1m": 4.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemma-4-26b-a4b-it', 'google', 'Google', 'Google: Gemma 4 26B A4B ', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'Gemma 4 26B A4B IT is an instruction-tuned Mixture-of-Experts (MoE) model from Google DeepMind. Despite 25.2B total parameters, only 3.8B activate per token during inference — delivering near-31B quality at...', 'https://openrouter.ai/models/google/gemma-4-26b-a4b-it', 'https://openrouter.ai/playground?model=google/gemma-4-26b-a4b-it', '{"input_price_per_1m": 0.12, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemma-4-26b-a4b-it:free', 'google', 'Google', 'Google: Gemma 4 26B A4B  (free)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 32768, '["text", "vision"]',
          'Gemma 4 26B A4B IT is an instruction-tuned Mixture-of-Experts (MoE) model from Google DeepMind. Despite 25.2B total parameters, only 3.8B activate per token during inference — delivering near-31B quality at...', 'https://openrouter.ai/models/google/gemma-4-26b-a4b-it:free', 'https://openrouter.ai/playground?model=google/gemma-4-26b-a4b-it:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemma-4-31b-it', 'google', 'Google', 'Google: Gemma 4 31B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'Gemma 4 31B Instruct is Google DeepMind''s 30.7B dense multimodal model supporting text and image input with text output. Features a 256K token context window, configurable thinking/reasoning mode, native function...', 'https://openrouter.ai/models/google/gemma-4-31b-it', 'https://openrouter.ai/playground?model=google/gemma-4-31b-it', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.34}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemma-4-31b-it:free', 'google', 'Google', 'Google: Gemma 4 31B (free)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 32768, '["text", "vision"]',
          'Gemma 4 31B Instruct is Google DeepMind''s 30.7B dense multimodal model supporting text and image input with text output. Features a 256K token context window, configurable thinking/reasoning mode, native function...', 'https://openrouter.ai/models/google/gemma-4-31b-it:free', 'https://openrouter.ai/playground?model=google/gemma-4-31b-it:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.6-plus', 'qwen', 'Qwen', 'Qwen: Qwen3.6 Plus', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 65536, '["text", "vision"]',
          'Qwen 3.6 Plus builds on a hybrid architecture that combines efficient linear attention with sparse mixture-of-experts routing, enabling strong scalability and high-performance inference. Compared to the 3.5 series, it delivers...', 'https://openrouter.ai/models/qwen/qwen3.6-plus', 'https://openrouter.ai/playground?model=qwen/qwen3.6-plus', '{"input_price_per_1m": 0.325, "output_price_per_1m": 1.95}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-5v-turbo', 'z-ai', 'Z-ai', 'Z.ai: GLM 5V Turbo', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 202752, 131072, '["text", "vision"]',
          'GLM-5V-Turbo is Z.ai’s first native multimodal agent foundation model, built for vision-based coding and agent-driven tasks. It natively handles image, video, and text inputs, excels at long-horizon planning, complex coding,...', 'https://openrouter.ai/models/z-ai/glm-5v-turbo', 'https://openrouter.ai/playground?model=z-ai/glm-5v-turbo', '{"input_price_per_1m": 1.2, "output_price_per_1m": 4.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'arcee-ai-trinity-large-thinking', 'arcee-ai', 'Arcee-ai', 'Arcee AI: Trinity Large Thinking', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 262144, '["text"]',
          'Trinity Large Thinking is a powerful open source reasoning model from the team at Arcee AI. It shows strong performance in PinchBench, agentic workloads, and reasoning tasks. Launch video: https://youtu.be/Gc82AXLa0Rg?si=4RLn6WBz33qT--B7...', 'https://openrouter.ai/models/arcee-ai/trinity-large-thinking', 'https://openrouter.ai/playground?model=arcee-ai/trinity-large-thinking', '{"input_price_per_1m": 0.22, "output_price_per_1m": 0.85}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'x-ai-grok-4.20-multi-agent', 'x-ai', 'X-ai', 'SpaceXAI: Grok 4.20 Multi-Agent', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 2000000, 16384, '["text", "vision"]',
          'Grok 4.20 Multi-Agent is a variant of SpaceXAI’s Grok 4.20 designed for collaborative, agent-based workflows. Multiple agents operate in parallel to conduct deep research, coordinate tool use, and synthesize information...', 'https://openrouter.ai/models/x-ai/grok-4.20-multi-agent', 'https://openrouter.ai/playground?model=x-ai/grok-4.20-multi-agent', '{"input_price_per_1m": 1.25, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'x-ai-grok-4.20', 'x-ai', 'X-ai', 'SpaceXAI: Grok 4.20', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 2000000, 16384, '["text", "vision"]',
          'Grok 4.20 is a reasoning model from SpaceXAI with industry-leading speed and agentic tool calling capabilities. It combines the lowest hallucination rate on the market with strict prompt adherance, delivering...', 'https://openrouter.ai/models/x-ai/grok-4.20', 'https://openrouter.ai/playground?model=x-ai/grok-4.20', '{"input_price_per_1m": 1.25, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-lyria-3-pro-preview', 'google', 'Google', 'Google: Lyria 3 Pro Preview', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Full-length songs are priced at $0.08 per song. Lyria 3 is Google''s family of music generation models, available through the Gemini API. With Lyria 3, you can generate high-quality, 48kHz...', 'https://openrouter.ai/models/google/lyria-3-pro-preview', 'https://openrouter.ai/playground?model=google/lyria-3-pro-preview', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-lyria-3-clip-preview', 'google', 'Google', 'Google: Lyria 3 Clip Preview', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          '30 second duration clips are priced at $0.04 per clip. Lyria 3 is Google''s family of music generation models, available through the Gemini API. With Lyria 3, you can generate...', 'https://openrouter.ai/models/google/lyria-3-clip-preview', 'https://openrouter.ai/playground?model=google/lyria-3-clip-preview', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'kwaipilot-kat-coder-pro-v2', 'kwaipilot', 'Kwaipilot', 'Kwaipilot: KAT-Coder-Pro V2', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 80000, '["text"]',
          'KAT-Coder-Pro V2 is the latest high-performance model in KwaiKAT’s KAT-Coder series, designed for complex enterprise-grade software engineering and SaaS integration. It builds on the agentic coding strengths of earlier versions,...', 'https://openrouter.ai/models/kwaipilot/kat-coder-pro-v2', 'https://openrouter.ai/playground?model=kwaipilot/kat-coder-pro-v2', '{"input_price_per_1m": 0.3, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'rekaai-reka-edge', 'rekaai', 'Rekaai', 'Reka Edge', 'Small', 0, 'Proprietary',
          0, 'Dense/MoE', 16384, 16384, '["text", "vision"]',
          'Reka Edge is an extremely efficient 7B multimodal vision-language model that accepts image/video+text inputs and generates text outputs. This model is optimized specifically to deliver industry-leading performance in image understanding,...', 'https://openrouter.ai/models/rekaai/reka-edge', 'https://openrouter.ai/playground?model=rekaai/reka-edge', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.1}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'minimax-minimax-m2.7', 'minimax', 'Minimax', 'MiniMax: MiniMax M2.7', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 204800, 131072, '["text"]',
          'MiniMax-M2.7 is a next-generation large language model designed for autonomous, real-world productivity and continuous improvement. Built to actively participate in its own evolution, M2.7 integrates advanced agentic capabilities through multi-agent...', 'https://openrouter.ai/models/minimax/minimax-m2.7', 'https://openrouter.ai/playground?model=minimax/minimax-m2.7', '{"input_price_per_1m": 0.3, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.4-nano', 'openai', 'Openai', 'OpenAI: GPT-5.4 Nano', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.4 nano is the most lightweight and cost-efficient variant of the GPT-5.4 family, optimized for speed-critical and high-volume tasks. It supports text and image inputs and is designed for low-latency...', 'https://openrouter.ai/models/openai/gpt-5.4-nano', 'https://openrouter.ai/playground?model=openai/gpt-5.4-nano', '{"input_price_per_1m": 0.2, "output_price_per_1m": 1.25}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.4-nano:batch', 'openai', 'Openai', 'OpenAI: GPT-5.4 Nano (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.4 nano is the most lightweight and cost-efficient variant of the GPT-5.4 family, optimized for speed-critical and high-volume tasks. It supports text and image inputs and is designed for low-latency...', 'https://openrouter.ai/models/openai/gpt-5.4-nano:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.4-nano:batch', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.625}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.4-mini', 'openai', 'Openai', 'OpenAI: GPT-5.4 Mini', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.4 mini brings the core capabilities of GPT-5.4 to a faster, more efficient model optimized for high-throughput workloads. It supports text and image inputs with strong performance across reasoning, coding,...', 'https://openrouter.ai/models/openai/gpt-5.4-mini', 'https://openrouter.ai/playground?model=openai/gpt-5.4-mini', '{"input_price_per_1m": 0.75, "output_price_per_1m": 4.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.4-mini:batch', 'openai', 'Openai', 'OpenAI: GPT-5.4 Mini (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.4 mini brings the core capabilities of GPT-5.4 to a faster, more efficient model optimized for high-throughput workloads. It supports text and image inputs with strong performance across reasoning, coding,...', 'https://openrouter.ai/models/openai/gpt-5.4-mini:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.4-mini:batch', '{"input_price_per_1m": 0.375, "output_price_per_1m": 2.25}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-small-2603', 'mistralai', 'Mistralai', 'Mistral: Mistral Small 4', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 16384, '["text", "vision"]',
          'Mistral Small 4 is the next major release in the Mistral Small family, unifying the capabilities of several flagship Mistral models into a single system. It combines strong reasoning from...', 'https://openrouter.ai/models/mistralai/mistral-small-2603', 'https://openrouter.ai/playground?model=mistralai/mistral-small-2603', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-5-turbo', 'z-ai', 'Z-ai', 'Z.ai: GLM 5 Turbo', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 202752, 131072, '["text"]',
          'GLM-5 Turbo is a new model from Z.ai designed for fast inference and strong performance in agent-driven environments such as OpenClaw scenarios. It is deeply optimized for real-world agent workflows...', 'https://openrouter.ai/models/z-ai/glm-5-turbo', 'https://openrouter.ai/playground?model=z-ai/glm-5-turbo', '{"input_price_per_1m": 1.2, "output_price_per_1m": 4.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-3-super-120b-a12b', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron 3 Super', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 16384, '["text"]',
          'NVIDIA Nemotron 3 Super is a 120B-parameter open hybrid MoE model, activating just 12B parameters for maximum compute efficiency and accuracy in complex multi-agent applications. Built on a hybrid Mamba-Transformer...', 'https://openrouter.ai/models/nvidia/nemotron-3-super-120b-a12b', 'https://openrouter.ai/playground?model=nvidia/nemotron-3-super-120b-a12b', '{"input_price_per_1m": 0.085, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-3-super-120b-a12b:free', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron 3 Super (free)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 262144, '["text"]',
          'NVIDIA Nemotron 3 Super is a 120B-parameter open hybrid MoE model, activating just 12B parameters for maximum compute efficiency and accuracy in complex multi-agent applications. Built on a hybrid Mamba-Transformer...', 'https://openrouter.ai/models/nvidia/nemotron-3-super-120b-a12b:free', 'https://openrouter.ai/playground?model=nvidia/nemotron-3-super-120b-a12b:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'bytedance-seed-seed-2.0-lite', 'bytedance-seed', 'Bytedance-seed', 'ByteDance Seed: Seed-2.0-Lite', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 131072, '["text", "vision"]',
          'Seed-2.0-Lite is a versatile, cost‑efficient enterprise workhorse that delivers strong multimodal and agent capabilities while offering noticeably lower latency, making it a practical default choice for most production workloads across...', 'https://openrouter.ai/models/bytedance-seed/seed-2.0-lite', 'https://openrouter.ai/playground?model=bytedance-seed/seed-2.0-lite', '{"input_price_per_1m": 0.25, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.5-9b', 'qwen', 'Qwen', 'Qwen: Qwen3.5-9B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'Qwen3.5-9B is a multimodal foundation model from the Qwen3.5 family, designed to deliver strong reasoning, coding, and visual understanding in an efficient 9B-parameter architecture. It uses a unified vision-language design...', 'https://openrouter.ai/models/qwen/qwen3.5-9b', 'https://openrouter.ai/playground?model=qwen/qwen3.5-9b', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.15}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.4-pro', 'openai', 'Openai', 'OpenAI: GPT-5.4 Pro', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.4 Pro is OpenAI''s most advanced model, building on GPT-5.4''s unified architecture with enhanced reasoning capabilities for complex, high-stakes tasks. It features a 1M+ token context window (922K input, 128K...', 'https://openrouter.ai/models/openai/gpt-5.4-pro', 'https://openrouter.ai/playground?model=openai/gpt-5.4-pro', '{"input_price_per_1m": 30.0, "output_price_per_1m": 180.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.4-pro:batch', 'openai', 'Openai', 'OpenAI: GPT-5.4 Pro (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.4 Pro is OpenAI''s most advanced model, building on GPT-5.4''s unified architecture with enhanced reasoning capabilities for complex, high-stakes tasks. It features a 1M+ token context window (922K input, 128K...', 'https://openrouter.ai/models/openai/gpt-5.4-pro:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.4-pro:batch', '{"input_price_per_1m": 15.0, "output_price_per_1m": 90.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.4', 'openai', 'Openai', 'OpenAI: GPT-5.4', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.4 is OpenAI’s latest frontier model, unifying the Codex and GPT lines into a single system. It features a 1M+ token context window (922K input, 128K output) with support for...', 'https://openrouter.ai/models/openai/gpt-5.4', 'https://openrouter.ai/playground?model=openai/gpt-5.4', '{"input_price_per_1m": 2.5, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.4:batch', 'openai', 'Openai', 'OpenAI: GPT-5.4 (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1050000, 128000, '["text", "vision"]',
          'GPT-5.4 is OpenAI’s latest frontier model, unifying the Codex and GPT lines into a single system. It features a 1M+ token context window (922K input, 128K output) with support for...', 'https://openrouter.ai/models/openai/gpt-5.4:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.4:batch', '{"input_price_per_1m": 1.25, "output_price_per_1m": 7.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'inception-mercury-2', 'inception', 'Inception', 'Inception: Mercury 2', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 128000, 50000, '["text"]',
          'Mercury 2 is an extremely fast reasoning LLM, and the first reasoning diffusion LLM (dLLM). Instead of generating tokens sequentially, Mercury 2 produces and refines multiple tokens in parallel, achieving...', 'https://openrouter.ai/models/inception/mercury-2', 'https://openrouter.ai/playground?model=inception/mercury-2', '{"input_price_per_1m": 0.25, "output_price_per_1m": 0.75}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.3-chat', 'openai', 'Openai', 'OpenAI: GPT-5.3 Chat', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text", "vision"]',
          'GPT-5.3 Chat is an update to ChatGPT''s most-used model that makes everyday conversations smoother, more useful, and more directly helpful. It delivers more accurate answers with better contextualization and significantly...', 'https://openrouter.ai/models/openai/gpt-5.3-chat', 'https://openrouter.ai/playground?model=openai/gpt-5.3-chat', '{"input_price_per_1m": 1.75, "output_price_per_1m": 14.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.1-flash-lite-preview', 'google', 'Google', 'Google: Gemini 3.1 Flash Lite Preview', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.1 Flash Lite Preview is Google''s high-efficiency model optimized for high-volume use cases. It outperforms Gemini 2.5 Flash Lite on overall quality and approaches Gemini 2.5 Flash performance across...', 'https://openrouter.ai/models/google/gemini-3.1-flash-lite-preview', 'https://openrouter.ai/playground?model=google/gemini-3.1-flash-lite-preview', '{"input_price_per_1m": 0.25, "output_price_per_1m": 1.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'bytedance-seed-seed-2.0-mini', 'bytedance-seed', 'Bytedance-seed', 'ByteDance Seed: Seed-2.0-Mini', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 131072, '["text", "vision"]',
          'Seed-2.0-mini targets latency-sensitive, high-concurrency, and cost-sensitive scenarios, emphasizing fast response and flexible inference deployment. It delivers performance comparable to ByteDance-Seed-1.6, supports 256k context, four reasoning effort modes (minimal/low/medium/high), multimodal understanding,...', 'https://openrouter.ai/models/bytedance-seed/seed-2.0-mini', 'https://openrouter.ai/playground?model=bytedance-seed/seed-2.0-mini', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.1-flash-image-preview', 'google', 'Google', 'Google: Nano Banana 2 (Gemini 3.1 Flash Image Preview)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 65536, 65536, '["text", "vision"]',
          'Gemini 3.1 Flash Image Preview, a.k.a. "Nano Banana 2," is Google’s latest state of the art image generation and editing model, delivering Pro-level visual quality at Flash speed. It combines...', 'https://openrouter.ai/models/google/gemini-3.1-flash-image-preview', 'https://openrouter.ai/playground?model=google/gemini-3.1-flash-image-preview', '{"input_price_per_1m": 0.5, "output_price_per_1m": 3.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.5-35b-a3b', 'qwen', 'Qwen', 'Qwen: Qwen3.5-35B-A3B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'The Qwen3.5 Series 35B-A3B is a native vision-language model designed with a hybrid architecture that integrates linear attention mechanisms and a sparse mixture-of-experts model, achieving higher inference efficiency. Its overall...', 'https://openrouter.ai/models/qwen/qwen3.5-35b-a3b', 'https://openrouter.ai/playground?model=qwen/qwen3.5-35b-a3b', '{"input_price_per_1m": 0.14, "output_price_per_1m": 1.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.5-27b', 'qwen', 'Qwen', 'Qwen: Qwen3.5-27B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 65536, '["text", "vision"]',
          'The Qwen3.5 27B native vision-language Dense model incorporates a linear attention mechanism, delivering fast response times while balancing inference speed and performance. Its overall capabilities are comparable to those of...', 'https://openrouter.ai/models/qwen/qwen3.5-27b', 'https://openrouter.ai/playground?model=qwen/qwen3.5-27b', '{"input_price_per_1m": 0.195, "output_price_per_1m": 1.56}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.5-122b-a10b', 'qwen', 'Qwen', 'Qwen: Qwen3.5-122B-A10B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 81920, '["text", "vision"]',
          'The Qwen3.5 122B-A10B native vision-language model is built on a hybrid architecture that integrates a linear attention mechanism with a sparse mixture-of-experts model, achieving higher inference efficiency. In terms of...', 'https://openrouter.ai/models/qwen/qwen3.5-122b-a10b', 'https://openrouter.ai/playground?model=qwen/qwen3.5-122b-a10b', '{"input_price_per_1m": 0.29, "output_price_per_1m": 2.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.5-flash-02-23', 'qwen', 'Qwen', 'Qwen: Qwen3.5-Flash', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 65536, '["text", "vision"]',
          'The Qwen3.5 native vision-language Flash models are built on a hybrid architecture that integrates a linear attention mechanism with a sparse mixture-of-experts model, achieving higher inference efficiency. Compared to the...', 'https://openrouter.ai/models/qwen/qwen3.5-flash-02-23', 'https://openrouter.ai/playground?model=qwen/qwen3.5-flash-02-23', '{"input_price_per_1m": 0.065, "output_price_per_1m": 0.26}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.1-pro-preview-customtools', 'google', 'Google', 'Google: Gemini 3.1 Pro Preview Custom Tools', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.1 Pro Preview Custom Tools is a variant of Gemini 3.1 Pro that improves tool selection behavior by preventing overuse of a general bash tool when more efficient third-party...', 'https://openrouter.ai/models/google/gemini-3.1-pro-preview-customtools', 'https://openrouter.ai/playground?model=google/gemini-3.1-pro-preview-customtools', '{"input_price_per_1m": 2.0, "output_price_per_1m": 12.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.3-codex', 'openai', 'Openai', 'OpenAI: GPT-5.3-Codex', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.3-Codex is OpenAI’s most advanced agentic coding model, combining the frontier software engineering performance of GPT-5.2-Codex with the broader reasoning and professional knowledge capabilities of GPT-5.2. It achieves state-of-the-art results...', 'https://openrouter.ai/models/openai/gpt-5.3-codex', 'https://openrouter.ai/playground?model=openai/gpt-5.3-codex', '{"input_price_per_1m": 1.75, "output_price_per_1m": 14.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'aion-labs-aion-2.0', 'aion-labs', 'Aion-labs', 'AionLabs: Aion-2.0', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 32768, '["text"]',
          'Aion-2.0 is a variant of DeepSeek V3.2 optimized for immersive roleplaying and storytelling. It is particularly strong at introducing tension, crises, and conflict into stories, making narratives feel more engaging....', 'https://openrouter.ai/models/aion-labs/aion-2.0', 'https://openrouter.ai/playground?model=aion-labs/aion-2.0', '{"input_price_per_1m": 0.8, "output_price_per_1m": 1.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.1-pro-preview', 'google', 'Google', 'Google: Gemini 3.1 Pro Preview', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.1 Pro Preview is Google’s frontier reasoning model, delivering enhanced software engineering performance, improved agentic reliability, and more efficient token usage across complex workflows. Building on the multimodal foundation...', 'https://openrouter.ai/models/google/gemini-3.1-pro-preview', 'https://openrouter.ai/playground?model=google/gemini-3.1-pro-preview', '{"input_price_per_1m": 2.0, "output_price_per_1m": 12.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3.1-pro-preview:batch', 'google', 'Google', 'Google: Gemini 3.1 Pro Preview (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3.1 Pro Preview is Google’s frontier reasoning model, delivering enhanced software engineering performance, improved agentic reliability, and more efficient token usage across complex workflows. Building on the multimodal foundation...', 'https://openrouter.ai/models/google/gemini-3.1-pro-preview:batch', 'https://openrouter.ai/playground?model=google/gemini-3.1-pro-preview:batch', '{"input_price_per_1m": 1.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-sonnet-4.6', 'anthropic', 'Anthropic', 'Anthropic: Claude Sonnet 4.6', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Sonnet 4.6 is Anthropic''s most capable Sonnet-class model yet, with frontier performance across coding, agents, and professional work. It excels at iterative development, complex codebase navigation, end-to-end project management with...', 'https://openrouter.ai/models/anthropic/claude-sonnet-4.6', 'https://openrouter.ai/playground?model=anthropic/claude-sonnet-4.6', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-sonnet-4.6:batch', 'anthropic', 'Anthropic', 'Anthropic: Claude Sonnet 4.6 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Sonnet 4.6 is Anthropic''s most capable Sonnet-class model yet, with frontier performance across coding, agents, and professional work. It excels at iterative development, complex codebase navigation, end-to-end project management with...', 'https://openrouter.ai/models/anthropic/claude-sonnet-4.6:batch', 'https://openrouter.ai/playground?model=anthropic/claude-sonnet-4.6:batch', '{"input_price_per_1m": 1.5, "output_price_per_1m": 7.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.5-plus-02-15', 'qwen', 'Qwen', 'Qwen: Qwen3.5 Plus 2026-02-15', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 65536, '["text", "vision"]',
          'The Qwen3.5 native vision-language series Plus models are built on a hybrid architecture that integrates linear attention mechanisms with sparse mixture-of-experts models, achieving higher inference efficiency. In a variety of...', 'https://openrouter.ai/models/qwen/qwen3.5-plus-02-15', 'https://openrouter.ai/playground?model=qwen/qwen3.5-plus-02-15', '{"input_price_per_1m": 0.26, "output_price_per_1m": 1.56}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3.5-397b-a17b', 'qwen', 'Qwen', 'Qwen: Qwen3.5 397B A17B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 65536, '["text", "vision"]',
          'The Qwen3.5 series 397B-A17B native vision-language model is built on a hybrid architecture that integrates a linear attention mechanism with a sparse mixture-of-experts model, achieving higher inference efficiency. It delivers...', 'https://openrouter.ai/models/qwen/qwen3.5-397b-a17b', 'https://openrouter.ai/playground?model=qwen/qwen3.5-397b-a17b', '{"input_price_per_1m": 0.39, "output_price_per_1m": 2.34}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'minimax-minimax-m2.5', 'minimax', 'Minimax', 'MiniMax: MiniMax M2.5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 204800, 196608, '["text"]',
          'MiniMax-M2.5 is a SOTA large language model designed for real-world productivity. Trained in a diverse range of complex real-world digital working environments, M2.5 builds upon the coding expertise of M2.1...', 'https://openrouter.ai/models/minimax/minimax-m2.5', 'https://openrouter.ai/playground?model=minimax/minimax-m2.5', '{"input_price_per_1m": 0.22, "output_price_per_1m": 0.9}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-5', 'z-ai', 'Z-ai', 'Z.ai: GLM 5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 204800, 131072, '["text"]',
          'GLM-5 is Z.ai’s flagship open-source foundation model engineered for complex systems design and long-horizon agent workflows. Built for expert developers, it delivers production-grade performance on large-scale programming tasks, rivaling leading...', 'https://openrouter.ai/models/z-ai/glm-5', 'https://openrouter.ai/playground?model=z-ai/glm-5', '{"input_price_per_1m": 0.95, "output_price_per_1m": 2.55}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-max-thinking', 'qwen', 'Qwen', 'Qwen: Qwen3 Max Thinking', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 65536, '["text"]',
          'Qwen3-Max-Thinking is the flagship reasoning model in the Qwen3 series, designed for high-stakes cognitive tasks that require deep, multi-step reasoning. By significantly scaling model capacity and reinforcement learning compute, it...', 'https://openrouter.ai/models/qwen/qwen3-max-thinking', 'https://openrouter.ai/playground?model=qwen/qwen3-max-thinking', '{"input_price_per_1m": 0.78, "output_price_per_1m": 3.9}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.6', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.6', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Opus 4.6 is Anthropic’s strongest model for coding and long-running professional tasks. It is built for agents that operate across entire workflows rather than single prompts, making it especially effective...', 'https://openrouter.ai/models/anthropic/claude-opus-4.6', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.6', '{"input_price_per_1m": 5.0, "output_price_per_1m": 25.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-4.6', 'z-ai', 'Z-ai', 'Z.ai: GLM 4.6', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 204800, 131072, '["text"]',
          'Compared with GLM-4.5, this generation brings several key improvements: Longer context window: The context window has been expanded from 128K to 200K tokens, enabling the model to handle more complex...', 'https://openrouter.ai/models/z-ai/glm-4.6', 'https://openrouter.ai/playground?model=z-ai/glm-4.6', '{"input_price_per_1m": 0.5, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.6:batch', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.6 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 128000, '["text", "vision"]',
          'Opus 4.6 is Anthropic’s strongest model for coding and long-running professional tasks. It is built for agents that operate across entire workflows rather than single prompts, making it especially effective...', 'https://openrouter.ai/models/anthropic/claude-opus-4.6:batch', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.6:batch', '{"input_price_per_1m": 2.5, "output_price_per_1m": 12.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-coder-next', 'qwen', 'Qwen', 'Qwen: Qwen3 Coder Next', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 262144, '["text"]',
          'Qwen3-Coder-Next is an open-weight causal language model optimized for coding agents and local development workflows. It uses a sparse MoE design with 80B total parameters and only 3B activated per...', 'https://openrouter.ai/models/qwen/qwen3-coder-next', 'https://openrouter.ai/playground?model=qwen/qwen3-coder-next', '{"input_price_per_1m": 0.12, "output_price_per_1m": 0.8}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openrouter-free', 'openrouter', 'Openrouter', 'Free Models Router', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 16384, '["text", "vision"]',
          'The simplest way to get free inference. openrouter/free is a router that selects free models at random from the models available on OpenRouter. The router smartly filters for models that...', 'https://openrouter.ai/models/openrouter/free', 'https://openrouter.ai/playground?model=openrouter/free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'stepfun-step-3.5-flash', 'stepfun', 'Stepfun', 'StepFun: Step 3.5 Flash', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 65536, '["text"]',
          'Step 3.5 Flash is StepFun''s most capable open-source foundation model. Built on a sparse Mixture of Experts (MoE) architecture, it selectively activates only 11B of its 196B parameters per token....', 'https://openrouter.ai/models/stepfun/step-3.5-flash', 'https://openrouter.ai/playground?model=stepfun/step-3.5-flash', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.3}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'moonshotai-kimi-k2.5', 'moonshotai', 'Moonshotai', 'MoonshotAI: Kimi K2.5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 262144, '["text", "vision"]',
          'Kimi K2.5 is Moonshot AI''s native multimodal model, delivering state-of-the-art visual coding capability and a self-directed agent swarm paradigm. Built on Kimi K2 with continued pretraining over approximately 15T mixed...', 'https://openrouter.ai/models/moonshotai/kimi-k2.5', 'https://openrouter.ai/playground?model=moonshotai/kimi-k2.5', '{"input_price_per_1m": 0.57, "output_price_per_1m": 2.85}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'upstage-solar-pro-3', 'upstage', 'Upstage', 'Upstage: Solar Pro 3', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 131072, '["text"]',
          'Solar Pro 3 is Upstage''s powerful Mixture-of-Experts (MoE) language model. With 102B total parameters and 12B active parameters per forward pass, it delivers exceptional performance while maintaining computational efficiency. Optimized...', 'https://openrouter.ai/models/upstage/solar-pro-3', 'https://openrouter.ai/playground?model=upstage/solar-pro-3', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'minimax-minimax-m2-her', 'minimax', 'Minimax', 'MiniMax: MiniMax M2-her', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 65536, 2048, '["text"]',
          'MiniMax M2-her is a dialogue-first large language model built for immersive roleplay, character-driven chat, and expressive multi-turn conversations. Designed to stay consistent in tone and personality, it supports rich message...', 'https://openrouter.ai/models/minimax/minimax-m2-her', 'https://openrouter.ai/playground?model=minimax/minimax-m2-her', '{"input_price_per_1m": 0.3, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'writer-palmyra-x5', 'writer', 'Writer', 'Writer: Palmyra X5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1040000, 8192, '["text"]',
          'Palmyra X5 is Writer''s most advanced model, purpose-built for building and scaling AI agents across the enterprise. It delivers industry-leading speed and efficiency on context windows up to 1 million...', 'https://openrouter.ai/models/writer/palmyra-x5', 'https://openrouter.ai/playground?model=writer/palmyra-x5', '{"input_price_per_1m": 0.6, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-audio', 'openai', 'Openai', 'OpenAI: GPT Audio', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text"]',
          'The gpt-audio model is OpenAI''s first generally available audio model. The new snapshot features an upgraded decoder for more natural sounding voices and maintains better voice consistency. Audio is priced...', 'https://openrouter.ai/models/openai/gpt-audio', 'https://openrouter.ai/playground?model=openai/gpt-audio', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-audio-mini', 'openai', 'Openai', 'OpenAI: GPT Audio Mini', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text"]',
          'A cost-efficient version of GPT Audio. The new snapshot features an upgraded decoder for more natural sounding voices and maintains better voice consistency. Input is priced at $0.60 per million...', 'https://openrouter.ai/models/openai/gpt-audio-mini', 'https://openrouter.ai/playground?model=openai/gpt-audio-mini', '{"input_price_per_1m": 0.6, "output_price_per_1m": 2.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-4.7-flash', 'z-ai', 'Z-ai', 'Z.ai: GLM 4.7 Flash', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 202752, 16384, '["text"]',
          'As a 30B-class SOTA model, GLM-4.7-Flash offers a new option that balances performance and efficiency. It is further optimized for agentic coding use cases, strengthening coding capabilities, long-horizon task planning,...', 'https://openrouter.ai/models/z-ai/glm-4.7-flash', 'https://openrouter.ai/playground?model=z-ai/glm-4.7-flash', '{"input_price_per_1m": 0.06, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.2-codex', 'openai', 'Openai', 'OpenAI: GPT-5.2-Codex', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.2-Codex is an upgraded version of GPT-5.1-Codex optimized for software engineering and coding workflows. It is designed for both interactive development sessions and long, independent execution of complex engineering tasks....', 'https://openrouter.ai/models/openai/gpt-5.2-codex', 'https://openrouter.ai/playground?model=openai/gpt-5.2-codex', '{"input_price_per_1m": 1.75, "output_price_per_1m": 14.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'bytedance-seed-seed-1.6-flash', 'bytedance-seed', 'Bytedance-seed', 'ByteDance Seed: Seed 1.6 Flash', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 32768, '["text", "vision"]',
          'Seed 1.6 Flash is an ultra-fast multimodal deep thinking model by ByteDance Seed, supporting both text and visual understanding. It features a 256k context window and can generate outputs of...', 'https://openrouter.ai/models/bytedance-seed/seed-1.6-flash', 'https://openrouter.ai/playground?model=bytedance-seed/seed-1.6-flash', '{"input_price_per_1m": 0.075, "output_price_per_1m": 0.3}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'bytedance-seed-seed-1.6', 'bytedance-seed', 'Bytedance-seed', 'ByteDance Seed: Seed 1.6', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 32768, '["text", "vision"]',
          'Seed 1.6 is a general-purpose model released by the ByteDance Seed team. It incorporates multimodal capabilities and adaptive deep thinking with a 256K context window.', 'https://openrouter.ai/models/bytedance-seed/seed-1.6', 'https://openrouter.ai/playground?model=bytedance-seed/seed-1.6', '{"input_price_per_1m": 0.25, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'minimax-minimax-m2.1', 'minimax', 'Minimax', 'MiniMax: MiniMax M2.1', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 204800, 131072, '["text"]',
          'MiniMax-M2.1 is a lightweight, state-of-the-art large language model optimized for coding, agentic workflows, and modern application development. With only 10 billion activated parameters, it delivers a major jump in real-world...', 'https://openrouter.ai/models/minimax/minimax-m2.1', 'https://openrouter.ai/playground?model=minimax/minimax-m2.1', '{"input_price_per_1m": 0.3, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-4.7', 'z-ai', 'Z-ai', 'Z.ai: GLM 4.7', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 204800, 131072, '["text"]',
          'GLM-4.7 is Z.ai’s latest flagship model, featuring upgrades in two key areas: enhanced programming capabilities and more stable multi-step reasoning/execution. It demonstrates significant improvements in executing complex agent tasks while...', 'https://openrouter.ai/models/z-ai/glm-4.7', 'https://openrouter.ai/playground?model=z-ai/glm-4.7', '{"input_price_per_1m": 0.4, "output_price_per_1m": 1.75}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3-flash-preview', 'google', 'Google', 'Google: Gemini 3 Flash Preview', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3 Flash Preview is a high speed, high value thinking model designed for agentic workflows, multi turn chat, and coding assistance. It delivers near Pro level reasoning and tool...', 'https://openrouter.ai/models/google/gemini-3-flash-preview', 'https://openrouter.ai/playground?model=google/gemini-3-flash-preview', '{"input_price_per_1m": 0.5, "output_price_per_1m": 3.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3-flash-preview:batch', 'google', 'Google', 'Google: Gemini 3 Flash Preview (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 3 Flash Preview is a high speed, high value thinking model designed for agentic workflows, multi turn chat, and coding assistance. It delivers near Pro level reasoning and tool...', 'https://openrouter.ai/models/google/gemini-3-flash-preview:batch', 'https://openrouter.ai/playground?model=google/gemini-3-flash-preview:batch', '{"input_price_per_1m": 0.25, "output_price_per_1m": 1.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-3-nano-30b-a3b', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron 3 Nano 30B A3B', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 228000, '["text"]',
          'NVIDIA Nemotron 3 Nano 30B A3B is a small language MoE model with highest compute efficiency and accuracy for developers to build specialized agentic AI systems. The model is fully...', 'https://openrouter.ai/models/nvidia/nemotron-3-nano-30b-a3b', 'https://openrouter.ai/playground?model=nvidia/nemotron-3-nano-30b-a3b', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-3-nano-30b-a3b:free', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron 3 Nano 30B A3B (free)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 256000, 16384, '["text"]',
          'NVIDIA Nemotron 3 Nano 30B A3B is a small language MoE model with highest compute efficiency and accuracy for developers to build specialized agentic AI systems. The model is fully...', 'https://openrouter.ai/models/nvidia/nemotron-3-nano-30b-a3b:free', 'https://openrouter.ai/playground?model=nvidia/nemotron-3-nano-30b-a3b:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.2-chat', 'openai', 'Openai', 'OpenAI: GPT-5.2 Chat', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text", "vision"]',
          'GPT-5.2 Chat (AKA Instant) is the fast, lightweight member of the 5.2 family, optimized for low-latency chat while retaining strong general intelligence. It uses adaptive reasoning to selectively “think” on...', 'https://openrouter.ai/models/openai/gpt-5.2-chat', 'https://openrouter.ai/playground?model=openai/gpt-5.2-chat', '{"input_price_per_1m": 1.75, "output_price_per_1m": 14.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.2-pro', 'openai', 'Openai', 'OpenAI: GPT-5.2 Pro', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.2 Pro is OpenAI’s most advanced model, offering major improvements in agentic coding and long context performance over GPT-5 Pro. It is optimized for complex tasks that require step-by-step reasoning,...', 'https://openrouter.ai/models/openai/gpt-5.2-pro', 'https://openrouter.ai/playground?model=openai/gpt-5.2-pro', '{"input_price_per_1m": 21.0, "output_price_per_1m": 168.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.2-pro:batch', 'openai', 'Openai', 'OpenAI: GPT-5.2 Pro (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.2 Pro is OpenAI’s most advanced model, offering major improvements in agentic coding and long context performance over GPT-5 Pro. It is optimized for complex tasks that require step-by-step reasoning,...', 'https://openrouter.ai/models/openai/gpt-5.2-pro:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.2-pro:batch', '{"input_price_per_1m": 10.5, "output_price_per_1m": 84.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.2', 'openai', 'Openai', 'OpenAI: GPT-5.2', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.2 is the latest frontier-grade model in the GPT-5 series, offering stronger agentic and long context perfomance compared to GPT-5.1. It uses adaptive reasoning to allocate computation dynamically, responding quickly...', 'https://openrouter.ai/models/openai/gpt-5.2', 'https://openrouter.ai/playground?model=openai/gpt-5.2', '{"input_price_per_1m": 1.75, "output_price_per_1m": 14.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.2:batch', 'openai', 'Openai', 'OpenAI: GPT-5.2 (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.2 is the latest frontier-grade model in the GPT-5 series, offering stronger agentic and long context perfomance compared to GPT-5.1. It uses adaptive reasoning to allocate computation dynamically, responding quickly...', 'https://openrouter.ai/models/openai/gpt-5.2:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.2:batch', '{"input_price_per_1m": 0.875, "output_price_per_1m": 7.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'relace-relace-search', 'relace', 'Relace', 'Relace: Relace Search', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 256000, 128000, '["text"]',
          'The relace-search model uses 4-12 `view_file` and `grep` tools in parallel to explore a codebase and return relevant files to the user request. In contrast to RAG, relace-search performs agentic...', 'https://openrouter.ai/models/relace/relace-search', 'https://openrouter.ai/playground?model=relace/relace-search', '{"input_price_per_1m": 1.0, "output_price_per_1m": 3.0}', '{}', '{}',
          1, '', 0, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-4.6v', 'z-ai', 'Z-ai', 'Z.ai: GLM 4.6V', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 32768, '["text", "vision"]',
          'GLM-4.6V is a large multimodal model designed for high-fidelity visual understanding and long-context reasoning across images, documents, and mixed media. It supports up to 128K tokens, processes complex page layouts...', 'https://openrouter.ai/models/z-ai/glm-4.6v', 'https://openrouter.ai/playground?model=z-ai/glm-4.6v', '{"input_price_per_1m": 0.3, "output_price_per_1m": 0.9}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openrouter-bodybuilder', 'openrouter', 'Openrouter', 'Body Builder (beta)', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text"]',
          'Transform your natural language requests into structured OpenRouter API request objects. Describe what you want to accomplish with AI models, and Body Builder will construct the appropriate API calls. Example:...', 'https://openrouter.ai/models/openrouter/bodybuilder', 'https://openrouter.ai/playground?model=openrouter/bodybuilder', '{"input_price_per_1m": -1000000.0, "output_price_per_1m": -1000000.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.1-codex-max', 'openai', 'Openai', 'OpenAI: GPT-5.1-Codex-Max', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.1-Codex-Max is OpenAI’s latest agentic coding model, designed for long-running, high-context software development tasks. It is based on an updated version of the 5.1 reasoning stack and trained on agentic...', 'https://openrouter.ai/models/openai/gpt-5.1-codex-max', 'https://openrouter.ai/playground?model=openai/gpt-5.1-codex-max', '{"input_price_per_1m": 1.25, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-nova-2-lite-v1', 'amazon', 'Amazon', 'Amazon: Nova 2 Lite', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 65535, '["text", "vision"]',
          'Nova 2 Lite is a fast, cost-effective reasoning model for everyday workloads that can process text, images, and videos to generate text. Nova 2 Lite demonstrates standout capabilities in processing...', 'https://openrouter.ai/models/amazon/nova-2-lite-v1', 'https://openrouter.ai/playground?model=amazon/nova-2-lite-v1', '{"input_price_per_1m": 0.3, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-ministral-14b-2512', 'mistralai', 'Mistralai', 'Mistral: Ministral 3 14B 2512', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 16384, '["text", "vision"]',
          'The largest model in the Ministral 3 family, Ministral 3 14B offers frontier capabilities and performance comparable to its larger Mistral Small 3.2 24B counterpart. A powerful and efficient language...', 'https://openrouter.ai/models/mistralai/ministral-14b-2512', 'https://openrouter.ai/playground?model=mistralai/ministral-14b-2512', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-ministral-8b-2512', 'mistralai', 'Mistralai', 'Mistral: Ministral 3 8B 2512', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 16384, '["text", "vision"]',
          'A balanced model in the Ministral 3 family, Ministral 3 8B is a powerful, efficient tiny language model with vision capabilities.', 'https://openrouter.ai/models/mistralai/ministral-8b-2512', 'https://openrouter.ai/playground?model=mistralai/ministral-8b-2512', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.15}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-ministral-3b-2512', 'mistralai', 'Mistralai', 'Mistral: Ministral 3 3B 2512', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text", "vision"]',
          'The smallest model in the Ministral 3 family, Ministral 3 3B is a powerful, efficient tiny language model with vision capabilities.', 'https://openrouter.ai/models/mistralai/ministral-3b-2512', 'https://openrouter.ai/playground?model=mistralai/ministral-3b-2512', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.1}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-large-2512', 'mistralai', 'Mistralai', 'Mistral: Mistral Large 3 2512', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 16384, '["text", "vision"]',
          'Mistral Large 3 2512 is Mistral’s most capable model to date, featuring a sparse mixture-of-experts architecture with 41B active parameters (675B total), and released under the Apache 2.0 license.', 'https://openrouter.ai/models/mistralai/mistral-large-2512', 'https://openrouter.ai/playground?model=mistralai/mistral-large-2512', '{"input_price_per_1m": 0.5, "output_price_per_1m": 1.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-v3.2', 'deepseek', 'Deepseek', 'DeepSeek: DeepSeek V3.2', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 163840, 65536, '["text"]',
          'DeepSeek-V3.2 is a large language model designed to harmonize high computational efficiency with strong reasoning and agentic tool-use performance. It introduces DeepSeek Sparse Attention (DSA), a fine-grained sparse attention mechanism...', 'https://openrouter.ai/models/deepseek/deepseek-v3.2', 'https://openrouter.ai/playground?model=deepseek/deepseek-v3.2', '{"input_price_per_1m": 0.269, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.5', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 200000, 64000, '["text", "vision"]',
          'Claude Opus 4.5 is Anthropic’s frontier reasoning model optimized for complex software engineering, agentic workflows, and long-horizon computer use. It offers strong multimodal capabilities, competitive performance across real-world coding and...', 'https://openrouter.ai/models/anthropic/claude-opus-4.5', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.5', '{"input_price_per_1m": 5.0, "output_price_per_1m": 25.0}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.5:batch', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.5 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 200000, 64000, '["text", "vision"]',
          'Claude Opus 4.5 is Anthropic’s frontier reasoning model optimized for complex software engineering, agentic workflows, and long-horizon computer use. It offers strong multimodal capabilities, competitive performance across real-world coding and...', 'https://openrouter.ai/models/anthropic/claude-opus-4.5:batch', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.5:batch', '{"input_price_per_1m": 2.5, "output_price_per_1m": 12.5}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'allenai-olmo-3-32b-think', 'allenai', 'Allenai', 'AllenAI: Olmo 3 32B Think', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 65536, 65536, '["text"]',
          'Olmo 3 32B Think is a large-scale, 32-billion-parameter model purpose-built for deep reasoning, complex logic chains and advanced instruction-following scenarios. Its capacity enables strong performance on demanding evaluation tasks and...', 'https://openrouter.ai/models/allenai/olmo-3-32b-think', 'https://openrouter.ai/playground?model=allenai/olmo-3-32b-think', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-3-pro-image-preview', 'google', 'Google', 'Google: Nano Banana Pro (Gemini 3 Pro Image Preview)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 65536, 32768, '["text", "vision"]',
          'Nano Banana Pro is Google’s most advanced image-generation and editing model, built on Gemini 3 Pro. It extends the original Nano Banana with significantly improved multimodal reasoning, real-world grounding, and...', 'https://openrouter.ai/models/google/gemini-3-pro-image-preview', 'https://openrouter.ai/playground?model=google/gemini-3-pro-image-preview', '{"input_price_per_1m": 2.0, "output_price_per_1m": 12.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepcogito-cogito-v2.1-671b', 'deepcogito', 'Deepcogito', 'Deep Cogito: Cogito v2.1 671B', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 128000, 16384, '["text"]',
          'Cogito v2.1 671B MoE represents one of the strongest open models globally, matching performance of frontier closed and open models. This model is trained using self play with reinforcement learning...', 'https://openrouter.ai/models/deepcogito/cogito-v2.1-671b', 'https://openrouter.ai/playground?model=deepcogito/cogito-v2.1-671b', '{"input_price_per_1m": 1.25, "output_price_per_1m": 1.25}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.1', 'openai', 'Openai', 'OpenAI: GPT-5.1', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.1 is the latest frontier-grade model in the GPT-5 series, offering stronger general-purpose reasoning, improved instruction adherence, and a more natural conversational style compared to GPT-5. It uses adaptive reasoning...', 'https://openrouter.ai/models/openai/gpt-5.1', 'https://openrouter.ai/playground?model=openai/gpt-5.1', '{"input_price_per_1m": 1.25, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.1:batch', 'openai', 'Openai', 'OpenAI: GPT-5.1 (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.1 is the latest frontier-grade model in the GPT-5 series, offering stronger general-purpose reasoning, improved instruction adherence, and a more natural conversational style compared to GPT-5. It uses adaptive reasoning...', 'https://openrouter.ai/models/openai/gpt-5.1:batch', 'https://openrouter.ai/playground?model=openai/gpt-5.1:batch', '{"input_price_per_1m": 0.625, "output_price_per_1m": 5.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.1-codex', 'openai', 'Openai', 'OpenAI: GPT-5.1-Codex', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.1-Codex is a specialized version of GPT-5.1 optimized for software engineering and coding workflows. It is designed for both interactive development sessions and long, independent execution of complex engineering tasks....', 'https://openrouter.ai/models/openai/gpt-5.1-codex', 'https://openrouter.ai/playground?model=openai/gpt-5.1-codex', '{"input_price_per_1m": 1.25, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5.1-codex-mini', 'openai', 'Openai', 'OpenAI: GPT-5.1-Codex-Mini', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5.1-Codex-Mini is a smaller and faster version of GPT-5.1-Codex', 'https://openrouter.ai/models/openai/gpt-5.1-codex-mini', 'https://openrouter.ai/playground?model=openai/gpt-5.1-codex-mini', '{"input_price_per_1m": 0.25, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'moonshotai-kimi-k2-thinking', 'moonshotai', 'Moonshotai', 'MoonshotAI: Kimi K2 Thinking', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 100352, '["text"]',
          'Kimi K2 Thinking is Moonshot AI’s most advanced open reasoning model to date, extending the K2 series into agentic, long-horizon reasoning. Built on the trillion-parameter Mixture-of-Experts (MoE) architecture introduced in...', 'https://openrouter.ai/models/moonshotai/kimi-k2-thinking', 'https://openrouter.ai/playground?model=moonshotai/kimi-k2-thinking', '{"input_price_per_1m": 0.6, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-nova-premier-v1', 'amazon', 'Amazon', 'Amazon: Nova Premier 1.0', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 32000, '["text", "vision"]',
          'Amazon Nova Premier is the most capable of Amazon’s multimodal models for complex reasoning tasks and for use as the best teacher for distilling custom models.', 'https://openrouter.ai/models/amazon/nova-premier-v1', 'https://openrouter.ai/playground?model=amazon/nova-premier-v1', '{"input_price_per_1m": 2.5, "output_price_per_1m": 12.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'perplexity-sonar-pro-search', 'perplexity', 'Perplexity', 'Perplexity: Sonar Pro Search', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 200000, 8000, '["text", "vision"]',
          'Exclusively available on the OpenRouter API, Sonar Pro''s new Pro Search mode is Perplexity''s most advanced agentic search system. It is designed for deeper reasoning and analysis. Pricing is based...', 'https://openrouter.ai/models/perplexity/sonar-pro-search', 'https://openrouter.ai/playground?model=perplexity/sonar-pro-search', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-voxtral-small-24b-2507', 'mistralai', 'Mistralai', 'Mistral: Voxtral Small 24B 2507', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 32000, 16384, '["text"]',
          'Voxtral Small is an enhancement of Mistral Small 3, incorporating state-of-the-art audio input capabilities while retaining best-in-class text performance. It excels at speech transcription, translation and audio understanding. Input audio...', 'https://openrouter.ai/models/mistralai/voxtral-small-24b-2507', 'https://openrouter.ai/playground?model=mistralai/voxtral-small-24b-2507', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.3}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-oss-safeguard-20b', 'openai', 'Openai', 'OpenAI: gpt-oss-safeguard-20b', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 65536, '["text"]',
          'gpt-oss-safeguard-20b is a safety reasoning model from OpenAI built upon gpt-oss-20b. This open-weight, 21B-parameter Mixture-of-Experts (MoE) model offers lower latency for safety tasks like content classification, LLM filtering, and trust...', 'https://openrouter.ai/models/openai/gpt-oss-safeguard-20b', 'https://openrouter.ai/playground?model=openai/gpt-oss-safeguard-20b', '{"input_price_per_1m": 0.075, "output_price_per_1m": 0.3}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-nano-12b-v2-vl:free', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron Nano 12B 2 VL (free)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 128000, 128000, '["text", "vision"]',
          'NVIDIA Nemotron Nano 2 VL is a 12-billion-parameter open multimodal reasoning model designed for video understanding and document intelligence. It introduces a hybrid Transformer-Mamba architecture, combining transformer-level accuracy with Mamba’s...', 'https://openrouter.ai/models/nvidia/nemotron-nano-12b-v2-vl:free', 'https://openrouter.ai/playground?model=nvidia/nemotron-nano-12b-v2-vl:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'minimax-minimax-m2', 'minimax', 'Minimax', 'MiniMax: MiniMax M2', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 204800, 131072, '["text"]',
          'MiniMax-M2 is a compact, high-efficiency large language model optimized for end-to-end coding and agentic workflows. With 10 billion activated parameters (230 billion total), it delivers near-frontier intelligence across general reasoning,...', 'https://openrouter.ai/models/minimax/minimax-m2', 'https://openrouter.ai/playground?model=minimax/minimax-m2', '{"input_price_per_1m": 0.255, "output_price_per_1m": 1.02}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-vl-32b-instruct', 'qwen', 'Qwen', 'Qwen: Qwen3 VL 32B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 32768, '["text", "vision"]',
          'Qwen3-VL-32B-Instruct is a large-scale multimodal vision-language model designed for high-precision understanding and reasoning across text, images, and video. With 32 billion parameters, it combines deep visual perception with advanced text...', 'https://openrouter.ai/models/qwen/qwen3-vl-32b-instruct', 'https://openrouter.ai/playground?model=qwen/qwen3-vl-32b-instruct', '{"input_price_per_1m": 0.104, "output_price_per_1m": 0.416}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'ibm-granite-granite-4.0-h-micro', 'ibm-granite', 'Ibm-granite', 'IBM: Granite 4.0 Micro', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131000, 131000, '["text"]',
          'Granite-4.0-H-Micro is a 3B parameter from the Granite 4 family of models. These models are the latest in a series of models released by IBM. They are fine-tuned for long...', 'https://openrouter.ai/models/ibm-granite/granite-4.0-h-micro', 'https://openrouter.ai/playground?model=ibm-granite/granite-4.0-h-micro', '{"input_price_per_1m": 0.017, "output_price_per_1m": 0.112}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5-image-mini', 'openai', 'Openai', 'OpenAI: GPT-5 Image Mini', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5 Image Mini combines OpenAI''s advanced language capabilities, powered by [GPT-5 Mini](https://openrouter.ai/openai/gpt-5-mini), with GPT Image 1 Mini for efficient image generation. This natively multimodal model features superior instruction following, text...', 'https://openrouter.ai/models/openai/gpt-5-image-mini', 'https://openrouter.ai/playground?model=openai/gpt-5-image-mini', '{"input_price_per_1m": 2.5, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-haiku-4.5', 'anthropic', 'Anthropic', 'Anthropic: Claude Haiku 4.5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 200000, 64000, '["text", "vision"]',
          'Claude Haiku 4.5 is Anthropic’s fastest and most efficient model, delivering near-frontier intelligence at a fraction of the cost and latency of larger Claude models. Matching Claude Sonnet 4’s performance...', 'https://openrouter.ai/models/anthropic/claude-haiku-4.5', 'https://openrouter.ai/playground?model=anthropic/claude-haiku-4.5', '{"input_price_per_1m": 1.0, "output_price_per_1m": 5.0}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-haiku-4.5:batch', 'anthropic', 'Anthropic', 'Anthropic: Claude Haiku 4.5 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 200000, 64000, '["text", "vision"]',
          'Claude Haiku 4.5 is Anthropic’s fastest and most efficient model, delivering near-frontier intelligence at a fraction of the cost and latency of larger Claude models. Matching Claude Sonnet 4’s performance...', 'https://openrouter.ai/models/anthropic/claude-haiku-4.5:batch', 'https://openrouter.ai/playground?model=anthropic/claude-haiku-4.5:batch', '{"input_price_per_1m": 0.5, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-vl-8b-thinking', 'qwen', 'Qwen', 'Qwen: Qwen3 VL 8B Thinking', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 32768, '["text", "vision"]',
          'Qwen3-VL-8B-Thinking is the reasoning-optimized variant of the Qwen3-VL-8B multimodal model, designed for advanced visual and textual reasoning across complex scenes, documents, and temporal sequences. It integrates enhanced multimodal alignment and...', 'https://openrouter.ai/models/qwen/qwen3-vl-8b-thinking', 'https://openrouter.ai/playground?model=qwen/qwen3-vl-8b-thinking', '{"input_price_per_1m": 0.18, "output_price_per_1m": 2.1}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-vl-8b-instruct', 'qwen', 'Qwen', 'Qwen: Qwen3 VL 8B Instruct', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 32768, '["text", "vision"]',
          'Qwen3-VL-8B-Instruct is a multimodal vision-language model from the Qwen3-VL series, built for high-fidelity understanding and reasoning across text, images, and video. It features improved multimodal fusion with Interleaved-MRoPE for long-horizon...', 'https://openrouter.ai/models/qwen/qwen3-vl-8b-instruct', 'https://openrouter.ai/playground?model=qwen/qwen3-vl-8b-instruct', '{"input_price_per_1m": 0.117, "output_price_per_1m": 0.455}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5-image', 'openai', 'Openai', 'OpenAI: GPT-5 Image', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          '[GPT-5](https://openrouter.ai/openai/gpt-5) Image combines OpenAI''s GPT-5 model with state-of-the-art image generation capabilities. It offers major improvements in reasoning, code quality, and user experience while incorporating GPT Image 1''s superior instruction following,...', 'https://openrouter.ai/models/openai/gpt-5-image', 'https://openrouter.ai/playground?model=openai/gpt-5-image', '{"input_price_per_1m": 10.0, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-2.5-flash-image', 'google', 'Google', 'Google: Nano Banana (Gemini 2.5 Flash Image)', 'Small', 0, 'Proprietary',
          0, 'Dense/MoE', 32768, 8192, '["text", "vision"]',
          'Gemini 2.5 Flash Image, a.k.a. "Nano Banana," is now generally available. It is a state of the art image generation model with contextual understanding. It is capable of image generation,...', 'https://openrouter.ai/models/google/gemini-2.5-flash-image', 'https://openrouter.ai/playground?model=google/gemini-2.5-flash-image', '{"input_price_per_1m": 0.3, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-vl-30b-a3b-thinking', 'qwen', 'Qwen', 'Qwen: Qwen3 VL 30B A3B Thinking', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 32768, '["text", "vision"]',
          'Qwen3-VL-30B-A3B-Thinking is a multimodal model that unifies strong text generation with visual understanding for images and videos. Its Thinking variant enhances reasoning in STEM, math, and complex tasks. It excels...', 'https://openrouter.ai/models/qwen/qwen3-vl-30b-a3b-thinking', 'https://openrouter.ai/playground?model=qwen/qwen3-vl-30b-a3b-thinking', '{"input_price_per_1m": 0.2, "output_price_per_1m": 2.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-vl-30b-a3b-instruct', 'qwen', 'Qwen', 'Qwen: Qwen3 VL 30B A3B Instruct', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 16384, '["text", "vision"]',
          'Qwen3-VL-30B-A3B-Instruct is a multimodal model that unifies strong text generation with visual understanding for images and videos. Its Instruct variant optimizes instruction-following for general multimodal tasks. It excels in perception...', 'https://openrouter.ai/models/qwen/qwen3-vl-30b-a3b-instruct', 'https://openrouter.ai/playground?model=qwen/qwen3-vl-30b-a3b-instruct', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5-pro', 'openai', 'Openai', 'OpenAI: GPT-5 Pro', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5 Pro is OpenAI’s most advanced model, offering major improvements in reasoning, code quality, and user experience. It is optimized for complex tasks that require step-by-step reasoning, instruction following, and...', 'https://openrouter.ai/models/openai/gpt-5-pro', 'https://openrouter.ai/playground?model=openai/gpt-5-pro', '{"input_price_per_1m": 15.0, "output_price_per_1m": 120.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5-pro:batch', 'openai', 'Openai', 'OpenAI: GPT-5 Pro (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5 Pro is OpenAI’s most advanced model, offering major improvements in reasoning, code quality, and user experience. It is optimized for complex tasks that require step-by-step reasoning, instruction following, and...', 'https://openrouter.ai/models/openai/gpt-5-pro:batch', 'https://openrouter.ai/playground?model=openai/gpt-5-pro:batch', '{"input_price_per_1m": 7.5, "output_price_per_1m": 60.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-sonnet-4.5', 'anthropic', 'Anthropic', 'Anthropic: Claude Sonnet 4.5', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 64000, '["text", "vision"]',
          'Claude Sonnet 4.5 is Anthropic’s most advanced Sonnet model to date, optimized for real-world agents and coding workflows. It delivers state-of-the-art performance on coding benchmarks such as SWE-bench Verified, with...', 'https://openrouter.ai/models/anthropic/claude-sonnet-4.5', 'https://openrouter.ai/playground?model=anthropic/claude-sonnet-4.5', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-sonnet-4.5:batch', 'anthropic', 'Anthropic', 'Anthropic: Claude Sonnet 4.5 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 64000, '["text", "vision"]',
          'Claude Sonnet 4.5 is Anthropic’s most advanced Sonnet model to date, optimized for real-world agents and coding workflows. It delivers state-of-the-art performance on coding benchmarks such as SWE-bench Verified, with...', 'https://openrouter.ai/models/anthropic/claude-sonnet-4.5:batch', 'https://openrouter.ai/playground?model=anthropic/claude-sonnet-4.5:batch', '{"input_price_per_1m": 1.5, "output_price_per_1m": 7.5}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-v3.2-exp', 'deepseek', 'Deepseek', 'DeepSeek: DeepSeek V3.2 Exp', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 163840, 65536, '["text"]',
          'DeepSeek-V3.2-Exp is an experimental large language model released by DeepSeek as an intermediate step between V3.1 and future architectures. It introduces DeepSeek Sparse Attention (DSA), a fine-grained sparse attention mechanism...', 'https://openrouter.ai/models/deepseek/deepseek-v3.2-exp', 'https://openrouter.ai/playground?model=deepseek/deepseek-v3.2-exp', '{"input_price_per_1m": 0.27, "output_price_per_1m": 0.41}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'thedrummer-cydonia-24b-v4.1', 'thedrummer', 'Thedrummer', 'TheDrummer: Cydonia 24B V4.1', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 131072, '["text"]',
          'Uncensored and creative writing model based on Mistral Small 3.2 24B with good recall, prompt adherence, and intelligence.', 'https://openrouter.ai/models/thedrummer/cydonia-24b-v4.1', 'https://openrouter.ai/playground?model=thedrummer/cydonia-24b-v4.1', '{"input_price_per_1m": 0.3, "output_price_per_1m": 0.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'relace-relace-apply-3', 'relace', 'Relace', 'Relace: Relace Apply 3', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 256000, 128000, '["text"]',
          'Relace Apply 3 is a specialized code-patching LLM that merges AI-suggested edits straight into your source files. It can apply updates from GPT-4o, Claude, and others into your files at...', 'https://openrouter.ai/models/relace/relace-apply-3', 'https://openrouter.ai/playground?model=relace/relace-apply-3', '{"input_price_per_1m": 0.85, "output_price_per_1m": 1.25}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-vl-235b-a22b-thinking', 'qwen', 'Qwen', 'Qwen: Qwen3 VL 235B A22B Thinking', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 32768, '["text", "vision"]',
          'Qwen3-VL-235B-A22B Thinking is a multimodal model that unifies strong text generation with visual understanding across images and video. The Thinking model is optimized for multimodal reasoning in STEM and math....', 'https://openrouter.ai/models/qwen/qwen3-vl-235b-a22b-thinking', 'https://openrouter.ai/playground?model=qwen/qwen3-vl-235b-a22b-thinking', '{"input_price_per_1m": 0.4, "output_price_per_1m": 4.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-vl-235b-a22b-instruct', 'qwen', 'Qwen', 'Qwen: Qwen3 VL 235B A22B Instruct', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 32768, '["text", "vision"]',
          'Qwen3-VL-235B-A22B Instruct is an open-weight multimodal model that unifies strong text generation with visual understanding across images and video. The Instruct model targets general vision-language use (VQA, document parsing, chart/table...', 'https://openrouter.ai/models/qwen/qwen3-vl-235b-a22b-instruct', 'https://openrouter.ai/playground?model=qwen/qwen3-vl-235b-a22b-instruct', '{"input_price_per_1m": 0.21, "output_price_per_1m": 1.9}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-max', 'qwen', 'Qwen', 'Qwen: Qwen3 Max', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 65536, '["text"]',
          'Qwen3-Max is an updated release built on the Qwen3 series, offering major improvements in reasoning, instruction following, multilingual support, and long-tail knowledge coverage compared to the January 2025 version. It...', 'https://openrouter.ai/models/qwen/qwen3-max', 'https://openrouter.ai/playground?model=qwen/qwen3-max', '{"input_price_per_1m": 0.78, "output_price_per_1m": 3.9}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-coder-plus', 'qwen', 'Qwen', 'Qwen: Qwen3 Coder Plus', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 65536, '["text"]',
          'Qwen3 Coder Plus is Alibaba''s proprietary version of the Open Source Qwen3 Coder 480B A35B. It is a powerful coding agent model specializing in autonomous programming via tool calling and...', 'https://openrouter.ai/models/qwen/qwen3-coder-plus', 'https://openrouter.ai/playground?model=qwen/qwen3-coder-plus', '{"input_price_per_1m": 0.65, "output_price_per_1m": 3.25}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5-codex:batch', 'openai', 'Openai', 'OpenAI: GPT-5 Codex (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5-Codex is a specialized version of GPT-5 optimized for software engineering and coding workflows. It is designed for both interactive development sessions and long, independent execution of complex engineering tasks....', 'https://openrouter.ai/models/openai/gpt-5-codex:batch', 'https://openrouter.ai/playground?model=openai/gpt-5-codex:batch', '{"input_price_per_1m": 0.625, "output_price_per_1m": 5.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-v3.1-terminus', 'deepseek', 'Deepseek', 'DeepSeek: DeepSeek V3.1 Terminus', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 163840, 32768, '["text"]',
          'DeepSeek-V3.1 Terminus is an update to [DeepSeek V3.1](/deepseek/deepseek-chat-v3.1) that maintains the model''s original capabilities while addressing issues reported by users, including language consistency and agent capabilities, further optimizing the model''s...', 'https://openrouter.ai/models/deepseek/deepseek-v3.1-terminus', 'https://openrouter.ai/playground?model=deepseek/deepseek-v3.1-terminus', '{"input_price_per_1m": 0.27, "output_price_per_1m": 1.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-coder-flash', 'qwen', 'Qwen', 'Qwen: Qwen3 Coder Flash', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 65536, '["text"]',
          'Qwen3 Coder Flash is Alibaba''s fast and cost efficient version of their proprietary Qwen3 Coder Plus. It is a powerful coding agent model specializing in autonomous programming via tool calling...', 'https://openrouter.ai/models/qwen/qwen3-coder-flash', 'https://openrouter.ai/playground?model=qwen/qwen3-coder-flash', '{"input_price_per_1m": 0.195, "output_price_per_1m": 0.975}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-next-80b-a3b-thinking', 'qwen', 'Qwen', 'Qwen: Qwen3 Next 80B A3B Thinking', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 32768, '["text"]',
          'Qwen3-Next-80B-A3B-Thinking is a reasoning-first chat model in the Qwen3-Next line that outputs structured “thinking” traces by default. It’s designed for hard multi-step problems; math proofs, code synthesis/debugging, logic, and agentic...', 'https://openrouter.ai/models/qwen/qwen3-next-80b-a3b-thinking', 'https://openrouter.ai/playground?model=qwen/qwen3-next-80b-a3b-thinking', '{"input_price_per_1m": 0.15, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-next-80b-a3b-instruct', 'qwen', 'Qwen', 'Qwen: Qwen3 Next 80B A3B Instruct', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 16384, '["text"]',
          'Qwen3-Next-80B-A3B-Instruct is an instruction-tuned chat model in the Qwen3-Next series optimized for fast, stable responses without “thinking” traces. It targets complex tasks across reasoning, code generation, knowledge QA, and multilingual...', 'https://openrouter.ai/models/qwen/qwen3-next-80b-a3b-instruct', 'https://openrouter.ai/playground?model=qwen/qwen3-next-80b-a3b-instruct', '{"input_price_per_1m": 0.09, "output_price_per_1m": 1.1}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen-plus-2025-07-28', 'qwen', 'Qwen', 'Qwen: Qwen Plus 0728', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 32768, '["text"]',
          'Qwen Plus 0728, based on the Qwen3 foundation model, is a 1 million context hybrid reasoning model with a balanced performance, speed, and cost combination.', 'https://openrouter.ai/models/qwen/qwen-plus-2025-07-28', 'https://openrouter.ai/playground?model=qwen/qwen-plus-2025-07-28', '{"input_price_per_1m": 0.26, "output_price_per_1m": 0.78}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen-plus-2025-07-28:thinking', 'qwen', 'Qwen', 'Qwen: Qwen Plus 0728 (thinking)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 32768, '["text"]',
          'Qwen Plus 0728, based on the Qwen3 foundation model, is a 1 million context hybrid reasoning model with a balanced performance, speed, and cost combination.', 'https://openrouter.ai/models/qwen/qwen-plus-2025-07-28:thinking', 'https://openrouter.ai/playground?model=qwen/qwen-plus-2025-07-28:thinking', '{"input_price_per_1m": 0.4, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nvidia-nemotron-nano-9b-v2:free', 'nvidia', 'Nvidia', 'NVIDIA: Nemotron Nano 9B V2 (free)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 128000, 16384, '["text"]',
          'NVIDIA-Nemotron-Nano-9B-v2 is a large language model (LLM) trained from scratch by NVIDIA, and designed as a unified model for both reasoning and non-reasoning tasks. It responds to user queries and...', 'https://openrouter.ai/models/nvidia/nemotron-nano-9b-v2:free', 'https://openrouter.ai/playground?model=nvidia/nemotron-nano-9b-v2:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'moonshotai-kimi-k2-0905', 'moonshotai', 'Moonshotai', 'MoonshotAI: Kimi K2 0905', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 100352, '["text"]',
          'Kimi K2 0905 is the September update of [Kimi K2 0711](moonshotai/kimi-k2). It is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32...', 'https://openrouter.ai/models/moonshotai/kimi-k2-0905', 'https://openrouter.ai/playground?model=moonshotai/kimi-k2-0905', '{"input_price_per_1m": 0.6, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-30b-a3b-thinking-2507', 'qwen', 'Qwen', 'Qwen: Qwen3 30B A3B Thinking 2507', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 81920, 32768, '["text"]',
          'Qwen3-30B-A3B-Thinking-2507 is a 30B parameter Mixture-of-Experts reasoning model optimized for complex tasks requiring extended multi-step thinking. The model is designed specifically for “thinking mode,” where internal reasoning traces are separated...', 'https://openrouter.ai/models/qwen/qwen3-30b-a3b-thinking-2507', 'https://openrouter.ai/playground?model=qwen/qwen3-30b-a3b-thinking-2507', '{"input_price_per_1m": 0.2, "output_price_per_1m": 2.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nousresearch-hermes-4-70b', 'nousresearch', 'Nousresearch', 'Nous: Hermes 4 70B', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'Hermes 4 70B is a hybrid reasoning model from Nous Research, built on Meta-Llama-3.1-70B. It introduces the same hybrid mode as the larger 405B release, allowing the model to either...', 'https://openrouter.ai/models/nousresearch/hermes-4-70b', 'https://openrouter.ai/playground?model=nousresearch/hermes-4-70b', '{"input_price_per_1m": 0.13, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nousresearch-hermes-4-405b', 'nousresearch', 'Nousresearch', 'Nous: Hermes 4 405B', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'Hermes 4 is a large-scale reasoning model built on Meta-Llama-3.1-405B and released by Nous Research. It introduces a hybrid reasoning mode, where the model can choose to deliberate internally with...', 'https://openrouter.ai/models/nousresearch/hermes-4-405b', 'https://openrouter.ai/playground?model=nousresearch/hermes-4-405b', '{"input_price_per_1m": 1.0, "output_price_per_1m": 3.0}', '{}', '{}',
          1, '', 0, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-chat-v3.1', 'deepseek', 'Deepseek', 'DeepSeek: DeepSeek V3.1', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 163840, 32768, '["text"]',
          'DeepSeek-V3.1 is a large hybrid reasoning model (671B parameters, 37B active) that supports both thinking and non-thinking modes via prompt templates. It extends the DeepSeek-V3 base with a two-phase long-context...', 'https://openrouter.ai/models/deepseek/deepseek-chat-v3.1', 'https://openrouter.ai/playground?model=deepseek/deepseek-chat-v3.1', '{"input_price_per_1m": 0.25, "output_price_per_1m": 0.95}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-medium-3.1', 'mistralai', 'Mistralai', 'Mistral: Mistral Medium 3.1', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text", "vision"]',
          'Mistral Medium 3.1 is an updated version of Mistral Medium 3, which is a high-performance enterprise-grade language model designed to deliver frontier-level capabilities at significantly reduced operational cost. It balances...', 'https://openrouter.ai/models/mistralai/mistral-medium-3.1', 'https://openrouter.ai/playground?model=mistralai/mistral-medium-3.1', '{"input_price_per_1m": 0.4, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-4.5v', 'z-ai', 'Z-ai', 'Z.ai: GLM 4.5V', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 65536, 16384, '["text", "vision"]',
          'GLM-4.5V is a vision-language foundation model for multimodal agent applications. Built on a Mixture-of-Experts (MoE) architecture with 106B parameters and 12B activated parameters, it achieves state-of-the-art results in video understanding,...', 'https://openrouter.ai/models/z-ai/glm-4.5v', 'https://openrouter.ai/playground?model=z-ai/glm-4.5v', '{"input_price_per_1m": 0.6, "output_price_per_1m": 1.8}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'ai21-jamba-large-1.7', 'ai21', 'Ai21', 'AI21: Jamba Large 1.7', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 256000, 4096, '["text"]',
          'Jamba Large 1.7 is the latest model in the Jamba open family, offering improvements in grounding, instruction-following, and overall efficiency. Built on a hybrid SSM-Transformer architecture with a 256K context...', 'https://openrouter.ai/models/ai21/jamba-large-1.7', 'https://openrouter.ai/playground?model=ai21/jamba-large-1.7', '{"input_price_per_1m": 2.0, "output_price_per_1m": 8.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5', 'openai', 'Openai', 'OpenAI: GPT-5', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5 is OpenAI’s most advanced model, offering major improvements in reasoning, code quality, and user experience. It is optimized for complex tasks that require step-by-step reasoning, instruction following, and accuracy...', 'https://openrouter.ai/models/openai/gpt-5', 'https://openrouter.ai/playground?model=openai/gpt-5', '{"input_price_per_1m": 1.25, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5:batch', 'openai', 'Openai', 'OpenAI: GPT-5 (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5 is OpenAI’s most advanced model, offering major improvements in reasoning, code quality, and user experience. It is optimized for complex tasks that require step-by-step reasoning, instruction following, and accuracy...', 'https://openrouter.ai/models/openai/gpt-5:batch', 'https://openrouter.ai/playground?model=openai/gpt-5:batch', '{"input_price_per_1m": 0.625, "output_price_per_1m": 5.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5-mini', 'openai', 'Openai', 'OpenAI: GPT-5 Mini', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5 Mini is a compact version of GPT-5, designed to handle lighter-weight reasoning tasks. It provides the same instruction-following and safety-tuning benefits as GPT-5, but with reduced latency and cost....', 'https://openrouter.ai/models/openai/gpt-5-mini', 'https://openrouter.ai/playground?model=openai/gpt-5-mini', '{"input_price_per_1m": 0.25, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5-mini:batch', 'openai', 'Openai', 'OpenAI: GPT-5 Mini (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5 Mini is a compact version of GPT-5, designed to handle lighter-weight reasoning tasks. It provides the same instruction-following and safety-tuning benefits as GPT-5, but with reduced latency and cost....', 'https://openrouter.ai/models/openai/gpt-5-mini:batch', 'https://openrouter.ai/playground?model=openai/gpt-5-mini:batch', '{"input_price_per_1m": 0.125, "output_price_per_1m": 1.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5-nano', 'openai', 'Openai', 'OpenAI: GPT-5 Nano', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5-Nano is the smallest and fastest variant in the GPT-5 system, optimized for developer tools, rapid interactions, and ultra-low latency environments. While limited in reasoning depth compared to its larger...', 'https://openrouter.ai/models/openai/gpt-5-nano', 'https://openrouter.ai/playground?model=openai/gpt-5-nano', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-5-nano:batch', 'openai', 'Openai', 'OpenAI: GPT-5 Nano (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 400000, 128000, '["text", "vision"]',
          'GPT-5-Nano is the smallest and fastest variant in the GPT-5 system, optimized for developer tools, rapid interactions, and ultra-low latency environments. While limited in reasoning depth compared to its larger...', 'https://openrouter.ai/models/openai/gpt-5-nano:batch', 'https://openrouter.ai/playground?model=openai/gpt-5-nano:batch', '{"input_price_per_1m": 0.025, "output_price_per_1m": 0.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-oss-120b', 'openai', 'Openai', 'OpenAI: gpt-oss-120b', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 131072, '["text"]',
          'gpt-oss-120b is an open-weight, 117B-parameter Mixture-of-Experts (MoE) language model from OpenAI designed for high-reasoning, agentic, and general-purpose production use cases. It activates 5.1B parameters per forward pass and is optimized...', 'https://openrouter.ai/models/openai/gpt-oss-120b', 'https://openrouter.ai/playground?model=openai/gpt-oss-120b', '{"input_price_per_1m": 0.037, "output_price_per_1m": 0.17}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-oss-20b', 'openai', 'Openai', 'OpenAI: gpt-oss-20b', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 131072, '["text"]',
          'gpt-oss-20b is an open-weight 21B parameter model released by OpenAI under the Apache 2.0 license. It uses a Mixture-of-Experts (MoE) architecture with 3.6B active parameters per forward pass, optimized for...', 'https://openrouter.ai/models/openai/gpt-oss-20b', 'https://openrouter.ai/playground?model=openai/gpt-oss-20b', '{"input_price_per_1m": 0.03, "output_price_per_1m": 0.13}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-oss-20b:free', 'openai', 'Openai', 'OpenAI: gpt-oss-20b (free)', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 32768, '["text"]',
          'gpt-oss-20b is an open-weight 21B parameter model released by OpenAI under the Apache 2.0 license. It uses a Mixture-of-Experts (MoE) architecture with 3.6B active parameters per forward pass, optimized for...', 'https://openrouter.ai/models/openai/gpt-oss-20b:free', 'https://openrouter.ai/playground?model=openai/gpt-oss-20b:free', '{"input_price_per_1m": 0.0, "output_price_per_1m": 0.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.1', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.1', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 200000, 32000, '["text", "vision"]',
          'Claude Opus 4.1 is an updated version of Anthropic’s flagship model, offering improved performance in coding, reasoning, and agentic tasks. It achieves 74.5% on SWE-bench Verified and shows notable gains...', 'https://openrouter.ai/models/anthropic/claude-opus-4.1', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.1', '{"input_price_per_1m": 15.0, "output_price_per_1m": 75.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4.1:batch', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4.1 (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 200000, 32000, '["text", "vision"]',
          'Claude Opus 4.1 is an updated version of Anthropic’s flagship model, offering improved performance in coding, reasoning, and agentic tasks. It achieves 74.5% on SWE-bench Verified and shows notable gains...', 'https://openrouter.ai/models/anthropic/claude-opus-4.1:batch', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4.1:batch', '{"input_price_per_1m": 7.5, "output_price_per_1m": 37.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-codestral-2508', 'mistralai', 'Mistralai', 'Mistral: Codestral 2508', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 256000, 16384, '["text"]',
          'Mistral''s cutting-edge language model for coding released end of July 2025. Codestral specializes in low-latency, high-frequency tasks such as fill-in-the-middle (FIM), code correction and test generation.

[Blog Post](https://mistral.ai/news/codestral-25-08)', 'https://openrouter.ai/models/mistralai/codestral-2508', 'https://openrouter.ai/playground?model=mistralai/codestral-2508', '{"input_price_per_1m": 0.3, "output_price_per_1m": 0.9}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-coder-30b-a3b-instruct', 'qwen', 'Qwen', 'Qwen: Qwen3 Coder 30B A3B Instruct', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 32768, '["text"]',
          'Qwen3-Coder-30B-A3B-Instruct is a 30.5B parameter Mixture-of-Experts (MoE) model with 128 experts (8 active per forward pass), designed for advanced code generation, repository-scale understanding, and agentic tool use. Built on the...', 'https://openrouter.ai/models/qwen/qwen3-coder-30b-a3b-instruct', 'https://openrouter.ai/playground?model=qwen/qwen3-coder-30b-a3b-instruct', '{"input_price_per_1m": 0.07, "output_price_per_1m": 0.27}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-30b-a3b-instruct-2507', 'qwen', 'Qwen', 'Qwen: Qwen3 30B A3B Instruct 2507', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 32000, '["text"]',
          'Qwen3-30B-A3B-Instruct-2507 is a 30.5B-parameter mixture-of-experts language model from Qwen, with 3.3B active parameters per inference. It operates in non-thinking mode and is designed for high-quality instruction following, multilingual understanding, and...', 'https://openrouter.ai/models/qwen/qwen3-30b-a3b-instruct-2507', 'https://openrouter.ai/playground?model=qwen/qwen3-30b-a3b-instruct-2507', '{"input_price_per_1m": 0.048, "output_price_per_1m": 0.193}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-4.5', 'z-ai', 'Z-ai', 'Z.ai: GLM 4.5', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 98304, '["text"]',
          'GLM-4.5 is our latest flagship foundation model, purpose-built for agent-based applications. It leverages a Mixture-of-Experts (MoE) architecture and supports a context length of up to 128k tokens. GLM-4.5 delivers significantly...', 'https://openrouter.ai/models/z-ai/glm-4.5', 'https://openrouter.ai/playground?model=z-ai/glm-4.5', '{"input_price_per_1m": 0.6, "output_price_per_1m": 2.2}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'z-ai-glm-4.5-air', 'z-ai', 'Z-ai', 'Z.ai: GLM 4.5 Air', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 98304, '["text"]',
          'GLM-4.5-Air is the lightweight variant of our latest flagship model family, also purpose-built for agent-centric applications. Like GLM-4.5, it adopts the Mixture-of-Experts (MoE) architecture but with a more compact parameter...', 'https://openrouter.ai/models/z-ai/glm-4.5-air', 'https://openrouter.ai/playground?model=z-ai/glm-4.5-air', '{"input_price_per_1m": 0.13, "output_price_per_1m": 0.85}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-235b-a22b-thinking-2507', 'qwen', 'Qwen', 'Qwen: Qwen3 235B A22B Thinking 2507', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 16384, '["text"]',
          'Qwen3-235B-A22B-Thinking-2507 is a high-performance, open-weight Mixture-of-Experts (MoE) language model optimized for complex reasoning tasks. It activates 22B of its 235B parameters per forward pass and natively supports up to 262,144...', 'https://openrouter.ai/models/qwen/qwen3-235b-a22b-thinking-2507', 'https://openrouter.ai/playground?model=qwen/qwen3-235b-a22b-thinking-2507', '{"input_price_per_1m": 0.23, "output_price_per_1m": 2.3}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-coder', 'qwen', 'Qwen', 'Qwen: Qwen3 Coder 480B A35B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 65536, '["text"]',
          'Qwen3-Coder-480B-A35B-Instruct is a Mixture-of-Experts (MoE) code generation model developed by the Qwen team. It is optimized for agentic coding tasks such as function calling, tool use, and long-context reasoning over...', 'https://openrouter.ai/models/qwen/qwen3-coder', 'https://openrouter.ai/playground?model=qwen/qwen3-coder', '{"input_price_per_1m": 0.3, "output_price_per_1m": 1.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'bytedance-ui-tars-1.5-7b', 'bytedance', 'Bytedance', 'ByteDance: UI-TARS 7B ', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 128000, 2048, '["text", "vision"]',
          'UI-TARS-1.5 is a multimodal vision-language agent optimized for GUI-based environments, including desktop interfaces, web browsers, mobile systems, and games. Built by ByteDance, it builds upon the UI-TARS framework with reinforcement...', 'https://openrouter.ai/models/bytedance/ui-tars-1.5-7b', 'https://openrouter.ai/playground?model=bytedance/ui-tars-1.5-7b', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-2.5-flash-lite', 'google', 'Google', 'Google: Gemini 2.5 Flash Lite', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65535, '["text", "vision"]',
          'Gemini 2.5 Flash-Lite is a lightweight reasoning model in the Gemini 2.5 family, optimized for ultra-low latency and cost efficiency. It offers improved throughput, faster token generation, and better performance...', 'https://openrouter.ai/models/google/gemini-2.5-flash-lite', 'https://openrouter.ai/playground?model=google/gemini-2.5-flash-lite', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-2.5-flash-lite:batch', 'google', 'Google', 'Google: Gemini 2.5 Flash Lite (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65535, '["text", "vision"]',
          'Gemini 2.5 Flash-Lite is a lightweight reasoning model in the Gemini 2.5 family, optimized for ultra-low latency and cost efficiency. It offers improved throughput, faster token generation, and better performance...', 'https://openrouter.ai/models/google/gemini-2.5-flash-lite:batch', 'https://openrouter.ai/playground?model=google/gemini-2.5-flash-lite:batch', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.2}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-235b-a22b-2507', 'qwen', 'Qwen', 'Qwen: Qwen3 235B A22B Instruct 2507', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 16384, '["text"]',
          'Qwen3-235B-A22B-Instruct-2507 is a multilingual, instruction-tuned mixture-of-experts language model based on the Qwen3-235B architecture, with 22B active parameters per forward pass. It is optimized for general-purpose text generation, including instruction following,...', 'https://openrouter.ai/models/qwen/qwen3-235b-a22b-2507', 'https://openrouter.ai/playground?model=qwen/qwen3-235b-a22b-2507', '{"input_price_per_1m": 0.09, "output_price_per_1m": 0.55}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'moonshotai-kimi-k2', 'moonshotai', 'Moonshotai', 'MoonshotAI: Kimi K2 0711', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 100352, '["text"]',
          'Kimi K2 Instruct is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32 billion active per forward pass. It is optimized for...', 'https://openrouter.ai/models/moonshotai/kimi-k2', 'https://openrouter.ai/playground?model=moonshotai/kimi-k2', '{"input_price_per_1m": 0.57, "output_price_per_1m": 2.3}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cognitivecomputations-dolphin-mistral-24b-venice-edition', 'cognitivecomputations', 'Cognitivecomputations', 'Venice: Uncensored', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 8192, '["text"]',
          'Venice Uncensored Dolphin Mistral 24B Venice Edition is a fine-tuned variant of Mistral-Small-24B-Instruct-2501, developed by dphn.ai in collaboration with Venice.ai. This model is designed as an “uncensored” instruct-tuned LLM, preserving...', 'https://openrouter.ai/models/cognitivecomputations/dolphin-mistral-24b-venice-edition', 'https://openrouter.ai/playground?model=cognitivecomputations/dolphin-mistral-24b-venice-edition', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.9}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'tencent-hunyuan-a13b-instruct', 'tencent', 'Tencent', 'Tencent: Hunyuan A13B Instruct', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 131072, '["text"]',
          'Hunyuan-A13B is a 13B active parameter Mixture-of-Experts (MoE) language model developed by Tencent, with a total parameter count of 80B and support for reasoning via Chain-of-Thought. It offers competitive benchmark...', 'https://openrouter.ai/models/tencent/hunyuan-a13b-instruct', 'https://openrouter.ai/playground?model=tencent/hunyuan-a13b-instruct', '{"input_price_per_1m": 0.14, "output_price_per_1m": 0.57}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'morph-morph-v3-large', 'morph', 'Morph', 'Morph: Morph V3 Large', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 262144, 131072, '["text"]',
          'Morph''s high-accuracy apply model for complex code edits. ~4,500 tokens/sec with 98% accuracy for precise code transformations. The model requires the prompt to be in the following format: <instruction>{instruction}</instruction> <code>{initial_code}</code>...', 'https://openrouter.ai/models/morph/morph-v3-large', 'https://openrouter.ai/playground?model=morph/morph-v3-large', '{"input_price_per_1m": 0.9, "output_price_per_1m": 1.9}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'morph-morph-v3-fast', 'morph', 'Morph', 'Morph: Morph V3 Fast', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 81920, 38000, '["text"]',
          'Morph''s fastest apply model for code edits. ~10,500 tokens/sec with 96% accuracy for rapid code transformations. The model requires the prompt to be in the following format: <instruction>{instruction}</instruction> <code>{initial_code}</code> <update>{edit_snippet}</update>...', 'https://openrouter.ai/models/morph/morph-v3-fast', 'https://openrouter.ai/playground?model=morph/morph-v3-fast', '{"input_price_per_1m": 0.8, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'baidu-ernie-4.5-vl-424b-a47b', 'baidu', 'Baidu', 'Baidu: ERNIE 4.5 VL 424B A47B ', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 123000, 16000, '["text", "vision"]',
          'ERNIE-4.5-VL-424B-A47B is a multimodal Mixture-of-Experts (MoE) model from Baidu’s ERNIE 4.5 series, featuring 424B total parameters with 47B active per token. It is trained jointly on text and image data...', 'https://openrouter.ai/models/baidu/ernie-4.5-vl-424b-a47b', 'https://openrouter.ai/playground?model=baidu/ernie-4.5-vl-424b-a47b', '{"input_price_per_1m": 0.42, "output_price_per_1m": 1.25}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-small-3.2-24b-instruct', 'mistralai', 'Mistralai', 'Mistral: Mistral Small 3.2 24B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 256000, 16384, '["text", "vision"]',
          'Mistral-Small-3.2-24B-Instruct-2506 is an updated 24B parameter model from Mistral optimized for instruction following, repetition reduction, and improved function calling. Compared to the 3.1 release, version 3.2 significantly improves accuracy on...', 'https://openrouter.ai/models/mistralai/mistral-small-3.2-24b-instruct', 'https://openrouter.ai/playground?model=mistralai/mistral-small-3.2-24b-instruct', '{"input_price_per_1m": 0.094, "output_price_per_1m": 0.25}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'minimax-minimax-m1', 'minimax', 'Minimax', 'MiniMax: MiniMax M1', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 40000, '["text"]',
          'MiniMax-M1 is a large-scale, open-weight reasoning model designed for extended context and high-efficiency inference. It leverages a hybrid Mixture-of-Experts (MoE) architecture paired with a custom "lightning attention" mechanism, allowing it...', 'https://openrouter.ai/models/minimax/minimax-m1', 'https://openrouter.ai/playground?model=minimax/minimax-m1', '{"input_price_per_1m": 0.55, "output_price_per_1m": 2.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-2.5-flash', 'google', 'Google', 'Google: Gemini 2.5 Flash', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65535, '["text", "vision"]',
          'Gemini 2.5 Flash is Google''s state-of-the-art workhorse model, specifically designed for advanced reasoning, coding, mathematics, and scientific tasks. It includes built-in "thinking" capabilities, enabling it to provide responses with greater...', 'https://openrouter.ai/models/google/gemini-2.5-flash', 'https://openrouter.ai/playground?model=google/gemini-2.5-flash', '{"input_price_per_1m": 0.3, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-2.5-flash:batch', 'google', 'Google', 'Google: Gemini 2.5 Flash (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65535, '["text", "vision"]',
          'Gemini 2.5 Flash is Google''s state-of-the-art workhorse model, specifically designed for advanced reasoning, coding, mathematics, and scientific tasks. It includes built-in "thinking" capabilities, enabling it to provide responses with greater...', 'https://openrouter.ai/models/google/gemini-2.5-flash:batch', 'https://openrouter.ai/playground?model=google/gemini-2.5-flash:batch', '{"input_price_per_1m": 0.15, "output_price_per_1m": 1.25}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-2.5-pro', 'google', 'Google', 'Google: Gemini 2.5 Pro', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs “thinking” capabilities, enabling it to reason through responses with enhanced accuracy...', 'https://openrouter.ai/models/google/gemini-2.5-pro', 'https://openrouter.ai/playground?model=google/gemini-2.5-pro', '{"input_price_per_1m": 1.25, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-2.5-pro:batch', 'google', 'Google', 'Google: Gemini 2.5 Pro (batch)', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs “thinking” capabilities, enabling it to reason through responses with enhanced accuracy...', 'https://openrouter.ai/models/google/gemini-2.5-pro:batch', 'https://openrouter.ai/playground?model=google/gemini-2.5-pro:batch', '{"input_price_per_1m": 0.625, "output_price_per_1m": 5.0}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o3-pro', 'openai', 'Openai', 'OpenAI: o3 Pro', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'The o-series of models are trained with reinforcement learning to think before they answer and perform complex reasoning. The o3-pro model uses more compute to think harder and provide consistently...', 'https://openrouter.ai/models/openai/o3-pro', 'https://openrouter.ai/playground?model=openai/o3-pro', '{"input_price_per_1m": 20.0, "output_price_per_1m": 80.0}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o3-pro:batch', 'openai', 'Openai', 'OpenAI: o3 Pro (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'The o-series of models are trained with reinforcement learning to think before they answer and perform complex reasoning. The o3-pro model uses more compute to think harder and provide consistently...', 'https://openrouter.ai/models/openai/o3-pro:batch', 'https://openrouter.ai/playground?model=openai/o3-pro:batch', '{"input_price_per_1m": 10.0, "output_price_per_1m": 40.0}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-2.5-pro-preview', 'google', 'Google', 'Google: Gemini 2.5 Pro Preview 06-05', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65536, '["text", "vision"]',
          'Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs “thinking” capabilities, enabling it to reason through responses with enhanced accuracy...', 'https://openrouter.ai/models/google/gemini-2.5-pro-preview', 'https://openrouter.ai/playground?model=google/gemini-2.5-pro-preview', '{"input_price_per_1m": 1.25, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-r1-0528', 'deepseek', 'Deepseek', 'DeepSeek: R1 0528', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 163840, 32768, '["text"]',
          'May 28th update to the [original DeepSeek R1](/deepseek/deepseek-r1) Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It''s 671B parameters in size, with 37B active...', 'https://openrouter.ai/models/deepseek/deepseek-r1-0528', 'https://openrouter.ai/playground?model=deepseek/deepseek-r1-0528', '{"input_price_per_1m": 0.5, "output_price_per_1m": 2.15}', '{}', '{}',
          1, '', 1, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-opus-4', 'anthropic', 'Anthropic', 'Anthropic: Claude Opus 4', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 200000, 32000, '["text", "vision"]',
          'Claude Opus 4 is benchmarked as the world’s best coding model, at time of release, bringing sustained performance on complex, long-running tasks and agent workflows. It sets new benchmarks in...', 'https://openrouter.ai/models/anthropic/claude-opus-4', 'https://openrouter.ai/playground?model=anthropic/claude-opus-4', '{"input_price_per_1m": 15.0, "output_price_per_1m": 75.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-sonnet-4', 'anthropic', 'Anthropic', 'Anthropic: Claude Sonnet 4', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000000, 64000, '["text", "vision"]',
          'Claude Sonnet 4 significantly enhances the capabilities of its predecessor, Sonnet 3.7, excelling in both coding and reasoning tasks with improved precision and controllability. Achieving state-of-the-art performance on SWE-bench (72.7%),...', 'https://openrouter.ai/models/anthropic/claude-sonnet-4', 'https://openrouter.ai/playground?model=anthropic/claude-sonnet-4', '{"input_price_per_1m": 3.0, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemma-3n-e4b-it', 'google', 'Google', 'Google: Gemma 3n 4B', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 32768, 16384, '["text"]',
          'Gemma 3n E4B-it is optimized for efficient execution on mobile and low-resource devices, such as phones, laptops, and tablets. It supports multimodal inputs—including text, visual data, and audio—enabling diverse tasks...', 'https://openrouter.ai/models/google/gemma-3n-e4b-it', 'https://openrouter.ai/playground?model=google/gemma-3n-e4b-it', '{"input_price_per_1m": 0.06, "output_price_per_1m": 0.12}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-medium-3', 'mistralai', 'Mistralai', 'Mistral: Mistral Medium 3', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text", "vision"]',
          'Mistral Medium 3 is a high-performance enterprise-grade language model designed to deliver frontier-level capabilities at significantly reduced operational cost. It balances state-of-the-art reasoning and multimodal performance with 8× lower cost...', 'https://openrouter.ai/models/mistralai/mistral-medium-3', 'https://openrouter.ai/playground?model=mistralai/mistral-medium-3', '{"input_price_per_1m": 0.4, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemini-2.5-pro-preview-05-06', 'google', 'Google', 'Google: Gemini 2.5 Pro Preview 05-06', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1048576, 65535, '["text", "vision"]',
          'Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs “thinking” capabilities, enabling it to reason through responses with enhanced accuracy...', 'https://openrouter.ai/models/google/gemini-2.5-pro-preview-05-06', 'https://openrouter.ai/playground?model=google/gemini-2.5-pro-preview-05-06', '{"input_price_per_1m": 1.25, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'arcee-ai-virtuoso-large', 'arcee-ai', 'Arcee-ai', 'Arcee AI: Virtuoso Large', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 64000, '["text"]',
          'Virtuoso‑Large is Arcee''s top‑tier general‑purpose LLM at 72 B parameters, tuned to tackle cross‑domain reasoning, creative writing and enterprise QA. Unlike many 70 B peers, it retains the 128 k...', 'https://openrouter.ai/models/arcee-ai/virtuoso-large', 'https://openrouter.ai/playground?model=arcee-ai/virtuoso-large', '{"input_price_per_1m": 0.75, "output_price_per_1m": 1.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meta-llama-llama-guard-4-12b', 'meta-llama', 'Meta-llama', 'Meta: Llama Guard 4 12B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1048576, 16384, '["text", "vision"]',
          'Llama Guard 4 is a Llama 4 Scout-derived multimodal pretrained model, fine-tuned for content safety classification. Similar to previous versions, it can be used to classify content in both LLM...', 'https://openrouter.ai/models/meta-llama/llama-guard-4-12b', 'https://openrouter.ai/playground?model=meta-llama/llama-guard-4-12b', '{"input_price_per_1m": 0.18, "output_price_per_1m": 0.18}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-30b-a3b', 'qwen', 'Qwen', 'Qwen: Qwen3 30B A3B', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'Qwen3, the latest generation in the Qwen large language model series, features both dense and mixture-of-experts (MoE) architectures to excel in reasoning, multilingual support, and advanced agent tasks. Its unique...', 'https://openrouter.ai/models/qwen/qwen3-30b-a3b', 'https://openrouter.ai/playground?model=qwen/qwen3-30b-a3b', '{"input_price_per_1m": 0.12, "output_price_per_1m": 0.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-8b', 'qwen', 'Qwen', 'Qwen: Qwen3 8B', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 8192, '["text"]',
          'Qwen3-8B is a dense 8.2B parameter causal language model from the Qwen3 series, designed for both reasoning-heavy tasks and efficient dialogue. It supports seamless switching between "thinking" mode for math,...', 'https://openrouter.ai/models/qwen/qwen3-8b', 'https://openrouter.ai/playground?model=qwen/qwen3-8b', '{"input_price_per_1m": 0.117, "output_price_per_1m": 0.455}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-14b', 'qwen', 'Qwen', 'Qwen: Qwen3 14B', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'Qwen3-14B is a dense 14.8B parameter causal language model from the Qwen3 series, designed for both complex reasoning and efficient dialogue. It supports seamless switching between a "thinking" mode for...', 'https://openrouter.ai/models/qwen/qwen3-14b', 'https://openrouter.ai/playground?model=qwen/qwen3-14b', '{"input_price_per_1m": 0.12, "output_price_per_1m": 0.24}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-32b', 'qwen', 'Qwen', 'Qwen: Qwen3 32B', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'Qwen3-32B is a dense 32.8B parameter causal language model from the Qwen3 series, optimized for both complex reasoning and efficient dialogue. It supports seamless switching between a "thinking" mode for...', 'https://openrouter.ai/models/qwen/qwen3-32b', 'https://openrouter.ai/playground?model=qwen/qwen3-32b', '{"input_price_per_1m": 0.08, "output_price_per_1m": 0.28}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen3-235b-a22b', 'qwen', 'Qwen', 'Qwen: Qwen3 235B A22B', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 8192, '["text"]',
          'Qwen3-235B-A22B is a 235B parameter mixture-of-experts (MoE) model developed by Qwen, activating 22B parameters per forward pass. It supports seamless switching between a "thinking" mode for complex reasoning, math, and...', 'https://openrouter.ai/models/qwen/qwen3-235b-a22b', 'https://openrouter.ai/playground?model=qwen/qwen3-235b-a22b', '{"input_price_per_1m": 0.455, "output_price_per_1m": 1.82}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o4-mini-high', 'openai', 'Openai', 'OpenAI: o4 Mini High', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'OpenAI o4-mini-high is the same model as [o4-mini](/openai/o4-mini) with reasoning_effort set to high. OpenAI o4-mini is a compact reasoning model in the o-series, optimized for fast, cost-efficient performance while retaining...', 'https://openrouter.ai/models/openai/o4-mini-high', 'https://openrouter.ai/playground?model=openai/o4-mini-high', '{"input_price_per_1m": 1.1, "output_price_per_1m": 4.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o4-mini-high:batch', 'openai', 'Openai', 'OpenAI: o4 Mini High (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'OpenAI o4-mini-high is the same model as [o4-mini](/openai/o4-mini) with reasoning_effort set to high. OpenAI o4-mini is a compact reasoning model in the o-series, optimized for fast, cost-efficient performance while retaining...', 'https://openrouter.ai/models/openai/o4-mini-high:batch', 'https://openrouter.ai/playground?model=openai/o4-mini-high:batch', '{"input_price_per_1m": 0.55, "output_price_per_1m": 2.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o3', 'openai', 'Openai', 'OpenAI: o3', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'o3 is a well-rounded and powerful model across domains. It sets a new standard for math, science, coding, and visual reasoning tasks. It also excels at technical writing and instruction-following....', 'https://openrouter.ai/models/openai/o3', 'https://openrouter.ai/playground?model=openai/o3', '{"input_price_per_1m": 2.0, "output_price_per_1m": 8.0}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o3:batch', 'openai', 'Openai', 'OpenAI: o3 (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'o3 is a well-rounded and powerful model across domains. It sets a new standard for math, science, coding, and visual reasoning tasks. It also excels at technical writing and instruction-following....', 'https://openrouter.ai/models/openai/o3:batch', 'https://openrouter.ai/playground?model=openai/o3:batch', '{"input_price_per_1m": 1.0, "output_price_per_1m": 4.0}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o4-mini', 'openai', 'Openai', 'OpenAI: o4 Mini', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'OpenAI o4-mini is a compact reasoning model in the o-series, optimized for fast, cost-efficient performance while retaining strong multimodal and agentic capabilities. It supports tool use and demonstrates competitive reasoning...', 'https://openrouter.ai/models/openai/o4-mini', 'https://openrouter.ai/playground?model=openai/o4-mini', '{"input_price_per_1m": 1.1, "output_price_per_1m": 4.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o4-mini:batch', 'openai', 'Openai', 'OpenAI: o4 Mini (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'OpenAI o4-mini is a compact reasoning model in the o-series, optimized for fast, cost-efficient performance while retaining strong multimodal and agentic capabilities. It supports tool use and demonstrates competitive reasoning...', 'https://openrouter.ai/models/openai/o4-mini:batch', 'https://openrouter.ai/playground?model=openai/o4-mini:batch', '{"input_price_per_1m": 0.55, "output_price_per_1m": 2.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4.1', 'openai', 'Openai', 'OpenAI: GPT-4.1', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1047576, 32768, '["text", "vision"]',
          'GPT-4.1 is a flagship large language model optimized for advanced instruction following, real-world software engineering, and long-context reasoning. It supports a 1 million token context window and outperforms GPT-4o and...', 'https://openrouter.ai/models/openai/gpt-4.1', 'https://openrouter.ai/playground?model=openai/gpt-4.1', '{"input_price_per_1m": 2.0, "output_price_per_1m": 8.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4.1:batch', 'openai', 'Openai', 'OpenAI: GPT-4.1 (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1047576, 32768, '["text", "vision"]',
          'GPT-4.1 is a flagship large language model optimized for advanced instruction following, real-world software engineering, and long-context reasoning. It supports a 1 million token context window and outperforms GPT-4o and...', 'https://openrouter.ai/models/openai/gpt-4.1:batch', 'https://openrouter.ai/playground?model=openai/gpt-4.1:batch', '{"input_price_per_1m": 1.0, "output_price_per_1m": 4.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4.1-mini', 'openai', 'Openai', 'OpenAI: GPT-4.1 Mini', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1047576, 32768, '["text", "vision"]',
          'GPT-4.1 Mini is a mid-sized model delivering performance competitive with GPT-4o at substantially lower latency and cost. It retains a 1 million token context window and scores 45.1% on hard...', 'https://openrouter.ai/models/openai/gpt-4.1-mini', 'https://openrouter.ai/playground?model=openai/gpt-4.1-mini', '{"input_price_per_1m": 0.4, "output_price_per_1m": 1.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4.1-mini:batch', 'openai', 'Openai', 'OpenAI: GPT-4.1 Mini (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1047576, 32768, '["text", "vision"]',
          'GPT-4.1 Mini is a mid-sized model delivering performance competitive with GPT-4o at substantially lower latency and cost. It retains a 1 million token context window and scores 45.1% on hard...', 'https://openrouter.ai/models/openai/gpt-4.1-mini:batch', 'https://openrouter.ai/playground?model=openai/gpt-4.1-mini:batch', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.8}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4.1-nano', 'openai', 'Openai', 'OpenAI: GPT-4.1 Nano', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1047576, 32768, '["text", "vision"]',
          'For tasks that demand low latency, GPT‑4.1 nano is the fastest and cheapest model in the GPT-4.1 series. It delivers exceptional performance at a small size with its 1 million...', 'https://openrouter.ai/models/openai/gpt-4.1-nano', 'https://openrouter.ai/playground?model=openai/gpt-4.1-nano', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4.1-nano:batch', 'openai', 'Openai', 'OpenAI: GPT-4.1 Nano (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1047576, 32768, '["text", "vision"]',
          'For tasks that demand low latency, GPT‑4.1 nano is the fastest and cheapest model in the GPT-4.1 series. It delivers exceptional performance at a small size with its 1 million...', 'https://openrouter.ai/models/openai/gpt-4.1-nano:batch', 'https://openrouter.ai/playground?model=openai/gpt-4.1-nano:batch', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meta-llama-llama-4-maverick', 'meta-llama', 'Meta-llama', 'Meta: Llama 4 Maverick', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1048576, 16384, '["text", "vision"]',
          'Llama 4 Maverick 17B Instruct (128E) is a high-capacity multimodal language model from Meta, built on a mixture-of-experts (MoE) architecture with 128 experts and 17 billion active parameters per forward...', 'https://openrouter.ai/models/meta-llama/llama-4-maverick', 'https://openrouter.ai/playground?model=meta-llama/llama-4-maverick', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.696}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meta-llama-llama-4-scout', 'meta-llama', 'Meta-llama', 'Meta: Llama 4 Scout', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1310720, 16384, '["text", "vision"]',
          'Llama 4 Scout 17B Instruct (16E) is a mixture-of-experts (MoE) language model developed by Meta, activating 17 billion parameters out of a total of 109B. It supports native multimodal input...', 'https://openrouter.ai/models/meta-llama/llama-4-scout', 'https://openrouter.ai/playground?model=meta-llama/llama-4-scout', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.3}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-chat-v3-0324', 'deepseek', 'Deepseek', 'DeepSeek: DeepSeek V3 0324', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 163840, 65536, '["text"]',
          'DeepSeek V3, a 685B-parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team. It succeeds the [DeepSeek V3](/deepseek/deepseek-chat-v3) model and performs really well...', 'https://openrouter.ai/models/deepseek/deepseek-chat-v3-0324', 'https://openrouter.ai/playground?model=deepseek/deepseek-chat-v3-0324', '{"input_price_per_1m": 0.27, "output_price_per_1m": 1.12}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o1-pro', 'openai', 'Openai', 'OpenAI: o1-pro', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'The o1 series of models are trained with reinforcement learning to think before they answer and perform complex reasoning. The o1-pro model uses more compute to think harder and provide...', 'https://openrouter.ai/models/openai/o1-pro', 'https://openrouter.ai/playground?model=openai/o1-pro', '{"input_price_per_1m": 150.0, "output_price_per_1m": 600.0}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o1-pro:batch', 'openai', 'Openai', 'OpenAI: o1-pro (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'The o1 series of models are trained with reinforcement learning to think before they answer and perform complex reasoning. The o1-pro model uses more compute to think harder and provide...', 'https://openrouter.ai/models/openai/o1-pro:batch', 'https://openrouter.ai/playground?model=openai/o1-pro:batch', '{"input_price_per_1m": 75.0, "output_price_per_1m": 300.0}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-small-3.1-24b-instruct', 'mistralai', 'Mistralai', 'Mistral: Mistral Small 3.1 24B', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 128000, '["text", "vision"]',
          'Mistral Small 3.1 24B Instruct is an upgraded variant of Mistral Small 3 (2501), featuring 24 billion parameters with advanced multimodal capabilities. It provides state-of-the-art performance in text-based reasoning and...', 'https://openrouter.ai/models/mistralai/mistral-small-3.1-24b-instruct', 'https://openrouter.ai/playground?model=mistralai/mistral-small-3.1-24b-instruct', '{"input_price_per_1m": 0.351, "output_price_per_1m": 0.555}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemma-3-4b-it', 'google', 'Google', 'Google: Gemma 3 4B', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text", "vision"]',
          'Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities,...', 'https://openrouter.ai/models/google/gemma-3-4b-it', 'https://openrouter.ai/playground?model=google/gemma-3-4b-it', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.1}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemma-3-12b-it', 'google', 'Google', 'Google: Gemma 3 12B', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text", "vision"]',
          'Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities,...', 'https://openrouter.ai/models/google/gemma-3-12b-it', 'https://openrouter.ai/playground?model=google/gemma-3-12b-it', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.15}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'rekaai-reka-flash-3', 'rekaai', 'Rekaai', 'Reka Flash 3', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 65536, 65536, '["text"]',
          'Reka Flash 3 is a general-purpose, instruction-tuned large language model with 21 billion parameters, developed by Reka. It excels at general chat, coding tasks, instruction-following, and function calling. Featuring a...', 'https://openrouter.ai/models/rekaai/reka-flash-3', 'https://openrouter.ai/playground?model=rekaai/reka-flash-3', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemma-3-27b-it', 'google', 'Google', 'Google: Gemma 3 27B', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 262144, 131072, '["text", "vision"]',
          'Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities,...', 'https://openrouter.ai/models/google/gemma-3-27b-it', 'https://openrouter.ai/playground?model=google/gemma-3-27b-it', '{"input_price_per_1m": 0.08, "output_price_per_1m": 0.45}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'thedrummer-skyfall-36b-v2', 'thedrummer', 'Thedrummer', 'TheDrummer: Skyfall 36B V2', 'Small', 0, 'Proprietary',
          0, 'Dense/MoE', 32768, 32768, '["text"]',
          'Skyfall 36B v2 is an enhanced iteration of Mistral Small 2501, specifically fine-tuned for improved creativity, nuanced writing, role-playing, and coherent storytelling.', 'https://openrouter.ai/models/thedrummer/skyfall-36b-v2', 'https://openrouter.ai/playground?model=thedrummer/skyfall-36b-v2', '{"input_price_per_1m": 0.55, "output_price_per_1m": 0.8}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-saba', 'mistralai', 'Mistralai', 'Mistral: Saba', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 32768, 16384, '["text"]',
          'Mistral Saba is a 24B-parameter language model specifically designed for the Middle East and South Asia, delivering accurate and contextually relevant responses while maintaining efficient performance. Trained on curated regional...', 'https://openrouter.ai/models/mistralai/mistral-saba', 'https://openrouter.ai/playground?model=mistralai/mistral-saba', '{"input_price_per_1m": 0.2, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o3-mini-high', 'openai', 'Openai', 'OpenAI: o3 Mini High', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text"]',
          'OpenAI o3-mini-high is the same model as [o3-mini](/openai/o3-mini) with reasoning_effort set to high. o3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and...', 'https://openrouter.ai/models/openai/o3-mini-high', 'https://openrouter.ai/playground?model=openai/o3-mini-high', '{"input_price_per_1m": 1.1, "output_price_per_1m": 4.4}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o3-mini-high:batch', 'openai', 'Openai', 'OpenAI: o3 Mini High (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text"]',
          'OpenAI o3-mini-high is the same model as [o3-mini](/openai/o3-mini) with reasoning_effort set to high. o3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and...', 'https://openrouter.ai/models/openai/o3-mini-high:batch', 'https://openrouter.ai/playground?model=openai/o3-mini-high:batch', '{"input_price_per_1m": 0.55, "output_price_per_1m": 2.2}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'aion-labs-aion-rp-llama-3.1-8b', 'aion-labs', 'Aion-labs', 'AionLabs: Aion-RP 1.0 (8B)', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 32768, 32768, '["text"]',
          'Aion-RP-Llama-3.1-8B ranks the highest in the character evaluation portion of the RPBench-Auto benchmark, a roleplaying-specific variant of Arena-Hard-Auto, where LLMs evaluate each other’s responses. It is a fine-tuned base model...', 'https://openrouter.ai/models/aion-labs/aion-rp-llama-3.1-8b', 'https://openrouter.ai/playground?model=aion-labs/aion-rp-llama-3.1-8b', '{"input_price_per_1m": 0.8, "output_price_per_1m": 1.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen2.5-vl-72b-instruct', 'qwen', 'Qwen', 'Qwen: Qwen2.5 VL 72B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text", "vision"]',
          'Qwen2.5-VL is proficient in recognizing common objects such as flowers, birds, fish, and insects. It is also highly capable of analyzing texts, charts, icons, graphics, and layouts within images.', 'https://openrouter.ai/models/qwen/qwen2.5-vl-72b-instruct', 'https://openrouter.ai/playground?model=qwen/qwen2.5-vl-72b-instruct', '{"input_price_per_1m": 0.25, "output_price_per_1m": 0.75}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen-plus', 'qwen', 'Qwen', 'Qwen: Qwen-Plus', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 1000000, 32768, '["text"]',
          'Qwen-Plus, based on the Qwen2.5 foundation model, is a 131K context model with a balanced performance, speed, and cost combination.', 'https://openrouter.ai/models/qwen/qwen-plus', 'https://openrouter.ai/playground?model=qwen/qwen-plus', '{"input_price_per_1m": 0.26, "output_price_per_1m": 0.78}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o3-mini', 'openai', 'Openai', 'OpenAI: o3 Mini', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text"]',
          'OpenAI o3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and coding. This model supports the `reasoning_effort` parameter, which can be set to...', 'https://openrouter.ai/models/openai/o3-mini', 'https://openrouter.ai/playground?model=openai/o3-mini', '{"input_price_per_1m": 1.1, "output_price_per_1m": 4.4}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o3-mini:batch', 'openai', 'Openai', 'OpenAI: o3 Mini (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text"]',
          'OpenAI o3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and coding. This model supports the `reasoning_effort` parameter, which can be set to...', 'https://openrouter.ai/models/openai/o3-mini:batch', 'https://openrouter.ai/playground?model=openai/o3-mini:batch', '{"input_price_per_1m": 0.55, "output_price_per_1m": 2.2}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-small-24b-instruct-2501', 'mistralai', 'Mistralai', 'Mistral: Mistral Small 3', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 32768, 16384, '["text"]',
          'Mistral Small 3 is a 24B-parameter language model optimized for low-latency performance across common AI tasks. Released under the Apache 2.0 license, it features both pre-trained and instruction-tuned versions designed...', 'https://openrouter.ai/models/mistralai/mistral-small-24b-instruct-2501', 'https://openrouter.ai/playground?model=mistralai/mistral-small-24b-instruct-2501', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.08}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-r1-distill-llama-70b', 'deepseek', 'Deepseek', 'DeepSeek: R1 Distill Llama 70B', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 8192, 8192, '["text"]',
          'DeepSeek R1 Distill Llama 70B is a distilled large language model based on [Llama-3.3-70B-Instruct](/meta-llama/llama-3.3-70b-instruct), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). The model combines advanced distillation techniques to achieve high performance across...', 'https://openrouter.ai/models/deepseek/deepseek-r1-distill-llama-70b', 'https://openrouter.ai/playground?model=deepseek/deepseek-r1-distill-llama-70b', '{"input_price_per_1m": 0.8, "output_price_per_1m": 0.8}', '{}', '{}',
          1, '', 1, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-r1', 'deepseek', 'Deepseek', 'DeepSeek: R1', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 163840, 16000, '["text"]',
          'DeepSeek R1 is here: Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It''s 671B parameters in size, with 37B active in an inference pass....', 'https://openrouter.ai/models/deepseek/deepseek-r1', 'https://openrouter.ai/playground?model=deepseek/deepseek-r1', '{"input_price_per_1m": 0.7, "output_price_per_1m": 2.5}', '{}', '{}',
          1, '', 1, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'minimax-minimax-01', 'minimax', 'Minimax', 'MiniMax: MiniMax-01', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1000192, 1000192, '["text", "vision"]',
          'MiniMax-01 is a combines MiniMax-Text-01 for text generation and MiniMax-VL-01 for image understanding. It has 456 billion parameters, with 45.9 billion parameters activated per inference, and can handle a context...', 'https://openrouter.ai/models/minimax/minimax-01', 'https://openrouter.ai/playground?model=minimax/minimax-01', '{"input_price_per_1m": 0.2, "output_price_per_1m": 1.1}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'microsoft-phi-4', 'microsoft', 'Microsoft', 'Microsoft: Phi 4', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 16384, 16384, '["text"]',
          '[Microsoft Research](/microsoft) Phi-4 is designed to perform well in complex reasoning tasks and can operate efficiently in situations with limited memory or where quick responses are needed. At 14 billion...', 'https://openrouter.ai/models/microsoft/phi-4', 'https://openrouter.ai/playground?model=microsoft/phi-4', '{"input_price_per_1m": 0.07, "output_price_per_1m": 0.14}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'deepseek-deepseek-chat', 'deepseek', 'Deepseek', 'DeepSeek: DeepSeek V3', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 163840, 16000, '["text"]',
          'DeepSeek-V3 is the latest model from the DeepSeek team, building upon the instruction following and coding abilities of the previous versions. Pre-trained on nearly 15 trillion tokens, the reported evaluations...', 'https://openrouter.ai/models/deepseek/deepseek-chat', 'https://openrouter.ai/playground?model=deepseek/deepseek-chat', '{"input_price_per_1m": 0.257, "output_price_per_1m": 1.029}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'sao10k-l3.3-euryale-70b', 'sao10k', 'Sao10k', 'Sao10K: Llama 3.3 Euryale 70B', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'Euryale L3.3 70B is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). It is the successor of [Euryale L3 70B v2.2](/models/sao10k/l3-euryale-70b).', 'https://openrouter.ai/models/sao10k/l3.3-euryale-70b', 'https://openrouter.ai/playground?model=sao10k/l3.3-euryale-70b', '{"input_price_per_1m": 0.65, "output_price_per_1m": 0.75}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o1', 'openai', 'Openai', 'OpenAI: o1', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'The latest and strongest model family from OpenAI, o1 is designed to spend more time thinking before responding. The o1 model series is trained with large-scale reinforcement learning to reason...', 'https://openrouter.ai/models/openai/o1', 'https://openrouter.ai/playground?model=openai/o1', '{"input_price_per_1m": 15.0, "output_price_per_1m": 60.0}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-o1:batch', 'openai', 'Openai', 'OpenAI: o1 (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 200000, 100000, '["text", "vision"]',
          'The latest and strongest model family from OpenAI, o1 is designed to spend more time thinking before responding. The o1 model series is trained with large-scale reinforcement learning to reason...', 'https://openrouter.ai/models/openai/o1:batch', 'https://openrouter.ai/playground?model=openai/o1:batch', '{"input_price_per_1m": 7.5, "output_price_per_1m": 30.0}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-command-r7b-12-2024', 'cohere', 'Cohere', 'Cohere: Command R7B (12-2024)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 128000, 4000, '["text"]',
          'Command R7B (12-2024) is a small, fast update of the Command R+ model, delivered in December 2024. It excels at RAG, tool use, agents, and similar tasks requiring complex reasoning...', 'https://openrouter.ai/models/cohere/command-r7b-12-2024', 'https://openrouter.ai/playground?model=cohere/command-r7b-12-2024', '{"input_price_per_1m": 0.037, "output_price_per_1m": 0.15}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meta-llama-llama-3.3-70b-instruct', 'meta-llama', 'Meta-llama', 'Meta: Llama 3.3 70B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text out). The Llama 3.3 instruction tuned text only model...', 'https://openrouter.ai/models/meta-llama/llama-3.3-70b-instruct', 'https://openrouter.ai/playground?model=meta-llama/llama-3.3-70b-instruct', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.32}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-nova-lite-v1', 'amazon', 'Amazon', 'Amazon: Nova Lite 1.0', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 300000, 5120, '["text", "vision"]',
          'Amazon Nova Lite 1.0 is a very low-cost multimodal model from Amazon that focused on fast processing of image, video, and text inputs to generate text output. Amazon Nova Lite...', 'https://openrouter.ai/models/amazon/nova-lite-v1', 'https://openrouter.ai/playground?model=amazon/nova-lite-v1', '{"input_price_per_1m": 0.06, "output_price_per_1m": 0.24}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-nova-micro-v1', 'amazon', 'Amazon', 'Amazon: Nova Micro 1.0', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 128000, 5120, '["text"]',
          'Amazon Nova Micro 1.0 is a text-only model that delivers the lowest latency responses in the Amazon Nova family of models at a very low cost. With a context length...', 'https://openrouter.ai/models/amazon/nova-micro-v1', 'https://openrouter.ai/playground?model=amazon/nova-micro-v1', '{"input_price_per_1m": 0.035, "output_price_per_1m": 0.14}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'amazon-nova-pro-v1', 'amazon', 'Amazon', 'Amazon: Nova Pro 1.0', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 300000, 5120, '["text", "vision"]',
          'Amazon Nova Pro 1.0 is a capable multimodal model from Amazon focused on providing a combination of accuracy, speed, and cost for a wide range of tasks. As of December...', 'https://openrouter.ai/models/amazon/nova-pro-v1', 'https://openrouter.ai/playground?model=amazon/nova-pro-v1', '{"input_price_per_1m": 0.8, "output_price_per_1m": 3.2}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4o-2024-11-20', 'openai', 'Openai', 'OpenAI: GPT-4o (2024-11-20)', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text", "vision"]',
          'The 2024-11-20 version of GPT-4o offers a leveled-up creative writing ability with more natural, engaging, and tailored writing to improve relevance & readability. It’s also better at working with uploaded...', 'https://openrouter.ai/models/openai/gpt-4o-2024-11-20', 'https://openrouter.ai/playground?model=openai/gpt-4o-2024-11-20', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-large-2407', 'mistralai', 'Mistralai', 'Mistral Large 2407', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'This is Mistral AI''s flagship model, Mistral Large 2 (version mistral-large-2407). It''s a proprietary weights-available model and excels at reasoning, code, JSON, chat, and more. Read the launch announcement [here](https://mistral.ai/news/mistral-large-2407/)....', 'https://openrouter.ai/models/mistralai/mistral-large-2407', 'https://openrouter.ai/playground?model=mistralai/mistral-large-2407', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen-2.5-coder-32b-instruct', 'qwen', 'Qwen', 'Qwen2.5 Coder 32B Instruct', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 32768, 32768, '["text"]',
          'Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models (formerly known as CodeQwen). Qwen2.5-Coder brings the following improvements upon CodeQwen1.5: - Significantly improvements in **code generation**, **code reasoning**...', 'https://openrouter.ai/models/qwen/qwen-2.5-coder-32b-instruct', 'https://openrouter.ai/playground?model=qwen/qwen-2.5-coder-32b-instruct', '{"input_price_per_1m": 0.66, "output_price_per_1m": 1.0}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'thedrummer-unslopnemo-12b', 'thedrummer', 'Thedrummer', 'TheDrummer: UnslopNemo 12B', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 1024000, 1024000, '["text"]',
          'UnslopNemo v4.1 is the latest addition from the creator of Rocinante, designed for adventure writing and role-play scenarios.', 'https://openrouter.ai/models/thedrummer/unslopnemo-12b', 'https://openrouter.ai/playground?model=thedrummer/unslopnemo-12b', '{"input_price_per_1m": 0.4, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthracite-org-magnum-v4-72b', 'anthracite-org', 'Anthracite-org', 'Magnum v4 72B', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 16384, 2048, '["text"]',
          'This is a series of models designed to replicate the prose quality of the Claude 3 models, specifically Sonnet(https://openrouter.ai/anthropic/claude-3.5-sonnet) and Opus(https://openrouter.ai/anthropic/claude-3-opus).

The model is fine-tuned on top of [Qwen2.5 72B](https://openrouter.ai/qwen/qwen-2.5-72b-instruct).', 'https://openrouter.ai/models/anthracite-org/magnum-v4-72b', 'https://openrouter.ai/playground?model=anthracite-org/magnum-v4-72b', '{"input_price_per_1m": 3.0, "output_price_per_1m": 5.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen-2.5-7b-instruct', 'qwen', 'Qwen', 'Qwen: Qwen2.5 7B Instruct', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 32768, 32768, '["text"]',
          'Qwen2.5 7B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2: - Significantly more knowledge and has greatly improved capabilities in coding and...', 'https://openrouter.ai/models/qwen/qwen-2.5-7b-instruct', 'https://openrouter.ai/playground?model=qwen/qwen-2.5-7b-instruct', '{"input_price_per_1m": 0.1, "output_price_per_1m": 0.2}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'thedrummer-rocinante-12b', 'thedrummer', 'Thedrummer', 'TheDrummer: Rocinante 12B', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 65536, 65536, '["text"]',
          'Rocinante 12B is designed for engaging storytelling and rich prose. Early testers have reported: - Expanded vocabulary with unique and expressive word choices - Enhanced creativity for vivid narratives -...', 'https://openrouter.ai/models/thedrummer/rocinante-12b', 'https://openrouter.ai/playground?model=thedrummer/rocinante-12b', '{"input_price_per_1m": 0.25, "output_price_per_1m": 0.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meta-llama-llama-3.2-1b-instruct', 'meta-llama', 'Meta-llama', 'Meta: Llama 3.2 1B Instruct', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 60000, 60000, '["text"]',
          'Llama 3.2 1B is a 1-billion-parameter language model focused on efficiently performing natural language tasks, such as summarization, dialogue, and multilingual text analysis. Its smaller size allows it to operate...', 'https://openrouter.ai/models/meta-llama/llama-3.2-1b-instruct', 'https://openrouter.ai/playground?model=meta-llama/llama-3.2-1b-instruct', '{"input_price_per_1m": 0.027, "output_price_per_1m": 0.201}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meta-llama-llama-3.2-3b-instruct', 'meta-llama', 'Meta-llama', 'Meta: Llama 3.2 3B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 131072, '["text"]',
          'Llama 3.2 3B is a 3-billion-parameter multilingual large language model, optimized for advanced natural language processing tasks like dialogue generation, reasoning, and summarization. Designed with the latest transformer architecture, it...', 'https://openrouter.ai/models/meta-llama/llama-3.2-3b-instruct', 'https://openrouter.ai/playground?model=meta-llama/llama-3.2-3b-instruct', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.33}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'qwen-qwen-2.5-72b-instruct', 'qwen', 'Qwen', 'Qwen2.5 72B Instruct', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 32768, 16384, '["text"]',
          'Qwen2.5 72B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2: - Significantly more knowledge and has greatly improved capabilities in coding and...', 'https://openrouter.ai/models/qwen/qwen-2.5-72b-instruct', 'https://openrouter.ai/playground?model=qwen/qwen-2.5-72b-instruct', '{"input_price_per_1m": 0.36, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          1, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-command-r-08-2024', 'cohere', 'Cohere', 'Cohere: Command R (08-2024)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 128000, 4000, '["text"]',
          'command-r-08-2024 is an update of the [Command R](/models/cohere/command-r) with improved performance for multilingual retrieval-augmented generation (RAG) and tool use. More broadly, it is better at math, code and reasoning and...', 'https://openrouter.ai/models/cohere/command-r-08-2024', 'https://openrouter.ai/playground?model=cohere/command-r-08-2024', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'cohere-command-r-plus-08-2024', 'cohere', 'Cohere', 'Cohere: Command R+ (08-2024)', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 128000, 4000, '["text"]',
          'command-r-plus-08-2024 is an update of the [Command R+](/models/cohere/command-r-plus) with roughly 50% higher throughput and 25% lower latencies as compared to the previous Command R+ version, while keeping the hardware footprint...', 'https://openrouter.ai/models/cohere/command-r-plus-08-2024', 'https://openrouter.ai/playground?model=cohere/command-r-plus-08-2024', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'sao10k-l3.1-euryale-70b', 'sao10k', 'Sao10k', 'Sao10K: Llama 3.1 Euryale 70B v2.2', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'Euryale L3.1 70B v2.2 is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). It is the successor of [Euryale L3 70B v2.1](/models/sao10k/l3-euryale-70b).', 'https://openrouter.ai/models/sao10k/l3.1-euryale-70b', 'https://openrouter.ai/playground?model=sao10k/l3.1-euryale-70b', '{"input_price_per_1m": 0.85, "output_price_per_1m": 0.85}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nousresearch-hermes-3-llama-3.1-70b', 'nousresearch', 'Nousresearch', 'Nous: Hermes 3 70B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'Hermes 3 is a generalist language model with many improvements over [Hermes 2](/models/nousresearch/nous-hermes-2-mistral-7b-dpo), including advanced agentic capabilities, much better roleplaying, reasoning, multi-turn conversation, long context coherence, and improvements across the...', 'https://openrouter.ai/models/nousresearch/hermes-3-llama-3.1-70b', 'https://openrouter.ai/playground?model=nousresearch/hermes-3-llama-3.1-70b', '{"input_price_per_1m": 0.7, "output_price_per_1m": 0.7}', '{}', '{}',
          1, '', 0, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'nousresearch-hermes-3-llama-3.1-405b', 'nousresearch', 'Nousresearch', 'Nous: Hermes 3 405B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'Hermes 3 is a generalist language model with many improvements over Hermes 2, including advanced agentic capabilities, much better roleplaying, reasoning, multi-turn conversation, long context coherence, and improvements across the...', 'https://openrouter.ai/models/nousresearch/hermes-3-llama-3.1-405b', 'https://openrouter.ai/playground?model=nousresearch/hermes-3-llama-3.1-405b', '{"input_price_per_1m": 1.0, "output_price_per_1m": 1.0}', '{}', '{}',
          1, '', 0, 1, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'sao10k-l3-lunaris-8b', 'sao10k', 'Sao10k', 'Sao10K: Llama 3 8B Lunaris', 'Micro', 0, 'Proprietary',
          0, 'Dense/MoE', 8192, 16384, '["text"]',
          'Lunaris 8B is a versatile generalist and roleplaying model based on Llama 3. It''s a strategic merge of multiple models, designed to balance creativity with improved logic and general knowledge....', 'https://openrouter.ai/models/sao10k/l3-lunaris-8b', 'https://openrouter.ai/playground?model=sao10k/l3-lunaris-8b', '{"input_price_per_1m": 0.04, "output_price_per_1m": 0.05}', '{}', '{}',
          1, '', 1, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4o-2024-08-06', 'openai', 'Openai', 'OpenAI: GPT-4o (2024-08-06)', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text", "vision"]',
          'The 2024-08-06 version of GPT-4o offers improved performance in structured outputs, with the ability to supply a JSON schema in the respone_format. Read more [here](https://openai.com/index/introducing-structured-outputs-in-the-api/). GPT-4o ("o" for "omni") is...', 'https://openrouter.ai/models/openai/gpt-4o-2024-08-06', 'https://openrouter.ai/playground?model=openai/gpt-4o-2024-08-06', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meta-llama-llama-3.1-70b-instruct', 'meta-llama', 'Meta-llama', 'Meta: Llama 3.1 70B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'Meta''s latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 70B instruct-tuned version is optimized for high quality dialogue usecases. It has demonstrated strong...', 'https://openrouter.ai/models/meta-llama/llama-3.1-70b-instruct', 'https://openrouter.ai/playground?model=meta-llama/llama-3.1-70b-instruct', '{"input_price_per_1m": 0.4, "output_price_per_1m": 0.4}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'meta-llama-llama-3.1-8b-instruct', 'meta-llama', 'Meta-llama', 'Meta: Llama 3.1 8B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 131072, '["text"]',
          'Meta''s latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 8B instruct-tuned version is fast and efficient. It has demonstrated strong performance compared to...', 'https://openrouter.ai/models/meta-llama/llama-3.1-8b-instruct', 'https://openrouter.ai/playground?model=meta-llama/llama-3.1-8b-instruct', '{"input_price_per_1m": 0.05, "output_price_per_1m": 0.08}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-nemo', 'mistralai', 'Mistralai', 'Mistral: Mistral Nemo', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 131072, 16384, '["text"]',
          'A 12B parameter model with a 128k token context length built by Mistral in collaboration with NVIDIA. The model is multilingual, supporting English, French, German, Spanish, Italian, Portuguese, Chinese, Japanese,...', 'https://openrouter.ai/models/mistralai/mistral-nemo', 'https://openrouter.ai/playground?model=mistralai/mistral-nemo', '{"input_price_per_1m": 0.019, "output_price_per_1m": 0.03}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4o-mini', 'openai', 'Openai', 'OpenAI: GPT-4o-mini', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text", "vision"]',
          'GPT-4o mini is OpenAI''s newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs. As their most advanced small model, it is many multiples more affordable...', 'https://openrouter.ai/models/openai/gpt-4o-mini', 'https://openrouter.ai/playground?model=openai/gpt-4o-mini', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4o-mini-2024-07-18', 'openai', 'Openai', 'OpenAI: GPT-4o-mini (2024-07-18)', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text", "vision"]',
          'GPT-4o mini is OpenAI''s newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs. As their most advanced small model, it is many multiples more affordable...', 'https://openrouter.ai/models/openai/gpt-4o-mini-2024-07-18', 'https://openrouter.ai/playground?model=openai/gpt-4o-mini-2024-07-18', '{"input_price_per_1m": 0.15, "output_price_per_1m": 0.6}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4o-mini:batch', 'openai', 'Openai', 'OpenAI: GPT-4o-mini (batch)', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text", "vision"]',
          'GPT-4o mini is OpenAI''s newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs. As their most advanced small model, it is many multiples more affordable...', 'https://openrouter.ai/models/openai/gpt-4o-mini:batch', 'https://openrouter.ai/playground?model=openai/gpt-4o-mini:batch', '{"input_price_per_1m": 0.075, "output_price_per_1m": 0.3}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'google-gemma-2-27b-it', 'google', 'Google', 'Google: Gemma 2 27B', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 8192, 2048, '["text"]',
          'Gemma 2 27B by Google is an open model built from the same research and technology used to create the [Gemini models](/models?q=gemini). Gemma models are well-suited for a variety of...', 'https://openrouter.ai/models/google/gemma-2-27b-it', 'https://openrouter.ai/playground?model=google/gemma-2-27b-it', '{"input_price_per_1m": 0.65, "output_price_per_1m": 0.65}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4o', 'openai', 'Openai', 'OpenAI: GPT-4o', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text", "vision"]',
          'GPT-4o ("o" for "omni") is OpenAI''s latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as...', 'https://openrouter.ai/models/openai/gpt-4o', 'https://openrouter.ai/playground?model=openai/gpt-4o', '{"input_price_per_1m": 2.5, "output_price_per_1m": 10.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4o-2024-05-13', 'openai', 'Openai', 'OpenAI: GPT-4o (2024-05-13)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 4096, '["text", "vision"]',
          'GPT-4o ("o" for "omni") is OpenAI''s latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as...', 'https://openrouter.ai/models/openai/gpt-4o-2024-05-13', 'https://openrouter.ai/playground?model=openai/gpt-4o-2024-05-13', '{"input_price_per_1m": 5.0, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4o:batch', 'openai', 'Openai', 'OpenAI: GPT-4o (batch)', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text", "vision"]',
          'GPT-4o ("o" for "omni") is OpenAI''s latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as...', 'https://openrouter.ai/models/openai/gpt-4o:batch', 'https://openrouter.ai/playground?model=openai/gpt-4o:batch', '{"input_price_per_1m": 1.25, "output_price_per_1m": 5.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mixtral-8x22b-instruct', 'mistralai', 'Mistralai', 'Mistral: Mixtral 8x22B Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 65536, 16384, '["text"]',
          'Mistral''s official instruct fine-tuned version of [Mixtral 8x22B](/models/mistralai/mixtral-8x22b). It uses 39B active parameters out of 141B, offering unparalleled cost efficiency for its size. Its strengths include: - strong math, coding,...', 'https://openrouter.ai/models/mistralai/mixtral-8x22b-instruct', 'https://openrouter.ai/playground?model=mistralai/mixtral-8x22b-instruct', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'microsoft-wizardlm-2-8x22b', 'microsoft', 'Microsoft', 'WizardLM-2 8x22B', 'Mid', 0, 'Proprietary',
          0, 'Dense/MoE', 65535, 8000, '["text"]',
          'WizardLM-2 8x22B is Microsoft AI''s most advanced Wizard model. It demonstrates highly competitive performance compared to leading proprietary models, and it consistently outperforms all existing state-of-the-art opensource models. It is...', 'https://openrouter.ai/models/microsoft/wizardlm-2-8x22b', 'https://openrouter.ai/playground?model=microsoft/wizardlm-2-8x22b', '{"input_price_per_1m": 0.62, "output_price_per_1m": 0.62}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4-turbo', 'openai', 'Openai', 'OpenAI: GPT-4 Turbo', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 4096, '["text", "vision"]',
          'The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling.

Training data: up to December 2023.', 'https://openrouter.ai/models/openai/gpt-4-turbo', 'https://openrouter.ai/playground?model=openai/gpt-4-turbo', '{"input_price_per_1m": 10.0, "output_price_per_1m": 30.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4-turbo:batch', 'openai', 'Openai', 'OpenAI: GPT-4 Turbo (batch)', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 4096, '["text", "vision"]',
          'The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling.

Training data: up to December 2023.', 'https://openrouter.ai/models/openai/gpt-4-turbo:batch', 'https://openrouter.ai/playground?model=openai/gpt-4-turbo:batch', '{"input_price_per_1m": 5.0, "output_price_per_1m": 15.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'anthropic-claude-3-haiku', 'anthropic', 'Anthropic', 'Anthropic: Claude 3 Haiku', 'Frontier', 0, 'Proprietary',
          0, 'Dense/MoE', 200000, 4096, '["text", "vision"]',
          'Claude 3 Haiku is Anthropic''s fastest and most compact model for
near-instant responsiveness. Quick and accurate targeted performance.

See the launch announcement and benchmark results [here](https://www.anthropic.com/news/claude-3-haiku)

#multimodal', 'https://openrouter.ai/models/anthropic/claude-3-haiku', 'https://openrouter.ai/playground?model=anthropic/claude-3-haiku', '{"input_price_per_1m": 0.25, "output_price_per_1m": 1.25}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mistralai-mistral-large', 'mistralai', 'Mistralai', 'Mistral Large', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 16384, '["text"]',
          'This is Mistral AI''s flagship model, Mistral Large 2 (version `mistral-large-2407`). It''s a proprietary weights-available model and excels at reasoning, code, JSON, chat, and more. Read the launch announcement [here](https://mistral.ai/news/mistral-large-2407/)....', 'https://openrouter.ai/models/mistralai/mistral-large', 'https://openrouter.ai/playground?model=mistralai/mistral-large', '{"input_price_per_1m": 2.0, "output_price_per_1m": 6.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-3.5-turbo-0613', 'openai', 'Openai', 'OpenAI: GPT-3.5 Turbo (older v0613)', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 4095, 4096, '["text"]',
          'GPT-3.5 Turbo is OpenAI''s fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional completion tasks.

Training data up to Sep 2021.', 'https://openrouter.ai/models/openai/gpt-3.5-turbo-0613', 'https://openrouter.ai/playground?model=openai/gpt-3.5-turbo-0613', '{"input_price_per_1m": 1.0, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4-turbo-preview', 'openai', 'Openai', 'OpenAI: GPT-4 Turbo Preview', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 128000, 4096, '["text"]',
          'The preview GPT-4 model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Training data: up to Dec 2023. **Note:** heavily rate limited by OpenAI while...', 'https://openrouter.ai/models/openai/gpt-4-turbo-preview', 'https://openrouter.ai/playground?model=openai/gpt-4-turbo-preview', '{"input_price_per_1m": 10.0, "output_price_per_1m": 30.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openrouter-auto', 'openrouter', 'Openrouter', 'Auto Router', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 2000000, 16384, '["text", "vision"]',
          'Your prompt will be processed by a meta-model and routed to one of dozens of models (see below), optimizing for the best possible output. To see which model was used,...', 'https://openrouter.ai/models/openrouter/auto', 'https://openrouter.ai/playground?model=openrouter/auto', '{"input_price_per_1m": -1000000.0, "output_price_per_1m": -1000000.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-3.5-turbo-instruct', 'openai', 'Openai', 'OpenAI: GPT-3.5 Turbo Instruct', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 4095, 4096, '["text"]',
          'This model is a variant of GPT-3.5 Turbo tuned for instructional prompts and omitting chat-related optimizations. Training data: up to Sep 2021.', 'https://openrouter.ai/models/openai/gpt-3.5-turbo-instruct', 'https://openrouter.ai/playground?model=openai/gpt-3.5-turbo-instruct', '{"input_price_per_1m": 1.5, "output_price_per_1m": 2.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-3.5-turbo-16k', 'openai', 'Openai', 'OpenAI: GPT-3.5 Turbo 16k', 'Mid', 1, 'Open-Weight',
          0, 'Dense/MoE', 16385, 4096, '["text"]',
          'This model offers four times the context length of gpt-3.5-turbo, allowing it to support approximately 20 pages of text in a single request at a higher cost. Training data: up...', 'https://openrouter.ai/models/openai/gpt-3.5-turbo-16k', 'https://openrouter.ai/playground?model=openai/gpt-3.5-turbo-16k', '{"input_price_per_1m": 3.0, "output_price_per_1m": 4.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'mancer-weaver', 'mancer', 'Mancer', 'Mancer: Weaver (alpha)', 'Small', 0, 'Proprietary',
          0, 'Dense/MoE', 8000, 6000, '["text"]',
          'An attempt to recreate Claude-style verbosity, but don''t expect the same level of coherence or memory. Meant for use in roleplay/narrative situations.', 'https://openrouter.ai/models/mancer/weaver', 'https://openrouter.ai/playground?model=mancer/weaver', '{"input_price_per_1m": 0.5, "output_price_per_1m": 0.75}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'undi95-remm-slerp-l2-13b', 'undi95', 'Undi95', 'ReMM SLERP 13B', 'Small', 0, 'Proprietary',
          0, 'Dense/MoE', 6144, 6144, '["text"]',
          'A recreation trial of the original MythoMax-L2-B13 but with updated models. #merge', 'https://openrouter.ai/models/undi95/remm-slerp-l2-13b', 'https://openrouter.ai/playground?model=undi95/remm-slerp-l2-13b', '{"input_price_per_1m": 0.45, "output_price_per_1m": 0.65}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'gryphe-mythomax-l2-13b', 'gryphe', 'Gryphe', 'MythoMax 13B', 'Micro', 0, 'Proprietary',
          0, 'Dense/MoE', 8192, 4096, '["text"]',
          'One of the highest performing and most popular fine-tunes of Llama 2 13B, with rich descriptions and roleplay. #merge', 'https://openrouter.ai/models/gryphe/mythomax-l2-13b', 'https://openrouter.ai/playground?model=gryphe/mythomax-l2-13b', '{"input_price_per_1m": 0.06, "output_price_per_1m": 0.06}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-3.5-turbo', 'openai', 'Openai', 'OpenAI: GPT-3.5 Turbo', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 16385, 4096, '["text"]',
          'GPT-3.5 Turbo is OpenAI''s fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional completion tasks.

Training data up to Sep 2021.', 'https://openrouter.ai/models/openai/gpt-3.5-turbo', 'https://openrouter.ai/playground?model=openai/gpt-3.5-turbo', '{"input_price_per_1m": 0.5, "output_price_per_1m": 1.5}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-3.5-turbo:batch', 'openai', 'Openai', 'OpenAI: GPT-3.5 Turbo (batch)', 'Small', 1, 'Open-Weight',
          0, 'Dense/MoE', 16385, 4096, '["text"]',
          'GPT-3.5 Turbo is OpenAI''s fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional completion tasks.

Training data up to Sep 2021.', 'https://openrouter.ai/models/openai/gpt-3.5-turbo:batch', 'https://openrouter.ai/playground?model=openai/gpt-3.5-turbo:batch', '{"input_price_per_1m": 0.25, "output_price_per_1m": 0.75}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );
INSERT OR REPLACE INTO models (
          id, provider_id, provider_name, name, tier, is_open_weight, license_type,
          parameter_count_b, architecture, context_window, max_output_tokens, modality,
          description, official_url, source_docs_url, api_pricing, quota, benchmarks,
          is_verified, litellm_id, supports_reasoning, supports_web_search, is_deprecated,
          is_new, hardware_requirements
        ) VALUES (
          'openai-gpt-4', 'openai', 'Openai', 'OpenAI: GPT-4', 'Frontier', 1, 'Open-Weight',
          0, 'Dense/MoE', 8191, 4096, '["text"]',
          'OpenAI''s flagship model, GPT-4 is a large-scale multimodal language model capable of solving difficult problems with greater accuracy than previous models due to its broader general knowledge and advanced reasoning...', 'https://openrouter.ai/models/openai/gpt-4', 'https://openrouter.ai/playground?model=openai/gpt-4', '{"input_price_per_1m": 30.0, "output_price_per_1m": 60.0}', '{}', '{}',
          1, '', 0, 0, 0,
          0, '[]'
        );