# ESG Emissions Data Review Platform

A prototype ESG emissions data ingestion and analyst review platform built for the BreatheESG internship assignment.

---

# Features

- Upload SAP fuel data CSVs
- Upload utility electricity data CSVs
- Upload corporate travel CSVs
- Normalize records into a unified activity model
- Flag suspicious emissions records
- Analyst approve/reject workflow
- Audit trail tracking
- React dashboard UI
- Django REST API backend

---

# Tech Stack

## Backend
- Django
- Django REST Framework
- SQLite
- Pandas

## Frontend
- React
- Axios
- Vite

---

# Architecture

The system ingests emissions-related activity data from multiple enterprise sources and normalizes them into a unified structure.

### Supported Sources

| Source | Example |
|---|---|
| SAP | Fuel consumption exports |
| Utility | Electricity billing CSVs |
| Travel | Corporate travel records |

---

# Data Flow

1. User uploads CSV file
2. Backend parses CSV using Pandas
3. Data normalized into unified activity model
4. Suspicious records flagged
5. Analysts review records
6. Audit log captures decisions

---

# Suspicious Detection Rules

| Source | Rule |
|---|---|
| SAP | Negative fuel quantity |
| Utility | Excessive electricity usage |
| Travel | Missing airport data |

---

# Running Locally

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Sample CSV Files

## SAP

```csv
Plant,Material,FuelQty,Unit,Date
DE01,Diesel,1000,L,2026-05-01
DE02,Petrol,-200,L,2026-05-03
```

## Utility

```csv
Building,kWh,BillingEnd
HQ,12000,2026-05-01
PlantA,200000,2026-05-02
```

## Travel

```csv
Employee,FromAirport,ToAirport,TravelDate
John,DEL,BOM,2026-05-01
Alice,,BLR,2026-05-03
```

---

# Design Decisions

- CSV ingestion chosen for realistic enterprise workflow simulation
- Raw uploads preserved for traceability
- Normalized model created for downstream emissions processing
- Suspicious flags implemented for analyst review workflows
- SQLite used for lightweight prototype simplicity

---

# Future Improvements

- Authentication and RBAC
- Emissions factor calculations
- Cloud storage integration
- OCR invoice ingestion
- Bulk asynchronous processing
- Advanced anomaly detection

---

# Author

Assignment submission for BreatheESG internship opportunity.
