FitJobs – Job Board Web Application

FitJobs is a modern job board platform that allows users to browse job listings with filters, post new opportunities, and authenticate via Google using Supabase Auth. The application is built with React (Vite + TypeScript) and leverages Supabase for backend services like authentication and data storage. It features a clean UI with dark/light mode support and is deployed to Vercel for seamless continuous deployment.

Local Setup Instructions

Follow the steps below to run the project locally:

1. Clone the repository
git clone https://github.com/ritikrikm/FJB.git
cd Project
2. Install dependencies
npm install
3. Configure environment variables
Create a .env file in the root of the project and add the following:

VITE_SUPABASE_URL=https://yrruwiehhdreixcwuvam.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_aJaGXM5R7mn-sgXnQdB9gA_jaUEG2W3   
[not shareable]
only in our Supabase project dashboard.
4. Run the development server
npm run dev
This will start the app at http://localhost:5173 by default.

Deployed Application

The production version of this app is live and accessible at:

https://fjb-test.vercel.app

All authentication and Supabase features are fully functional in production, including Google OAuth sign-in and job posting functionality.

------------------------------------------------------------------------------------------

ApplicationModal.tsx – What Was Changed
1. Cleaned up the code by wrapping all form and file handlers in useCallback to make the app run more efficiently.
2. Added accessibility tags (like role="dialog") so screen readers can understand and navigate the modal better.
3. Improved the resume upload logic – it now checks that the file is a PDF and under 10MB, and gives helpful alerts if not.
4. Made sure the form resets properly after submitting and closing the modal.
5. Improved the user experience by changing the border color and messages when dragging or uploading a file, so it's clearer what’s happening.

Header.tsx – What Was Changed
1. Added Google login/logout logic using Supabase Auth — the header now shows “Sign In” or “Welcome, [username]” with a logout option.
2. Replaced old static <a href="#"> links with proper React Router <Link> components for client-side routing.
3. Made Sign In interactive by using onSignIn() from props, so clicking it actually triggers the login flow.
4. Improved props interface by adding optional userName and onSignIn for better user control and flexibility.

App.tsx – What Was Changed
1. Integrated Supabase Auth to check user session and listen for login/logout events, enabling personalized features like showing  the user’s email and a dashboard widget.
2. Added SignInModal and logic to open/close it when the user clicks “Sign In” from the header.
Lazy loaded large modals (PostJobModal, JobDetailModal) using React.lazy and Suspense to improve performance and reduce initial load time.
3. Moved filtering logic into a custom hook (useJobFilters) for cleaner code and better separation of concerns.
Cleaned up mock job data by importing it from a separate file (mockJobs.ts), keeping the main file focused only on app logic.

SearchFilters.tsx – What Was Changed
1. Refactored repetitive JSX into a dynamic filterConfig array, making the component easier to scale by just adding a new config item instead of copy-pasting UI blocks.
2. Introduced TypeScript types (BaseFilterConfig, SelectFilterConfig, TextFilterConfig) to clearly define and validate the shape of each filter type.
3. Made the component more reusable and future-proof — you can now add a new filter (e.g., salary, sport type) in seconds by updating the config list.
4. Improved performance slightly by wrapping the component with React.memo() to prevent unnecessary re-renders.
5. Cleaned up code by removing hardcoded filter fields and instead looping through a single filterConfig, improving readability and maintainability.

Overall Project Changes Summary
1. Refactored the entire project structure into a modular and scalable layout with separate folders for components, hooks, services, types, and data.
2. Integrated Supabase Auth with Google OAuth login, session tracking, and logout support.
3. Reorganized and optimized UI components like ApplicationModal, SearchFilters, and Header for better reusability, cleaner code, and improved performance.
4. Added custom hooks (like useJobFilters) and helper utilities to separate logic from presentation, making the codebase more maintainable.
5. Enabled lazy loading for large components to improve initial load speed.
Deployed the app on Vercel with environment variables and authentication working correctly in production.
6. Created a README with setup instructions, live demo link, and clean documentation.
