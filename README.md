# Abdul-Samad Olagunju | Commercial Real Estate Advisory

A professional personal website for Abdul-Samad Olagunju, Commercial Real Estate Advisor at Cresa Real Estate.

## 🏗️ Built With

- **Framework**: [Next.js 13](https://nextjs.org/) (Pages Router)
- **Styling**: [Chakra UI](https://chakra-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
├── components/
│   ├── Layout.js           # Main layout wrapper with nav/footer
│   ├── Navigation.js       # Responsive navigation with mobile drawer
│   ├── FooterNew.js        # Professional footer with newsletter CTA
│   ├── Section.js          # Reusable animated section wrapper
│   ├── SectionHeading.js   # Consistent section title component
│   ├── ServiceCard.js      # Service display cards
│   ├── ClientLogos.js      # Client logo carousel
│   ├── Container.js        # Legacy container (deprecated)
│   ├── Footer.js           # Legacy footer (deprecated)
│   └── DarkModeSwitch.js   # Color mode toggle
│
├── pages/
│   ├── _app.js             # App wrapper with theme & analytics
│   ├── _document.js        # Document with fonts & meta tags
│   ├── index.js            # Home page
│   ├── about.js            # About page
│   ├── services.js         # Services page
│   ├── technology.js       # Technology page with calculator
│   ├── contact.js          # Contact page with form
│   ├── 404.js              # Custom 404 page
│   └── api/                # API routes
│
├── styles/
│   └── theme.js            # Chakra UI theme customization
│
└── public/
    └── images/             # Static images
```

## 🎨 Design System

### Colors

- **Navy palette**: Primary brand colors (navy.50 - navy.900)
- **Accent Gold**: #c9a227 - Used for highlights and CTAs
- **Surface**: Warm neutrals for backgrounds

### Typography

- **Headings**: Instrument Serif - Elegant, professional serif
- **Body**: DM Sans - Clean, modern sans-serif

### Components

All components follow these principles:
- Fully responsive (mobile-first)
- Accessible (ARIA labels, semantic HTML)
- Animated (subtle fade-ins and hover states)
- Consistent spacing using theme tokens

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_MEASUREMENT_ID=your-google-analytics-id
```

## 📄 Pages

### Home (`/`)
- Hero section with value proposition
- Client logos carousel
- Value proposition cards (Strategy, Brokerage, Technology)
- Featured technology section with TerraTrail embed
- Newsletter signup CTA

### About (`/about`)
- Professional narrative and background
- Core values section
- Areas of expertise
- Call-to-action

### Services (`/services`)
- Core Services (Transaction Management, Workplace Consulting, Lease Admin)
- Strategy & Analytics (Strategy, Location, Labor Analytics, Incentives)
- Technology & Intelligence feature section
- Process walkthrough

### Technology (`/technology`)
- Technology capabilities overview
- Featured project: TerraTrail 3D visualization
- Interactive Office Space Calculator
- Technology philosophy section

### Contact (`/contact`)
- Contact information cards
- Meeting scheduling CTA
- Contact form
- Newsletter subscription

## 🔧 Key Features

### Office Space Calculator
Interactive tool that estimates space requirements based on:
- Headcount (10-500)
- Work style (Traditional, Hybrid, Agile)
- Desking ratio (50-100%)

### TerraTrail Integration
Embedded 3D visualization platform for office-to-residential conversions.

### Newsletter Integration
Links to MailerLite subscription form throughout the site.

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **sm**: 480px
- **md**: 768px
- **lg**: 992px
- **xl**: 1280px
- **2xl**: 1536px

## 🌐 Deployment

This site is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

## 📝 License

Private - All rights reserved.

## 👤 Author

**Abdul-Samad Olagunju**
- Commercial Real Estate Advisor at [Cresa](https://www.cresa.com)
- [LinkedIn](https://www.linkedin.com/in/abdul-samad-olagunju-727877167/)
