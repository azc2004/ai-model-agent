export interface CodeSnippet {
  python: string;
  javascript: string;
  curl: string;
  langchain: string;
  apiKeyUrl: string;
  tip: string;
}

export const MODEL_CODE_SNIPPETS: Record<string, CodeSnippet> = {
  // 1. OpenAI Models
  'gpt-4o': {
    apiKeyUrl: 'https://platform.openai.com/api-keys',
    tip: 'OpenAI API v1.x 이상에서는 client.chat.completions.create 메서드를 사용하며, system 프롬프트를 messages 배열 첫 머리에 입력합니다.',
    python: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "FastAPI 기반 REST API 서비스 코드 작성해줘"}
    ],
    temperature=0.7,
    max_tokens=1024
)

print(response.choices[0].message.content)`,
    javascript: `import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'FastAPI 기반 REST API 서비스 코드 작성해줘' }
    ],
    max_tokens: 1024,
  });

  console.log(completion.choices[0].message.content);
}

main();`,
    curl: `curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "FastAPI 기반 REST API 서비스 코드 작성해줘"}
    ]
  }'`,
    langchain: `from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

chat = ChatOpenAI(model="gpt-4o", temperature=0.7)

messages = [
    SystemMessage(content="You are a helpful assistant."),
    HumanMessage(content="FastAPI 기반 REST API 서비스 코드 작성해줘"),
]

response = chat.invoke(messages)
print(response.content)`
  },

  'o3-mini': {
    apiKeyUrl: 'https://platform.openai.com/api-keys',
    tip: 'o3-mini는 추론(Reasoning) 전용 모델로 max_tokens 대신 max_completion_tokens를 사용하며 reasoning_effort(low, medium, high) 파라미터를 지원합니다.',
    python: `import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

response = client.chat.completions.create(
    model="o3-mini",
    reasoning_effort="medium",
    messages=[
        {"role": "user", "content": "복잡한 알고리즘 문제를 해결하는 Python 코드 작성해줘"}
    ],
    max_completion_tokens=2048
)

print(response.choices[0].message.content)`,
    javascript: `import OpenAI from 'openai';
const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: 'o3-mini',
    reasoning_effort: 'medium',
    messages: [
      { role: 'user', content: '복잡한 알고리즘 문제를 해결하는 Python 코드 작성해줘' }
    ],
    max_completion_tokens: 2048
  });

  console.log(response.choices[0].message.content);
}
main();`,
    curl: `curl https://api.openai.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{
    "model": "o3-mini",
    "reasoning_effort": "medium",
    "messages": [
      {"role": "user", "content": "복잡한 알고리즘 문제를 해결하는 Python 코드 작성해줘"}
    ]
  }'`,
    langchain: `from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="o3-mini", reasoning_effort="medium")
response = llm.invoke("복잡한 알고리즘 문제를 해결하는 Python 코드 작성해줘")
print(response.content)`
  },

  // 2. Anthropic Models
  'claude-3-5-sonnet': {
    apiKeyUrl: 'https://console.anthropic.com/settings/keys',
    tip: 'Anthropic SDK는 system 메시지를 messages 배열이 아닌 client.messages.create의 독립된 system= 매개변수로 설정합니다.',
    python: `import anthropic

client = anthropic.Anthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY")
)

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system="You are an expert software architect.",
    messages=[
        {"role": "user", "content": "LLM 시스템 성능 최적화 방안 3가지 제안해줘"}
    ]
)

print(message.content[0].text)`,
    javascript: `import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const msg = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    system: 'You are an expert software architect.',
    messages: [{ role: 'user', content: 'LLM 시스템 성능 최적화 방안 3가지 제안해줘' }],
  });

  console.log(msg.content[0].text);
}
main();`,
    curl: `curl https://api.anthropic.com/v1/messages \\
  -H "x-api-key: $ANTHROPIC_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "system": "You are an expert software architect.",
    "messages": [
      {"role": "user", "content": "LLM 시스템 성능 최적화 방안 3가지 제안해줘"}
    ]
  }'`,
    langchain: `from langchain_anthropic import ChatAnthropic

llm = ChatAnthropic(model="claude-3-5-sonnet-20241022", max_tokens=1024)
response = llm.invoke("LLM 시스템 성능 최적화 방안 3가지 제안해줘")
print(response.content)`
  },

  // 3. Google Gemini Models
  'gemini-2.5-flash': {
    apiKeyUrl: 'https://aistudio.google.com/app/apikey',
    tip: 'Google Gemini 2.5 Flash는 최신 google-genai 패키지 또는 OpenAI API 호환 엔드포인트(v1beta)를 그대로 사용할 수 있습니다.',
    python: `import os
from google import genai

client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="실시간 데이터 분석 시스템을 위한 구조 설계해줘",
)

print(response.text)`,
    javascript: `import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "실시간 데이터 분석 시스템을 위한 구조 설계해줘",
  });
  console.log(response.text);
}
main();`,
    curl: `curl "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $GEMINI_API_KEY" \\
  -d '{
    "model": "gemini-2.5-flash",
    "messages": [
      {"role": "user", "content": "실시간 데이터 분석 시스템을 위한 구조 설계해줘"}
    ]
  }'`,
    langchain: `from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")
response = llm.invoke("실시간 데이터 분석 시스템을 위한 구조 설계해줘")
print(response.content)`
  },

  // 4. DeepSeek Models
  'deepseek-r1': {
    apiKeyUrl: 'https://platform.deepseek.com/api_keys',
    tip: 'DeepSeek R1은 OpenAI 클라이언트 라이브러리에 base_url="https://api.deepseek.com"을 설정하여 완전히 동일한 인터페이스로 연결합니다.',
    python: `import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=[
        {"role": "user", "content": "MoE(Mixture of Experts) 모델의 추론 성능 최적화 방법 논하시오."}
    ]
)

# R1의 생각 과정(Reasoning Content)도 확인 가능
print("Thinking Process:", getattr(response.choices[0].message, 'reasoning_content', ''))
print("Final Answer:", response.choices[0].message.content)`,
    javascript: `import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "MoE 모델의 추론 성능 최적화 방법 논하시오." }],
    model: "deepseek-reasoner",
  });

  console.log(completion.choices[0].message.content);
}
main();`,
    curl: `curl https://api.deepseek.com/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \\
  -d '{
    "model": "deepseek-reasoner",
    "messages": [
      {"role": "user", "content": "MoE 모델의 추론 성능 최적화 방법 논하시오."}
    ]
  }'`,
    langchain: `from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model='deepseek-reasoner', 
    openai_api_key=os.environ.get("DEEPSEEK_API_KEY"),
    openai_api_base='https://api.deepseek.com'
)
response = llm.invoke("MoE 모델의 추론 성능 최적화 방법 논하시오.")
print(response.content)`
  }
};

// Fallback Default Snippet generator
export function getCodeSnippetForModel(modelId: string, modelName: string, providerId: string): CodeSnippet {
  const key = Object.keys(MODEL_CODE_SNIPPETS).find(k => modelId.toLowerCase().includes(k)) || 'gpt-4o';
  
  if (MODEL_CODE_SNIPPETS[key]) {
    return MODEL_CODE_SNIPPETS[key];
  }

  // 기본 범용 OpenAI 호환 스니펫
  return {
    apiKeyUrl: 'https://platform.openai.com/api-keys',
    tip: `${modelName} 모델 연동을 위한 표준 OpenAI 호환 SDK 스니펫입니다.`,
    python: `import os\nfrom openai import OpenAI\n\nclient = OpenAI(api_key=os.environ.get("${providerId.toUpperCase()}_API_KEY"))\nresponse = client.chat.completions.create(\n    model="${modelId}",\n    messages=[{"role": "user", "content": "Hello, ${modelName}!"}]\n)\nprint(response.choices[0].message.content)`,
    javascript: `import OpenAI from 'openai';\nconst openai = new OpenAI({ apiKey: process.env.${providerId.toUpperCase()}_API_KEY });\nconst res = await openai.chat.completions.create({\n  model: '${modelId}',\n  messages: [{ role: 'user', content: 'Hello, ${modelName}!' }]\n});\nconsole.log(res.choices[0].message.content);`,
    curl: `curl https://api.openai.com/v1/chat/completions \\\n  -H "Authorization: Bearer $API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"model": "${modelId}", "messages": [{"role": "user", "content": "Hello!"}]}'`,
    langchain: `from langchain_openai import ChatOpenAI\nllm = ChatOpenAI(model="${modelId}")\nprint(llm.invoke("Hello!").content)`
  };
}
