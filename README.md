# Martin Nolan Portfolio

Modern personal portfolio with AI-powered chat assistant and cloud-hosted content management.

## Features

- 🎨 Responsive design with dark/light theme support
- 🤖 AI chat assistant powered by GitHub Models
- 📄 Secure PDF resume viewer with proxy protection
- ☁️ Cloud CMS integration via **Strapi Cloud**

## Architecture

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **CMS**: Strapi Cloud hosted at `https://your-instance.strapiapp.com`
- **AI**: GitHub Models integration for chat assistant

## Tech Stack

Next.js 15 · React · TypeScript · Tailwind CSS · shadcn/ui · Strapi Cloud

## Quick Start

### Prerequisites

- Node.js 18+
- GitHub Models API access
- Environment variables configured

### Installation

```bash
git clone https://github.com/martin-nolan/martinnolan-dev.git
cd martinnolan-dev
npm install
cp .env.example .env.local
```

### Environment Configuration

Add your API keys to `.env.local`:

```bash
# Required for AI chat functionality
GITHUB_TOKEN=your_github_models_token

# Required for CMS content (uses cloud instance)
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-instance.strapiapp.com/api

# Optional: Enhanced CMS features
STRAPI_API_TOKEN=your_strapi_token

# Optional: Contact form integration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio.

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Type checking and linting
npm run test:build
```

## CMS Content Management

Content is managed through **Strapi Cloud**:

- **Admin Panel**: `https://your-strapi-instance-url/admin`
- **API Endpoint**: `https://your-instance.strapiapp.com/api`
- **Media CDN**: `https://your-instance.media.strapiapp.com`

The portfolio automatically syncs with cloud content updates.

## Contact

[LinkedIn](https://linkedin.com/in/martinnolan0110) · [Email](mailto:martinnolan_1@hotmail.co.uk)

## License

MIT — Fork/adapt for your own use.
