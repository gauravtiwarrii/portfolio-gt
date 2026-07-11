import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the AI assistant inside Gaurav Tiwari's GT_OS v3.0 portfolio.
Keep answers concise, technical, and aligned with Gaurav's background.

Gaurav Tiwari Bio:
- Role: Data Engineer, AI Engineer, Backend Developer.
- Education: B.Tech in Computer Science at Lovely Professional University (LPU) (Graduating 2027/Present). CGPA: 7.26.
- Skills: Python, SQL, Apache Kafka, Apache Spark, PySpark, Apache Airflow, Snowflake, AWS, PostgreSQL, Next.js, Docker, Git.
- Projects:
  1. Real-Time Retail Data Pipeline (Kafka, Spark, AWS S3, Redshift)
  2. Flight Analytics Data Warehouse (Airflow, Snowflake, dbt)
  3. Flight Delay Prediction (Machine Learning, Python, Flask, Streamlit)
  4. PySpark Big Data Processing (AWS, PySpark)
  5. Retail ETL Automation (Airflow, Python, Docker)

Theme: Futuristic Cyberpunk OS. Keep answers clean, conversational, and direct.
`;

const FAQ_RESPONSES = [
  {
    keywords: ["who", "gaurav", "tiwari", "about", "bio"],
    response: "Gaurav Tiwari is a Data Engineer and AI Engineer specializing in building scalable event-driven pipelines, big data processing systems, and cloud architecture (AWS/Snowflake). He is currently pursuing a B.Tech CSE at Lovely Professional University.",
  },
  {
    keywords: ["skill", "tech", "languages", "stack", "tools"],
    response: "Gaurav's core tech stack includes Python, SQL, Apache Kafka, Apache Spark, PySpark, Apache Airflow, Snowflake, AWS, PostgreSQL, Next.js, and Docker.",
  },
  {
    keywords: ["project", "portfolio", "build"],
    response: "Gaurav has built several notable systems: a Real-Time Retail Pipeline using Kafka & Spark, a Flight Analytics DW using Snowflake & Airflow, and a Flight Delay Prediction model using Scikit-Learn. Ask about a specific project for more details!",
  },
  {
    keywords: ["contact", "email", "reach", "message", "hire"],
    response: "You can reach Gaurav via email at igauravtiwari1096@gmail.com, or through his LinkedIn profile at linkedin.com/in/gauravtiwarrii. You can also send a message via the Comm Console on the desktop!",
  },
  {
    keywords: ["kafka", "pipeline", "streaming"],
    response: "His Real-Time Retail Data Pipeline uses Apache Kafka for event streaming, Spark Streaming for processing, and AWS S3/Redshift for data warehousing.",
  },
  {
    keywords: ["spark", "pyspark", "bigdata"],
    response: "Gaurav has extensive experience with PySpark, utilizing it for large-scale ETL processing and data analysis on cloud environments like AWS.",
  },
  {
    keywords: ["snowflake", "warehouse", "airflow"],
    response: "He built a Flight Analytics Data Warehouse using Apache Airflow for scheduling DAGs, Snowflake for data storage, and dbt for transformations.",
  },
];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      // Use OpenAI Chat Completion API
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
          max_tokens: 250,
          temperature: 0.7,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        return NextResponse.json({ reply: json.choices[0].message.content });
      }
      console.warn("OpenAI API call failed, falling back to FAQ match");
    }

    // Graceful fallback to keyword matching FAQ bot
    const normalized = message.toLowerCase();
    for (const faq of FAQ_RESPONSES) {
      if (faq.keywords.some((keyword) => normalized.includes(keyword))) {
        return NextResponse.json({ reply: faq.response });
      }
    }

    return NextResponse.json({
      reply: "Signal received, but connection is faint. Gaurav is an expert in Data Engineering (Kafka, Spark, Snowflake, AWS) and AI/ML. Try asking about his skills, projects, or how to contact him!",
    });
  } catch (error) {
    console.error("AI Route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
