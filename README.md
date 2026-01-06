# ATS-System: Advanced Resume Analyzer

A sophisticated Applicant Tracking System (ATS) designed to analyze and score resumes through pure algorithmic processing, featuring comprehensive keyword matching, skill extraction, and traditional ATS compatibility analysis. This system operates without LLM/Ollama integration, relying on deterministic scoring algorithms for consistent, predictable results.

**Current Date:** 2026-01-06

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Requirements](#requirements)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Guide](#usage-guide)
- [Configuration & Customization](#configuration--customization)
- [File Structure](#file-structure)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **ATS-System** is a deterministic resume analysis engine that evaluates candidate resumes against job requirements using pure algorithmic processing. Unlike AI-based systems, this solution provides:

- **Deterministic Results**: Same resume always produces the same score
- **Transparent Scoring**: Clear breakdown of how scores are calculated
- **Fast Processing**: No ML model loading or inference overhead
- **Customizable Metrics**: Fully configurable scoring algorithms
- **Bulk Analysis**: Process multiple resumes efficiently
- **Detailed Reports**: Comprehensive analysis with actionable insights

### Use Cases

- Resume screening and filtering
- Candidate ranking and comparison
- Job requirement matching analysis
- Resume formatting compliance checks
- Skill gap identification
- Bulk recruitment processing

---

## Features

### Core Analysis Capabilities

✅ **Keyword Matching & Extraction**
- Job title similarity matching
- Technical skill detection
- Soft skill identification
- Industry-specific keyword recognition

✅ **ATS Compatibility Scoring**
- Format and structure analysis
- Section completeness evaluation
- Contact information verification
- Formatting compliance checks

✅ **Resume Quality Metrics**
- Content length and density analysis
- Educational qualification matching
- Experience level assessment
- Work history continuity evaluation

✅ **Skill & Experience Analysis**
- Technical skill extraction and matching
- Years of experience calculation
- Educational background validation
- Certification and credential matching

✅ **Comprehensive Reporting**
- Detailed scoring breakdown
- Matched and missing keywords
- Improvement recommendations
- JSON export capabilities

### Technical Features

- **Batch Processing**: Process multiple resumes in parallel
- **Customizable Scoring**: Configure weights and thresholds
- **Multiple Input Formats**: Support for PDF, DOCX, TXT resumes
- **Error Handling**: Robust error management and logging
- **Performance Metrics**: Processing time tracking
- **Caching**: Result caching for repeated analyses

---

## System Architecture

### Components Overview

```
┌─────────────────────────────────────────────────────────┐
│                   ATS-System                             │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Input Processing Layer                            │ │
│  │  - File parsing (PDF, DOCX, TXT)                   │ │
│  │  - Text extraction and normalization               │ │
│  └────────────────────────────────────────────────────┘ │
│                        ↓                                 │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Analysis Engine                                   │ │
│  │  - Text preprocessing                             │ │
│  │  - Keyword extraction                             │ │
│  │  - Skill matching                                 │ │
│  │  - Format validation                              │ │
│  └────────────────────────────────────────────────────┘ │
│                        ↓                                 │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Scoring Engine                                    │ │
│  │  - ATS compatibility score                         │ │
│  │  - Keyword match score                            │ │
│  │  - Experience score                               │ │
│  │  - Overall ranking score                          │ │
│  └────────────────────────────────────────────────────┘ │
│                        ↓                                 │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Report Generation                                │ │
│  │  - Detailed analysis report                       │ │
│  │  - Recommendations                                │ │
│  │  - JSON export                                    │ │
│  └────────────────────────────────────────────────────┘ │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Scoring Algorithm

The system uses a **weighted multi-factor scoring approach**:

```
TOTAL_SCORE = (
    (ATS_SCORE × ATS_WEIGHT) +
    (KEYWORD_SCORE × KEYWORD_WEIGHT) +
    (EXPERIENCE_SCORE × EXPERIENCE_WEIGHT) +
    (EDUCATION_SCORE × EDUCATION_WEIGHT) +
    (SKILL_SCORE × SKILL_WEIGHT)
) / SUM(WEIGHTS)
```

**Default Weights:**
- ATS Compatibility: 15%
- Keyword Matching: 35%
- Experience: 20%
- Education: 15%
- Skills: 15%

---

## Requirements

### System Requirements

- **Python**: 3.8 or higher
- **OS**: Windows, macOS, or Linux
- **RAM**: Minimum 2GB (4GB recommended)
- **Disk Space**: 500MB for dependencies

### Python Dependencies

```
python-pptx>=0.6.23
python-docx>=0.8.11
PyPDF2>=3.0.0
requests>=2.28.0
nltk>=3.8
scikit-learn>=1.0.0
numpy>=1.21.0
pandas>=1.3.0
matplotlib>=3.4.0
flask>=2.2.0
```

---

## Installation

### Option 1: Standard Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/kritarth-ranjan/ATS-System.git
cd ATS-System
```

#### Step 2: Create Virtual Environment

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Step 3: Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### Step 4: Download NLTK Data (First Time Only)

```bash
python -m nltk.downloader punkt stopwords wordnet averaged_perceptron_tagger
```

### Option 2: Docker Installation

#### Build Docker Image

```bash
docker build -t ats-system:latest .
```

#### Run Docker Container

```bash
docker run -p 5000:5000 -v $(pwd)/uploads:/app/uploads ats-system:latest
```

### Option 3: Conda Installation

```bash
conda create -n ats-env python=3.9
conda activate ats-env
conda install --file requirements.txt
python -m nltk.downloader punkt stopwords wordnet averaged_perceptron_tagger
```

### Verification

Verify installation:

```bash
python -c "from src.analyzer import ResumeAnalyzer; print('Installation successful!')"
```

---

## Quick Start

### Basic Usage (Python)

```python
from src.analyzer import ResumeAnalyzer
from src.job_description import JobDescription

# Initialize analyzer
analyzer = ResumeAnalyzer()

# Load job description
job_desc = JobDescription("Senior Python Developer")
job_desc.load_from_text("""
Required Skills:
- Python, Django, FastAPI
- PostgreSQL, Redis
- Docker, Kubernetes
- AWS, GCP

Experience:
- 5+ years of software development
- 3+ years with microservices

Education:
- Bachelor's in Computer Science
""")

# Analyze resume
result = analyzer.analyze_resume(
    resume_path="resume.pdf",
    job_description=job_desc
)

# Print results
print(f"ATS Score: {result['ats_score']:.2f}")
print(f"Match Score: {result['match_score']:.2f}")
print(f"Overall Score: {result['overall_score']:.2f}")
print(f"\nMatched Keywords: {result['matched_keywords']}")
print(f"Missing Keywords: {result['missing_keywords']}")
```

### Web Interface

```bash
python app.py
# Navigate to http://localhost:5000
```

---

## Usage Guide

### 1. Command-Line Interface

#### Single Resume Analysis

```bash
python -m src.cli analyze --resume path/to/resume.pdf \
    --job-description "Senior Python Developer" \
    --output results.json
```

#### Batch Analysis

```bash
python -m src.cli batch \
    --resumes-dir ./resumes/ \
    --job-description job_desc.txt \
    --output-dir ./results/ \
    --parallel 4
```

#### Configuration-Based Analysis

```bash
python -m src.cli analyze --resume resume.pdf \
    --config custom_config.yaml
```

### 2. Python API

#### Detailed Analysis

```python
from src.analyzer import ResumeAnalyzer
from src.config import Config

# Load custom configuration
config = Config.load("config.yaml")

# Create analyzer
analyzer = ResumeAnalyzer(config=config)

# Analyze with detailed output
result = analyzer.analyze_resume(
    resume_path="resume.pdf",
    job_description=job_desc,
    detailed=True
)

# Access detailed results
print(f"ATS Score: {result['scores']['ats_score']}")
print(f"Format Issues: {result['ats_analysis']['format_issues']}")
print(f"Missing Sections: {result['ats_analysis']['missing_sections']}")
print(f"Keyword Match: {result['scores']['keyword_score']}")
print(f"Matched Keywords: {result['keyword_analysis']['matched']}")
print(f"Missing Keywords: {result['keyword_analysis']['missing']}")
```

#### Bulk Processing

```python
from src.processor import BulkProcessor
from src.job_description import JobDescription

processor = BulkProcessor(num_workers=4)

job_desc = JobDescription.load_from_file("job_description.txt")

results = processor.process_directory(
    resumes_dir="./resumes/",
    job_description=job_desc,
    output_file="results.csv"
)

# Results contain sorted ranking
for rank, result in enumerate(results, 1):
    print(f"{rank}. {result['filename']}: {result['overall_score']:.2f}")
```

#### Comparative Analysis

```python
from src.comparator import ResumeComparator

comparator = ResumeComparator()

comparison = comparator.compare(
    resume1_path="candidate1.pdf",
    resume2_path="candidate2.pdf",
    job_description=job_desc
)

print(f"Better Match: {comparison['better_match']}")
print(f"Score Difference: {comparison['score_difference']:.2f}")
print(f"Unique Strengths:\n{comparison['strengths']}")
```

### 3. Web Interface

#### Upload and Analyze

1. Navigate to `http://localhost:5000`
2. Upload resume (PDF, DOCX, or TXT)
3. Enter job description or select from templates
4. Click "Analyze"
5. View detailed results and export as JSON/PDF

#### Batch Upload

1. Go to "Batch Analysis" section
2. Upload multiple resumes (ZIP or individual files)
3. Enter job description
4. Configure scoring weights (optional)
5. Start analysis
6. Download results as CSV or JSON

---

## Configuration & Customization

### Configuration File Structure

Create a `config.yaml` file:

```yaml
# Scoring Weights (must sum to 1.0)
scoring:
  weights:
    ats_compatibility: 0.15
    keyword_matching: 0.35
    experience: 0.20
    education: 0.15
    skills: 0.15
  
  thresholds:
    minimum_score: 40
    good_score: 70
    excellent_score: 85

# ATS Settings
ats:
  required_sections:
    - contact_information
    - professional_summary
    - work_experience
    - education
    - skills
  
  format_checks:
    check_email: true
    check_phone: true
    check_linkedin: false
    max_pages: 2
    min_words: 100

# Keyword Configuration
keywords:
  # Technical skills database
  technical_skills:
    programming_languages:
      - python
      - java
      - javascript
      - cpp
      - csharp
    
    frameworks:
      - django
      - fastapi
      - flask
      - spring
      - react
    
    databases:
      - postgresql
      - mysql
      - mongodb
      - redis
  
  # Soft skills database
  soft_skills:
    - leadership
    - communication
    - teamwork
    - problem-solving
    - time-management
  
  # Industry-specific keywords
  industry_keywords:
    tech:
      - api
      - rest
      - microservices
      - cloud
      - devops

# Experience Matching
experience:
  calculate_years: true
  weight_recent: true
  lookback_years: 10

# Education Matching
education:
  degree_keywords:
    bachelors:
      - bachelor
      - b.s.
      - b.a.
      - b.tech
    
    masters:
      - master
      - m.s.
      - m.a.
      - m.tech
    
    phd:
      - phd
      - ph.d.
      - doctorate

# Processing Settings
processing:
  max_file_size_mb: 10
  supported_formats:
    - pdf
    - docx
    - txt
  
  text_processing:
    remove_stopwords: true
    stemming: true
    lowercase: true
    remove_special_chars: true

# Output Settings
output:
  format: json
  include_recommendations: true
  include_detailed_analysis: true
  export_formats:
    - json
    - csv
    - pdf
```

### Custom Keyword Database

Create `keywords.json`:

```json
{
  "technical_skills": {
    "programming_languages": [
      {
        "keyword": "python",
        "aliases": ["py", "python3"],
        "weight": 1.0
      },
      {
        "keyword": "java",
        "aliases": ["j2ee", "jsp"],
        "weight": 0.95
      }
    ],
    "frameworks": [
      {
        "keyword": "django",
        "aliases": ["django framework"],
        "weight": 0.9
      }
    ]
  },
  "soft_skills": [
    {
      "keyword": "leadership",
      "aliases": ["leader", "leading"],
      "weight": 0.8
    }
  ]
}
```

### Custom Scoring Algorithm

Create a custom scorer:

```python
from src.scoring import BaseScorer

class CustomScorer(BaseScorer):
    """Custom scoring implementation"""
    
    def calculate_ats_score(self, resume_data):
        """Custom ATS scoring logic"""
        score = 0
        
        # Check required sections
        required = ['contact', 'summary', 'experience', 'education', 'skills']
        found = sum(1 for sec in required if sec in resume_data)
        score += (found / len(required)) * 40
        
        # Format checks
        if resume_data['word_count'] > 100:
            score += 30
        
        if resume_data['page_count'] <= 2:
            score += 30
        
        return score
    
    def calculate_keyword_score(self, resume_text, job_keywords):
        """Custom keyword matching logic"""
        # Custom matching algorithm
        matched = 0
        for keyword in job_keywords:
            if self.find_keyword(keyword, resume_text):
                matched += 1
        
        return (matched / len(job_keywords)) * 100 if job_keywords else 0
```

### Loading Custom Configuration

```python
from src.config import Config
from src.analyzer import ResumeAnalyzer

# Load configuration
config = Config.load("custom_config.yaml")

# Load custom keywords
config.load_keywords_from_file("custom_keywords.json")

# Create analyzer with custom config
analyzer = ResumeAnalyzer(config=config)

# Use custom scorer
from custom_scorer import CustomScorer
analyzer.set_scorer(CustomScorer(config))
```

---

## File Structure

```
ATS-System/
├── README.md                          # This file
├── requirements.txt                   # Python dependencies
├── setup.py                           # Package setup
├── .gitignore                         # Git ignore rules
├── Dockerfile                         # Docker configuration
├── docker-compose.yml                 # Docker compose
│
├── src/                               # Main source code
│   ├── __init__.py
│   ├── analyzer.py                    # Main analyzer class
│   ├── processor.py                   # Batch processor
│   ├── comparator.py                  # Resume comparator
│   ├── cli.py                         # Command-line interface
│   │
│   ├── parsers/                       # Document parsers
│   │   ├── __init__.py
│   │   ├── pdf_parser.py             # PDF parsing
│   │   ├── docx_parser.py            # DOCX parsing
│   │   └── txt_parser.py             # TXT parsing
│   │
│   ├── extractors/                    # Data extraction
│   │   ├── __init__.py
│   │   ├── text_extractor.py         # Text extraction
│   │   ├── skill_extractor.py        # Skill extraction
│   │   ├── experience_extractor.py   # Experience extraction
│   │   └── education_extractor.py    # Education extraction
│   │
│   ├── analyzers/                     # Analysis modules
│   │   ├── __init__.py
│   │   ├── ats_analyzer.py           # ATS compatibility
│   │   ├── keyword_analyzer.py       # Keyword matching
│   │   ├── skill_analyzer.py         # Skill analysis
│   │   └── format_analyzer.py        # Format analysis
│   │
│   ├── scoring/                       # Scoring modules
│   │   ├── __init__.py
│   │   ├── base_scorer.py            # Base scorer class
│   │   ├── ats_scorer.py             # ATS scoring
│   │   ├── keyword_scorer.py         # Keyword scoring
│   │   └── experience_scorer.py      # Experience scoring
│   │
│   ├── config.py                      # Configuration manager
│   ├── job_description.py             # Job description handler
│   ├── utils.py                       # Utility functions
│   └── logger.py                      # Logging setup
│
├── app.py                             # Flask web application
├── routes.py                          # API routes
│
├── config/                            # Configuration files
│   ├── default_config.yaml           # Default configuration
│   ├── keywords.json                 # Keyword database
│   └── job_templates.json            # Job description templates
│
├── data/                              # Data directory
│   ├── keywords/
│   ├── job_descriptions/
│   └── resumes/
│
├── templates/                         # HTML templates
│   ├── base.html
│   ├── index.html
│   ├── analyze.html
│   ├── batch.html
│   └── results.html
│
├── static/                            # Static files
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── img/
│
├── tests/                             # Unit tests
│   ├── __init__.py
│   ├── test_analyzer.py
│   ├── test_parsers.py
│   ├── test_extractors.py
│   ├── test_scoring.py
│   └── test_integration.py
│
├── examples/                          # Example scripts
│   ├── basic_analysis.py
│   ├── batch_processing.py
│   ├── custom_scoring.py
│   └── sample_resume.pdf
│
├── logs/                              # Application logs
│   └── ats_system.log
│
└── docs/                              # Documentation
    ├── API.md
    ├── CUSTOMIZATION.md
    ├── ARCHITECTURE.md
    └── EXAMPLES.md
```

---

## API Reference

### ResumeAnalyzer Class

#### Initialization

```python
ResumeAnalyzer(config=None, scorer=None, verbose=False)
```

**Parameters:**
- `config` (Config, optional): Configuration object
- `scorer` (BaseScorer, optional): Custom scorer
- `verbose` (bool): Enable verbose logging

**Returns:** ResumeAnalyzer instance

#### Methods

##### analyze_resume()

```python
analyze_resume(resume_path, job_description, detailed=False, cache=True)
```

**Parameters:**
- `resume_path` (str): Path to resume file
- `job_description` (JobDescription or str): Job requirements
- `detailed` (bool): Return detailed analysis
- `cache` (bool): Use cached results

**Returns:** dict with scores and analysis

**Example Response:**
```python
{
    'overall_score': 85.5,
    'scores': {
        'ats_score': 90,
        'keyword_score': 82,
        'experience_score': 88,
        'education_score': 85,
        'skills_score': 80
    },
    'matched_keywords': ['python', 'django', 'postgresql'],
    'missing_keywords': ['kubernetes', 'aws'],
    'recommendations': [...],
    'analysis_time': 0.234
}
```

##### set_scorer()

```python
set_scorer(scorer)
```

**Parameters:**
- `scorer` (BaseScorer): Custom scorer instance

##### extract_text()

```python
extract_text(resume_path)
```

**Parameters:**
- `resume_path` (str): Path to resume file

**Returns:** str with extracted text

##### get_statistics()

```python
get_statistics()
```

**Returns:** dict with processing statistics

---

### JobDescription Class

#### Initialization

```python
JobDescription(title=None, description=None)
```

**Parameters:**
- `title` (str): Job title
- `description` (str): Job description text

#### Methods

##### load_from_text()

```python
load_from_text(text)
```

**Parameters:**
- `text` (str): Job description text

##### load_from_file()

```python
load_from_file(file_path)
```

**Parameters:**
- `file_path` (str): Path to job description file

##### extract_keywords()

```python
extract_keywords()
```

**Returns:** dict with extracted keywords

##### get_required_skills()

```python
get_required_skills()
```

**Returns:** list of required skills

---

### BulkProcessor Class

#### Initialization

```python
BulkProcessor(num_workers=4, config=None)
```

**Parameters:**
- `num_workers` (int): Number of parallel workers
- `config` (Config, optional): Configuration object

#### Methods

##### process_directory()

```python
process_directory(resumes_dir, job_description, output_file=None, 
                  sort_by='overall_score')
```

**Parameters:**
- `resumes_dir` (str): Directory with resumes
- `job_description` (JobDescription): Job requirements
- `output_file` (str, optional): Output CSV file
- `sort_by` (str): Sort field name

**Returns:** list of results sorted by score

---

## Examples

### Example 1: Simple Resume Analysis

**File:** `examples/basic_analysis.py`

```python
#!/usr/bin/env python3

from src.analyzer import ResumeAnalyzer
from src.job_description import JobDescription

def main():
    # Initialize analyzer
    analyzer = ResumeAnalyzer(verbose=True)
    
    # Create job description
    job_desc = JobDescription("Full-Stack Developer")
    job_desc.load_from_text("""
    Required Skills:
    - Python
    - JavaScript
    - React
    - Node.js
    - PostgreSQL
    - Docker
    - AWS
    
    Required Experience:
    - 5+ years software development
    - 3+ years full-stack development
    
    Education:
    - Bachelor's in Computer Science or related field
    """)
    
    # Analyze resume
    result = analyzer.analyze_resume(
        resume_path="examples/sample_resume.pdf",
        job_description=job_desc,
        detailed=True
    )
    
    # Print results
    print("\n=== ANALYSIS RESULTS ===\n")
    print(f"Overall Score: {result['overall_score']:.2f}/100")
    print(f"\nScore Breakdown:")
    for category, score in result['scores'].items():
        print(f"  {category}: {score:.2f}")
    
    print(f"\nMatched Keywords: {', '.join(result['matched_keywords'])}")
    print(f"Missing Keywords: {', '.join(result['missing_keywords'])}")
    
    print(f"\nRecommendations:")
    for i, rec in enumerate(result['recommendations'], 1):
        print(f"  {i}. {rec}")

if __name__ == "__main__":
    main()
```

**Run:**
```bash
python examples/basic_analysis.py
```

---

### Example 2: Batch Processing

**File:** `examples/batch_processing.py`

```python
#!/usr/bin/env python3

from src.processor import BulkProcessor
from src.job_description import JobDescription
import json

def main():
    # Create processor with 4 workers
    processor = BulkProcessor(num_workers=4)
    
    # Load job description
    job_desc = JobDescription.load_from_file("config/sample_job.txt")
    
    # Process all resumes
    print("Processing resumes...")
    results = processor.process_directory(
        resumes_dir="data/resumes/",
        job_description=job_desc,
        output_file="results/ranked_candidates.csv",
        sort_by='overall_score'
    )
    
    # Display top 10
    print("\n=== TOP 10 CANDIDATES ===\n")
    for rank, result in enumerate(results[:10], 1):
        print(f"{rank:2d}. {result['filename']:40s} - Score: {result['overall_score']:6.2f}")
    
    # Export as JSON
    with open("results/full_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"\nProcessed {len(results)} resumes")
    print("Results saved to results/ directory")

if __name__ == "__main__":
    main()
```

**Run:**
```bash
python examples/batch_processing.py
```

---

### Example 3: Custom Scoring

**File:** `examples/custom_scoring.py`

```python
#!/usr/bin/env python3

from src.analyzer import ResumeAnalyzer
from src.job_description import JobDescription
from src.scoring import BaseScorer
from src.config import Config

class ExperienceFocusedScorer(BaseScorer):
    """Custom scorer that weights experience heavily"""
    
    def calculate_overall_score(self, component_scores):
        """Override to weight experience at 50%"""
        weights = {
            'ats_score': 0.10,
            'keyword_score': 0.15,
            'experience_score': 0.50,  # Heavy weight on experience
            'education_score': 0.15,
            'skills_score': 0.10
        }
        
        total = sum(
            component_scores.get(key, 0) * weight 
            for key, weight in weights.items()
        )
        return total

def main():
    # Create analyzer with custom scorer
    analyzer = ResumeAnalyzer()
    analyzer.set_scorer(ExperienceFocusedScorer())
    
    # Create job description
    job_desc = JobDescription("Senior Manager")
    job_desc.load_from_text("""
    Required Experience:
    - 10+ years management experience
    - 5+ years team leadership
    - 3+ years budget management
    """)
    
    # Analyze
    result = analyzer.analyze_resume(
        resume_path="examples/sample_resume.pdf",
        job_description=job_desc
    )
    
    print(f"Experience-Focused Score: {result['overall_score']:.2f}")
    print(f"Experience Score: {result['scores']['experience_score']:.2f}")

if __name__ == "__main__":
    main()
```

---

### Example 4: Web API Usage

```bash
# Start the server
python app.py

# In another terminal, use curl or Python
curl -X POST http://localhost:5000/api/analyze \
  -F "resume=@resume.pdf" \
  -F "job_description=Senior Developer"

# Or with Python
import requests

files = {'resume': open('resume.pdf', 'rb')}
data = {'job_description': 'Senior Python Developer'}

response = requests.post('http://localhost:5000/api/analyze', 
                        files=files, data=data)
print(response.json())
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. NLTK Data Not Found

**Error:** `LookupError: Resource punkt not found`

**Solution:**
```bash
python -m nltk.downloader punkt stopwords wordnet averaged_perceptron_tagger
```

Or in Python:
```python
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
```

---

#### 2. PDF Parsing Issues

**Error:** `Cannot process PDF file` or `Invalid PDF format`

**Solution:**
- Ensure PDF is not encrypted or corrupted
- Try converting to DOCX format
- Check file permissions
- Verify file is actual PDF (not renamed image)

```bash
# Test PDF parsing
python -c "from src.parsers.pdf_parser import PDFParser; PDFParser('resume.pdf').extract_text()"
```

---

#### 3. Memory Issues with Large Batches

**Error:** `MemoryError` or system becomes unresponsive

**Solution:**
- Reduce `num_workers` in BulkProcessor
- Process in smaller batches
- Increase system RAM or virtual memory

```python
# Process in batches
processor = BulkProcessor(num_workers=2)  # Reduce workers
```

---

#### 4. Configuration File Not Found

**Error:** `Configuration file not found: config.yaml`

**Solution:**
- Ensure config file is in correct location
- Use absolute paths
- Create default config

```python
from src.config import Config

# Use default config
config = Config.load_default()

# Or specify path
config = Config.load("/absolute/path/to/config.yaml")
```

---

#### 5. Low Matching Scores

**Possible Causes:**
- Resume doesn't contain job keywords
- Different terminology used
- Custom keyword database needed

**Solutions:**
```python
# Check extracted keywords
job_desc = JobDescription()
job_desc.load_from_text("job description text")
keywords = job_desc.extract_keywords()
print(keywords)

# Update keyword database
config.load_keywords_from_file("custom_keywords.json")
```

---

#### 6. Slow Processing

**Issue:** Analysis takes too long

**Solutions:**
```python
# Enable caching
result = analyzer.analyze_resume(
    resume_path="resume.pdf",
    job_description=job_desc,
    cache=True  # Use cached results
)

# Reduce analysis depth
config.processing.detailed_analysis = False

# Use parallel processing
processor = BulkProcessor(num_workers=8)
```

---

### Debug Mode

Enable detailed logging:

```python
import logging
from src.logger import setup_logger

logger = setup_logger(level=logging.DEBUG)
```

Or via CLI:

```bash
python -m src.cli analyze --resume resume.pdf --log-level DEBUG
```

---

### Performance Metrics

Monitor performance:

```python
from src.analyzer import ResumeAnalyzer

analyzer = ResumeAnalyzer(verbose=True)
result = analyzer.analyze_resume("resume.pdf", job_desc)

stats = analyzer.get_statistics()
print(f"Processing time: {stats['total_time']:.3f}s")
print(f"Documents processed: {stats['documents_processed']}")
print(f"Average time per document: {stats['avg_time_per_doc']:.3f}s")
```

---

## Contributing

We welcome contributions! Please follow these guidelines:

### Development Setup

```bash
# Clone repository
git clone https://github.com/kritarth-ranjan/ATS-System.git
cd ATS-System

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install with dev dependencies
pip install -r requirements-dev.txt

# Run tests
pytest tests/ -v

# Format code
black src/
flake8 src/
```

### Contribution Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Make** your changes with clear commits
4. **Test** your changes: `pytest tests/`
5. **Submit** a pull request with description

### Code Style

- Follow PEP 8 guidelines
- Use type hints where possible
- Add docstrings for all functions
- Keep lines under 100 characters
- Use descriptive variable names

### Testing

Write tests for new features:

```python
# tests/test_feature.py
import pytest
from src.feature import YourClass

class TestYourClass:
    def test_basic_functionality(self):
        obj = YourClass()
        assert obj.method() == expected_value
    
    def test_edge_cases(self):
        # Test edge cases
        pass
```

Run tests:

```bash
pytest tests/ -v --cov=src/
```

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary

- ✅ **Commercial Use**: Allowed
- ✅ **Modification**: Allowed
- ✅ **Distribution**: Allowed
- ✅ **Private Use**: Allowed
- ⚠️ **Liability**: No warranty provided
- ⚠️ **License Notice**: Must include original license

---

## Support & Acknowledgments

### Getting Help

- 📖 **Documentation**: Check [docs/](docs/) directory
- 🐛 **Issues**: Report on [GitHub Issues](https://github.com/kritarth-ranjan/ATS-System/issues)
- 💬 **Discussions**: Join [GitHub Discussions](https://github.com/kritarth-ranjan/ATS-System/discussions)

### Acknowledgments

- Built with Python and open-source libraries
- Inspired by real-world ATS systems
- Community contributions and feedback

---

## Roadmap

### Planned Features

- [ ] Multi-language support
- [ ] Resume parser improvements
- [ ] Advanced analytics dashboard
- [ ] Integration with HRIS systems
- [ ] API rate limiting and authentication
- [ ] Machine learning-based improvements
- [ ] Mobile application
- [ ] Real-time resume updates
- [ ] Employer branding analysis
- [ ] Candidate communication tools

### Version History

- **v1.0.0** (2026-01-06): Initial release
- **v0.9.0**: Beta testing
- **v0.8.0**: Core functionality

---

## Contact

**Project Owner:** Kritarth Ranjan  
**Email:** [Your Email]  
**GitHub:** [@kritarth-ranjan](https://github.com/kritarth-ranjan)  
**Website:** [Your Website]  

---

**Last Updated:** 2026-01-06 20:31:04 UTC

---

## Quick Links

- [Installation Guide](#installation)
- [Usage Examples](#examples)
- [API Documentation](#api-reference)
- [Configuration Guide](#configuration--customization)
- [Troubleshooting](#troubleshooting)
- [Contributing Guidelines](#contributing)

---

Made with ❤️ by [Kritarth Ranjan](https://github.com/kritarth-ranjan)
