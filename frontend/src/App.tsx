import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { useThemeEffect } from "@/hooks/useTheme";
import HomePage from "@/pages/HomePage";
import TopicsPage from "@/pages/TopicsPage";
import TopicDetailPage from "@/pages/TopicDetailPage";
import ProblemsPage from "@/pages/ProblemsPage";
import ProblemWorkspacePage from "@/pages/ProblemWorkspacePage";
import DashboardPage from "@/pages/DashboardPage";
import BookmarksPage from "@/pages/BookmarksPage";
import SubmissionsPage from "@/pages/SubmissionsPage";
import NotFoundPage from "@/pages/NotFoundPage";

function App() {
  useThemeEffect();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:topic" element={<TopicDetailPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problems/:slug" element={<ProblemWorkspacePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
