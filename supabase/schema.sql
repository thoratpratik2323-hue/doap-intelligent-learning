-- ========================================================================
-- DOAP Application — Comprehensive Supabase PostgreSQL Schema
-- Run this script inside your Supabase Dashboard SQL Editor
-- ========================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT DEFAULT '',
  university TEXT DEFAULT 'IIT Bombay',
  course TEXT DEFAULT 'B.Tech Computer Science',
  year TEXT DEFAULT '3rd Year',
  education TEXT DEFAULT 'Undergraduate',
  bio TEXT DEFAULT 'CS student passionate about AI and building things that matter.',
  skills TEXT[] DEFAULT ARRAY['React', 'Python', 'Machine Learning', 'Data Structures', 'System Design', 'SQL']::TEXT[],
  interests TEXT[] DEFAULT ARRAY['Artificial Intelligence', 'Open Source', 'UI Design']::TEXT[],
  career_goals TEXT[] DEFAULT ARRAY['Become an AI Engineer']::TEXT[],
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. INTERVIEW POSITIONS TABLE
CREATE TABLE IF NOT EXISTS public.interview_positions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  level TEXT NOT NULL,
  experience TEXT NOT NULL,
  openings INT DEFAULT 1,
  duration TEXT DEFAULT '30 min',
  match_score INT DEFAULT 85,
  description TEXT,
  responsibilities TEXT[] DEFAULT ARRAY[]::TEXT[],
  requirements TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. INTERVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  position_id TEXT NOT NULL,
  config JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'IN_PROGRESS', -- 'IN_PROGRESS' | 'COMPLETED' | 'TERMINATED_PROCTORING_VIOLATION'
  overall_score INT,
  technical_score INT,
  communication_score INT,
  proctoring_status TEXT DEFAULT 'PASSED',
  strike_count INT DEFAULT 0,
  evaluation JSONB DEFAULT '{}'::jsonb,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PROCTORING EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.proctoring_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id UUID REFERENCES public.interviews(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  severity TEXT DEFAULT 'WARNING',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. RESOURCES TABLE
CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subject_id TEXT DEFAULT 'Computer Science',
  semester TEXT DEFAULT 'Semester 3',
  size TEXT DEFAULT '2.4 MB',
  resource_type TEXT DEFAULT 'Lecture Notes',
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. STUDY TASKS TABLE
CREATE TABLE IF NOT EXISTS public.study_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  time_scheduled TEXT DEFAULT '10:00',
  duration TEXT DEFAULT '45m',
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proctoring_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_tasks ENABLE ROW LEVEL SECURITY;

-- 8. POLICIES (Users can manage only their own records)
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own interviews" 
  ON public.interviews FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interviews" 
  ON public.interviews FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own study tasks" 
  ON public.study_tasks FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Public read for interview positions" 
  ON public.interview_positions FOR SELECT 
  TO authenticated, anon 
  USING (true);

CREATE POLICY "Public read for learning resources" 
  ON public.resources FOR SELECT 
  TO authenticated, anon 
  USING (true);
