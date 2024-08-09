# Covid19 Patient Hub

Covid19 Patient Hub is a comprehensive dashboard application designed to provide real-time insights and visualization of the COVID-19 pandemic. It includes a patient management system to streamline the handling of COVID-19 patients, as well as advanced data visualization tools powered by Chart.js and React-Leaflet.
## Watch the video by clicking on the thumbnail below:
[![API Endpoints](https://img.youtube.com/vi/QT5WMoYbWpQ/maxresdefault.jpg)](https://www.youtube.com/embed/QT5WMoYbWpQ?si=c7BNcL-kv7TiprMA)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Data Sources](#data-sources)
- [Patient Management System](#patient-management-system)
- [Data Visualization](#data-visualization)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time COVID-19 case tracking
- Global and country-specific data visualization
- Trend analysis with charts and graphs
- Customizable dashboard layout
- Alerts and notifications for critical updates (under development)
- Export data in various formats (CSV, PDF, etc.) (under development)
- Role-based access control (under development)
- **Patient Management System**:
  - Patient registration and profile management
  - Patient health status tracking (symptoms, test results, treatment) (under development)
  - Appointment scheduling and management (under development)
  - Secure patient data storage and retrieval 
  - Reporting and analytics for patient data
- **Data Visualization**:
  - Worldwide COVID-19 data (cases, deaths, recoveries)
  - Country-specific COVID-19 data (cases, deaths, recoveries)
  - Historical COVID-19 data with trend analysis

## Tech Stack

- **Frontend:**
  - Next.js 14.2.5: React framework for building user interfaces
  - TypeScript: Typed superset of JavaScript for improved developer experience
  - Tailwind CSS: Utility-first CSS framework for rapid UI development
  - Shadcn UI: Customizable UI component library
  - Chart.js: Powerful data visualization library for creating charts and graphs
  - React-Leaflet: React components for the Leaflet mapping library

- **Backend:**
  - Next.js API Routes: Serverless API endpoints
  - Prisma ORM: Next-generation ORM for Node.js and TypeScript

- **Database:**
  - Supabase: Open-source Firebase alternative, providing PostgreSQL database

- **Authentication:**
  - Clerk: Complete user management solution

- **Deployment:**
  - Vercel: Platform for deploying and scaling Next.js applications

## Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v20.0.0 or higher)
- npm (v10.0.0 or higher) 
- Git

## Installation

1. Clone the repository:
```
git clone https://github.com/Shivkumar-Raghuwanshi/covid19-patient-hub.git
```

2. Navigate to the project directory:
```
cd covid19-patient-hub
```

3. Install dependencies:
```
npm install
```

## Configuration

1. Create a `.env.local` file in the root directory of the project.

2. Add the following environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
DATABASE_URL=
DIRECT_URL=
```

## Running the Application

To run the application in development mode:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

## Data Sources

The Covid19 Patient Hub retrieves data from the following sources:

- [disease.sh API](https://disease.sh/v3/covid-19/all) for worldwide COVID-19 data
- [disease.sh API](https://disease.sh/v3/covid-19/countries) for country-specific COVID-19 data
- [disease.sh API](https://disease.sh/v3/covid-19/historical/all?lastdays=all) for historical COVID-19 data

Make sure to obtain the necessary API keys and configure them in your environment variables.

## Patient Management System

The Covid19 Patient Hub includes a comprehensive patient management system that allows healthcare providers to:

- Register and manage patient profiles
- Track patient health status, including symptoms, test results, and treatment
- Schedule and manage patient appointments
- Securely store and retrieve patient data
- Generate reports and analytics for patient data

## Data Visualization

The application leverages Chart.js and React-Leaflet to provide advanced data visualization capabilities:

- Worldwide COVID-19 data displayed on a global map using React-Leaflet
- Country-specific COVID-19 data presented in charts and graphs using Chart.js
- Historical COVID-19 data trends analyzed through interactive line charts and graphs

## Authentication

Covid19 Patient Hub uses Clerk for user authentication and management. Refer to the [Clerk documentation](https://clerk.dev/docs) for detailed information on setting up and customizing authentication flows.

## Deployment

This project is configured for seamless deployment on Vercel:

1. Connect your GitHub repository to Vercel.
2. Configure the environment variables in your Vercel project settings.
3. Deploy the application.

Vercel will automatically build and deploy your application on every push to the main branch.

## Contributing

We welcome contributions to the Covid19 Patient Hub! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE).
