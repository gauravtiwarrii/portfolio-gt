import { Database, Server, Box, Cloud } from "lucide-react";

export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    icon: React.ElementType;
    github: string;
    demo?: string;
    featured: boolean;
    category: "Batch" | "Streaming" | "Analytics" | "Warehousing" | "Cloud";
    status: "Live" | "Building" | "Archived";
    healthStatus?: {
        status: "Online" | "Offline" | "Maintenance";
        lastPing?: string;
    };
    problem: string;
    codeSnippet?: {
        language: string;
        code: string;
        fileName: string;
        description: string;
    };
    details: {
        challenge: string;
        solution: string;
        architecture: {
            description: string;
            diagramUrl?: string;
        };
        techStackJustification: {
            tech: string;
            reason: string;
        }[];
        performance: string[];
        engineeringPractices: string[];
        features: string[];
    };
}

export const projects: Project[] = [
    {
        slug: "retail-etl-pipeline",
        title: "End-to-End Retail ETL Pipeline",
        subtitle: "Automated Batch Processing",
        description: "Fully automated batch ETL pipeline extracting retail sales data, transforming it with Python, and loading into PostgreSQL.",
        tags: ["Python", "Apache Airflow", "AWS S3", "PostgreSQL", "Docker"],
        icon: Database,
        github: "https://github.com/gauravtiwarrii/retail-etl", // Placeholder, update if user provides specific link
        featured: true,
        category: "Batch",
        status: "Live",
        healthStatus: { status: "Online", lastPing: "Daily run success" },
        problem: "Businesses often rely on manual reporting workflows that are time-consuming and error-prone. This project automates data ingestion and processing for reliable analytics.",
        codeSnippet: {
            language: "python",
            fileName: "etl_dag.py",
            description: "Airflow DAG for daily retail data processing.",
            code: `with DAG('retail_etl_pipeline', schedule_interval='@daily', default_args=default_args) as dag:
    
    extract = PythonOperator(
        task_id='extract_data',
        python_callable=extract_from_s3,
        op_kwargs={'bucket': 'retail-raw'}
    )

    transform = PythonOperator(
        task_id='transform_data',
        python_callable=clean_and_validate
    )

    load = PostgresOperator(
        task_id='load_to_postgres',
        sql='sql/insert_sales.sql',
        postgres_conn_id='retail_db'
    )

    extract >> transform >> load`
        },
        details: {
            challenge: "Manual reporting was causing a 24-hour delay in insights and frequent data quality issues due to human error.",
            solution: "Built a robust, scheduled ETL pipeline using Apache Airflow. Data is extracted from S3, cleaned and validated using Python (Pandas), and loaded into a PostgreSQL warehouse for consumption by analytics tools.",
            architecture: {
                description: "Raw CSV → S3 → Python Transformation → PostgreSQL → Analytics Queries"
            },
            techStackJustification: [
                { tech: "Apache Airflow", reason: "Standard for orchestrating complex dependency graphs and scheduling." },
                { tech: "AWS S3", reason: "Durable, cost-effective storage for raw data landing zone." },
                { tech: "Docker", reason: "Ensured consistency across development and production environments." }
            ],
            performance: [
                "Processes 1M+ records per run.",
                "Reduced manual reporting time by 80%.",
                "Improved query performance by 35%."
            ],
            engineeringPractices: [
                "Automated data cleaning & validation rules.",
                "Implemented retry mechanisms for network failures.",
                "Structured logging for easier debugging."
            ],
            features: [
                "Scheduled daily DAG execution.",
                "Error handling and alerting.",
                "Optimized SQL queries for loading."
            ]
        }
    },
    {
        slug: "pyspark-big-data",
        title: "Big Data Processing using PySpark",
        subtitle: "Distributed Computing at Scale",
        description: "Processing large-scale e-commerce datasets using Apache Spark for performance optimization.",
        tags: ["PySpark", "Hadoop", "AWS EC2", "Big Data"],
        icon: Server,
        github: "https://github.com/gauravtiwarrii/pyspark-processing",
        featured: true,
        category: "Batch",
        status: "Archived",
        problem: "Traditional single-machine processing models struggle with multi-gigabyte datasets, leading to timeouts and memory errors.",
        codeSnippet: {
            language: "python",
            fileName: "sales_aggregation.py",
            description: "Optimizing aggregations with PySpark.",
            code: `from pyspark.sql.functions import col, sum, avg

def process_sales(spark, input_path):
    # Read parquet for faster IO
    df = spark.read.parquet(input_path)
    
    # Cache for iterative usage
    df.cache()

    # Optimized aggregation
    result = df.groupBy("category", "region") \\
               .agg(
                   sum("amount").alias("total_sales"),
                   avg("amount").alias("avg_transaction")
               ) \\
               .orderBy(col("total_sales").desc())
               
    return result`
        },
        details: {
            challenge: "Processing 10 million+ records on a local machine took hours and often crashed due to Out-Of-Memory (OOM) errors.",
            solution: "Migrated the workload to a distributed computing cluster using Apache Spark (PySpark). Leveraged in-memory processing and partitioning strategies to drastically reduce execution time.",
            architecture: {
                description: "Raw Data (HDFS/S3) -> Spark Cluster (Master/Workers) -> Aggregated Results -> Data Warehouse"
            },
            techStackJustification: [
                { tech: "PySpark", reason: "Python API for Spark allows combining SQL with complex imperative logic." },
                { tech: "Hadoop", reason: "Distributed storage (HDFS) for handling datasets larger than a single node's disk." },
                { tech: "AWS EC2", reason: "Scalable compute capacity to spin up Spark clusters on demand." }
            ],
            performance: [
                "Processed 10M+ records efficiently.",
                "Reduced execution time by 50% compared to Pandas.",
                "Linear scalability with added nodes."
            ],
            engineeringPractices: [
                "Partition optimization to avoid data skew.",
                "Caching intermediate references for iterative performance.",
                "Performance benchmarking against baseline scripts."
            ],
            features: [
                "Distributed data processing.",
                "Window functions for complex analytics.",
                "Aggregations and pivoting."
            ]
        }
    },
    {
        slug: "real-time-streaming",
        title: "Real-Time Streaming Pipeline",
        subtitle: "Live Transaction Processing",
        description: "Real-time data streaming pipeline for processing live transaction data using Kafka and Spark.",
        tags: ["Apache Kafka", "Spark Streaming", "Python", "PostgreSQL"],
        icon: Cloud,
        github: "https://github.com/gauravtiwarrii/streaming-pipeline",
        featured: true,
        category: "Streaming",
        status: "Live",
        healthStatus: { status: "Online", lastPing: "Streaming events..." },
        problem: "Fraud detection and inventory systems require immediate action on transaction data, not end-of-day reports.",
        codeSnippet: {
            language: "python",
            fileName: "kafka_consumer.py",
            description: "Spark Structured Streaming from Kafka.",
            code: `stream_df = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "transactions") \\
    .load()

# Sliding window aggregation for velocity checks
windowed_counts = stream_df \\
    .groupBy(
        window(col("timestamp"), "10 minutes", "5 minutes"),
        col("user_id")
    ) \\
    .count()

query = windowed_counts.writeStream \\
    .outputMode("update") \\
    .format("console") \\
    .start()`
        },
        details: {
            challenge: "Ingesting and aggregating high-velocity transaction data with sub-second latency.",
            solution: "Implemented a decoupled streaming architecture. Kafka buffers the high-throughput ingress, while Spark Streaming performs windowed aggregations and writes to the operational database.",
            architecture: {
                description: "Kafka Producer -> Kafka Topic -> Spark Streaming -> PostgreSQL"
            },
            techStackJustification: [
                { tech: "Apache Kafka", reason: "Industry standard for high-throughput, low-latency log streaming." },
                { tech: "Spark Streaming", reason: "Micro-batch architecture provides exactly-once semantics and fault tolerance." }
            ],
            performance: [
                "Handles 5,000+ events per minute.",
                "Achieved near real-time analytics latency (< 5 seconds)."
            ],
            engineeringPractices: [
                "Fault-tolerant stream processing with checkpointing.",
                "Scalable architecture design allowing consumer group scaling.",
                "Sliding window aggregation."
            ],
            features: [
                "Real-time event ingestion.",
                "Fault-tolerance.",
                "Scalable consumer groups."
            ]
        }
    },
    {
        slug: "ecommerce-dw-design",
        title: "Data Warehouse Design for E-Commerce",
        subtitle: "Dimensional Modeling Project",
        description: "Designed and implemented a star schema data warehouse to support business intelligence queries.",
        tags: ["SQL", "Star Schema", "Dimensional Modeling", "PostgreSQL"],
        icon: Box,
        github: "https://github.com/gauravtiwarrii/dw-design",
        featured: true,
        category: "Warehousing",
        status: "Archived",
        problem: "Transactional databases (3NF) are optimized for writes, not for complex analytical queries (OLAP) needed by BI teams.",
        codeSnippet: {
            language: "sql",
            fileName: "star_schema.sql",
            description: "Creating Fact and Dimension tables.",
            code: `CREATE TABLE Dim_Product (
    product_key SERIAL PRIMARY KEY,
    product_id VARCHAR(50),
    category VARCHAR(50),
    brand VARCHAR(50),
    effective_date DATE,
    expiration_date DATE
);

CREATE TABLE Fact_Sales (
    sales_id SERIAL PRIMARY KEY,
    product_key INT REFERENCES Dim_Product(product_key),
    customer_key INT REFERENCES Dim_Customer(customer_key),
    date_key INT REFERENCES Dim_Date(date_key),
    quantity INT,
    total_amount DECIMAL(10,2)
);`
        },
        details: {
            challenge: "Reporting queries on the main application database were causing performance degradation and were difficult to write due to high normalization.",
            solution: "Designed a Kimball Star Schema optimized for analytics. Denormalized dimensions (Customer, Product, Time, Location) allow for simple, fast joins against the central Sales Fact table.",
            architecture: {
                description: "Source Systems -> Staging Area -> Warehouse (Star Schema) -> BI Tools"
            },
            techStackJustification: [
                { tech: "Star Schema", reason: "Simplifies queries and optimizes performance for read-heavy analytical workloads." },
                { tech: "PostgreSQL", reason: "Robost relational database capable of serving as a mid-sized data warehouse." }
            ],
            performance: [
                "Improved reporting query speed by 40%.",
                "Reduced query complexity for analysts."
            ],
            engineeringPractices: [
                "Indexing strategy on foreign keys.",
                "Partitioning of Fact tables by Date.",
                "Constraint enforcement for data integrity."
            ],
            features: [
                "Fact Table: Sales",
                "Dimension Tables: Customer, Product, Time, Location",
                "KPI dashboards support."
            ]
        }
    }
];
