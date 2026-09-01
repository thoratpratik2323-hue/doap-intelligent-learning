import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { 
  COURSES_DATA, 
  RESOURCES_DATA, 
  ASSESSMENTS_DATA, 
  INITIAL_STUDY_TASKS, 
  ACHIEVEMENTS_DATA 
} from '../data/mockData';
import { POSITIONS_LIST } from '../data/positionsData';

// Service layer querying Supabase database tables with graceful fallback to mockData structures

export const getInterviewPositions = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return POSITIONS_LIST;
  }

  try {
    const { data, error } = await supabase
      .from('interview_positions')
      .select('*');

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (e) {
    console.warn("Supabase positions query fallback to local:", e);
  }

  return POSITIONS_LIST;
};

export const getLearningResources = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return RESOURCES_DATA;
  }

  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map(r => ({
        id: r.id,
        title: r.title,
        subject: r.subject_id || 'Computer Science',
        semester: r.semester || 'Semester 3',
        size: r.size || '2.4 MB',
        date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        type: r.resource_type
      }));
    }
  } catch (e) {
    console.warn("Supabase resources query fallback to local:", e);
  }

  return RESOURCES_DATA;
};

export const saveInterviewRecord = async (userId, interviewData) => {
  if (!isSupabaseConfigured || !supabase || !userId) {
    console.log("Mock saved interview record:", interviewData);
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('interviews')
      .insert({
        user_id: userId,
        position_id: interviewData.positionId,
        config: interviewData.config,
        status: interviewData.status,
        completed_at: new Date().toISOString(),
        overall_score: interviewData.overallScore,
        technical_score: interviewData.technicalScore,
        communication_score: interviewData.communicationScore,
        proctoring_status: interviewData.proctoringStatus,
        strike_count: interviewData.strikeCount
      })
      .select()
      .single();

    if (!error && data) {
      // Save proctoring events if any
      if (interviewData.violations && interviewData.violations.length > 0) {
        const eventsToInsert = interviewData.violations.map(v => ({
          interview_id: data.id,
          event_type: v.type,
          severity: v.severity,
          description: v.description
        }));
        await supabase.from('proctoring_events').insert(eventsToInsert);
      }
      return data;
    }
  } catch (e) {
    console.warn("Failed to save interview record to Supabase:", e);
  }

  return null;
};
