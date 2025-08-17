# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this portfolio application, please report it responsibly:

### How to Report

- **Email**: [martinnolan_1@hotmail.co.uk](mailto:martinnolan_1@hotmail.co.uk)
- **Subject**: "Security Vulnerability Report - Portfolio"

### What to Include

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact assessment
4. Suggested fix (if available)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 1 week
- **Resolution**: Depends on severity and complexity

## Security Measures

### Application Security

- **Content Security Policy** - Strict CSP headers implemented
- **HTTPS Enforcement** - All connections secured
- **Input Validation** - All user inputs sanitized
- **Rate Limiting** - API endpoints protected
- **Error Handling** - No sensitive information exposed

### Dependencies

- Regular security audits via `npm audit`
- Automated dependency updates
- Minimal attack surface with carefully selected packages

### Data Privacy

- **No Personal Data Storage** - No user data persisted
- **Anonymous Chat** - AI conversations not logged
- **Contact Form** - Direct email, no database storage
- **Analytics** - No tracking scripts or third-party analytics

### Environment Security

- Environment variables for sensitive data
- No hardcoded secrets or API keys
- Secure token handling for GitHub Models API

## Security Best Practices for Users

If you fork this repository:

1. **Update Dependencies** - Run `npm audit` and update packages
2. **Environment Variables** - Never commit `.env` files
3. **API Keys** - Use environment variables for all secrets
4. **Personal Content** - Remove all personal information and content
5. **Rate Limiting** - Implement appropriate rate limits for APIs

## Acknowledgments

This project follows security best practices and is regularly updated to address potential vulnerabilities.
