import React from 'react';
import { DatabaseProvider, useDatabase } from './context/DatabaseContext';
import { RouterProvider, useRouter, Link } from './context/RouterContext';
import { ModalProvider, useModals } from './context/ModalContext';

// Modals
import { BookDemoModal } from './components/public/modals/BookDemoModal';
import { DayWithBeeModal } from './components/public/modals/DayWithBeeModal';

// Public Components
import { Navbar } from './components/public/Navbar';
import { Footer } from './components/public/Footer';
import { HomePage } from './components/public/HomePage';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { PricingPage } from './components/public/PricingPage';
import { TargoPage } from './components/targo/TargoPage';
import { ServicesPage } from './components/public/ServicesPage';
import { ServiceDetailPage } from './components/public/ServiceDetailPage';
import { SolutionsPage } from './components/public/SolutionsPage';
import { SolutionDetailPage } from './components/public/SolutionDetailPage';
import { ProjectsPage } from './components/public/ProjectsPage';
import { ProjectDetailPage } from './components/public/ProjectDetailPage';
import { CaseStudiesPage } from './components/public/CaseStudiesPage';
import { CaseStudyDetailPage } from './components/public/CaseStudyDetailPage';
import { AboutPage } from './components/public/AboutPage';
import { ContactPage } from './components/public/ContactPage';
import { BlogPage } from './components/public/BlogPage';
import { BlogPostPage } from './components/public/BlogPostPage';
import { ReadingProgressBar } from './components/shared/ReadingProgressBar';
import { motion, AnimatePresence } from 'motion/react';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminProjects } from './components/admin/AdminProjects';
import { AdminCaseStudies } from './components/admin/AdminCaseStudies';
import { AdminServices } from './components/admin/AdminServices';
import { AdminSolutions } from './components/admin/AdminSolutions';
import { AdminInquiries } from './components/admin/AdminInquiries';
import { AdminMedia } from './components/admin/AdminMedia';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminBackendNotice } from './components/admin/AdminBackendNotice';

const AppContent: React.FC = () => {
  const { path } = useRouter();
  const { auth } = useDatabase();
  const { isDemoOpen, isDayTimelineOpen, closeDemo, closeDayTimeline, openDemo } = useModals();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  // ================= ADMIN ROUTING =================
  if (path === '/admin/login') {
    return <AdminLogin />;
  }

  if (path.startsWith('/admin')) {
    // Auth Guard
    if (!auth.isAuthenticated) {
      return <AdminLogin />;
    }

    let adminChild: React.ReactNode = <AdminDashboard />;

    if (path === '/admin' || path === '/admin/') {
      adminChild = <AdminDashboard />;
    } else if (path.startsWith('/admin/projects')) {
      adminChild = <AdminProjects />;
    } else if (path.startsWith('/admin/case-studies')) {
      adminChild = <AdminCaseStudies />;
    } else if (path.startsWith('/admin/services')) {
      adminChild = <AdminServices />;
    } else if (path.startsWith('/admin/solutions')) {
      adminChild = <AdminSolutions />;
    } else if (path.startsWith('/admin/blog')) {
      adminChild = <AdminBackendNotice title="Blog management is not available" detail="The current backend contract exposes projects, case studies, services, solutions, leads, and media. Blog CRUD is not exposed, so this screen does not write to local-only data." />;
    } else if (path.startsWith('/admin/inquiries')) {
      adminChild = <AdminInquiries />;
    } else if (path.startsWith('/admin/media')) {
      adminChild = <AdminMedia />;
    } else if (path.startsWith('/admin/users')) {
      adminChild = <AdminBackendNotice title="User management is not available" detail="The backend intentionally does not expose a user administration API. Roles are assigned server-side and users cannot change their own role." />;
    } else if (path.startsWith('/admin/settings')) {
      adminChild = <AdminSettings />;
    } else {
      adminChild = <AdminDashboard />;
    }

    return <AdminLayout>{adminChild}</AdminLayout>;
  }

  // ================= TARGO SINGLE-PAGE MODE =================
  if (path === '/targo' || path === '/targo/') {
    return (
      <div className="relative min-h-screen">
        <TargoPage />
      </div>
    );
  }

  // ================= PUBLIC ROUTING =================
  const renderPublicContent = () => {
    // Exact match home
    if (path === '/' || path === '') {
      return <HomePage />;
    }

    // Dedicated How It Works Page
    if (path === '/how-it-works' || path === '/how-it-works/') {
      return <HowItWorksPage />;
    }

    // Dedicated Pricing Page
    if (path === '/pricing' || path === '/pricing/') {
      return <PricingPage />;
    }

    // Services
    if (path === '/services' || path === '/services/') {
      return <ServicesPage />;
    }
    if (path.startsWith('/services/category/')) {
      const categorySlug = path.replace('/services/category/', '').split('/')[0];
      return <ServicesPage categorySlug={categorySlug} />;
    }
    if (path.startsWith('/services/')) {
      const slug = path.replace('/services/', '').split('/')[0];
      return <ServiceDetailPage slug={slug} />;
    }

    // Solutions
    if (path === '/solutions' || path === '/solutions/') {
      return <SolutionsPage />;
    }
    if (path.startsWith('/solutions/category/')) {
      const categorySlug = path.replace('/solutions/category/', '').split('/')[0];
      return <SolutionsPage categorySlug={categorySlug} />;
    }
    if (path.startsWith('/solutions/')) {
      const slug = path.replace('/solutions/', '').split('/')[0];
      return <SolutionDetailPage slug={slug} />;
    }

    // Projects
    if (path === '/projects' || path === '/projects/') {
      return <ProjectsPage />;
    }
    if (path.startsWith('/projects/')) {
      const slug = path.replace('/projects/', '').split('/')[0];
      return <ProjectDetailPage slug={slug} />;
    }

    // Case Studies
    if (path === '/case-studies' || path === '/case-studies/') {
      return <CaseStudiesPage />;
    }
    if (path.startsWith('/case-studies/')) {
      const slug = path.replace('/case-studies/', '').split('/')[0];
      return <CaseStudyDetailPage slug={slug} />;
    }

    // About
    if (path === '/about' || path === '/about/') {
      return <AboutPage />;
    }

    // Contact
    if (path === '/contact' || path === '/contact/') {
      return <ContactPage />;
    }

    // Blog
    if (path === '/blog' || path === '/blog/') {
      return <BlogPage />;
    }
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '').split('/')[0];
      return <BlogPostPage slug={slug} />;
    }

    // 404 Fallback
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-white">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0282EB] bg-blue-50 px-3 py-1 rounded-full mb-3">
          404 Not Found
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Page Not Located
        </h1>
        <p className="text-slate-500 text-sm max-w-md mt-2">
          The requested system endpoint or document does not exist or has been relocated.
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-2.5 bg-[#0282EB] text-white text-xs font-semibold rounded-xl hover:bg-[#1d58c4] transition-colors"
        >
          Return to Overview
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-900 font-sans selection:bg-blue-100 selection:text-[#0282EB]">
      {/* Tech background overlay (brand blue) */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(2,130,235,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(2,130,235,0.045) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 120% 90% at 50% 0%, black 35%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 120% 90% at 50% 0%, black 35%, transparent 100%)",
          }}
        />
        <div className="absolute -top-48 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[#0282EB]/10 blur-[130px]" />
        <div className="absolute top-[38%] -right-56 h-[520px] w-[520px] rounded-full bg-[#00C6D7]/8 blur-[130px]" />
        <div className="absolute -bottom-56 -left-40 h-[520px] w-[520px] rounded-full bg-[#0282EB]/8 blur-[130px]" />
      </div>

      <Navbar />
      <main className="flex-1 w-full relative">
        <ReadingProgressBar />
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {renderPublicContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Global Interactive Modals */}
      <BookDemoModal isOpen={isDemoOpen} onClose={closeDemo} />
      <DayWithBeeModal
        isOpen={isDayTimelineOpen}
        onClose={closeDayTimeline}
        onOpenDemo={openDemo}
      />
    </div>
  );
};

export default function App() {
  return (
    <DatabaseProvider>
      <RouterProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </RouterProvider>
    </DatabaseProvider>
  );
}
