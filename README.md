# StudentPath - College Registration System

A comprehensive platform for college registration with token-based student access system.

## Features

- **College Registration**: Colleges can register and get unique tokens
- **Token-based Student Access**: Students can only register using valid college tokens
- **Multiple User Types**: Support for Students, Professionals, and Colleges
- **MySQL Database**: Full database integration with proper schema
- **Token Validation**: Real-time token validation with usage tracking
- **Responsive Design**: Modern UI with dark theme and animations

## Database Schema

The system uses MySQL with the following main tables:

- `colleges`: College information and credentials
- `students`: Student profiles linked to colleges
- `professionals`: Professional user profiles
- `college_tokens`: Token management and usage tracking

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Create a MySQL database named `studentpath`
2. Update your environment variables in `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=studentpath
DB_PORT=3306
```

3. Initialize the database:

```bash
npm run init-db
```

### 3. Run the Application

```bash
npm run dev
```

## Usage Flow

### College Registration
1. Visit `/register` and select "I'm a College"
2. Fill in college details (3-step process)
3. Upon successful registration, redirect to college login page
4. Login with college credentials to access admin dashboard
5. Copy the registration token/URL from the dashboard header to share with students

### Student Registration
1. Students must use a valid college token in the URL: `/register/student?token=COLLEGE_TOKEN`
2. If no token or invalid token, an error dialog is shown
3. Students can only access registration through token-specific endpoint
4. Main `/register` page only shows college and professional options

### Token Management
- Each college gets a unique 20-character token
- Tokens have usage limits (default: 1000 students)
- Token validation happens in real-time
- Invalid/expired tokens show appropriate error messages

## API Endpoints

- `POST /api/auth/register-college` - College registration
- `POST /api/auth/register-student` - Student registration with token validation
- `POST /api/auth/login-college` - College login authentication
- `GET /api/auth/validate-token?token=TOKEN` - Token validation
- `GET /api/admin/college-data?collegeId=ID` - Get college dashboard data

## URL Structure

- **College Registration**: `/register` (select college option)
- **Professional Registration**: `/register` (select professional option)
- **Student Registration**: `/register/student?token=COLLEGE_TOKEN` (token required)
- **Student Login**: `/login?token=COLLEGE_TOKEN`
- **College Login**: `/college-login`
- **College Admin Dashboard**: `/admin`
- **Professional Login**: `/professional-login`

## Security Features

- Password hashing with bcrypt
- Token-based access control
- Usage limits on college tokens
- Input validation and sanitization
- SQL injection protection with prepared statements

## Database Tables

### Colleges Table
- Basic college information
- Contact details
- Programs offered
- Unique college token

### Students Table
- Student profile information
- Academic details
- Career goals and preferences
- Linked to college via college_id

### College Tokens Table
- Token management
- Usage tracking
- Expiration handling
- Active/inactive status

## Environment Variables

Create a `.env` file with:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=studentpath
DB_PORT=3306

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# JWT Secret for token generation
JWT_SECRET=your_jwt_secret_key
```

## Development

The project uses:
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Radix UI components
- MySQL with mysql2
- bcryptjs for password hashing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
