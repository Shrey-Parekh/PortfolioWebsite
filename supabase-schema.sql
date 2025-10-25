-- macOS Portfolio Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  replied BOOLEAN DEFAULT FALSE
);

-- Projects Table (optional, for CMS)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  thumbnail_url TEXT,
  live_url TEXT,
  github_url TEXT,
  technologies TEXT[],
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'in-progress', 'planned')),
  date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills Table (optional, for dynamic skills management)
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  category TEXT NOT NULL,
  color TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample skills data
INSERT INTO skills (name, level, category, color, icon) VALUES
('React', 95, 'frontend', 'bg-blue-500', 'Code'),
('TypeScript', 90, 'frontend', 'bg-blue-600', 'Code'),
('Next.js', 85, 'frontend', 'bg-gray-800', 'Code'),
('Tailwind CSS', 95, 'frontend', 'bg-cyan-500', 'Palette'),
('Three.js', 80, 'frontend', 'bg-gray-700', 'Globe'),
('Node.js', 90, 'backend', 'bg-green-600', 'Code'),
('Express', 85, 'backend', 'bg-gray-600', 'Code'),
('PostgreSQL', 85, 'database', 'bg-blue-700', 'Database'),
('MongoDB', 80, 'database', 'bg-green-600', 'Database'),
('AWS', 80, 'cloud', 'bg-orange-500', 'Cloud'),
('Docker', 85, 'cloud', 'bg-blue-600', 'Cloud');

-- Insert sample projects data
INSERT INTO projects (title, description, long_description, technologies, category, featured, status, date) VALUES
('macOS Portfolio Website', 'A pixel-perfect macOS-themed portfolio built with React, Three.js, and Tailwind CSS.', 'This project showcases advanced React development skills with a focus on creating a native macOS experience in the browser. Features include 3D graphics, smooth animations, and responsive design.', ARRAY['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion'], 'web', true, 'completed', '2024-01'),
('E-Commerce Platform', 'Full-stack e-commerce solution with real-time inventory management.', 'A comprehensive e-commerce platform built with modern technologies, featuring real-time updates, payment processing, and admin dashboard.', ARRAY['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'], 'web', true, 'completed', '2023-11'),
('Task Management App', 'Collaborative task management with real-time synchronization.', 'A modern task management application with real-time collaboration features, drag-and-drop interface, and team management capabilities.', ARRAY['React', 'Socket.io', 'MongoDB', 'Express', 'JWT'], 'web', false, 'completed', '2023-09');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);

-- Row Level Security (RLS) policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects and skills
CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access to skills" ON skills FOR SELECT USING (true);

-- Allow public insert access to contact_messages
CREATE POLICY "Allow public insert access to contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update contact_messages
CREATE POLICY "Allow authenticated users to update contact_messages" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for projects table
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
