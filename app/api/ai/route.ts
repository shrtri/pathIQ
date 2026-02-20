import { NextResponse } from "next/server"

async function getExplanation(topic: string, API_KEY: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Explain ${topic} in very simple language in detail like notes given by teacher.`,
        },
      ],
      temperature: 0.5,
    }),
  })

  const data = await res.json()
  return data.choices[0].message.content
}

async function getMCQs(topic: string, API_KEY: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
Generate 10 MCQs on the "${topic}"

Return ONLY valid JSON.
NO text outside JSON.

{
  "mcqs": [
    {
      "question": "",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": ""
    }
  ]
}
          `,
        },
      ],
      temperature: 0.4,
    }),
  })

  const data = await res.json()
  const content=data.choices?.[0]?.message?.content

  if(!content){
    throw new Error("Empty mcq response")
  }

  try{
    const parsed=JSON.parse(content)

    if(!Array.isArray(parsed.mcqs)){
      throw new Error("Invalid mcq format")
    }
    return parsed
  }catch{
    throw new Error("Failed to parse mcqs json")
  }
}

export async function POST(req: Request) {
  try {
    const { topic } = await req.json()

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required", mcqs: [] },
        { status: 400 }
      )
    }

    const API_KEY = process.env.GROQ_API_KEY

    if (!API_KEY) {
      return NextResponse.json(
        { error: "Groq API key not found", mcqs: [] },
        { status: 500 }
      )
    }

    const explanation = await getExplanation(topic, API_KEY)
    const mcqData = await getMCQs(topic, API_KEY)

    return NextResponse.json({
      topic,
      explanation,
      mcqs:mcqData.mcqs
    })
  } catch (error: any) {
    console.error("GROQ ERROR:", error.message)

    return NextResponse.json(
      {
        topic: "",
        explanation: "AI failed to generate explanation.",
        mcqs: [],
      },
      { status: 500 }
    )
  }
}
