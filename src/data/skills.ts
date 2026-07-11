
export const skills = {
    programming: [
        { name: "Python", level: "Expert", desc: "Data Structures, Algo, Pandas" },
        { name: "SQL", level: "Expert", desc: "Complex Joins, Window Functions, Optimization" },
        { name: "Bash", level: "Intermediate", desc: "Scripting, Automation" },
    ],
    dataEngineering: [
        { name: "ETL / ELT Pipelines", level: "Expert", desc: "Design & Implementation" },
        { name: "Apache Spark", level: "Advanced", desc: "Distributed Processing" },
        { name: "PySpark", level: "Advanced", desc: "Python API for Spark" },
        { name: "Apache Airflow", level: "Advanced", desc: "Orchestration, DAGs" },
        { name: "Apache Kafka", level: "Intermediate", desc: "Real-time Streaming" },
        { name: "Batch & Stream Processing", level: "Advanced", desc: "Architecture Patterns" },
        { name: "dbt", level: "Intermediate", desc: "Data Transformation" },
    ],
    databases: [
        { name: "PostgreSQL", level: "Expert", desc: "Relational DB, Indexing" },
        { name: "MySQL", level: "Advanced", desc: "Relational DB" },
        { name: "MongoDB", level: "Intermediate", desc: "NoSQL" },
    ],
    warehousing: [
        { name: "Star Schema", level: "Expert", desc: "Dimensional Modeling" },
        { name: "Snowflake Schema", level: "Advanced", desc: "Normalization" },
        { name: "Dimensional Modeling", level: "Expert", desc: "Kimball Methodology" },
        { name: "Fact & Dimension Tables", level: "Expert", desc: "Schema Design" },
    ],
    cloud: [
        { name: "AWS", level: "Advanced", desc: "S3, EC2, RDS, Lambda, IAM" },
        { name: "BigQuery", level: "Intermediate", desc: "Basics" },
        { name: "Docker", level: "Advanced", desc: "Containerization" },
        { name: "Git & GitHub", level: "Expert", desc: "Version Control" },
        { name: "Dataflow", level: "Intermediate", desc: "Serverless Stream & Batch" },
        { name: "Dataproc", level: "Intermediate", desc: "Managed Spark/Hadoop" },
        { name: "Pub/Sub", level: "Intermediate", desc: "Messaging & Event Streaming" },
        { name: "Cloud Composer", level: "Intermediate", desc: "Managed Airflow" },
        { name: "Cloud Storage", level: "Intermediate", desc: "Object Storage" },
    ],
    coreConcepts: [
        { name: "Data Lakes", level: "Advanced", desc: "Storage Patterns" },
        { name: "Data Modeling", level: "Expert", desc: "Conceptual, Logical, Physical" },
        { name: "Partitioning & Optimization", level: "Advanced", desc: "Performance Tuning" },
        { name: "Logging & Monitoring", level: "Intermediate", desc: "Observability" },
        { name: "Data Validation", level: "Intermediate", desc: "Quality Checks" },
        { name: "CI/CD Basics", level: "Intermediate", desc: "Pipeline Automation" },
        { name: "Data Governance", level: "Intermediate", desc: "Policies & Compliance" },
        { name: "Data Lineage", level: "Intermediate", desc: "Tracking & Auditing" },
    ]
};

export const skillsCategories = [
    { id: "programming", title: "Programming", icon: "Code" },
    { id: "dataEngineering", title: "Data Engineering & Processing", icon: "Server" },
    { id: "databases", title: "Databases", icon: "Database" },
    { id: "warehousing", title: "Data Warehousing", icon: "Box" }, // Need to map Box or similar
    { id: "cloud", title: "Cloud & Infrastructure", icon: "Cloud" },
    { id: "coreConcepts", title: "Core Concepts", icon: "GitGraph" }
];
