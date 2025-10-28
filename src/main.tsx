import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorPage from './pages/Error';
import UserInitRequiredGuard from './layouts/UserInitRequiredGuard';
import HomePage from './pages/Home';
import MainLayout from './layouts/Main';
import PodcastsPage from './pages/Podcasts';
import ReleasesPage from './pages/Releases';
import VideosPage from './pages/Videos';
import BlogPage from './pages/Blog';
import ReleaseDetailsPage from './pages/ReleaseDetails';
import PodcastDetailsPage from './pages/PodcastDetails';
import EpisodeDetails from './pages/VideoDetails';
import BlogPostPage from './pages/BlogDetails';
import ContactUsPage from './pages/ContactUs';
import JoinPage from './pages/Join';
import BlogCategoryPage from './pages/BlogCategory';
import VideoDetailsPage from './pages/VideoDetails';
import VideoCategoryPage from './pages/videoCategory';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />, //if bug happend in the main layout (error Boundry)
    element: <MainLayout />,
    children: [
      {
        errorElement: <ErrorPage />, //handle pages error so keep the layout visable (error Boundry)
        children: [
          {
            path: '',
            element: <HomePage />
          },
          {
            path: '/تواصل-معنا',
            element: <ContactUsPage />
          },
          {
            path: '/أشتراك-حقق',
            element: <JoinPage />
          },
          {
            path: '/البودكاست',
            children: [
              { index: true, element: <PodcastsPage /> },
              { path: 'الحلقات', children: [{ path: ':id', element: <EpisodeDetails /> }] },
              { path: ':id', element: <PodcastDetailsPage /> }
            ]
          },
          {
            path: '/إصدارات',
            children: [
              { index: true, element: <ReleasesPage /> },
              { path: ':id', element: <ReleaseDetailsPage /> }
            ]
          },
          {
            path: '/الفيديوهات',
            children: [
              { index: true, element: <VideosPage /> },
              { path: 'تصنيف', children: [{ path: ':id', element: <VideoCategoryPage /> }] },
              { path: ':id', element: <VideoDetailsPage /> }
            ]
          },

          {
            path: '/المدونة',
            children: [
              { index: true, element: <BlogPage /> },
              { path: 'تصنيف', children: [{ path: ':id', element: <BlogCategoryPage /> }] },
              { path: ':id', element: <BlogPostPage /> }
            ]
          },

          //Protected Routes
          {
            element: <UserInitRequiredGuard />,
            children: []
          }
        ]
      }
    ]
  }
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, //10 minutes
      gcTime: 1000 * 60 * 15, //15 minutes
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
